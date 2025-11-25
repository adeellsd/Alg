import { Router } from "express";
import {
  searchProperties,
  getProperty,
  getFiltersConfig,
  getCommunesByWilaya,
  getSimilarProperties,
  getPopularProperties,
  getBoostedProperties,
  getRecentProperties,
} from "../controllers/propertyController";
import { optionalAuthMiddleware } from "../middleware/authMiddleware";

const router = Router();

// =============================================================================
// PUBLIC ROUTES (No auth required)
// =============================================================================

/**
 * GET /api/properties
 * Search and filter properties with pagination
 * Query params: wilayaId, communeId, propertyTypes, transactionType, minPrice, maxPrice, etc.
 */
router.get("/", searchProperties);

/**
 * GET /api/properties/filters
 * Get all available filter options (dynamic from database)
 * Returns: propertyTypes, transactionTypes, amenities, wilayas, etc.
 */
router.get("/filters", getFiltersConfig);

/**
 * GET /api/properties/popular
 * Get popular properties for homepage
 * Query params: limit, transactionType
 */
router.get("/popular", getPopularProperties);

/**
 * GET /api/properties/boosted
 * Get boosted properties for homepage carousel
 * Query params: limit
 */
router.get("/boosted", getBoostedProperties);

/**
 * GET /api/properties/recent
 * Get recently added properties
 * Query params: limit, wilayaId
 */
router.get("/recent", getRecentProperties);

/**
 * GET /api/properties/communes/:wilayaId
 * Get communes for a specific wilaya
 */
router.get("/communes/:wilayaId", getCommunesByWilaya);

/**
 * GET /api/properties/similar/:propertyId
 * Get similar properties based on type, location, and price
 * Query params: limit
 */
router.get("/similar/:propertyId", getSimilarProperties);

// =============================================================================
// OPTIONAL AUTH ROUTES (Auth optional but affects response)
// =============================================================================

/**
 * GET /api/properties/:slugOrId
 * Get single property details
 * If authenticated: includes isFavorited status and may show exact location
 */
router.get("/:slugOrId", optionalAuthMiddleware, getProperty);

export default router;
