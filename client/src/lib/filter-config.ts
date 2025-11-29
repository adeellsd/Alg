/**
 * filter-config.ts - RentAlg Design System v6.0 "Alger Authentique"
 * Configuration intelligente des contextes de filtrage par type de bien
 * 
 * Ce fichier définit:
 * - FILTER_CONTEXTS: Quels filtres afficher pour chaque catégorie de bien
 * - CONTEXTUAL_AMENITIES: Amenities pertinentes par contexte
 * - PROPERTY_TYPE_MAPPING: Mapping des codes Prisma vers les contextes
 */

export interface FilterContext {
  category: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND' | 'GARAGE';
  availableFilters: string[];
  requiredFilters: string[];
  label: string;
}

/**
 * Contextes de filtrage - Définit quels filtres sont pertinents pour chaque type de bien
 * 
 * Filtres disponibles:
 * - wilaya, commune: Localisation
 * - price, surface, landArea: Dimensions
 * - rooms, bedrooms, bathrooms, kitchens, livingRooms: Pièces
 * - floor, elevator: Étages (appartements)
 * - view: Type de vue
 * - amenities: Commodités
 * - buildingAge, constructionYear: Construction
 * - proximities: Proximités (école, transport, etc.)
 * - legalDocs: Documents légaux
 */
export const FILTER_CONTEXTS: Record<string, FilterContext> = {
  APARTMENT: {
    category: 'RESIDENTIAL',
    label: 'Appartement',
    availableFilters: [
      'wilaya',
      'commune',
      'price',
      'surface',
      'rooms',
      'bedrooms',
      'bathrooms',
      'kitchens',
      'livingRooms',
      'floor',
      'elevator',
      'view',
      'amenities',
      'buildingAge',
      'constructionYear',
      'proximities',
      'legalDocs',
    ],
    requiredFilters: ['price', 'wilaya'],
  },

  VILLA: {
    category: 'RESIDENTIAL',
    label: 'Maison/Villa',
    availableFilters: [
      'wilaya',
      'commune',
      'price',
      'surface',
      'landArea', // ← IMPORTANT: Surface terrain
      'rooms',
      'bedrooms',
      'bathrooms',
      'kitchens',
      'livingRooms',
      'view',
      'amenities',
      'buildingAge',
      'constructionYear',
      'proximities',
      'legalDocs',
    ],
    requiredFilters: ['price', 'wilaya'],
  },

  TERRAIN: {
    category: 'LAND',
    label: 'Terrain',
    availableFilters: [
      'wilaya',
      'commune',
      'price',
      'landArea', // ← OBLIGATOIRE pour terrain
      'amenities', // Viabilisé (eau, électricité, gaz)
      'legalDocs', // TRÈS IMPORTANT pour terrain
      'proximities',
    ],
    requiredFilters: ['price', 'wilaya', 'landArea'],
  },

  LOCAL_COMMERCIAL: {
    category: 'COMMERCIAL',
    label: 'Local Commercial',
    availableFilters: [
      'wilaya',
      'commune',
      'price',
      'surface',
      'amenities', // Vitrine, parking client, sanitaires
      'legalDocs',
      'proximities', // Transport crucial pour commerce
    ],
    requiredFilters: ['price', 'wilaya', 'surface'],
  },

  GARAGE_BOX: {
    category: 'GARAGE',
    label: 'Garage/Box',
    availableFilters: [
      'wilaya',
      'commune',
      'price',
      'surface',
      'amenities', // Sécurisé, électricité
    ],
    requiredFilters: ['price', 'wilaya'],
  },
};

/**
 * Amenities contextuelles - Les commodités pertinentes pour chaque type de bien
 * 
 * Ces listes doivent correspondre aux codes dans la table Amenity de Prisma
 */
export const CONTEXTUAL_AMENITIES: Record<string, string[]> = {
  APARTMENT: [
    'ASCENSEUR',
    'BALCON',
    'TERRASSE',
    'PARKING',
    'CAVE',
    'CLIMATISATION',
    'CHAUFFAGE_CENTRAL',
    'DOUBLE_VITRAGE',
    'INTERPHONE',
    'GARDIEN',
    'PORTE_BLINDEE',
    'FIBRE_OPTIQUE',
    'MEUBLE',
    'CUISINE_EQUIPEE',
  ],

  VILLA: [
    'JARDIN',
    'PISCINE',
    'GARAGE',
    'PARKING',
    'CLIMATISATION',
    'CHAUFFAGE_CENTRAL',
    'PORTAIL_ELECTRIQUE',
    'SYSTEME_SECURITE',
    'PUITS',
    'STUDIO_INDEPENDANT',
    'PANNEAU_SOLAIRE',
    'BARBECUE',
    'TERRASSE',
    'DOUBLE_VITRAGE',
  ],

  TERRAIN: [
    'EAU',
    'ELECTRICITE',
    'GAZ',
    'ASSAINISSEMENT',
    'CLOTURE',
    'ACCES_GOUDRONEE',
    'VIABILISE', // Tous les réseaux
  ],

  LOCAL_COMMERCIAL: [
    'VITRINE',
    'PARKING_CLIENT',
    'CLIMATISATION',
    'SANITAIRES',
    'QUAI_CHARGEMENT',
    'BUREAUX_ANNEXES',
    'ALARME',
    'VIDEO_SURVEILLANCE',
    'ACCES_PMR',
  ],

  GARAGE_BOX: [
    'SECURISE',
    'ELECTRICITE',
    'ACCES_AUTOMATIQUE',
    'VIDEO_SURVEILLANCE',
    'EAU',
  ],
};

