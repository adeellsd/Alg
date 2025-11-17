-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION', 'BANNED');

-- CreateEnum
CREATE TYPE "AccountTier" AS ENUM ('PARTICULIER', 'PROFESSIONEL');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT_F1', 'APARTMENT_F2', 'APARTMENT_F3', 'APARTMENT_F4', 'APARTMENT_F5_PLUS', 'VILLA', 'DUPLEX', 'STUDIO', 'TERRAIN_CONSTRUCTIBLE', 'TERRAIN_AGRICOLE', 'LOCAL_COMMERCIAL', 'BUREAU', 'GARAGE_BOX', 'FERME', 'OTHER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('SALE', 'RENT_MONTHLY', 'RENT_DAILY', 'RENT_YEARLY');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'SOLD', 'RENTED', 'EXPIRED', 'REJECTED', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "BoostTier" AS ENUM ('NONE', 'TIER_1_EN_AVANT', 'TIER_2_PREMIUM', 'TIER_3_ULTRA');

-- CreateEnum
CREATE TYPE "BoostStatus" AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED', 'UPGRADED');

-- CreateEnum
CREATE TYPE "HeatingType" AS ENUM ('NONE', 'CENTRAL', 'INDIVIDUAL', 'BOTH');

-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('SEA', 'MOUNTAIN', 'CITY', 'GARDEN', 'STREET', 'COURTYARD', 'NONE');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'BLUEPRINT', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "ContactPreference" AS ENUM ('MESSAGE_ONLY', 'PHONE_ONLY', 'WHATSAPP_ONLY', 'BOTH');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('FRAUD', 'DUPLICATE', 'INAPPROPRIATE_CONTENT', 'WRONG_CATEGORY', 'ALREADY_SOLD', 'SPAM', 'FAKE_PHOTOS', 'WRONG_PRICE', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CHARGILY_CIB', 'CHARGILY_EDAHABIA', 'BARIDIMOB', 'CCP');

-- CreateEnum
CREATE TYPE "PaymentProductType" AS ENUM ('BOOST_TIER_1', 'BOOST_TIER_2', 'BOOST_TIER_3', 'PRO_UPGRADE', 'PRO_RENEWAL');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOST_EXPIRING', 'BOOST_EXPIRED', 'BOOST_ACTIVATED', 'NEW_MESSAGE', 'MESSAGE_PURGE_WARNING', 'PROPERTY_APPROVED', 'PROPERTY_REJECTED', 'PROPERTY_EXPIRING', 'PROPERTY_EXPIRED', 'PROPERTY_LIMIT', 'REVIEW_RECEIVED', 'NEW_FAVORITE', 'LOCATION_REQUEST', 'LOCATION_APPROVED', 'LOCATION_EXPIRED', 'PRO_EXPIRING', 'PRO_EXPIRED', 'VERIFICATION_REQUIRED', 'REPORT_RECEIVED', 'ACCOUNT_WARNING', 'PRICE_CHANGED', 'NEW_MATCH');

-- CreateEnum
CREATE TYPE "LocationInputMode" AS ENUM ('DROPDOWN_MANUAL', 'MAP_AUTOCOMPLETE', 'MAP_PIN');

-- CreateEnum
CREATE TYPE "LocationRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED', 'REVOKED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "accountTier" "AccountTier" NOT NULL DEFAULT 'PARTICULIER',
    "status" "AccountStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "proActivatedAt" TIMESTAMP(3),
    "proExpiresAt" TIMESTAMP(3),
    "proAutoRenew" BOOLEAN NOT NULL DEFAULT false,
    "companyName" TEXT,
    "companyLogo" TEXT,
    "companyDescription" TEXT,
    "commerceRegister" TEXT,
    "taxId" TEXT,
    "showPhone" BOOLEAN NOT NULL DEFAULT true,
    "showWhatsApp" BOOLEAN NOT NULL DEFAULT false,
    "whatsappNumber" TEXT,
    "preferredContact" "ContactPreference" NOT NULL DEFAULT 'BOTH',
    "language" TEXT NOT NULL DEFAULT 'fr',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "smsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "autoApproveProperties" BOOLEAN NOT NULL DEFAULT false,
    "warningCount" INTEGER NOT NULL DEFAULT 0,
    "bannedAt" TIMESTAMP(3),
    "banReason" TEXT,
    "totalProperties" INTEGER NOT NULL DEFAULT 0,
    "activeProperties" INTEGER NOT NULL DEFAULT 0,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "totalFavorites" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(3,2),
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "lastLoginAt" TIMESTAMP(3),
    "lastActivityAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedBy" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "priceAmount" BIGINT NOT NULL,
    "priceNegotiable" BOOLEAN NOT NULL DEFAULT false,
    "minRentDuration" INTEGER,
    "rentDeposit" BIGINT,
    "surfaceArea" INTEGER,
    "landArea" INTEGER,
    "totalRooms" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "kitchens" INTEGER DEFAULT 1,
    "livingRooms" INTEGER,
    "floor" INTEGER,
    "totalFloors" INTEGER,
    "buildingAge" INTEGER,
    "constructionYear" INTEGER,
    "hasElevator" BOOLEAN NOT NULL DEFAULT false,
    "hasBalcony" BOOLEAN NOT NULL DEFAULT false,
    "hasTerrace" BOOLEAN NOT NULL DEFAULT false,
    "hasCellar" BOOLEAN NOT NULL DEFAULT false,
    "hasParking" BOOLEAN NOT NULL DEFAULT false,
    "hasGarage" BOOLEAN NOT NULL DEFAULT false,
    "hasGarden" BOOLEAN NOT NULL DEFAULT false,
    "hasPool" BOOLEAN NOT NULL DEFAULT false,
    "hasAirConditioning" BOOLEAN NOT NULL DEFAULT false,
    "heatingType" "HeatingType" NOT NULL DEFAULT 'NONE',
    "hasEquippedKitchen" BOOLEAN NOT NULL DEFAULT false,
    "isFurnished" BOOLEAN NOT NULL DEFAULT false,
    "hasInternet" BOOLEAN NOT NULL DEFAULT false,
    "hasCityGas" BOOLEAN NOT NULL DEFAULT false,
    "hasWater" BOOLEAN NOT NULL DEFAULT true,
    "hasElectricity" BOOLEAN NOT NULL DEFAULT true,
    "hasGuard" BOOLEAN NOT NULL DEFAULT false,
    "hasIntercom" BOOLEAN NOT NULL DEFAULT false,
    "hasAlarm" BOOLEAN NOT NULL DEFAULT false,
    "hasElectricGate" BOOLEAN NOT NULL DEFAULT false,
    "hasCCTV" BOOLEAN NOT NULL DEFAULT false,
    "viewType" "ViewType" NOT NULL DEFAULT 'NONE',
    "distanceToSchool" INTEGER,
    "distanceToTransport" INTEGER,
    "distanceToShops" INTEGER,
    "distanceToMosque" INTEGER,
    "distanceToHospital" INTEGER,
    "hasLivretFoncier" BOOLEAN NOT NULL DEFAULT false,
    "hasActeVente" BOOLEAN NOT NULL DEFAULT false,
    "hasPermisConstruction" BOOLEAN NOT NULL DEFAULT false,
    "arePapersComplete" BOOLEAN NOT NULL DEFAULT false,
    "customFeatures" JSONB,
    "wilayaId" TEXT NOT NULL,
    "communeId" TEXT,
    "quartier" TEXT,
    "fullAddress" TEXT,
    "postalCode" VARCHAR(10),
    "exactLatitude" DECIMAL(10,8) NOT NULL,
    "exactLongitude" DECIMAL(11,8) NOT NULL,
    "publicLatitude" DECIMAL(10,8) NOT NULL,
    "publicLongitude" DECIMAL(11,8) NOT NULL,
    "showExactLocation" BOOLEAN NOT NULL DEFAULT false,
    "privacyRadiusMeters" INTEGER NOT NULL DEFAULT 500,
    "locationInputMode" "LocationInputMode" NOT NULL DEFAULT 'DROPDOWN_MANUAL',
    "mapboxPlaceId" TEXT,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "favoritesCount" INTEGER NOT NULL DEFAULT 0,
    "contactsCount" INTEGER NOT NULL DEFAULT 0,
    "sharesCount" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "metaTitle" VARCHAR(70),
    "metaDescription" VARCHAR(160),
    "moderatedAt" TIMESTAMP(3),
    "moderatedBy" TEXT,
    "rejectionReason" TEXT,
    "expiresAt" TIMESTAMP(3),
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_price_history" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyId" TEXT NOT NULL,
    "oldPrice" BIGINT NOT NULL,
    "newPrice" BIGINT NOT NULL,
    "changePercent" DECIMAL(5,2) NOT NULL,
    "changedBy" TEXT,
    "notificationsSent" INTEGER NOT NULL DEFAULT 0,
    "notifiedAt" TIMESTAMP(3),

    CONSTRAINT "property_price_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_media" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "imageData" JSONB,
    "videoData" JSONB,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boost_pricing" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tier" "BoostTier" NOT NULL,
    "pricePerWeek" BIGINT NOT NULL,
    "pricePerMonth" BIGINT,
    "features" JSONB NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "boost_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_boosts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boostTier" "BoostTier" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "BoostStatus" NOT NULL DEFAULT 'PENDING',
    "amountPaid" BIGINT NOT NULL,
    "priceReference" BIGINT NOT NULL,
    "previousTier" "BoostTier",
    "isUpgrade" BOOLEAN NOT NULL DEFAULT false,
    "upgradeAmountPaid" BIGINT,
    "paymentId" TEXT,
    "expirationNotificationSent" BOOLEAN NOT NULL DEFAULT false,
    "notificationSentAt" TIMESTAMP(3),
    "totalImpressions" INTEGER NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "property_boosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "message" TEXT,
    "status" "LocationRequestStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "revokedBy" TEXT,
    "viewedAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "location_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "notifyPriceChange" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_searches" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "criteria" JSONB NOT NULL,
    "notifyByEmail" BOOLEAN NOT NULL DEFAULT true,
    "notifyInApp" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastMatchedAt" TIMESTAMP(3),
    "matchCount" INTEGER NOT NULL DEFAULT 0,
    "lastNotifiedAt" TIMESTAMP(3),

    CONSTRAINT "saved_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_search_matches" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "savedSearchId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "viewedAt" TIMESTAMP(3),

    CONSTRAINT "saved_search_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "lastPropertyId" TEXT,
    "buyerLastReadAt" TIMESTAMP(3),
    "sellerLastReadAt" TIMESTAMP(3),
    "buyerUnreadCount" INTEGER NOT NULL DEFAULT 0,
    "sellerUnreadCount" INTEGER NOT NULL DEFAULT 0,
    "buyerMuted" BOOLEAN NOT NULL DEFAULT false,
    "sellerMuted" BOOLEAN NOT NULL DEFAULT false,
    "buyerArchived" BOOLEAN NOT NULL DEFAULT false,
    "sellerArchived" BOOLEAN NOT NULL DEFAULT false,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keepIndefinitely" BOOLEAN NOT NULL DEFAULT false,
    "purgeWarningAt" TIMESTAMP(3),
    "totalMessages" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "propertyId" TEXT,
    "content" TEXT NOT NULL,
    "attachments" JSONB,
    "status" "MessageStatus" NOT NULL DEFAULT 'SENT',
    "readAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "conversationId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "tags" TEXT[],
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "isReported" BOOLEAN NOT NULL DEFAULT false,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "hiddenAt" TIMESTAMP(3),
    "hiddenBy" TEXT,
    "ownerResponse" TEXT,
    "ownerRespondedAt" TIMESTAMP(3),

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reporterId" TEXT NOT NULL,
    "propertyId" TEXT,
    "reportedUserId" TEXT,
    "reason" "ReportReason" NOT NULL,
    "description" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "evidenceUrls" TEXT[],
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "adminNotes" TEXT,
    "actionTaken" TEXT,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'DZD',
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "chargilyTransactionId" TEXT,
    "chargilyPaymentUrl" TEXT,
    "chargilyInvoiceId" TEXT,
    "chargilyWebhookData" JSONB,
    "productType" "PaymentProductType" NOT NULL,
    "productDetails" JSONB,
    "failureReason" TEXT,
    "failureCode" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastRetryAt" TIMESTAMP(3),
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "webhookReceivedAt" TIMESTAMP(3),
    "webhookVerified" BOOLEAN NOT NULL DEFAULT false,
    "refundedAt" TIMESTAMP(3),
    "refundAmount" BIGINT,
    "refundReason" TEXT,
    "refundedBy" TEXT,
    "invoiceNumber" TEXT,
    "invoiceUrl" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "propertyId" TEXT,
    "link" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "isEmailed" BOOLEAN NOT NULL DEFAULT false,
    "emailedAt" TIMESTAMP(3),
    "isPushed" BOOLEAN NOT NULL DEFAULT false,
    "pushedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_view_stats" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
    "avgDuration" INTEGER,
    "bounceRate" DECIMAL(5,2),
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "sourceBreakdown" JSONB,
    "deviceBreakdown" JSONB,

    CONSTRAINT "property_view_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_view_details" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,
    "sessionId" TEXT,
    "country" TEXT,
    "city" TEXT,
    "durationSeconds" INTEGER,
    "didContact" BOOLEAN NOT NULL DEFAULT false,
    "didFavorite" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "campaign" TEXT,
    "device" TEXT,

    CONSTRAINT "property_view_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "popular_searches" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "wilayaId" TEXT,
    "propertyType" "PropertyType",
    "transactionType" "TransactionType",
    "minPrice" BIGINT,
    "maxPrice" BIGINT,
    "searchCount" INTEGER NOT NULL DEFAULT 1,
    "lastSearchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cachedResults" JSONB,
    "cacheExpiresAt" TIMESTAMP(3),
    "cacheTTL" INTEGER NOT NULL DEFAULT 3600,

    CONSTRAINT "popular_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wilayas" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameAr" TEXT,
    "nameFr" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "population" INTEGER,
    "area" INTEGER,

    CONSTRAINT "wilayas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameAr" TEXT,
    "nameFr" TEXT,
    "wilayaId" TEXT NOT NULL,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "population" INTEGER,
    "postalCode" VARCHAR(10),

    CONSTRAINT "communes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cognitoId_key" ON "users"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_cognitoId_idx" ON "users"("cognitoId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_accountTier_idx" ON "users"("accountTier");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_proExpiresAt_idx" ON "users"("proExpiresAt");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "user_roles_userId_idx" ON "user_roles"("userId");

-- CreateIndex
CREATE INDEX "user_roles_roleId_idx" ON "user_roles"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "user_roles"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "permissions_code_idx" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "permissions_category_idx" ON "permissions"("category");

-- CreateIndex
CREATE INDEX "role_permissions_roleId_idx" ON "role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "role_permissions_permissionId_idx" ON "role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_roleId_permissionId_key" ON "role_permissions"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_userId_idx" ON "properties"("userId");

-- CreateIndex
CREATE INDEX "properties_status_idx" ON "properties"("status");

-- CreateIndex
CREATE INDEX "properties_propertyType_idx" ON "properties"("propertyType");

-- CreateIndex
CREATE INDEX "properties_transactionType_idx" ON "properties"("transactionType");

-- CreateIndex
CREATE INDEX "properties_wilayaId_idx" ON "properties"("wilayaId");

-- CreateIndex
CREATE INDEX "properties_communeId_idx" ON "properties"("communeId");

-- CreateIndex
CREATE INDEX "properties_slug_idx" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_priceAmount_idx" ON "properties"("priceAmount");

-- CreateIndex
CREATE INDEX "properties_priceAmount_transactionType_idx" ON "properties"("priceAmount", "transactionType");

-- CreateIndex
CREATE INDEX "properties_createdAt_idx" ON "properties"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "properties_status_propertyType_transactionType_idx" ON "properties"("status", "propertyType", "transactionType");

-- CreateIndex
CREATE INDEX "properties_status_wilayaId_propertyType_idx" ON "properties"("status", "wilayaId", "propertyType");

-- CreateIndex
CREATE INDEX "properties_publicLatitude_publicLongitude_idx" ON "properties"("publicLatitude", "publicLongitude");

-- CreateIndex
CREATE INDEX "properties_status_createdAt_idx" ON "properties"("status", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "properties_deletedAt_idx" ON "properties"("deletedAt");

-- CreateIndex
CREATE INDEX "property_price_history_propertyId_createdAt_idx" ON "property_price_history"("propertyId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "property_price_history_createdAt_idx" ON "property_price_history"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "property_media_propertyId_idx" ON "property_media"("propertyId");

-- CreateIndex
CREATE INDEX "property_media_mediaType_idx" ON "property_media"("mediaType");

-- CreateIndex
CREATE INDEX "property_media_displayOrder_idx" ON "property_media"("displayOrder");

-- CreateIndex
CREATE INDEX "property_media_isPrimary_idx" ON "property_media"("isPrimary");

-- CreateIndex
CREATE INDEX "property_media_deletedAt_idx" ON "property_media"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "boost_pricing_tier_key" ON "boost_pricing"("tier");

-- CreateIndex
CREATE INDEX "boost_pricing_tier_idx" ON "boost_pricing"("tier");

-- CreateIndex
CREATE INDEX "boost_pricing_validFrom_validUntil_idx" ON "boost_pricing"("validFrom", "validUntil");

-- CreateIndex
CREATE UNIQUE INDEX "property_boosts_propertyId_key" ON "property_boosts"("propertyId");

-- CreateIndex
CREATE INDEX "property_boosts_propertyId_idx" ON "property_boosts"("propertyId");

-- CreateIndex
CREATE INDEX "property_boosts_userId_idx" ON "property_boosts"("userId");

-- CreateIndex
CREATE INDEX "property_boosts_status_idx" ON "property_boosts"("status");

-- CreateIndex
CREATE INDEX "property_boosts_boostTier_idx" ON "property_boosts"("boostTier");

-- CreateIndex
CREATE INDEX "property_boosts_endDate_idx" ON "property_boosts"("endDate");

-- CreateIndex
CREATE INDEX "property_boosts_status_endDate_idx" ON "property_boosts"("status", "endDate");

-- CreateIndex
CREATE INDEX "location_requests_propertyId_idx" ON "location_requests"("propertyId");

-- CreateIndex
CREATE INDEX "location_requests_requesterId_idx" ON "location_requests"("requesterId");

-- CreateIndex
CREATE INDEX "location_requests_ownerId_idx" ON "location_requests"("ownerId");

-- CreateIndex
CREATE INDEX "location_requests_status_idx" ON "location_requests"("status");

-- CreateIndex
CREATE INDEX "location_requests_expiresAt_idx" ON "location_requests"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "location_requests_propertyId_requesterId_key" ON "location_requests"("propertyId", "requesterId");

-- CreateIndex
CREATE INDEX "favorites_userId_idx" ON "favorites"("userId");

-- CreateIndex
CREATE INDEX "favorites_propertyId_idx" ON "favorites"("propertyId");

-- CreateIndex
CREATE INDEX "favorites_notifyPriceChange_idx" ON "favorites"("notifyPriceChange");

-- CreateIndex
CREATE INDEX "favorites_createdAt_idx" ON "favorites"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_propertyId_key" ON "favorites"("userId", "propertyId");

-- CreateIndex
CREATE INDEX "saved_searches_userId_idx" ON "saved_searches"("userId");

-- CreateIndex
CREATE INDEX "saved_searches_isActive_idx" ON "saved_searches"("isActive");

-- CreateIndex
CREATE INDEX "saved_searches_userId_isActive_idx" ON "saved_searches"("userId", "isActive");

-- CreateIndex
CREATE INDEX "saved_searches_lastMatchedAt_idx" ON "saved_searches"("lastMatchedAt");

-- CreateIndex
CREATE INDEX "saved_search_matches_savedSearchId_idx" ON "saved_search_matches"("savedSearchId");

-- CreateIndex
CREATE INDEX "saved_search_matches_propertyId_idx" ON "saved_search_matches"("propertyId");

-- CreateIndex
CREATE INDEX "saved_search_matches_createdAt_idx" ON "saved_search_matches"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "saved_search_matches_savedSearchId_propertyId_key" ON "saved_search_matches"("savedSearchId", "propertyId");

-- CreateIndex
CREATE INDEX "conversations_buyerId_idx" ON "conversations"("buyerId");

-- CreateIndex
CREATE INDEX "conversations_sellerId_idx" ON "conversations"("sellerId");

-- CreateIndex
CREATE INDEX "conversations_lastMessageAt_idx" ON "conversations"("lastMessageAt" DESC);

-- CreateIndex
CREATE INDEX "conversations_keepIndefinitely_idx" ON "conversations"("keepIndefinitely");

-- CreateIndex
CREATE INDEX "conversations_purgeWarningAt_idx" ON "conversations"("purgeWarningAt");

-- CreateIndex
CREATE INDEX "conversations_deletedAt_idx" ON "conversations"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "conversations_buyerId_sellerId_key" ON "conversations"("buyerId", "sellerId");

-- CreateIndex
CREATE INDEX "messages_conversationId_idx" ON "messages"("conversationId");

-- CreateIndex
CREATE INDEX "messages_senderId_idx" ON "messages"("senderId");

-- CreateIndex
CREATE INDEX "messages_receiverId_idx" ON "messages"("receiverId");

-- CreateIndex
CREATE INDEX "messages_propertyId_idx" ON "messages"("propertyId");

-- CreateIndex
CREATE INDEX "messages_createdAt_idx" ON "messages"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "messages_status_idx" ON "messages"("status");

-- CreateIndex
CREATE INDEX "messages_receiverId_readAt_idx" ON "messages"("receiverId", "readAt");

-- CreateIndex
CREATE INDEX "reviews_propertyId_idx" ON "reviews"("propertyId");

-- CreateIndex
CREATE INDEX "reviews_reviewerId_idx" ON "reviews"("reviewerId");

-- CreateIndex
CREATE INDEX "reviews_ownerId_idx" ON "reviews"("ownerId");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "reviews_isHidden_idx" ON "reviews"("isHidden");

-- CreateIndex
CREATE INDEX "reviews_createdAt_idx" ON "reviews"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_conversationId_key" ON "reviews"("conversationId");

-- CreateIndex
CREATE INDEX "reports_propertyId_idx" ON "reports"("propertyId");

-- CreateIndex
CREATE INDEX "reports_reportedUserId_idx" ON "reports"("reportedUserId");

-- CreateIndex
CREATE INDEX "reports_reporterId_idx" ON "reports"("reporterId");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_reason_idx" ON "reports"("reason");

-- CreateIndex
CREATE INDEX "reports_createdAt_idx" ON "reports"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "payments_chargilyTransactionId_key" ON "payments"("chargilyTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_invoiceNumber_key" ON "payments"("invoiceNumber");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_productType_idx" ON "payments"("productType");

-- CreateIndex
CREATE INDEX "payments_method_idx" ON "payments"("method");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "payments_chargilyTransactionId_idx" ON "payments"("chargilyTransactionId");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_isRead_idx" ON "notifications"("isRead");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "notifications_userId_isRead_createdAt_idx" ON "notifications"("userId", "isRead", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "notifications_deletedAt_idx" ON "notifications"("deletedAt");

-- CreateIndex
CREATE INDEX "property_view_stats_propertyId_date_idx" ON "property_view_stats"("propertyId", "date" DESC);

-- CreateIndex
CREATE INDEX "property_view_stats_date_idx" ON "property_view_stats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "property_view_stats_propertyId_date_key" ON "property_view_stats"("propertyId", "date");

-- CreateIndex
CREATE INDEX "property_view_details_propertyId_idx" ON "property_view_details"("propertyId");

-- CreateIndex
CREATE INDEX "property_view_details_userId_idx" ON "property_view_details"("userId");

-- CreateIndex
CREATE INDEX "property_view_details_createdAt_idx" ON "property_view_details"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "property_view_details_sessionId_idx" ON "property_view_details"("sessionId");

-- CreateIndex
CREATE INDEX "property_view_details_source_idx" ON "property_view_details"("source");

-- CreateIndex
CREATE INDEX "property_view_details_device_idx" ON "property_view_details"("device");

-- CreateIndex
CREATE INDEX "popular_searches_searchCount_idx" ON "popular_searches"("searchCount" DESC);

-- CreateIndex
CREATE INDEX "popular_searches_cacheExpiresAt_idx" ON "popular_searches"("cacheExpiresAt");

-- CreateIndex
CREATE INDEX "popular_searches_lastSearchedAt_idx" ON "popular_searches"("lastSearchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "popular_searches_wilayaId_propertyType_transactionType_minP_key" ON "popular_searches"("wilayaId", "propertyType", "transactionType", "minPrice", "maxPrice");

-- CreateIndex
CREATE UNIQUE INDEX "wilayas_code_key" ON "wilayas"("code");

-- CreateIndex
CREATE UNIQUE INDEX "wilayas_name_key" ON "wilayas"("name");

-- CreateIndex
CREATE INDEX "wilayas_code_idx" ON "wilayas"("code");

-- CreateIndex
CREATE INDEX "wilayas_name_idx" ON "wilayas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "communes_code_key" ON "communes"("code");

-- CreateIndex
CREATE INDEX "communes_wilayaId_idx" ON "communes"("wilayaId");

-- CreateIndex
CREATE INDEX "communes_code_idx" ON "communes"("code");

-- CreateIndex
CREATE INDEX "communes_name_idx" ON "communes"("name");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_wilayaId_fkey" FOREIGN KEY ("wilayaId") REFERENCES "wilayas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_communeId_fkey" FOREIGN KEY ("communeId") REFERENCES "communes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_price_history" ADD CONSTRAINT "property_price_history_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_media" ADD CONSTRAINT "property_media_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_boosts" ADD CONSTRAINT "property_boosts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_boosts" ADD CONSTRAINT "property_boosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_boosts" ADD CONSTRAINT "property_boosts_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_requests" ADD CONSTRAINT "location_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_requests" ADD CONSTRAINT "location_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_requests" ADD CONSTRAINT "location_requests_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_search_matches" ADD CONSTRAINT "saved_search_matches_savedSearchId_fkey" FOREIGN KEY ("savedSearchId") REFERENCES "saved_searches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_search_matches" ADD CONSTRAINT "saved_search_matches_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_view_stats" ADD CONSTRAINT "property_view_stats_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_view_details" ADD CONSTRAINT "property_view_details_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_view_details" ADD CONSTRAINT "property_view_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_wilayaId_fkey" FOREIGN KEY ("wilayaId") REFERENCES "wilayas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
