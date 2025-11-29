import prisma from '../lib/prisma';

// Cache en mémoire (évite requêtes DB répétées)
const configCache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Récupérer la configuration d'un tier par son code
 */
export async function getTierConfig(tierCode: string) {
  const cacheKey = `tier:${tierCode}`;
  
  if (configCache.has(cacheKey)) {
    return configCache.get(cacheKey);
  }
  
  const config = await prisma.accountTierConfig.findUnique({
    where: { code: tierCode, isActive: true }
  });
  
  if (config) {
    configCache.set(cacheKey, config);
    setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  }
  
  return config;
}

/**
 * Récupérer tous les tiers actifs (pour page pricing)
 */
export async function getAllTiers() {
  return await prisma.accountTierConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
}

/**
 * Vérifier si un user peut accéder à une feature
 */
export async function canAccessFeature(userTierCode: string, featureCode: string): Promise<boolean> {
  const tierConfig = await getTierConfig(userTierCode);
  
  if (!tierConfig) return false;
  
  const features = tierConfig.features as string[];
  return features.includes(featureCode);
}

/**
 * Récupérer les limites d'un tier
 */
export async function getTierLimits(tierCode: string) {
  const config = await getTierConfig(tierCode);
  return config?.limits as {
    properties: number;
    images: number;
    videos: number;
    savedSearches: number;
    teamMembers: number;
  } | null;
}

/**
 * Récupérer une config globale par clé
 */
export async function getPlatformConfig(key: string) {
  const cacheKey = `config:${key}`;
  
  if (configCache.has(cacheKey)) {
    return configCache.get(cacheKey);
  }
  
  const config = await prisma.platformConfig.findUnique({
    where: { key }
  });
  
  if (!config) return null;
  
  // Parse selon le type
  let value: any = config.value;
  
  if (config.type === 'number') {
    value = parseInt(config.value);
  } else if (config.type === 'boolean') {
    value = config.value === 'true';
  } else if (config.type === 'json') {
    value = JSON.parse(config.value);
  }
  
  configCache.set(cacheKey, value);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  
  return value;
}

/**
 * Récupérer tous les types de propriété actifs
 */
export async function getPropertyTypes(category?: string) {
  return await prisma.propertyTypeConfig.findMany({
    where: {
      isActive: true,
      ...(category && { category })
    },
    orderBy: { displayOrder: 'asc' }
  });
}

/**
 * Récupérer toutes les amenities actives
 */
export async function getAmenities(category?: string) {
  return await prisma.amenityConfig.findMany({
    where: {
      isActive: true,
      ...(category && { category })
    },
    orderBy: { displayOrder: 'asc' }
  });
}

/**
 * Récupérer les amenities filtrables (pour page search)
 */
export async function getFilterableAmenities() {
  return await prisma.amenityConfig.findMany({
    where: {
      isActive: true,
      isFilterable: true
    },
    orderBy: { filterPriority: 'asc' }
  });
}

/**
 * Récupérer tous les types de transaction actifs
 */
export async function getTransactionTypes() {
  return await prisma.transactionTypeConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
}

/**
 * Invalider le cache (utile après modification admin)
 */
export function invalidateConfigCache() {
  configCache.clear();
}

// ============================================================================
// PHASE 2: ADDITIONAL HELPERS
// ============================================================================

// --- PROPERTY ATTRIBUTES ---

/**
 * Récupérer les configurations d'âge de bâtiment
 */