/**
 * Mapping des PropertyType (Prisma) vers les contextes de filtrage
 * 
 * Permet de déterminer automatiquement quel contexte activer
 * en fonction du type de bien sélectionné
 */
export const PROPERTY_TYPE_TO_CONTEXT: Record<string, string> = {
  // Appartements
  APARTMENT_F1: 'APARTMENT',
  APARTMENT_F2: 'APARTMENT',
  APARTMENT_F3: 'APARTMENT',
  APARTMENT_F4: 'APARTMENT',
  APARTMENT_F5: 'APARTMENT',
  APARTMENT_F6_PLUS: 'APARTMENT',
  STUDIO: 'APARTMENT',
  DUPLEX: 'APARTMENT',
  LOFT: 'APARTMENT',

  // Maisons/Villas
  VILLA: 'VILLA',
  TRADITIONAL_HOUSE: 'VILLA',
  MODERN_VILLA: 'VILLA',
  RIYADH: 'VILLA',

  // Terrains
  TERRAIN_AGRICOLE: 'TERRAIN',
  TERRAIN_RESIDENTIAL: 'TERRAIN',

  // Commerces
  LOCAL_COMMERCIAL: 'LOCAL_COMMERCIAL',
  BUREAU: 'LOCAL_COMMERCIAL',
  ENTREPOT: 'LOCAL_COMMERCIAL',

  // Garages
  GARAGE_BOX: 'GARAGE_BOX',
};

/**
 * ViewType - Types de vue disponibles
 */
export const VIEW_TYPES = [
  { code: 'SEA', labelFr: 'Vue mer', icon: '🌊' },
  { code: 'MOUNTAIN', labelFr: 'Vue montagne', icon: '⛰️' },
  { code: 'CITY', labelFr: 'Vue ville', icon: '🏙️' },
  { code: 'GARDEN', labelFr: 'Vue jardin', icon: '🌳' },
  { code: 'STREET', labelFr: 'Vue rue', icon: '🛣️' },
  { code: 'COURTYARD', labelFr: 'Vue cour', icon: '🏡' },
  { code: 'NONE', labelFr: 'Aucune vue', icon: '🚫' },
] as const;

/**
 * Proximités - Distance maximale en mètres
 */
export const PROXIMITY_FILTERS = [
  { code: 'school', labelFr: 'École/Université', icon: '🎓', distances: [500, 1000, 2000] },
  { code: 'transport', labelFr: 'Transport public', icon: '🚌', distances: [300, 500, 1000] },
  { code: 'shops', labelFr: 'Commerces', icon: '🛒', distances: [500, 1000, 2000] },
  { code: 'mosque', labelFr: 'Mosquée', icon: '🕌', distances: [500, 1000, 2000] },
  { code: 'hospital', labelFr: 'Hôpital/Clinique', icon: '🏥', distances: [1000, 2000, 5000] },
] as const;

/**
 * Helper: Déterminer le contexte actif à partir des types de biens sélectionnés
 */
export function getActiveContext(selectedTypes: string[]): FilterContext | null {
  if (!selectedTypes.length) return null;

  // Prendre le premier type sélectionné pour déterminer le contexte
  const firstType = selectedTypes[0];
  const contextKey = PROPERTY_TYPE_TO_CONTEXT[firstType];

  if (!contextKey) {
    console.warn(`[filter-config] Type de bien inconnu: ${firstType}`);
    return null;
  }

  return FILTER_CONTEXTS[contextKey] || null;
}

/**
 * Helper: Vérifier si un filtre doit être affiché dans le contexte actuel
 */
export function shouldShowFilter(
  filterName: string,
  activeContext: FilterContext | null
): boolean {
  if (!activeContext) return false;
  return activeContext.availableFilters.includes(filterName);
}

/**
 * Helper: Obtenir les amenities contextuelles pour le contexte actif
 */
export function getContextualAmenities(activeContext: FilterContext | null): string[] {
  if (!activeContext) return [];

  const category = activeContext.category;
  const contextKey = Object.keys(FILTER_CONTEXTS).find(
    (key) => FILTER_CONTEXTS[key].category === category
  );

  if (!contextKey) return [];

  return CONTEXTUAL_AMENITIES[contextKey] || [];
}
