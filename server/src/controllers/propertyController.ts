import { Request, Response } from "express";
import { PropertyType, TransactionType, PropertyStatus } from "@prisma/client";
import prisma from "../lib/prisma";
import {
  getPropertyTypes,
  getTransactionTypes,
  getAmenities,
  getPropertyStatuses,
  getBuildingAges,
  getViewTypes,
  getHeatingTypes,
  getOrientations,
  getFlooringTypes,
  getSearchFilters,
} from "../utils/configHelpers";

// =============================================================================
// TYPES
// =============================================================================

interface ImageData {
  url?: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
  blurhash?: string;
  dominantColor?: string;
  width?: number;
  height?: number;
  format?: string;
  sizeBytes?: number;
  altText?: string;
}

interface PropertyFilters {
  wilayaId?: string;
  communeId?: string;
  propertyTypes?: PropertyType[];
  transactionType?: TransactionType;
  // UI umbrella grouping (e.g., RENT groups DAILY/MONTHLY/YEARLY)
  transactionGroup?: "RENT" | "SALE";
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  minRooms?: number;
  maxRooms?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  amenities?: string[];
  hasParking?: boolean;
  floorMin?: number;
  floorMax?: number;
  buildingAge?: number;
  viewType?: string;
  isBoosted?: boolean;
  // DZ market specifics
  isNegotiable?: boolean;
  minRentDeposit?: number;
  // Legal docs
  hasLivretFoncier?: boolean;
  hasActeVente?: boolean;
  hasPermisConstruction?: boolean;
  arePapersComplete?: boolean;
  sortBy?: "price_asc" | "price_desc" | "date_desc" | "date_asc" | "surface_desc" | "popular";
  page?: number;
  limit?: number;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Extrait l'URL de la thumbnail depuis imageData JSON
 */
function extractThumbnailUrl(imageData: unknown): string | null {
  if (!imageData || typeof imageData !== "object") return null;
  const data = imageData as ImageData;
  return data.thumbnailUrl || data.mediumUrl || data.url || null;
}

/**
 * Extrait toutes les URLs d'images depuis imageData JSON
 */
function extractImageUrls(imageData: unknown): ImageData | null {
  if (!imageData || typeof imageData !== "object") return null;
  return imageData as ImageData;
}

/**
 * Construit le nom complet de l'utilisateur
 */
function getUserDisplayName(user: { firstName?: string | null; lastName?: string | null; companyName?: string | null }): string {
  if (user.companyName) return user.companyName;
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
  if (user.firstName) return user.firstName;
  if (user.lastName) return user.lastName;
  return "Utilisateur";
}

/**
 * Construit le filtre Prisma pour les propriétés
 */
function buildPropertyWhere(filters: PropertyFilters) {
  const where: Record<string, unknown> = {
    status: PropertyStatus.ACTIVE,
    deletedAt: null,
  };

  // Location
  if (filters.wilayaId) {
    where.wilayaId = filters.wilayaId;
  }
  if (filters.communeId) {
    where.communeId = filters.communeId;
  }

  // Property types
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    where.propertyType = { in: filters.propertyTypes };
  }

  // Transaction type
  if (filters.transactionType) {
    where.transactionType = filters.transactionType;
  } else if (filters.transactionGroup) {
    if (filters.transactionGroup === "SALE") {
      where.transactionType = TransactionType.SALE;
    } else if (filters.transactionGroup === "RENT") {
      where.transactionType = { in: [
        TransactionType.RENT_DAILY,
        TransactionType.RENT_MONTHLY,
        TransactionType.RENT_YEARLY,
      ] } as unknown as TransactionType; // Prisma accepts nested filter
    }
  }

  // Price range
  if (filters.minPrice || filters.maxPrice) {
    where.priceAmount = {};
    if (filters.minPrice) (where.priceAmount as Record<string, unknown>).gte = BigInt(filters.minPrice);
    if (filters.maxPrice) (where.priceAmount as Record<string, unknown>).lte = BigInt(filters.maxPrice);
  }

  // Surface range (surfaceArea in schema)
  if (filters.minSurface || filters.maxSurface) {
    where.surfaceArea = {};
    if (filters.minSurface) (where.surfaceArea as Record<string, unknown>).gte = filters.minSurface;
    if (filters.maxSurface) (where.surfaceArea as Record<string, unknown>).lte = filters.maxSurface;
  }

