export interface PropertyFrontend {
  id: string;
  slug: string;
  title: string;
  propertyType: string;
  transactionType: string;
  price: {
    amount: string;
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
  thumbnail: string | null;
  isBoosted: boolean;
  boostTier: string | null;
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

export interface SearchFilters {
  transactionType: string;
  wilayaId: string;
  communeId: string;
  propertyTypes: string[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minSurface: number | undefined;
  maxSurface: number | undefined;
  minRooms: number | undefined;
  sortBy: string;
}
