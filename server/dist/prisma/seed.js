"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const idMappings = {
    wilaya: {},
    commune: {},
    user: {},
    property: {},
    role: {},
    permission: {},
    conversation: {},
    savedSearch: {},
};
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function toPascalCase(str) {
    return str
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
}
function toCamelCase(str) {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
function resetSequence(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const result = yield prisma.$queryRaw `
      SELECT MAX(id) as max FROM ${prisma.$queryRawUnsafe(`"${tableName}"`)}
    `;
            const maxId = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.max) || 0;
            const nextId = maxId + 1;
            yield prisma.$executeRawUnsafe(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${nextId};`);
            console.log(`🔄 Reset sequence for ${tableName} to ${nextId}`);
        }
        catch (error) {
            console.log(`⚠️  No sequence for ${tableName} (uses CUID)`);
        }
    });
}
function deleteAllData(orderedModelNames) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n🗑️  Deleting all existing data...\n");
        yield prisma.$executeRaw `SET session_replication_role = 'replica';`;
        for (const modelName of [...orderedModelNames].reverse()) {
            const modelCamel = toCamelCase(modelName);
            const model = prisma[modelCamel];
            if (!model || !model.deleteMany) {
                console.log(`⚠️  Model ${modelName} not found or not deletable`);
                continue;
            }
            try {
                const result = yield model.deleteMany({});
                console.log(`✅ Cleared ${result.count} records from ${modelName}`);
            }
            catch (error) {
                console.error(`❌ Error clearing ${modelName}:`, error);
            }
        }
        yield prisma.$executeRaw `SET session_replication_role = 'origin';`;
    });
}
function transformItem(modelName, item) {
    const transformed = Object.assign({}, item);
    if (modelName === "Commune") {
        if (item.wilayaCode && idMappings.wilaya[item.wilayaCode]) {
            transformed.wilayaId = idMappings.wilaya[item.wilayaCode];
            delete transformed.wilayaCode;
        }
        else if (item.code) {
            const wilayaCode = item.code.substring(0, 2);
            if (idMappings.wilaya[wilayaCode]) {
                transformed.wilayaId = idMappings.wilaya[wilayaCode];
            }
        }
    }
    if (modelName === "Property") {
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
        if (item.wilaya && idMappings.wilaya[item.wilaya]) {
            transformed.wilayaId = idMappings.wilaya[item.wilaya];
            delete transformed.wilaya;
        }
        else if (item.wilayaId && idMappings.wilaya[item.wilayaId]) {
            transformed.wilayaId = idMappings.wilaya[item.wilayaId];
        }
        if (item.commune && idMappings.commune[item.commune]) {
            transformed.communeId = idMappings.commune[item.commune];
            delete transformed.commune;
        }
        else if (item.communeId && idMappings.commune[item.communeId]) {
            transformed.communeId = idMappings.commune[item.communeId];
        }
        if (!item.publicLatitude && item.exactLatitude) {
            if (item.showExactLocation) {
                transformed.publicLatitude = item.exactLatitude;
                transformed.publicLongitude = item.exactLongitude;
            }
            else {
                const latOffset = (Math.random() - 0.5) * 0.009;
                const lonOffset = (Math.random() - 0.5) * 0.009;
                transformed.publicLatitude = parseFloat(item.exactLatitude) + latOffset;
                transformed.publicLongitude = parseFloat(item.exactLongitude) + lonOffset;
            }
        }
    }
    if (modelName === "PropertyMedia") {
        if (item.propertyId && idMappings.property[item.propertyId]) {
            transformed.propertyId = idMappings.property[item.propertyId];
        }
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
    if (modelName === "PropertyPriceHistory") {
        if (item.propertyId && idMappings.property[item.propertyId]) {
            transformed.propertyId = idMappings.property[item.propertyId];
        }
    }
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
    if (modelName === "SavedSearch") {
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
    }
    if (modelName === "SavedSearchMatch") {
        if (item.savedSearchId && idMappings.savedSearch[item.savedSearchId]) {
            transformed.savedSearchId = idMappings.savedSearch[item.savedSearchId];
        }
        if (item.propertyId && idMappings.property[item.propertyId]) {
            transformed.propertyId = idMappings.property[item.propertyId];
        }
    }
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
    if (modelName === "RolePermission") {
        if (item.roleId && idMappings.role[item.roleId]) {
            transformed.roleId = idMappings.role[item.roleId];
        }
        if (item.permissionId && idMappings.permission[item.permissionId]) {
            transformed.permissionId = idMappings.permission[item.permissionId];
        }
    }
    if (modelName === "UserRole") {
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
        if (item.roleId && idMappings.role[item.roleId]) {
            transformed.roleId = idMappings.role[item.roleId];
        }
    }
    if (modelName === "PropertyBoost") {
        if (item.propertyId && idMappings.property[item.propertyId]) {
            transformed.propertyId = idMappings.property[item.propertyId];
        }
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
    }
    if (modelName === "Payment") {
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
    }
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
    if (modelName === "Notification") {
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
    }
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
    if (modelName === "PropertyViewStats") {
        if (item.propertyId && idMappings.property[item.propertyId]) {
            transformed.propertyId = idMappings.property[item.propertyId];
        }
    }
    if (modelName === "PropertyViewDetail") {
        if (item.propertyId && idMappings.property[item.propertyId]) {
            transformed.propertyId = idMappings.property[item.propertyId];
        }
        if (item.userId && idMappings.user[item.userId]) {
            transformed.userId = idMappings.user[item.userId];
        }
    }
    if (modelName === "PopularSearch") {
        if (item.wilayaId && idMappings.wilaya[item.wilayaId]) {
            transformed.wilayaId = idMappings.wilaya[item.wilayaId];
        }
    }
    return transformed;
}
function seedData(modelName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const modelCamel = toCamelCase(modelName);
        const model = prisma[modelCamel];
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
                const created = yield model.create({ data: transformedItem });
                successCount++;
                if (modelName === "Wilaya" && item.code) {
                    idMappings.wilaya[item.code] = created.id;
                }
                else if (modelName === "Commune" && item.code) {
                    idMappings.commune[item.code] = created.id;
                }
                else if (modelName === "User" && item.id) {
                    idMappings.user[item.id] = created.id;
                }
                else if (modelName === "Property") {
                    if (item.slug) {
                        idMappings.property[item.slug] = created.id;
                    }
                    if (item.id) {
                        idMappings.property[item.id] = created.id;
                    }
                }
                else if (modelName === "Role" && item.id) {
                    idMappings.role[item.id] = created.id;
                }
                else if (modelName === "Permission" && item.id) {
                    idMappings.permission[item.id] = created.id;
                }
                else if (modelName === "Conversation" && item.id) {
                    idMappings.conversation[item.id] = created.id;
                }
                else if (modelName === "SavedSearch" && item.id) {
                    idMappings.savedSearch[item.id] = created.id;
                }
            }
            catch (error) {
                errorCount++;
                console.error(`❌ Error inserting into ${modelName}:`, error.message);
                if (errorCount <= 3) {
                    console.error("Failed item:", JSON.stringify(item, null, 2));
                }
            }
        }
        return successCount;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path_1.default.join(__dirname, "seedData");
        if (!fs_1.default.existsSync(dataDirectory)) {
            fs_1.default.mkdirSync(dataDirectory, { recursive: true });
            console.log(`📁 Created ${dataDirectory} directory`);
        }
        const seedOrder = [
            { model: "Wilaya", file: "wilayas.json" },
            { model: "Commune", file: "communes.json" },
            { model: "Role", file: "roles.json" },
            { model: "Permission", file: "permissions.json" },
            { model: "BoostPricing", file: "boostPricing.json" },
            { model: "User", file: "users.json" },
            { model: "RolePermission", file: "rolePermissions.json" },
            { model: "UserRole", file: "userRoles.json" },
            { model: "Property", file: "properties.json" },
            { model: "PropertyMedia", file: "propertyMedia.json" },
            { model: "PropertyPriceHistory", file: "propertyPriceHistory.json" },
            { model: "SavedSearch", file: "savedSearches.json" },
            { model: "SavedSearchMatch", file: "savedSearchMatches.json" },
            { model: "Favorite", file: "favorites.json" },
            { model: "Conversation", file: "conversations.json" },
            { model: "Message", file: "messages.json" },
            { model: "Review", file: "reviews.json" },
            { model: "Payment", file: "payments.json" },
            { model: "PropertyBoost", file: "propertyBoosts.json" },
            { model: "LocationRequest", file: "locationRequests.json" },
            { model: "PropertyViewStats", file: "propertyViewStats.json" },
            { model: "PropertyViewDetail", file: "propertyViewDetails.json" },
            { model: "PopularSearch", file: "popularSearches.json" },
            { model: "Notification", file: "notifications.json" },
            { model: "Report", file: "reports.json" },
        ];
        console.log("🌱 Starting RentAlg seed process (v6.0)...\n");
        const modelNames = seedOrder.map((s) => s.model);
        yield deleteAllData(modelNames);
        console.log("\n📦 Seeding new data...\n");
        for (const { model, file } of seedOrder) {
            const filePath = path_1.default.join(dataDirectory, file);
            if (!fs_1.default.existsSync(filePath)) {
                console.log(`⚠️  ${file} not found, skipping ${model}...`);
                continue;
            }
            try {
                const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
                if (!Array.isArray(jsonData) || jsonData.length === 0) {
                    console.log(`⚠️  ${file} is empty or invalid, skipping...`);
                    continue;
                }
                const successCount = yield seedData(model, jsonData);
                console.log(`✅ Seeded ${model}: ${successCount}/${jsonData.length} records from ${file}`);
                const tableName = model.toLowerCase() + "s";
                yield resetSequence(tableName);
                yield sleep(200);
            }
            catch (error) {
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
        console.log(`   - Conversations: ${Object.keys(idMappings.conversation).length}`);
        console.log(`   - SavedSearches: ${Object.keys(idMappings.savedSearch).length}`);
    });
}
main()
    .catch((e) => {
    console.error("\n❌ Seed process failed:");
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map