  // Rooms (totalRooms in schema)
  if (filters.minRooms || filters.maxRooms) {
    where.totalRooms = {};
    if (filters.minRooms) (where.totalRooms as Record<string, unknown>).gte = filters.minRooms;
    if (filters.maxRooms) (where.totalRooms as Record<string, unknown>).lte = filters.maxRooms;
  }

  // Bedrooms
  if (filters.minBedrooms || filters.maxBedrooms) {
    where.bedrooms = {};
    if (filters.minBedrooms) (where.bedrooms as Record<string, unknown>).gte = filters.minBedrooms;
    if (filters.maxBedrooms) (where.bedrooms as Record<string, unknown>).lte = filters.maxBedrooms;
  }

  // Bathrooms
  if (filters.minBathrooms || filters.maxBathrooms) {
    where.bathrooms = {};
    if (filters.minBathrooms) (where.bathrooms as Record<string, unknown>).gte = filters.minBathrooms;
    if (filters.maxBathrooms) (where.bathrooms as Record<string, unknown>).lte = filters.maxBathrooms;
  }

  // Amenities (require ALL selected amenities)
  if (filters.amenities && filters.amenities.length > 0) {
    // AND chain: each amenity must be present via relation table
    (where as any).AND = [
      ...(((where as any).AND as any[]) || []),
      ...filters.amenities.map((amenityId) => ({
        amenities: {
          some: {
            amenityId,
          },
        },
      })),
    ];
  }

  // Floor range
  if (filters.floorMin !== undefined || filters.floorMax !== undefined) {
    where.floor = {};
    if (filters.floorMin !== undefined) (where.floor as Record<string, unknown>).gte = filters.floorMin;
    if (filters.floorMax !== undefined) (where.floor as Record<string, unknown>).lte = filters.floorMax;
  }

  // Building age (number in schema)
  if (filters.buildingAge !== undefined) {
    where.buildingAge = filters.buildingAge;
  }

  // View type
  if (filters.viewType) {
    where.viewType = filters.viewType;
  }

  // Boosted properties
  if (filters.isBoosted) {
    where.boost = {
      isNot: null,
    };
  }

  // DZ specifics
  if (filters.isNegotiable !== undefined) {
    (where as any).priceNegotiable = filters.isNegotiable;
  }
  if (filters.minRentDeposit !== undefined) {
    (where as any).rentDeposit = { gte: BigInt(filters.minRentDeposit) };
  }

  // Legal docs
  if (filters.hasLivretFoncier !== undefined) {
    where.hasLivretFoncier = filters.hasLivretFoncier;
  }
  if (filters.hasActeVente !== undefined) {
    where.hasActeVente = filters.hasActeVente;
  }
  if (filters.hasPermisConstruction !== undefined) {
    where.hasPermisConstruction = filters.hasPermisConstruction;
  }
  if (filters.arePapersComplete !== undefined) {
    where.arePapersComplete = filters.arePapersComplete;
  }

  return where;
}

/**
 * Construit l'orderBy pour Prisma
 */
function buildPropertyOrderBy(sortBy?: string) {
  switch (sortBy) {
    case "price_asc":
      return { priceAmount: "asc" as const };
    case "price_desc":
      return { priceAmount: "desc" as const };
    case "date_asc":
      return { createdAt: "asc" as const };
    case "surface_desc":
      return { surfaceArea: "desc" as const };
    case "popular":
      return { viewsCount: "desc" as const };
    case "date_desc":
    default:
      return { createdAt: "desc" as const };
  }
}

// =============================================================================
// SEARCH PROPERTIES
// =============================================================================