export async function getBuildingAges() {
  const cacheKey = 'buildingAges';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.buildingAgeConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Récupérer les types de vue
 */
export async function getViewTypes(premiumOnly?: boolean) {
  const cacheKey = `viewTypes:${premiumOnly}`;
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.viewTypeConfig.findMany({
    where: {
      isActive: true,
      ...(premiumOnly !== undefined && { isPremium: premiumOnly })
    },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Récupérer les types de chauffage
 */
export async function getHeatingTypes() {
  const cacheKey = 'heatingTypes';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.heatingTypeConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Récupérer les orientations
 */
export async function getOrientations() {
  const cacheKey = 'orientations';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.orientationConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Récupérer les types de sol
 */
export async function getFlooringTypes() {
  const cacheKey = 'flooringTypes';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.flooringTypeConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

// --- STATUS SYSTEM ---

/**
 * Récupérer les statuts de propriété
 */
export async function getPropertyStatuses() {
  const cacheKey = 'propertyStatuses';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.propertyStatusConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Récupérer un statut spécifique avec ses règles
 */
export async function getPropertyStatusConfig(code: string) {
  const statuses = await getPropertyStatuses();
  return statuses.find((s: any) => s.code === code);
}

/**
 * Récupérer les statuts publics (visibles dans la recherche)
 */
export async function getPublicStatuses() {
  const statuses = await getPropertyStatuses();
  return statuses.filter((s: any) => s.isPublic);
}

// --- BOOST SYSTEM ---

/**
 * Récupérer les tiers de boost
 */
export async function getBoostTiers() {
  const cacheKey = 'boostTiers';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.boostTierConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Calculer le prix d'un boost avec discount selon le tier utilisateur
 */
export async function getBoostPrice(
  boostTierCode: string,
  accountTierCode: string,
  durationDays: number
): Promise<{ price: number; discount: number; finalPrice: number } | null> {
  const pricing = await prisma.boostPricingConfig.findUnique({
    where: {
      boostTierCode_accountTierCode_durationDays: {
        boostTierCode,
        accountTierCode,
        durationDays
      }
    }
  });
  
  if (!pricing) return null;
  
  const basePrice = Number(pricing.price);
  const discount = pricing.discountPercent || 0;
  
  // Vérifier si promo active
  let finalPrice = basePrice;
  if (pricing.isPromoActive && pricing.promoPrice) {
    const now = new Date();
    if (
      (!pricing.promoStartDate || now >= pricing.promoStartDate) &&
      (!pricing.promoEndDate || now <= pricing.promoEndDate)
    ) {
      finalPrice = Number(pricing.promoPrice);
      return { price: basePrice, discount: 0, finalPrice };
    }
  }
  
  // Appliquer discount tier
  finalPrice = Math.round(basePrice * (1 - discount / 100));
  
  return { price: basePrice, discount, finalPrice };
}

/**
 * Récupérer tous les prix de boost pour un tier utilisateur
 */
export async function getAllBoostPricesForTier(accountTierCode: string) {
  return await prisma.boostPricingConfig.findMany({
    where: {
      accountTierCode,
      isActive: true
    },
    orderBy: [
      { boostTierCode: 'asc' },
      { durationDays: 'asc' }
    ]
  });
}

// --- SEARCH FILTERS ---

/**
 * Récupérer les filtres de recherche actifs
 */
export async function getSearchFilters(options?: {
  category?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  includePremium?: boolean;
}) {
  const cacheKey = `searchFilters:${JSON.stringify(options || {})}`;
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const where: any = { isActive: true };
  
  if (options?.category) where.category = options.category;
  if (options?.mobileOnly) where.showOnMobile = true;
  if (options?.desktopOnly) where.showOnDesktop = true;
  if (!options?.includePremium) where.isPremiumOnly = false;
  
  const data = await prisma.searchFilterConfig.findMany({
    where,
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

// --- ROLES & PERMISSIONS ---

/**
 * Récupérer tous les rôles
 */
export async function getRoles() {
  const cacheKey = 'roles';
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const data = await prisma.roleConfig.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' }
  });
  
  configCache.set(cacheKey, data);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return data;
}

/**
 * Récupérer un rôle par code
 */
export async function getRoleConfig(code: string) {
  const roles = await getRoles();
  return roles.find((r: any) => r.code === code);
}

/**
 * Vérifier si un rôle a une permission
 */
export async function hasPermission(roleCode: string, permission: string): Promise<boolean> {
  const role = await getRoleConfig(roleCode);
  if (!role) return false;
  
  const permissions = role.permissions as Record<string, boolean>;
  return permissions[permission] === true;
}

// --- EMAIL TEMPLATES ---

/**
 * Récupérer un template email par code
 */
export async function getEmailTemplate(code: string, lang: 'fr' | 'ar' = 'fr') {
  const cacheKey = `emailTemplate:${code}`;
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const template = await prisma.emailTemplateConfig.findUnique({
    where: { code, isActive: true }
  });
  
  if (!template) return null;
  
  const result = {
    code: template.code,
    subject: lang === 'fr' ? template.subjectFr : template.subjectAr,
    body: lang === 'fr' ? template.bodyFr : template.bodyAr,
    variables: template.variables as Record<string, string>
  };
  
  configCache.set(cacheKey, result);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return result;
}

/**
 * Rendre un template avec des variables
 */
export async function renderEmailTemplate(
  code: string,
  variables: Record<string, any>,
  lang: 'fr' | 'ar' = 'fr'
): Promise<{ subject: string; body: string } | null> {
  const template = await getEmailTemplate(code, lang);
  if (!template) return null;
  
  let subject = template.subject;
  let body = template.body;
  
  // Remplacer les variables
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, String(value));
    body = body.replace(regex, String(value));
  });
  
  return { subject, body };
}

// --- UI CONFIGS ---

/**
 * Récupérer une config UI
 */
export async function getUIConfig(key: string, lang: 'fr' | 'ar' = 'fr') {
  const cacheKey = `ui:${key}:${lang}`;
  if (configCache.has(cacheKey)) return configCache.get(cacheKey);
  
  const config = await prisma.uIConfig.findUnique({
    where: { key, isActive: true }
  });
  
  if (!config) return null;
  
  const value = lang === 'fr' ? config.valueFr : config.valueAr;
  
  configCache.set(cacheKey, value);
  setTimeout(() => configCache.delete(cacheKey), CACHE_TTL);
  return value;
}

/**
 * Récupérer toutes les configs UI d'une catégorie
 */
export async function getUIConfigsByCategory(category: string, lang: 'fr' | 'ar' = 'fr') {
  const configs = await prisma.uIConfig.findMany({
    where: { category, isActive: true }
  });
  
  const result: Record<string, string | null> = {};
  configs.forEach(config => {
    result[config.key] = lang === 'fr' ? config.valueFr : config.valueAr;
  });
  
  return result;
}

/**
 * Récupérer toutes les configs pour le frontend (initial load)
 */
export async function getAllUIConfigs(lang: 'fr' | 'ar' = 'fr') {
  const configs = await prisma.uIConfig.findMany({
    where: { isActive: true }
  });
  
  const result: Record<string, string | null> = {};
  configs.forEach(config => {
    result[config.key] = lang === 'fr' ? config.valueFr : config.valueAr;
  });
  
  return result;
}

/**
 * Exemple d'utilisation Phase 2 :
 * 
 * // Récupérer les attributs pour formulaire création annonce
 * const buildingAges = await getBuildingAges();
 * const viewTypes = await getViewTypes();
 * const heatingTypes = await getHeatingTypes();
 * const orientations = await getOrientations();
 * const flooringTypes = await getFlooringTypes();
 * 
 * // Vérifier règles de statut
 * const statusConfig = await getPropertyStatusConfig('ACTIVE');
 * if (statusConfig.autoExpireDays) {
 *   property.expiresAt = addDays(new Date(), statusConfig.autoExpireDays);
 * }
 * 
 * // Calculer prix boost
 * const boostPrice = await getBoostPrice('TIER_2', 'PRO', 7);
 * console.log(`Prix: ${boostPrice.finalPrice} DA (-${boostPrice.discount}%)`);
 * 
 * // Vérifier permission
 * const canModerate = await hasPermission('MODERATOR', 'canModerateProperties');
 * 
 * // Envoyer email
 * const email = await renderEmailTemplate('PROPERTY_APPROVED', {
 *   userName: 'Ahmed',
 *   propertyTitle: 'F3 Hydra',
 *   ctaLink: 'https://rentalg.dz/boost/123'
 * }, 'fr');
 * await sendEmail(user.email, email.subject, email.body);
 * 
 * // Récupérer textes UI
 * const heroTitle = await getUIConfig('homepage_hero_title', 'fr');
 * const ctaTexts = await getUIConfigsByCategory('CTA', 'ar');
 */
