import {
  Wifi,
  Waves,
  Dumbbell,
  Car,
  PawPrint,
  Tv,
  Thermometer,
  Cigarette,
  Cable,
  Maximize,
  Bath,
  Phone,
  Sprout,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
  Home,
  Warehouse,
  Building,
  Castle,
  Trees,
  LucideIcon,
} from "lucide-react";

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Pool = "Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};

// Add this constant at the end of the file
export const NAVBAR_HEIGHT = 90; // in pixels

// Site configuration
export const SITE_CONFIG = {
  name: "RentAlg",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rentalg.dz",
  description: "Trouvez votre bien idéal en Algérie. Des milliers d'annonces vérifiées pour acheter, louer ou investir.",
  locale: "fr_DZ",
};

// Test users for development
export const testUsers = {
  tenant: {
    username: "Carol White",
    userId: "us-east-2:76543210-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "carol.white@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  tenantRole: "tenant",
  manager: {
    username: "John Smith",
    userId: "us-east-2:12345678-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "john.smith@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  managerRole: "manager",
};

// Property type groups for filtering
export const PROPERTY_TYPE_GROUPS: Record<string, { label: string; codes: string[] }> = {
  APARTMENT: {
    label: "Type d'appartement",
    codes: ["APARTMENT_F1", "APARTMENT_F2", "APARTMENT_F3", "APARTMENT_F4", "APARTMENT_F5", "APARTMENT_F6_PLUS", "STUDIO", "DUPLEX", "LOFT"]
  },
  HOUSE: {
    label: "Type de maison",
    codes: ["VILLA", "TRADITIONAL_HOUSE", "MODERN_VILLA", "RIYADH"]
  },
  COMMERCIAL: {
    label: "Type de local",
    codes: ["LOCAL_COMMERCIAL", "BUREAU", "ENTREPOT"]
  },
  LAND: {
    label: "Type de terrain",
    codes: ["TERRAIN_AGRICOLE", "TERRAIN_RESIDENTIAL"]
  }
};

// Property subtype labels (French)
export const PROPERTY_SUBTYPE_LABELS: Record<string, string> = {
  // Apartments
  APARTMENT_F1: "F1",
  APARTMENT_F2: "F2",
  APARTMENT_F3: "F3",
  APARTMENT_F4: "F4",
  APARTMENT_F5: "F5",
  APARTMENT_F6_PLUS: "F6+",
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  LOFT: "Loft",
  
  // Houses
  VILLA: "Villa",
  TRADITIONAL_HOUSE: "Maison traditionnelle",
  MODERN_VILLA: "Villa moderne",
  RIYADH: "Riyadh",
  
  // Commercial
  LOCAL_COMMERCIAL: "Local commercial",
  BUREAU: "Bureau",
  ENTREPOT: "Entrepôt",
  
  // Land
  TERRAIN_AGRICOLE: "Terrain agricole",
  TERRAIN_RESIDENTIAL: "Terrain résidentiel"
};