export const searchProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: PropertyFilters = {
      wilayaId: req.query.wilayaId as string,
      communeId: req.query.communeId as string,
      propertyTypes: req.query.propertyTypes
        ? (req.query.propertyTypes as string).split(",") as PropertyType[]
        : undefined,
      transactionType: req.query.transactionType as TransactionType,
      transactionGroup: req.query.transactionGroup as "RENT" | "SALE" | undefined,
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
      minSurface: req.query.minSurface ? parseInt(req.query.minSurface as string) : undefined,
      maxSurface: req.query.maxSurface ? parseInt(req.query.maxSurface as string) : undefined,
      minRooms: req.query.minRooms ? parseInt(req.query.minRooms as string) : undefined,
      maxRooms: req.query.maxRooms ? parseInt(req.query.maxRooms as string) : undefined,
      minBedrooms: req.query.minBedrooms ? parseInt(req.query.minBedrooms as string) : undefined,
      maxBedrooms: req.query.maxBedrooms ? parseInt(req.query.maxBedrooms as string) : undefined,
      minBathrooms: req.query.minBathrooms ? parseInt(req.query.minBathrooms as string) : undefined,
      maxBathrooms: req.query.maxBathrooms ? parseInt(req.query.maxBathrooms as string) : undefined,
      amenities: req.query.amenities ? (req.query.amenities as string).split(",") : undefined,
      hasParking: req.query.hasParking === "true" ? true : req.query.hasParking === "false" ? false : undefined,
      isNegotiable: req.query.isNegotiable === "true" ? true : req.query.isNegotiable === "false" ? false : undefined,
      minRentDeposit: req.query.minRentDeposit ? parseInt(req.query.minRentDeposit as string) : undefined,
      floorMin: req.query.floorMin ? parseInt(req.query.floorMin as string) : undefined,
      floorMax: req.query.floorMax ? parseInt(req.query.floorMax as string) : undefined,
      buildingAge: req.query.buildingAge ? parseInt(req.query.buildingAge as string) : undefined,
      viewType: req.query.viewType as string,
      isBoosted: req.query.isBoosted === "true",
      hasLivretFoncier: req.query.hasLivretFoncier === "true" ? true : req.query.hasLivretFoncier === "false" ? false : undefined,
      hasActeVente: req.query.hasActeVente === "true" ? true : req.query.hasActeVente === "false" ? false : undefined,
      hasPermisConstruction: req.query.hasPermisConstruction === "true" ? true : req.query.hasPermisConstruction === "false" ? false : undefined,
      arePapersComplete: req.query.arePapersComplete === "true" ? true : req.query.arePapersComplete === "false" ? false : undefined,
      sortBy: req.query.sortBy as PropertyFilters["sortBy"],
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? Math.min(parseInt(req.query.limit as string), 50) : 20,
    };

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where = buildPropertyWhere(filters);
    const orderBy = buildPropertyOrderBy(filters.sortBy);

    // Fetch boosted properties first if not filtering by boost
    const boostedQuery = !filters.isBoosted && page === 1
      ? prisma.property.findMany({
          where: {
            ...where,
            boost: {
              isNot: null,
            },
          },
          include: {
            media: {
              orderBy: { order: "asc" },
              take: 1,
            },
            wilaya: { select: { id: true, nameFr: true, nameAr: true } },
            commune: { select: { id: true, nameFr: true, nameAr: true } },
            boost: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                companyName: true,
                companyLogo: true,
                accountTier: true,
                emailVerified: true,
              },
            },
          },
          orderBy: [
            { boost: { boostTier: "desc" } },
            orderBy,
          ],
          take: 6, // Max 6 boosted at top
        })
      : Promise.resolve([]);

    const boostedPropertiesRaw = await boostedQuery;
    
    // Filter only active boosts
    const boostedProperties = boostedPropertiesRaw.filter(
      (p) => p.boost && new Date(p.boost.endDate) > new Date() && p.boost.status === "ACTIVE"
    );

    // Exclude boosted from regular results
    const boostedIds = boostedProperties.map((p) => p.id);
    const regularWhere = boostedIds.length > 0
      ? { ...where, id: { notIn: boostedIds } }
      : where;

    // Count total
    const total = await prisma.property.count({ where: regularWhere });

    // Fetch regular properties
    const regularProperties = await prisma.property.findMany({
      where: regularWhere,
      include: {
        media: {
          orderBy: { order: "asc" },
          take: 1,
        },
        wilaya: { select: { id: true, nameFr: true, nameAr: true } },
        commune: { select: { id: true, nameFr: true, nameAr: true } },
        boost: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            companyName: true,
            companyLogo: true,
            accountTier: true,
            emailVerified: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    // Transform properties
    const transformProperty = (prop: typeof regularProperties[0]) => ({
      id: prop.id,
      slug: prop.slug,
      title: prop.title,
      propertyType: prop.propertyType,
      transactionType: prop.transactionType,
      price: {
        amount: prop.priceAmount.toString(),
        isNegotiable: prop.priceNegotiable,
      },
      surface: prop.surfaceArea,
      rooms: prop.totalRooms,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      floor: prop.floor,
      location: {
        wilaya: prop.wilaya,
        commune: prop.commune,
        quartier: prop.quartier,
        coordinates: {
          lat: parseFloat(prop.publicLatitude.toString()),
          lng: parseFloat(prop.publicLongitude.toString()),
        },
      },
      thumbnail: extractThumbnailUrl(prop.media[0]?.imageData),
      isBoosted: prop.boost !== null && new Date(prop.boost.endDate) > new Date(),
      boostTier: prop.boost?.boostTier || null,
      owner: {
        id: prop.user.id,
        name: getUserDisplayName(prop.user),
        isVerified: prop.user.emailVerified,
        isPro: prop.user.accountTier !== "FREE",
        logo: prop.user.companyLogo,
      },
      stats: {
        views: prop.viewsCount,
        favorites: prop.favoritesCount,
      },
      createdAt: prop.createdAt,
    });

    const allProperties = page === 1
      ? [...boostedProperties.map(transformProperty), ...regularProperties.map(transformProperty)]
      : regularProperties.map(transformProperty);

    res.json({
      success: true,
      data: {
        properties: allProperties,
        pagination: {
          page,
          limit,
          total: total + (page === 1 ? boostedProperties.length : 0),
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
        meta: {
          boostedCount: page === 1 ? boostedProperties.length : 0,
        },
      },
    });
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({
      success: false,
      error: "Failed to search properties",
    });
  }
};

// =============================================================================
// GET SINGLE PROPERTY
// =============================================================================

export const getProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slugOrId } = req.params;
    const userId = (req as unknown as { userId?: string }).userId;

    // Find by slug or ID
    const property = await prisma.property.findFirst({
      where: {
        OR: [
          { slug: slugOrId },
          { id: slugOrId },
        ],
        status: PropertyStatus.ACTIVE,
        deletedAt: null,
      },
      include: {
        media: {
          orderBy: { order: "asc" },
          where: { deletedAt: null },
        },
        wilaya: true,
        commune: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
        boost: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            companyName: true,
            companyLogo: true,
            companyDescription: true,
            accountTier: true,
            emailVerified: true,
            phone: true,
            createdAt: true,
            totalProperties: true,
            totalReviews: true,
            averageRating: true,
          },
        },
        priceHistory: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        reviews: {
          where: { isHidden: false },
          orderBy: { createdAt: "desc" },
          take: 5,
          include: {
            reviewer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!property) {
      res.status(404).json({
        success: false,
        error: "Property not found",
      });
      return;
    }

    // Increment view count
    await prisma.property.update({
      where: { id: property.id },
      data: { viewsCount: { increment: 1 } },
    });

    // Track detailed view if user is logged in
    if (userId) {
      await prisma.propertyViewDetail.create({
        data: {
          propertyId: property.id,
          userId,
          source: (req.query.source as string) || "direct",
        },
      });
    }

    // Check if user has favorited this property
    let isFavorited = false;
    if (userId) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId,
            propertyId: property.id,
          },
        },
      });
      isFavorited = !!favorite;
    }

    // Transform media
    const transformedMedia = property.media.map((m) => ({
      id: m.id,
      type: m.mediaType,
      ...extractImageUrls(m.imageData),
      isThumbnail: m.isThumbnail,
      order: m.order,
    }));

    // Transform amenities
    const transformedAmenities = property.amenities.map((a) => ({
      id: a.amenity.id,
      name: a.amenity.name,
      category: a.amenity.category,
      icon: a.amenity.icon,
    }));

    // Determine if user can see exact location
    let canSeeExactLocation = false;
    if (property.showExactLocation) {
      canSeeExactLocation = true;
    } else if (userId) {
      const locationRequest = await prisma.locationRequest.findUnique({
        where: {
          propertyId_requesterId: {
            propertyId: property.id,
            requesterId: userId,
          },
        },
      });
      canSeeExactLocation = locationRequest?.status === "APPROVED" &&
        (locationRequest.expiresAt ? new Date(locationRequest.expiresAt) > new Date() : true);
    }

    // Transform response
    const response = {
      id: property.id,
      slug: property.slug,
      title: property.title,
      description: property.description,
      propertyType: property.propertyType,
      transactionType: property.transactionType,
      status: property.status,
      price: {
        amount: property.priceAmount.toString(),
        isNegotiable: property.priceNegotiable,
        minRentDuration: property.minRentDuration,
        rentDeposit: property.rentDeposit?.toString() || null,
        pricePerMeter: property.surfaceArea
          ? Math.round(Number(property.priceAmount) / property.surfaceArea)
          : null,
      },
      priceHistory: property.priceHistory.map((ph) => ({
        oldPrice: ph.oldPrice.toString(),
        newPrice: ph.newPrice.toString(),
        changePercent: parseFloat(ph.changePercent.toString()),
        date: ph.createdAt,
      })),
      characteristics: {
        surfaceArea: property.surfaceArea,
        landArea: property.landArea,
        totalRooms: property.totalRooms,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        kitchens: property.kitchens,
        livingRooms: property.livingRooms,
        floor: property.floor,
        totalFloors: property.totalFloors,
        buildingAge: property.buildingAge,
        constructionYear: property.constructionYear,
        viewType: property.viewType,
      },
      amenities: transformedAmenities,
      customFeatures: property.customFeatures,
      legal: {
        hasLivretFoncier: property.hasLivretFoncier,
        hasActeVente: property.hasActeVente,
        hasPermisConstruction: property.hasPermisConstruction,
        arePapersComplete: property.arePapersComplete,
      },
      proximity: {
        distanceToSchool: property.distanceToSchool,
        distanceToTransport: property.distanceToTransport,
        distanceToShops: property.distanceToShops,
        distanceToMosque: property.distanceToMosque,
        distanceToHospital: property.distanceToHospital,
      },
      location: {
        wilaya: {
          id: property.wilaya.id,
          nameFr: property.wilaya.nameFr,
          nameAr: property.wilaya.nameAr,
        },
        commune: property.commune ? {
          id: property.commune.id,
          nameFr: property.commune.nameFr,
          nameAr: property.commune.nameAr,
        } : null,
        quartier: property.quartier,
        fullAddress: canSeeExactLocation ? property.fullAddress : null,
        postalCode: property.postalCode,
        coordinates: {
          lat: canSeeExactLocation
            ? parseFloat(property.exactLatitude.toString())
            : parseFloat(property.publicLatitude.toString()),
          lng: canSeeExactLocation
            ? parseFloat(property.exactLongitude.toString())
            : parseFloat(property.publicLongitude.toString()),
          isExact: canSeeExactLocation,
        },
        showExactLocation: property.showExactLocation,
        privacyRadiusMeters: property.privacyRadiusMeters,
      },
      media: transformedMedia,
      boost: property.boost && new Date(property.boost.endDate) > new Date() ? {
        tier: property.boost.boostTier,
        isActive: property.boost.status === "ACTIVE",
      } : null,
      owner: {
        id: property.user.id,
        name: getUserDisplayName(property.user),
        isPro: property.user.accountTier !== "FREE",
        isVerified: property.user.emailVerified,
        logo: property.user.companyLogo,
        description: property.user.companyDescription,
        contact: {
          phone: property.user.phone,
        },
        stats: {
          rating: property.user.averageRating ? parseFloat(property.user.averageRating.toString()) : null,
          totalReviews: property.user.totalReviews,
          totalProperties: property.user.totalProperties,
          memberSince: property.user.createdAt,
        },
      },
      reviews: property.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        tags: r.tags,
        author: {
          id: r.reviewer.id,
          name: getUserDisplayName(r.reviewer),
          avatar: r.reviewer.avatar,
        },
        ownerResponse: r.ownerResponse,
        helpfulCount: r.helpfulCount,
        createdAt: r.createdAt,
      })),
      stats: {
        views: property.viewsCount,
        favorites: property.favoritesCount,
        contacts: property.contactsCount,
        shares: property.sharesCount,
      },
      isFavorited,
      canSeeExactLocation,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error getting property:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get property",
    });
  }
};

