import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// ============================================================================
// ID MAPPINGS (pour relations foreign keys)
// ============================================================================

const idMappings: Record<string, Record<string, string>> = {
  wilaya: {},
  commune: {},
  user: {},
  property: {},
  role: {},
  permission: {},
  conversation: {},
  savedSearch: {},
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// ============================================================================
// SEQUENCE RESET
// ============================================================================

async function resetSequence(tableName: string) {
  try {
    const result = await prisma.$queryRaw<Array<{ max: number | null }>>`
      SELECT MAX(id) as max FROM ${prisma.$queryRawUnsafe(`"${tableName}"`)}
    `;

    const maxId = result[0]?.max || 0;
    const nextId = maxId + 1;

    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${nextId};`
    );

    console.log(`🔄 Reset sequence for ${tableName} to ${nextId}`);
  } catch (error) {
    console.log(`⚠️  No sequence for ${tableName} (uses CUID)`);
  }
}

// ============================================================================
// DELETE ALL DATA
// ============================================================================

async function deleteAllData(orderedModelNames: string[]) {
  console.log("\n🗑️  Deleting all existing data...\n");

  await prisma.$executeRaw`SET session_replication_role = 'replica';`;

  for (const modelName of [...orderedModelNames].reverse()) {
    const modelCamel = toCamelCase(modelName);
    const model = (prisma as any)[modelCamel];

    if (!model || !model.deleteMany) {
      console.log(`⚠️  Model ${modelName} not found or not deletable`);
      continue;
    }

    try {
      const result = await model.deleteMany({});
      console.log(`✅ Cleared ${result.count} records from ${modelName}`);
    } catch (error) {
      console.error(`❌ Error clearing ${modelName}:`, error);
    }
  }

  await prisma.$executeRaw`SET session_replication_role = 'origin';`;
}

// ============================================================================
// TRANSFORM DATA
// ============================================================================

function transformItem(modelName: string, item: any): any {
  const transformed = { ...item };

  // ===== COMMUNE =====
  if (modelName === "Commune") {
    if (item.wilayaCode && idMappings.wilaya[item.wilayaCode]) {
      transformed.wilayaId = idMappings.wilaya[item.wilayaCode];
      delete transformed.wilayaCode;
    } else if (item.code) {
      const wilayaCode = item.code.substring(0, 2);
      if (idMappings.wilaya[wilayaCode]) {
        transformed.wilayaId = idMappings.wilaya[wilayaCode];
      }
    }
  }

  // ===== PROPERTY =====
  if (modelName === "Property") {
    // User FK
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }

    // Wilaya FK (NOUVEAU v6)
    if (item.wilaya && idMappings.wilaya[item.wilaya]) {
      transformed.wilayaId = idMappings.wilaya[item.wilaya];
      delete transformed.wilaya;
    } else if (item.wilayaId && idMappings.wilaya[item.wilayaId]) {
      transformed.wilayaId = idMappings.wilaya[item.wilayaId];
    }

    // Commune FK (NOUVEAU v6)
    if (item.commune && idMappings.commune[item.commune]) {
      transformed.communeId = idMappings.commune[item.commune];
      delete transformed.commune;
    } else if (item.communeId && idMappings.commune[item.communeId]) {
      transformed.communeId = idMappings.commune[item.communeId];
    }

    // Privacy zones (NOUVEAU v6)
    if (!item.publicLatitude && item.exactLatitude) {
      if (item.showExactLocation) {
        transformed.publicLatitude = item.exactLatitude;
        transformed.publicLongitude = item.exactLongitude;
      } else {
        // Approximation (500m de flou)
        const latOffset = (Math.random() - 0.5) * 0.009; // ~500m
        const lonOffset = (Math.random() - 0.5) * 0.009;
        transformed.publicLatitude = parseFloat(item.exactLatitude) + latOffset;
        transformed.publicLongitude = parseFloat(item.exactLongitude) + lonOffset;
      }
    }
  }

  // ===== PROPERTY MEDIA (NOUVEAU v6) =====
  if (modelName === "PropertyMedia") {
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }

    // Transform flat data to JSON structure
    if (item.mediaType === "IMAGE" && item.url) {
      transformed.imageData = {
        url: item.url,
        thumbnailUrl: item.thumbnailUrl || item.url,
        mediumUrl: item.mediumUrl || item.url,
        largeUrl: item.largeUrl || item.url,
        blurhash: item.blurhash,
        dominantColor: item.dominantColor,
        width: item.width,
        height: item.height,
        format: item.format,
        sizeBytes: item.sizeBytes,
        altText: item.altText,
      };
      // Remove flat fields
      delete transformed.url;
      delete transformed.thumbnailUrl;
      delete transformed.mediumUrl;
      delete transformed.largeUrl;
      delete transformed.blurhash;
      delete transformed.dominantColor;
      delete transformed.width;
      delete transformed.height;
      delete transformed.format;
      delete transformed.sizeBytes;
      delete transformed.altText;
    }

    if (item.mediaType === "VIDEO") {
      transformed.videoData = {
        platform: item.videoPlatform,
        url: item.url,
        embedUrl: item.videoEmbedUrl,
        thumbnailUrl: item.thumbnailUrl,
        duration: item.duration,
        width: item.width,
        height: item.height,
        format: item.format,
        sizeBytes: item.sizeBytes,
      };
      delete transformed.url;
      delete transformed.videoPlatform;
      delete transformed.videoEmbedUrl;
      delete transformed.thumbnailUrl;
      delete transformed.duration;
      delete transformed.width;
      delete transformed.height;
      delete transformed.format;
      delete transformed.sizeBytes;
    }
  }

  // ===== PROPERTY PRICE HISTORY (NOUVEAU v6) =====
  if (modelName === "PropertyPriceHistory") {
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
  }

  // ===== CONVERSATION (REFACTORÉ v6) =====
  if (modelName === "Conversation") {
    if (item.buyerId && idMappings.user[item.buyerId]) {
      transformed.buyerId = idMappings.user[item.buyerId];
    }
    if (item.sellerId && idMappings.user[item.sellerId]) {
      transformed.sellerId = idMappings.user[item.sellerId];
    }
    if (item.lastPropertyId && idMappings.property[item.lastPropertyId]) {
      transformed.lastPropertyId = idMappings.property[item.lastPropertyId];
    }
  }

  // ===== MESSAGE (NOUVEAU v6 - propertyId contextuel) =====
  if (modelName === "Message") {
    if (item.conversationId && idMappings.conversation[item.conversationId]) {
      transformed.conversationId = idMappings.conversation[item.conversationId];
    }
    if (item.senderId && idMappings.user[item.senderId]) {
      transformed.senderId = idMappings.user[item.senderId];
    }
    if (item.receiverId && idMappings.user[item.receiverId]) {
      transformed.receiverId = idMappings.user[item.receiverId];
    }
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
  }

  // ===== SAVED SEARCH (NOUVEAU v6) =====
  if (modelName === "SavedSearch") {
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
  }

  // ===== SAVED SEARCH MATCH (NOUVEAU v6) =====
  if (modelName === "SavedSearchMatch") {
    if (item.savedSearchId && idMappings.savedSearch[item.savedSearchId]) {
      transformed.savedSearchId = idMappings.savedSearch[item.savedSearchId];
    }
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
  }

  // ===== FAVORITE =====
  if (modelName === "Favorite") {
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
    if (item.propertyId) {
      if (typeof item.propertyId === "number") {
        console.warn(`⚠️  Cannot map numeric propertyId ${item.propertyId}`);
        return null;
      }
      if (idMappings.property[item.propertyId]) {
        transformed.propertyId = idMappings.property[item.propertyId];
      }
    }
  }

  // ===== REVIEW (REFACTORÉ v6) =====
  if (modelName === "Review") {
    if (item.conversationId && idMappings.conversation[item.conversationId]) {
      transformed.conversationId = idMappings.conversation[item.conversationId];
    }
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
    if (item.reviewerId && idMappings.user[item.reviewerId]) {
      transformed.reviewerId = idMappings.user[item.reviewerId];
    }
    if (item.ownerId && idMappings.user[item.ownerId]) {
      transformed.ownerId = idMappings.user[item.ownerId];
    }
  }

  // ===== ROLE PERMISSION =====
  if (modelName === "RolePermission") {
    if (item.roleId && idMappings.role[item.roleId]) {
      transformed.roleId = idMappings.role[item.roleId];
    }
    if (item.permissionId && idMappings.permission[item.permissionId]) {
      transformed.permissionId = idMappings.permission[item.permissionId];
    }
  }

  // ===== USER ROLE =====
  if (modelName === "UserRole") {
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
    if (item.roleId && idMappings.role[item.roleId]) {
      transformed.roleId = idMappings.role[item.roleId];
    }
  }

  // ===== PROPERTY BOOST =====
  if (modelName === "PropertyBoost") {
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
  }

  // ===== PAYMENT =====
  if (modelName === "Payment") {
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
  }

  // ===== LOCATION REQUEST =====
  if (modelName === "LocationRequest") {
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
    if (item.requesterId && idMappings.user[item.requesterId]) {
      transformed.requesterId = idMappings.user[item.requesterId];
    }
    if (item.ownerId && idMappings.user[item.ownerId]) {
      transformed.ownerId = idMappings.user[item.ownerId];
    }
  }

  // ===== NOTIFICATION =====
  if (modelName === "Notification") {
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
  }

  // ===== REPORT =====
  if (modelName === "Report") {
    if (item.reporterId && idMappings.user[item.reporterId]) {
      transformed.reporterId = idMappings.user[item.reporterId];
    }
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
    if (item.reportedUserId && idMappings.user[item.reportedUserId]) {
      transformed.reportedUserId = idMappings.user[item.reportedUserId];
    }
  }

  // ===== PROPERTY VIEW STATS =====
  if (modelName === "PropertyViewStats") {
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
  }

  // ===== PROPERTY VIEW DETAIL =====
  if (modelName === "PropertyViewDetail") {
    if (item.propertyId && idMappings.property[item.propertyId]) {
      transformed.propertyId = idMappings.property[item.propertyId];
    }
    if (item.userId && idMappings.user[item.userId]) {
      transformed.userId = idMappings.user[item.userId];
    }
  }

  // ===== POPULAR SEARCH (NOUVEAU v6) =====
  if (modelName === "PopularSearch") {
    if (item.wilayaId && idMappings.wilaya[item.wilayaId]) {
      transformed.wilayaId = idMappings.wilaya[item.wilayaId];
    }
  }

  return transformed;
}

// ============================================================================
// SEED DATA
// ============================================================================

async function seedData(modelName: string, data: any[]) {
  const modelCamel = toCamelCase(modelName);
  const model = (prisma as any)[modelCamel];

  if (!model) {
    console.error(`❌ Model ${modelName} not found in Prisma client`);
    return 0;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const item of data) {
    try {
      const transformedItem = transformItem(modelName, item);

      if (transformedItem === null) {
        errorCount++;
        continue;
      }

      const created = await model.create({ data: transformedItem });
      successCount++;

      // Store ID mappings
      if (modelName === "Wilaya" && item.code) {
        idMappings.wilaya[item.code] = created.id;
      } else if (modelName === "Commune" && item.code) {
        idMappings.commune[item.code] = created.id;
      } else if (modelName === "User" && item.id) {
        idMappings.user[item.id] = created.id;
      } else if (modelName === "Property") {
        if (item.slug) {
          idMappings.property[item.slug] = created.id;
        }
        if (item.id) {
          idMappings.property[item.id] = created.id;
        }
      } else if (modelName === "Role" && item.id) {
        idMappings.role[item.id] = created.id;
      } else if (modelName === "Permission" && item.id) {
        idMappings.permission[item.id] = created.id;
      } else if (modelName === "Conversation" && item.id) {
        idMappings.conversation[item.id] = created.id;
      } else if (modelName === "SavedSearch" && item.id) {
        idMappings.savedSearch[item.id] = created.id;
      }
    } catch (error: any) {
      errorCount++;
      console.error(`❌ Error inserting into ${modelName}:`, error.message);
      if (errorCount <= 3) {
        console.error("Failed item:", JSON.stringify(item, null, 2));
      }
    }
  }

  return successCount;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
    console.log(`📁 Created ${dataDirectory} directory`);
  }

  // Order matters! Dependencies first
  const seedOrder = [
    // ===== CORE REFERENCE DATA =====
    { model: "Wilaya", file: "wilayas.json" },
    { model: "Commune", file: "communes.json" },
    { model: "Role", file: "roles.json" },
    { model: "Permission", file: "permissions.json" },

    // ===== BOOST PRICING (NOUVEAU v6) =====
    { model: "BoostPricing", file: "boostPricing.json" },

    // ===== USERS =====
    { model: "User", file: "users.json" },

    // ===== RBAC =====
    { model: "RolePermission", file: "rolePermissions.json" },
    { model: "UserRole", file: "userRoles.json" },

    // ===== PROPERTIES =====
    { model: "Property", file: "properties.json" },
    { model: "PropertyMedia", file: "propertyMedia.json" },
    { model: "PropertyPriceHistory", file: "propertyPriceHistory.json" }, // NOUVEAU v6

    // ===== SAVED SEARCHES (NOUVEAU v6) =====
    { model: "SavedSearch", file: "savedSearches.json" },
    { model: "SavedSearchMatch", file: "savedSearchMatches.json" },

    // ===== SOCIAL =====
    { model: "Favorite", file: "favorites.json" },

    // ===== MESSAGING (REFACTORÉ v6) =====
    { model: "Conversation", file: "conversations.json" },
    { model: "Message", file: "messages.json" },

    // ===== REVIEWS (REFACTORÉ v6) =====
    { model: "Review", file: "reviews.json" },

    // ===== PAYMENTS & BOOSTS =====
    { model: "Payment", file: "payments.json" },
    { model: "PropertyBoost", file: "propertyBoosts.json" },

    // ===== LOCATION REQUESTS =====
    { model: "LocationRequest", file: "locationRequests.json" },

    // ===== ANALYTICS =====
    { model: "PropertyViewStats", file: "propertyViewStats.json" },
    { model: "PropertyViewDetail", file: "propertyViewDetails.json" },
    { model: "PopularSearch", file: "popularSearches.json" },

    // ===== NOTIFICATIONS =====
    { model: "Notification", file: "notifications.json" },

    // ===== MODERATION =====
    { model: "Report", file: "reports.json" },
  ];

  console.log("🌱 Starting RentAlg seed process (v6.0)...\n");

  // Step 1: Delete all data
  const modelNames = seedOrder.map((s) => s.model);
  await deleteAllData(modelNames);

  console.log("\n📦 Seeding new data...\n");

  // Step 2: Seed data
  for (const { model, file } of seedOrder) {
    const filePath = path.join(dataDirectory, file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${file} not found, skipping ${model}...`);
      continue;
    }

    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (!Array.isArray(jsonData) || jsonData.length === 0) {
        console.log(`⚠️  ${file} is empty or invalid, skipping...`);
        continue;
      }

      const successCount = await seedData(model, jsonData);
      console.log(
        `✅ Seeded ${model}: ${successCount}/${jsonData.length} records from ${file}`
      );

      const tableName = model.toLowerCase() + "s";
      await resetSequence(tableName);

      await sleep(200);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  console.log("\n✅ Seed process completed!\n");
  console.log("\n📊 ID Mappings created:");
  console.log(`   - Wilayas: ${Object.keys(idMappings.wilaya).length}`);
  console.log(`   - Communes: ${Object.keys(idMappings.commune).length}`);
  console.log(`   - Users: ${Object.keys(idMappings.user).length}`);
  console.log(`   - Properties: ${Object.keys(idMappings.property).length}`);
  console.log(`   - Roles: ${Object.keys(idMappings.role).length}`);
  console.log(`   - Permissions: ${Object.keys(idMappings.permission).length}`);
  console.log(
    `   - Conversations: ${Object.keys(idMappings.conversation).length}`
  );
  console.log(
    `   - SavedSearches: ${Object.keys(idMappings.savedSearch).length}`
  );
}

// ============================================================================
// RUN
// ============================================================================

main()
  .catch((e) => {
    console.error("\n❌ Seed process failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });