# 🏠 RENTALG v2.0 - Marketplace Immobilier Algérien

> Plateforme moderne de publication et recherche d'annonces immobilières en Algérie
> 
> **Nouvelle stratégie de monétisation adaptée au marché algérien** 🇩🇿

---

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Nouvelle Stratégie de Comptes](#nouvelle-stratégie-de-comptes)
- [Matrice des Fonctionnalités](#matrice-des-fonctionnalités)
- [Pricing & Monétisation](#pricing--monétisation)
- [Architecture Dashboard](#architecture-dashboard)
- [Stack Technique](#stack-technique)
- [Installation & Setup](#installation--setup)
- [Migration v6 → v7](#migration-v6--v7)
- [Roadmap](#roadmap)

---

## 🎯 Vue d'ensemble

**RentAlg v2.0** introduit une nouvelle stratégie de monétisation à 3 tiers, optimisée pour le marché algérien, permettant une meilleure conversion et une expérience utilisateur adaptée à chaque type d'utilisateur.

### **Changements majeurs v2.0**

- ✅ **3 tiers de comptes** : FREE, STARTER, ELITE (au lieu de Particulier/Professionnel)
- ✅ **Dashboard unique adaptatif** : Une seule interface qui s'adapte au type de compte
- ✅ **Pricing optimisé** : 2500 DA/mois (STARTER), 5000 DA/mois (ELITE)
- ✅ **Limites claires** : 3 annonces (FREE), 25 (STARTER), ∞ (ELITE)
- ✅ **Boosts différenciés** : Prix réduits pour abonnés
- ✅ **Features exclusives** : Analytics, templates, multi-users selon tier
- ✅ **Conversion optimisée** : Trial gratuit, upgrade banners, gamification

---

## 🎖️ Nouvelle Stratégie de Comptes

### **🆓 FREE (Gratuit à vie)**

**Cible** : Particuliers qui louent/vendent 1-3 biens personnels

```yaml
Type d'utilisateur: Particulier occasionnel
Prix: GRATUIT (à vie)
Positionnement: "Publiez gratuitement votre bien"

LIMITES:
  Annonces actives: 3 maximum
  Images par annonce: 8
  Vidéos par annonce: 0
  Recherches sauvegardées: 3 maximum

BOOSTS DISPONIBLES:
  ✅ TIER 1 - EN AVANT: 500 DA/semaine
  ❌ TIER 2 - PREMIUM: Réservé PRO
  ❌ TIER 3 - ULTRA: Réservé ELITE

STATISTIQUES:
  ✅ Total vues par annonce
  ✅ Nombre de contacts reçus
  ❌ Graphiques (bloqué)
  ❌ Taux de conversion (bloqué)
  ❌ Analytics avancés (bloqué)

MESSAGERIE:
  ✅ Conversations illimitées
  ⏱️ Notifications email (délai 24h)
  ❌ Templates de réponses (bloqué)
  ❌ Notifications SMS (bloqué)

PUBLICATION:
  ⏱️ Modération manuelle (24-48h)
  ❌ Fast-track (bloqué)
  ❌ Auto-approve (bloqué)

VISIBILITÉ:
  ❌ Pas de badge sur annonces
  ❌ Pas de logo entreprise
  ❌ Pas de page agence

NOTIFICATIONS ALERTES:
  ✅ Emails recherches sauvegardées: 1 par semaine
  ❌ Temps réel (bloqué)

BONUS:
  🎁 1 boost TIER 1 gratuit (3 jours) au premier bien publié
```

---

### **💼 STARTER (2500 DA/mois ≈ 15€)**

**Cible** : Petites agences, agents indépendants, promoteurs débutants

```yaml
Type d'utilisateur: Professionnel débutant
Prix: 2500 DA/mois ou 25,000 DA/an (2 mois offerts)
Positionnement: "Développez votre activité immobilière"

LIMITES:
  Annonces actives: 25
  Images par annonce: 15
  Vidéos par annonce: 1 (max 30 sec)
  Recherches sauvegardées: Illimitées

BOOSTS DISPONIBLES (avec discount):
  ✅ TIER 1 - EN AVANT: 400 DA/semaine (-20%)
  ✅ TIER 2 - PREMIUM: 800 DA/semaine (-20%)
  ❌ TIER 3 - ULTRA: Réservé ELITE

STATISTIQUES:
  ✅ Graphiques vues (7 derniers jours)
  ✅ Taux de contact (%)
  ✅ Top 3 meilleures annonces
  ✅ Comparaison semaine précédente
  ❌ Analytics détaillés (bloqué)
  ❌ Heatmap horaire (bloqué)
  ❌ Source trafic (bloqué)

MESSAGERIE:
  ✅ Notifications instantanées (email)
  ✅ 3 templates de réponses
  ✅ Étiquettes conversations (Chaud/Tiède/Froid)
  ✅ SMS optionnel (payant)

PUBLICATION:
  ✅ Fast-track après 5 annonces validées
  ⏱️ Review prioritaire (6h au lieu de 24-48h)

VISIBILITÉ:
  ✅ Badge "PRO" bleu sur toutes les annonces
  ✅ Logo entreprise (200x200px)
  ✅ Description entreprise (500 caractères)
  ✅ Page agence personnalisée
  ✅ Téléphone + WhatsApp visibles

BONUS:
  ✅ Export leads (CSV mensuel)
  ✅ Priorité dans recherches locales
  ✅ Support email prioritaire (24h)
```

---

### **🏆 ELITE (5000 DA/mois ≈ 30€)**

**Cible** : Grandes agences, promoteurs immobiliers, investisseurs professionnels

```yaml
Type d'utilisateur: Professionnel premium
Prix: 5000 DA/mois ou 50,000 DA/an (2 mois offerts)
Positionnement: "La solution complète pour professionnels"

LIMITES:
  Annonces actives: ILLIMITÉES
  Images par annonce: ILLIMITÉES
  Vidéos par annonce: 3 (max 2 min chacune)
  Visite virtuelle 360°: ✅ (iframe)

BOOSTS DISPONIBLES (discount maximum):
  ✅ TIER 1 - EN AVANT: 300 DA/semaine (-40%)
  ✅ TIER 2 - PREMIUM: 700 DA/semaine (-30%)
  ✅ TIER 3 - ULTRA: 1500 DA/semaine (-25%)
  🎁 1 boost TIER 2 GRATUIT par mois

STATISTIQUES AVANCÉES:
  ✅ Graphiques détaillés (30 jours)
  ✅ Heatmap vues par jour/heure
  ✅ Source du trafic (Search/Direct/Social)
  ✅ Taux de conversion détaillé
  ✅ Temps moyen sur annonce
  ✅ Export analytics (PDF/Excel)
  ✅ Comparaison avec concurrents (anonymisé)

MESSAGERIE PRO:
  ✅ Notifications SMS instantanées
  ✅ Templates illimités
  ✅ Réponses automatiques (absence/horaires)
  ✅ Multi-utilisateurs (3 comptes équipe)
  ✅ Assignation de conversations
  ✅ CRM basique intégré

PUBLICATION:
  ✅ AUTO-APPROVE (publication immédiate)
  ✅ Modification sans re-validation
  ✅ Brouillons illimités

VISIBILITÉ MAXIMALE:
  ✅ Badge "ELITE" doré sur toutes les annonces
  ✅ Logo HD + bannière de profil
  ✅ Description entreprise illimitée
  ✅ Section "À propos" avec photos équipe
  ✅ Réseaux sociaux liés
  ✅ Homepage: Section "Agences Elite" dédiée
  ✅ Priorité absolue dans résultats de recherche

BONUS EXCLUSIFS:
  ✅ API access (webhook pour CRM externe)
  ✅ Account manager dédié
  ✅ Support prioritaire (réponse en 1h)
  ✅ Formation personnalisée
  ✅ Accès bêta aux nouvelles features
  ✅ Rapports mensuels personnalisés
```

---

## 📊 Matrice des Fonctionnalités

| Fonctionnalité | FREE | STARTER | ELITE |
|----------------|------|---------|-------|
| **ANNONCES** |
| Annonces actives | 3 | 25 | ∞ |
| Images par annonce | 8 | 15 | ∞ |
| Vidéos par annonce | 0 | 1 (30s) | 3 (2min) |
| Visite virtuelle 360° | ❌ | ❌ | ✅ |
| Modification post-validation | ❌ | ⏱️ 6h | ✅ Immédiat |
| Brouillons | 1 | 5 | ∞ |
| **BOOSTS** |
| TIER 1 - EN AVANT | 500 DA/sem | 400 DA/sem | 300 DA/sem |
| TIER 2 - PREMIUM | ❌ | 800 DA/sem | 700 DA/sem |
| TIER 3 - ULTRA | ❌ | ❌ | 1500 DA/sem |
| Boost gratuit | 1x (3j) | ❌ | 1x TIER 2/mois |
| **STATISTIQUES** |
| Total vues | ✅ | ✅ | ✅ |
| Contacts reçus | ✅ | ✅ | ✅ |
| Graphiques | ❌ | 7 jours | 30 jours |
| Taux de conversion | ❌ | ✅ Basique | ✅ Détaillé |
| Heatmap horaire | ❌ | ❌ | ✅ |
| Source trafic | ❌ | ❌ | ✅ |
| Export données | ❌ | CSV mensuel | PDF/Excel |
| Benchmarking | ❌ | ❌ | ✅ |
| **MESSAGERIE** |
| Conversations | ✅ | ✅ | ✅ |
| Email notifications | ⏱️ 24h | ✅ Instant | ✅ Instant |
| SMS notifications | ❌ | Payant | ✅ Inclus |
| Templates | 0 | 3 | ∞ |
| Auto-réponses | ❌ | ❌ | ✅ |
| Multi-users | ❌ | ❌ | 3 comptes |
| **RECHERCHE** |
| Recherches sauvegardées | 3 | ∞ | ∞ |
| Alertes email | 1/semaine | Temps réel | Temps réel |
| Favoris | ∞ | ∞ | ∞ (pas utile) |
| **VISIBILITÉ** |
| Badge | ❌ | PRO (bleu) | ELITE (doré) |
| Logo | ❌ | 200x200 | HD + Bannière |
| Page agence | ❌ | ✅ Basique | ✅ Premium |
| Homepage featured | ❌ | ❌ | ✅ |
| **SUPPORT** |
| Email support | 72h | 24h | 1h |
| Account manager | ❌ | ❌ | ✅ |
| Formation | ❌ | Docs | Personnalisée |
| **PRIX** |
| Mensuel | Gratuit | 2500 DA | 5000 DA |
| Annuel | Gratuit | 25,000 DA | 50,000 DA |
| Économie annuelle | - | 5,000 DA | 10,000 DA |

---

## 💰 Pricing & Monétisation

### **Grille Tarifaire**

| Plan | Prix/mois | Prix/an | Économie | ROI si 1 vente |
|------|-----------|---------|----------|----------------|
| **FREE** | 0 DA | 0 DA | - | N/A |
| **STARTER** | 2,500 DA | 25,000 DA | 5,000 DA | 0.25% commission |
| **ELITE** | 5,000 DA | 50,000 DA | 10,000 DA | 0.5% commission |

### **Boosts - Prix par Tier de Compte**

| Boost | Particulier (FREE) | STARTER | ELITE |
|-------|-------------------|---------|-------|
| **TIER 1 - EN AVANT** | 500 DA/sem | 400 DA/sem (-20%) | 300 DA/sem (-40%) |
| **TIER 2 - PREMIUM** | ❌ Bloqué | 800 DA/sem (-20%) | 700 DA/sem (-30%) |
| **TIER 3 - ULTRA** | ❌ Bloqué | ❌ Bloqué | 1,500 DA/sem (-25%) |

### **Méthodes de Paiement (Chargily Pay)**

- 💳 **CIB** (Carte bancaire)
- 💳 **EDAHABIA**
- 📱 **Baridimob**
- 🏦 **CCP**

### **Stratégie de Conversion**

#### **FREE → STARTER**

**Triggers automatiques** :
1. **Limite atteinte** : "Vous avez 3/3 annonces. Passez STARTER pour 22 de plus (seulement 83 DA/jour)"
2. **Après 10 jours sans contact** : "Les comptes STARTER reçoivent 3x plus de contacts"
3. **Analytics bloqués** : Dashboard avec graphiques floutés + "🔒 Passez STARTER"
4. **Trial gratuit** : 7 jours STARTER automatique après 3 annonces publiées

#### **STARTER → ELITE**

**Triggers** :
1. **20/25 annonces** : "Votre portfolio grandit ! ELITE = annonces illimitées"
2. **Dépenses boosts** : "Vous avez dépensé 2400 DA en boosts. ELITE = -40% + 1 gratuit/mois"
3. **Volume élevé** : "10,000 vues ce mois ! ELITE débloque analytics avancés"

### **Projections Financières (Marché Algérien)**

```yaml
Hypothèses conservatrices (Année 1):
  Utilisateurs FREE: 5,000
  Utilisateurs STARTER: 100 (2%)
  Utilisateurs ELITE: 20 (0.4%)
  
Revenus mensuels abonnements:
  STARTER: 100 × 2,500 DA = 250,000 DA
  ELITE: 20 × 5,000 DA = 100,000 DA
  Total abonnements: 350,000 DA/mois = 4,200,000 DA/an
  
Revenus boosts (estimé):
  FREE: 50 boosts/mois × 500 DA = 25,000 DA
  STARTER: 30 boosts/mois × 600 DA avg = 18,000 DA
  ELITE: 15 boosts/mois × 1,000 DA avg = 15,000 DA
  Total boosts: 58,000 DA/mois = 696,000 DA/an
  
TOTAL ANNÉE 1: ~4,896,000 DA (~30,000 €)

Année 2 (×3 utilisateurs):
  FREE: 15,000
  STARTER: 300
  ELITE: 60
  Revenus estimés: ~14,688,000 DA (~90,000 €)
```

---

## 🏗️ Architecture Dashboard

### **Dashboard Unique Adaptatif**

Un seul dashboard à `/dashboard` qui s'adapte dynamiquement selon `user.accountTier`.

```typescript
// Structure du dashboard adaptatif

<Dashboard>
  {/* Header - Commun à tous */}
  <WelcomeHeader 
    user={user}
    showUpgradeBanner={user.accountTier === 'FREE'}
  />
  
  {/* Stats Cards - Adaptatifs */}
  {user.accountTier === 'FREE' && (
    <FreeStatsCards 
      limit={3} 
      used={user.activeProperties}
      ctaText="Passez STARTER pour 22 annonces de plus"
    />
  )}
  
  {user.accountTier === 'STARTER' && (
    <StarterStatsCards 
      limit={25}
      used={user.activeProperties}
      showEliteTeaser={user.activeProperties >= 20}
    />
  )}
  
  {user.accountTier === 'ELITE' && (
    <EliteStatsCards />
  )}
  
  {/* Mes Annonces - Tous */}
  <PropertiesSection>
    <PropertyList 
      canAddNew={canAddNewProperty(user)}
      showUpgradeIfLimit={user.activeProperties >= user.propertyLimit}
    />
  </PropertiesSection>
  
  {/* Analytics - Conditionnel */}
  {user.accountTier === 'FREE' && (
    <AnalyticsTeaser />  // Graphiques floutés avec CTA
  )}
  
  {user.accountTier === 'STARTER' && (
    <BasicAnalytics period="7days" />
  )}
  
  {user.accountTier === 'ELITE' && (
    <AdvancedAnalytics 
      period="30days"
      features={['heatmap', 'trafficSource', 'benchmark']}
    />
  )}
  
  {/* Boosts - Adaptatif */}
  <BoostsSection
    availableTiers={getAvailableBoostTiers(user.accountTier)}
    pricing={getBoostPricing(user.accountTier)}
    freeBoost={user.accountTier === 'FREE' && user.propertiesCount === 1}
  />
  
  {/* Messages - Features selon tier */}
  <MessagesSection
    hasTemplates={user.accountTier !== 'FREE'}
    hasInstantNotif={user.accountTier !== 'FREE'}
    hasAutoResponses={user.accountTier === 'ELITE'}
    hasMultiUsers={user.accountTier === 'ELITE'}
  />
  
  {/* Favoris - FREE/STARTER uniquement */}
  {user.accountTier !== 'ELITE' && <FavoritesSection />}
  
  {/* Recherches sauvegardées - Limité FREE */}
  <SavedSearchesSection 
    limit={user.accountTier === 'FREE' ? 3 : Infinity}
  />
  
  {/* Team - ELITE uniquement */}
  {user.accountTier === 'ELITE' && (
    <TeamManagementSection maxMembers={3} />
  )}
</Dashboard>
```

### **Components Clés**

#### **UpgradeBanner**

Affiché selon le contexte :

```typescript
<UpgradeBanner
  tier="STARTER"
  trigger="LIMIT_REACHED"
  message="Vous avez atteint votre limite de 3 annonces"
  cta="Passer STARTER pour 22 annonces de plus"
  price="Seulement 83 DA/jour"
  trial={true}  // 7 jours gratuits
/>
```

#### **FeatureLock**

Pour features bloquées :

```typescript
<FeatureLock
  requiredTier="ELITE"
  featureName="Analytics Avancés"
  preview={<BlurredChart />}
  benefits={[
    "Heatmap horaire des vues",
    "Source du trafic détaillée",
    "Benchmarking concurrents"
  ]}
/>
```

#### **PropertyLimitIndicator**

```typescript
<PropertyLimitIndicator
  current={user.activeProperties}
  limit={user.propertyLimit}
  accountTier={user.accountTier}
  showUpgradeAt={0.8}  // Afficher CTA à 80% de la limite
/>
```

---

## 🛠️ Stack Technique

### **Frontend**

```yaml
Framework: Next.js 14.2+ (App Router)
Language: TypeScript 5.3+
Styling:
  - Tailwind CSS 3.4+
  - Shadcn/ui
  - Design System "Alger Vibrante"
State: Redux Toolkit + RTK Query
Forms: React Hook Form + Zod
Animation: Framer Motion
Maps: Mapbox GL JS
Icons: Lucide React
```

### **Backend**

```yaml
Runtime: Node.js 20+ LTS
Framework: Express.js 4.18+
Language: TypeScript 5.3+
ORM: Prisma 5.8+
Database: PostgreSQL 16 + PostGIS
Auth: AWS Cognito
Storage: AWS S3
Payments: Chargily Pay
```

### **Infrastructure (AWS)**

```yaml
Compute:
  - EC2 (Backend API)
  - Amplify (Frontend)
Database: RDS PostgreSQL 16
Storage: S3 + CloudFront CDN
Auth: AWS Cognito
```

---

## 🚀 Installation & Setup

### **Prérequis**

```bash
Node.js 20+
PostgreSQL 16+
npm ou yarn
Compte AWS (Cognito)
Compte Chargily Pay
Mapbox API key
```

### **1. Clone & Install**

```bash
# Clone
git clone https://github.com/your-org/rentalg.git
cd rentalg

# Install dependencies
cd client && npm install
cd ../server && npm install
```

### **2. Database Setup**

```bash
cd server

# Configure .env (voir example.env)
DATABASE_URL="postgresql://user:password@localhost:5432/rentalg"

# Prisma setup
npx prisma generate
npx prisma db push

# Seed avec nouvelles données (FREE/STARTER/ELITE)
npx prisma db seed
```

### **3. Environment Variables**

**server/.env**

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rentalg"

# AWS Cognito
COGNITO_USER_POOL_ID="your-pool-id"
COGNITO_CLIENT_ID="your-client-id"
COGNITO_REGION="eu-west-1"

# Chargily Pay
CHARGILY_API_KEY="test_sk_xxxxxxxxxx"
CHARGILY_SECRET="your_webhook_secret"
CHARGILY_MODE="test"  # ou "live"

# Mapbox
MAPBOX_ACCESS_TOKEN="pk.xxxxxxxxxxxx"

# AWS S3
AWS_REGION="eu-west-1"
AWS_ACCESS_KEY_ID="xxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxx"
S3_BUCKET_NAME="rentalg-uploads"

# Server
PORT=5000
NODE_ENV="development"
```

**client/.env.local**

```bash
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_MAPBOX_TOKEN="pk.xxxxxxxxxxxx"
NEXT_PUBLIC_CHARGILY_PUBLIC_KEY="test_pk_xxxxxxxxxxxx"
```

### **4. Run Development**

```bash
# Terminal 1 - Backend
cd server
npm run dev  # Port 5000

# Terminal 2 - Frontend
cd client
npm run dev  # Port 3000
```

### **5. Build Production**

```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
npm start
```

---

## 🔄 Migration v6 → v7

### **Commandes de Migration**

```bash
cd server

# ⚠️ ATTENTION: Va DROP toutes les tables et recréer
# NE PAS FAIRE EN PRODUCTION sans backup !

# Option 1: Reset complet (DEV uniquement)
npx prisma migrate reset --force

# Option 2: Migration propre (PRODUCTION)
# 1. Backup de la DB
pg_dump rentalg > backup_$(date +%Y%m%d).sql

# 2. Créer migration
npx prisma migrate dev --name account_tier_v7

# 3. Deploy
npx prisma migrate deploy

# 4. Seed nouvelles données
npx prisma db seed
```

### **Changements de Schema**

#### **1. User Model**

**Avant (v6)** :
```prisma
accountTier AccountTier @default(PARTICULIER)  // PARTICULIER | PROFESSIONNEL
proActivatedAt DateTime?
proExpiresAt DateTime?
```

**Après (v7)** :
```prisma
accountTier AccountTier @default(FREE)  // FREE | STARTER | ELITE
subscriptionStartedAt DateTime?
subscriptionExpiresAt DateTime?
propertyLimit Int @default(3)
imagesPerPropertyLimit Int @default(8)
videosPerPropertyLimit Int @default(0)
teamMemberEmails String[] @default([])
```

#### **2. Nouveau Model: Subscription**

```prisma
model Subscription {
  id String @id @default(cuid())
  userId String
  tier AccountTier  // STARTER ou ELITE
  startDate DateTime
  endDate DateTime
  isActive Boolean @default(true)
  autoRenew Boolean @default(false)
  amountPaid BigInt
  // ... autres champs
}
```

#### **3. BoostPricing**

**Avant** :
```prisma
pricePerWeek BigInt
```

**Après** :
```prisma
priceFreePerWeek BigInt
priceStarterPerWeek BigInt
priceElitePerWeek BigInt
availableForFree Boolean
availableForStarter Boolean
availableForElite Boolean
```

### **Migration de Données**

```typescript
// Script de migration (server/prisma/migrate-v6-to-v7.ts)

import { PrismaClient, AccountTier } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateUsers() {
  // PARTICULIER → FREE
  await prisma.user.updateMany({
    where: { accountTier: 'PARTICULIER' as any },
    data: {
      accountTier: AccountTier.FREE,
      propertyLimit: 3,
      imagesPerPropertyLimit: 8,
      videosPerPropertyLimit: 0,
    }
  });
  
  // PROFESSIONNEL → STARTER (par défaut)
  // Ceux avec > 25 annonces → ELITE
  const pros = await prisma.user.findMany({
    where: { accountTier: 'PROFESSIONNEL' as any },
    include: { _count: { select: { properties: true } } }
  });
  
  for (const pro of pros) {
    const newTier = pro._count.properties > 25 ? AccountTier.ELITE : AccountTier.STARTER;
    const limit = newTier === AccountTier.ELITE ? 999999 : 25;
    
    await prisma.user.update({
      where: { id: pro.id },
      data: {
        accountTier: newTier,
        propertyLimit: limit,
        imagesPerPropertyLimit: newTier === AccountTier.ELITE ? 999999 : 15,
        videosPerPropertyLimit: newTier === AccountTier.ELITE ? 3 : 1,
      }
    });
    
    // Créer abonnement si PRO actif
    if (pro.proExpiresAt && pro.proExpiresAt > new Date()) {
      await prisma.subscription.create({
        data: {
          userId: pro.id,
          tier: newTier,
          startDate: pro.proActivatedAt || new Date(),
          endDate: pro.proExpiresAt,
          isActive: true,
          autoRenew: pro.proAutoRenew || false,
          amountPaid: newTier === AccountTier.ELITE ? 5000 : 2500,
          billingCycle: 'MONTHLY',
        }
      });
    }
  }
}

async function migrateBoostPricing() {
  // TIER 1
  await prisma.boostPricing.upsert({
    where: { tier: 'TIER_1_EN_AVANT' },
    create: {
      tier: 'TIER_1_EN_AVANT',
      priceFreePerWeek: 500,
      priceStarterPerWeek: 400,
      priceElitePerWeek: 300,
      availableForFree: true,
      availableForStarter: true,
      availableForElite: true,
      features: JSON.stringify(['Haut des résultats', 'Badge bleu', '+150% visibilité']),
    },
    update: {
      priceFreePerWeek: 500,
      priceStarterPerWeek: 400,
      priceElitePerWeek: 300,
      availableForFree: true,
      availableForStarter: true,
      availableForElite: true,
    }
  });
  
  // TIER 2
  await prisma.boostPricing.upsert({
    where: { tier: 'TIER_2_PREMIUM' },
    create: {
      tier: 'TIER_2_PREMIUM',
      priceFreePerWeek: 0,  // Pas dispo
      priceStarterPerWeek: 800,
      priceElitePerWeek: 700,
      availableForFree: false,
      availableForStarter: true,
      availableForElite: true,
      features: JSON.stringify(['Top résultats', 'Badge doré', 'Homepage section', '+300% visibilité']),
    },
    update: {
      priceStarterPerWeek: 800,
      priceElitePerWeek: 700,
      availableForFree: false,
    }
  });
  
  // TIER 3
  await prisma.boostPricing.upsert({
    where: { tier: 'TIER_3_ULTRA' },
    create: {
      tier: 'TIER_3_ULTRA',
      priceFreePerWeek: 0,
      priceStarterPerWeek: 0,
      priceElitePerWeek: 1500,
      availableForFree: false,
      availableForStarter: false,
      availableForElite: true,
      features: JSON.stringify(['Homepage carousel', 'Badge violet', 'Priorité absolue', '+500% visibilité']),
    },
    update: {
      priceElitePerWeek: 1500,
      availableForElite: true,
    }
  });
}

migrateUsers()
  .then(() => migrateBoostPricing())
  .then(() => console.log('✅ Migration v6→v7 terminée'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

---

## 📝 Roadmap

### **Phase 1 - Q1 2025** ✅

- [x] Nouveau schema Prisma avec 3 tiers
- [x] Dashboard adaptatif unique
- [x] Upgrade banners et feature locks
- [x] Integration Chargily Pay pour abonnements
- [x] Seed data avec nouveaux prix

### **Phase 2 - Q2 2025**

- [ ] Trial gratuit automatique (7 jours STARTER)
- [ ] Analytics avancés pour ELITE
- [ ] Multi-users pour ELITE (3 comptes)
- [ ] Templates de messages
- [ ] Export leads (CSV/Excel)

### **Phase 3 - Q3 2025**

- [ ] API publique pour ELITE
- [ ] Gamification (badges, leaderboards)
- [ ] Visite virtuelle 360°
- [ ] CRM basique intégré
- [ ] Rapports personnalisés ELITE

### **Phase 4 - Q4 2025**

- [ ] Mobile app (React Native)
- [ ] WhatsApp Business API integration
- [ ] IA: Suggestions de prix automatiques
- [ ] Matching intelligent acheteurs/vendeurs
- [ ] Programme d'affiliation

---

## 📞 Support & Contact

- **Documentation** : docs.rentalg.dz
- **Support STARTER** : support@rentalg.dz (24h)
- **Support ELITE** : elite@rentalg.dz (1h) + Account Manager dédié
- **Status** : status.rentalg.dz

---

## 📄 License

Copyright © 2025 RentAlg. All rights reserved.

---

**Made with ❤️ in Algeria 🇩🇿**