// =============================================================================
// GET FILTERS CONFIG (Dynamic from DB)
// =============================================================================

export const getFiltersConfig = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all dynamic configs in parallel
    const [
      propertyTypes,
      transactionTypes,
      amenities,
      propertyStatuses,
      buildingAges,
      viewTypes,
      heatingTypes,
      orientations,
      flooringTypes,
      searchFilters,
      wilayas,
    ] = await Promise.all([
      getPropertyTypes(),
      getTransactionTypes(),
      getAmenities(),
      getPropertyStatuses(),
      getBuildingAges(),
      getViewTypes(),
      getHeatingTypes(),
      getOrientations(),
      getFlooringTypes(),
      getSearchFilters(),
      prisma.wilaya.findMany({
        select: {
          id: true,
          code: true,
          nameFr: true,
          nameAr: true,
          _count: { select: { properties: true } },
        },
        orderBy: { code: "asc" },
      }),
    ]);

    res.json({
      success: true,
      data: {
        propertyTypes,
        transactionTypes,
        amenities,
        propertyStatuses,
        buildingAges,
        viewTypes,
        heatingTypes,
        orientations,
        flooringTypes,
        searchFilters,
        wilayas: wilayas.map((w) => ({
          id: w.id,
          code: w.code,
          nameFr: w.nameFr,
          nameAr: w.nameAr,
          propertyCount: w._count.properties,
        })),
        priceRanges: {
          sale: {
            min: 1000000, // 1M DA
            max: 100000000, // 100M DA
            step: 500000,
          },
          rent: {
            min: 10000, // 10K DA
            max: 500000, // 500K DA
            step: 5000,
          },
        },
        surfaceRanges: {
          min: 20,
          max: 1000,
          step: 10,
        },
      },
    });
  } catch (error) {
    console.error("Error getting filters config:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get filters configuration",
    });
  }
};

