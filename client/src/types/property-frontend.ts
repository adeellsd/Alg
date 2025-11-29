export interface PropertyFrontend {
  id: string;
  slug: string;
  title: string;
  propertyType: string;
  transactionType: string;
  price: number | {
    amount: number | string;
    isNegotiable: boolean;
  };
  surface: number | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  location: {
    wilaya: { id: string; nameFr: string; nameAr: string };
    commune: { id: string; nameFr: string; nameAr: string } | null;
    quartier: string | null;
    coordinates: { lat: number; lng: number };
  };
  images: string[] | null;
  thumbnail: string | null;
  isBoosted: boolean;
  boostTier: string | null;
  isNegotiable?: boolean;
  hasLivretFoncier?: boolean;
  pricePerSqm?: number;
  owner: {
    id: string;
    name: string;
    isVerified: boolean;
    isPro: boolean;
    logo: string | null;
  };
  stats: {
    views: number;
    favorites: number;
  };
  createdAt: string;
}

export interface FiltersConfig {
  propertyTypes: Array<{ code: string; nameFr: string; nameAr: string; icon: string }>;
  transactionTypes: Array<{ code: string; nameFr: string }>;
  wilayas: Array<{ id: string; code: number; nameFr: string; nameAr: string; propertyCount: number }>;
  amenities: Array<{ id: string; name: string; category: string; icon: string }>;
  priceRanges: {
    sale: { min: number; max: number; step: number };
    rent: { min: number; max: number; step: number };
  };
  surfaceRanges: { min: number; max: number; step: number };
}

/**
 * SearchFilters - Interface exhaustive pour le filtrage de propriétés
 * Couvre TOUS les cas d'usage immobiliers algériens
 */
export interface SearchFilters {
  // ===== CORE =====
  transactionType: string; // "SALE" | "RENT_MONTHLY" | "RENT_DAILY" | "RENT_YEARLY" | ""
  transactionGroup?: "SALE" | "RENT"; // Groupe logique pour UI
  propertyTypes: string[]; // Codes Prisma: ["APARTMENT_F3", "VILLA", ...]
  wilayaId: string;
  communeId: string;
  sortBy: string;

  // ===== BUDGET =====
  minPrice?: number;
  maxPrice?: number;

  // ===== DIMENSIONS =====
  minSurface?: number;
  maxSurface?: number;
  minLandArea?: number; // Surface terrain (maisons/terrains)
  maxLandArea?: number;

  // ===== PIÈCES (Résidentiel) =====
  minRooms?: number; // Nombre total de pièces
  minBedrooms?: number; // Chambres
  bedrooms?: number; // Alias pour compatibilité
  minBathrooms?: number;
  bathrooms?: number; // Alias pour compatibilité
  minKitchens?: number;
  minLivingRooms?: number;

  // ===== ÉTAGES (Appartements) =====
  minFloor?: number;
  maxFloor?: number;
  excludeGroundFloor?: boolean; // Exclure RDC
  excludeTopFloor?: boolean; // Exclure dernier étage
  hasElevator?: boolean;

  // ===== CONSTRUCTION =====
  maxBuildingAge?: number; // Âge max en années
  minConstructionYear?: number;
  maxConstructionYear?: number;

  // ===== VUE =====
  viewTypes?: string[]; // ["SEA", "MOUNTAIN", "CITY", ...]

  // ===== PROXIMITÉS (en mètres) =====
  maxDistanceToSchool?: number;
  maxDistanceToTransport?: number;
  maxDistanceToShops?: number;
  maxDistanceToMosque?: number;
  maxDistanceToHospital?: number;

  // ===== DOCUMENTS LÉGAUX =====
  hasLivretFoncier?: boolean;
  hasActeVente?: boolean;
  hasPermisConstruction?: boolean;
  arePapersComplete?: boolean;

  // ===== AMENITIES =====
  amenities?: string[]; // Codes amenities contextuelles

  // ===== LOCATION SPÉCIFIQUE =====
  minRentDuration?: number; // Durée minimum location (mois)
  maxRentDeposit?: number; // Caution maximale
  minRentDeposit?: number; // Alias pour compatibilité

  // ===== ACHAT SPÉCIFIQUE =====
  isNegotiable?: boolean; // Prix négociable

  // ===== BOOST =====
  isBoosted?: boolean; // Uniquement annonces boostées
  boostTiers?: string[]; // ["TIER_1_EN_AVANT", "TIER_2_PREMIUM", ...]

  // ===== PAGINATION =====
  page?: number;
  limit?: number;
}

/**
 * FilterContext - Définit quel ensemble de filtres est disponible
 * pour un type de bien donné (Appartement, Maison, Terrain, etc.)
 */
export interface FilterContext {
  category: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND' | 'GARAGE';
  availableFilters: string[];
  requiredFilters: string[];
  label: string;
}