// =============================================================================
// GET COMMUNES BY WILAYA
// =============================================================================

export const getCommunesByWilaya = async (req: Request, res: Response): Promise<void> => {
  try {
    const { wilayaId } = req.params;

    const communes = await prisma.commune.findMany({
      where: { wilayaId },
      select: {
        id: true,
        nameFr: true,
        nameAr: true,
        _count: { select: { properties: true } },
      },
      orderBy: { nameFr: "asc" },
    });

    res.json({
      success: true,
      data: communes.map((c) => ({
        id: c.id,
        nameFr: c.nameFr,
        nameAr: c.nameAr,
        propertyCount: c._count.properties,
      })),
    });
  } catch (error) {
    console.error("Error getting communes:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get communes",
    });
  }
};

// =============================================================================
// GET SIMILAR PROPERTIES
// =============================================================================

export const getSimilarProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;

    // Get the reference property
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        propertyType: true,
        transactionType: true,
        wilayaId: true,
        communeId: true,
        priceAmount: true,
        surfaceArea: true,
      },
    });

    if (!property) {
      res.status(404).json({
        success: false,
        error: "Property not found",
      });
      return;
    }

    // Calculate price range (±20%)
    const minPrice = BigInt(Math.floor(Number(property.priceAmount) * 0.8));
    const maxPrice = BigInt(Math.ceil(Number(property.priceAmount) * 1.2));

    // Find similar properties
    const similarProperties = await prisma.property.findMany({
      where: {
        id: { not: propertyId },
        status: PropertyStatus.ACTIVE,
        deletedAt: null,
        propertyType: property.propertyType,
        transactionType: property.transactionType,
        OR: [
          { communeId: property.communeId },
          { wilayaId: property.wilayaId },
        ],
        priceAmount: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      include: {
        media: {
          orderBy: { order: "asc" },
          take: 1,
        },
        wilaya: { select: { id: true, nameFr: true, nameAr: true } },
        commune: { select: { id: true, nameFr: true, nameAr: true } },
      },
      orderBy: { viewsCount: "desc" },
      take: limit,
    });

    const transformed = similarProperties.map((prop) => ({
      id: prop.id,
      slug: prop.slug,
      title: prop.title,
      propertyType: prop.propertyType,
      price: {
        amount: prop.priceAmount.toString(),
      },
      surface: prop.surfaceArea,
      rooms: prop.totalRooms,
      location: {
        wilaya: prop.wilaya,
        commune: prop.commune,
      },
      thumbnail: extractThumbnailUrl(prop.media[0]?.imageData),
    }));

    res.json({
      success: true,
      data: transformed,
    });
  } catch (error) {
    console.error("Error getting similar properties:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get similar properties",
    });
  }
};

// =============================================================================
// GET POPULAR PROPERTIES (Homepage)
// =============================================================================

export const getPopularProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 12;
    const transactionType = req.query.transactionType as TransactionType | undefined;

    const where: Record<string, unknown> = {
      status: PropertyStatus.ACTIVE,
      deletedAt: null,
    };

    if (transactionType) {
      where.transactionType = transactionType;
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        media: {
          orderBy: { order: "asc" },
          take: 1,
        },
        wilaya: { select: { id: true, nameFr: true, nameAr: true } },
        commune: { select: { id: true, nameFr: true, nameAr: true } },
        boost: true,
      },
      orderBy: [
        { viewsCount: "desc" },
        { createdAt: "desc" },
      ],
      take: limit,
    });

    const transformed = properties.map((prop) => ({
      id: prop.id,
      slug: prop.slug,
      title: prop.title,
      propertyType: prop.propertyType,
      transactionType: prop.transactionType,
      price: {
        amount: prop.priceAmount.toString(),
      },
      surface: prop.surfaceArea,
      rooms: prop.totalRooms,
      location: {
        wilaya: prop.wilaya,
        commune: prop.commune,
      },
      thumbnail: extractThumbnailUrl(prop.media[0]?.imageData),
      isBoosted: prop.boost !== null && new Date(prop.boost.endDate) > new Date(),
      stats: {
        views: prop.viewsCount,
        favorites: prop.favoritesCount,
      },
    }));

    res.json({
      success: true,
      data: transformed,
    });
  } catch (error) {
    console.error("Error getting popular properties:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get popular properties",
    });
  }
};

// =============================================================================
// GET BOOSTED PROPERTIES (Homepage Carousel)
// =============================================================================

export const getBoostedProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const properties = await prisma.property.findMany({
      where: {
        status: PropertyStatus.ACTIVE,
        deletedAt: null,
        boost: {
          isNot: null,
        },
      },
      include: {
        media: {
          orderBy: { order: "asc" },
          take: 3,
        },
        wilaya: { select: { id: true, nameFr: true, nameAr: true } },
        commune: { select: { id: true, nameFr: true, nameAr: true } },
        boost: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            companyName: true,
            companyLogo: true,
            emailVerified: true,
          },
        },
      },
      orderBy: [
        { boost: { boostTier: "desc" } },
        { boost: { createdAt: "desc" } },
      ],
      take: limit,
    });

    // Filter only active boosts
    const activeBoosted = properties.filter(
      (p) => p.boost && new Date(p.boost.endDate) > new Date() && p.boost.status === "ACTIVE"
    );

    const transformed = activeBoosted.map((prop) => ({
      id: prop.id,
      slug: prop.slug,
      title: prop.title,
      propertyType: prop.propertyType,
      transactionType: prop.transactionType,
      price: {
        amount: prop.priceAmount.toString(),
      },
      surface: prop.surfaceArea,
      rooms: prop.totalRooms,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      location: {
        wilaya: prop.wilaya,
        commune: prop.commune,
        coordinates: {
          lat: parseFloat(prop.publicLatitude.toString()),
          lng: parseFloat(prop.publicLongitude.toString()),
        },
      },
      images: prop.media.map((m) => extractImageUrls(m.imageData)),
      boostTier: prop.boost!.boostTier,
      owner: {
        id: prop.user.id,
        name: getUserDisplayName(prop.user),
        logo: prop.user.companyLogo,
        isVerified: prop.user.emailVerified,
      },
    }));

    res.json({
      success: true,
      data: transformed,
    });
  } catch (error) {
    console.error("Error getting boosted properties:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get boosted properties",
    });
  }
};

// =============================================================================
// GET RECENT PROPERTIES
// =============================================================================

export const getRecentProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 8;
    const wilayaId = req.query.wilayaId as string | undefined;

    const where: Record<string, unknown> = {
      status: PropertyStatus.ACTIVE,
      deletedAt: null,
    };

    if (wilayaId) {
      where.wilayaId = wilayaId;
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        media: {
          orderBy: { order: "asc" },
          take: 1,
        },
        wilaya: { select: { id: true, nameFr: true, nameAr: true } },
        commune: { select: { id: true, nameFr: true, nameAr: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const transformed = properties.map((prop) => ({
      id: prop.id,
      slug: prop.slug,
      title: prop.title,
      propertyType: prop.propertyType,
      transactionType: prop.transactionType,
      price: {
        amount: prop.priceAmount.toString(),
      },
      surface: prop.surfaceArea,
      rooms: prop.totalRooms,
      location: {
        wilaya: prop.wilaya,
        commune: prop.commune,
      },
      thumbnail: extractThumbnailUrl(prop.media[0]?.imageData),
      createdAt: prop.createdAt,
    }));

    res.json({
      success: true,
      data: transformed,
    });
  } catch (error) {
    console.error("Error getting recent properties:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get recent properties",
    });
  }
};
