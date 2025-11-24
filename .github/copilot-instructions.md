# RENTALG v2.0 Copilot Instructions

## 🧠 Project Context
**RENTALG v2.0** is an Algerian real estate marketplace with a 3-tier account strategy (FREE, STARTER, ELITE).
- **Stack**: Next.js 14+ (App Router), Express.js, PostgreSQL (PostGIS), Prisma, AWS Amplify (Auth), Redux Toolkit.
- **Monorepo Structure**:
  - `/client`: Next.js frontend.
  - `/server`: Express backend.
- **New v2.0 Features**:
  - 3-tier accounts (FREE/STARTER/ELITE) instead of Particulier/Professionnel
  - Adaptive dashboard rendering based on `accountTier`
  - Property limits, image limits, video limits per tier
  - Differentiated boost pricing by tier
  - Subscription management (STARTER: 2500 DA/mois, ELITE: 5000 DA/mois)

---

## 🎖️ ACCOUNT TIERS STRATEGY (v2.0 - CRITICAL)

### **Overview**
RentAlg v2.0 uses a 3-tier model instead of the old Particulier/Professionnel binary:
- **FREE** (gratuit): Particuliers occasionnels (3 annonces max)
- **STARTER** (2500 DA/mois): Petites agences, agents indépendants (25 annonces)
- **ELITE** (5000 DA/mois): Grandes agences, promoteurs (∞ annonces)

### **Account Tier Detection**
```typescript
// User accountTier is stored in Cognito custom attribute: custom:accountTier
// Values: "FREE" | "STARTER" | "ELITE"

import { fetchUserAttributes } from 'aws-amplify/auth';

const attributes = await fetchUserAttributes();
const accountTier = attributes['custom:accountTier'] || 'FREE';

// Or from Prisma User model:
const user = await prisma.user.findUnique({
  where: { cognitoId },
  select: { accountTier, propertyLimit, subscriptionExpiresAt }
});
```

### **Complete Feature Matrix**

| Feature | FREE | STARTER | ELITE |
|---------|------|---------|-------|
| **Annonces actives** | 3 | 25 | ∞ |
| **Images/annonce** | 8 | 15 | ∞ |
| **Vidéos/annonce** | 0 | 1 (30s) | 3 (2min) |
| **Visite 360°** | ❌ | ❌ | ✅ |
| **Recherches sauvegardées** | 3 | ∞ | ∞ |
| **TIER 1 Boost** | 500 DA/sem | 400 DA/sem | 300 DA/sem |
| **TIER 2 Boost** | ❌ | 800 DA/sem | 700 DA/sem |
| **TIER 3 Boost** | ❌ | ❌ | 1500 DA/sem |
| **Boost gratuit** | 1× (3j) | ❌ | 1× TIER 2/mois |
| **Analytics** | Total vues | 7j graphiques | 30j + heatmap |
| **Taux conversion** | ❌ | ✅ Basique | ✅ Détaillé |
| **Export données** | ❌ | CSV mensuel | PDF/Excel |
| **Email notif** | ⏱️ 24h | ✅ Instant | ✅ Instant |
| **SMS notif** | ❌ | Payant | ✅ Inclus |
| **Templates messages** | 0 | 3 | ∞ |
| **Multi-users** | ❌ | ❌ | 3 comptes |
| **Badge** | ❌ | PRO (bleu) | ELITE (doré) |
| **Page agence** | ❌ | ✅ Basique | ✅ Premium |
| **Auto-approve** | ❌ | ⏱️ Fast-track | ✅ Immédiat |
| **Support** | 72h | 24h | 1h |

### **Limits Enforcement (CRITICAL)**

**Server-side** (`server/src/middleware/limits.middleware.ts`):
```typescript
export const checkPropertyLimit = async (req: Request, res: Response, next: NextFunction) => {
  const user = await prisma.user.findUnique({
    where: { cognitoId: req.user.cognitoId },
    select: { accountTier, activeProperties, propertyLimit }
  });

  const limits = {
    FREE: 3,
    STARTER: 25,
    ELITE: 999999
  };

  if (user.activeProperties >= limits[user.accountTier]) {
    return res.status(403).json({
      error: 'PROPERTY_LIMIT_REACHED',
      message: `Limite de ${limits[user.accountTier]} annonces atteinte`,
      upgrade: user.accountTier === 'FREE' ? 'STARTER' : 'ELITE'
    });
  }

  next();
};
```

**Client-side** (`client/src/utils/accountLimits.ts`):
```typescript
export const ACCOUNT_LIMITS = {
  FREE: {
    properties: 3,
    images: 8,
    videos: 0,
    savedSearches: 3,
    templates: 0,
    teamMembers: 0,
  },
  STARTER: {
    properties: 25,
    images: 15,
    videos: 1,
    savedSearches: Infinity,
    templates: 3,
    teamMembers: 0,
  },
  ELITE: {
    properties: Infinity,
    images: Infinity,
    videos: 3,
    savedSearches: Infinity,
    templates: Infinity,
    teamMembers: 3,
  },
};

export const canAddProperty = (user: User): boolean => {
  const limit = ACCOUNT_LIMITS[user.accountTier].properties;
  return user.activeProperties < limit;
};

export const getRemainingSlots = (user: User, type: 'properties' | 'savedSearches'): number => {
  const limit = ACCOUNT_LIMITS[user.accountTier][type];
  if (limit === Infinity) return Infinity;
  const current = type === 'properties' ? user.activeProperties : user.savedSearches.length;
  return Math.max(0, limit - current);
};
```

### **Boost Pricing by Tier**

**Prisma Model** (`BoostPricing`):
```prisma
model BoostPricing {
  tier BoostTier @unique
  
  priceFreePerWeek    BigInt  // 500 DA
  priceStarterPerWeek BigInt  // 400 DA
  priceElitePerWeek   BigInt  // 300 DA
  
  availableForFree    Boolean
  availableForStarter Boolean
  availableForElite   Boolean
}
```

**Boost Access Check**:
```typescript
export const canAccessBoost = (
  userTier: AccountTier, 
  boostTier: BoostTier
): boolean => {
  const access = {
    TIER_1_EN_AVANT: ['FREE', 'STARTER', 'ELITE'],
    TIER_2_PREMIUM: ['STARTER', 'ELITE'],
    TIER_3_ULTRA: ['ELITE'],
  };
  return access[boostTier].includes(userTier);
};

export const getBoostPrice = (
  userTier: AccountTier,
  boostTier: BoostTier
): number => {
  const pricing = {
    TIER_1_EN_AVANT: { FREE: 500, STARTER: 400, ELITE: 300 },
    TIER_2_PREMIUM: { FREE: 0, STARTER: 800, ELITE: 700 },
    TIER_3_ULTRA: { FREE: 0, STARTER: 0, ELITE: 1500 },
  };
  return pricing[boostTier][userTier];
};
```

### **Upgrade Flow & Conversion**

**Trigger Points** (show upgrade banners):
```typescript
// FREE → STARTER triggers
const FREE_TO_STARTER_TRIGGERS = {
  LIMIT_REACHED: user.activeProperties >= 3,
  NO_CONTACTS_10_DAYS: daysSinceLastContact >= 10,
  ANALYTICS_BLOCKED: isViewingAnalytics && !hasAccess,
  BOOST_TIER_2_LOCKED: isSelectingBoost && boostTier === 'TIER_2',
};

// STARTER → ELITE triggers
const STARTER_TO_ELITE_TRIGGERS = {
  APPROACHING_LIMIT: user.activeProperties >= 20,
  HIGH_BOOST_SPEND: totalBoostSpend >= 2400, // ~1 mois ELITE
  HIGH_VIEWS: monthlyViews >= 10000,
  WANTS_TIER_3: isSelectingBoost && boostTier === 'TIER_3',
};
```

**Upgrade Banner Component**:
```tsx
// client/src/components/upgrade/UpgradeBanner.tsx
interface UpgradeBannerProps {
  currentTier: AccountTier;
  targetTier: 'STARTER' | 'ELITE';
  trigger: string;
  compact?: boolean;
}

export const UpgradeBanner = ({ currentTier, targetTier, trigger }: UpgradeBannerProps) => {
  const benefits = targetTier === 'STARTER' 
    ? ['22 annonces supplémentaires', 'Analytics 7 jours', 'Templates messages']
    : ['Annonces illimitées', 'Analytics 30j + heatmap', 'Auto-approve'];
    
  const price = targetTier === 'STARTER' ? '2,500 DA/mois' : '5,000 DA/mois';
  const perDay = targetTier === 'STARTER' ? '83 DA/jour' : '167 DA/jour';

  return (
    <Card className="border-2 border-[#0891B2] bg-gradient-to-r from-[#CFFAFE] to-white">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white">
            {targetTier}
          </Badge>
          <span className="text-sm font-semibold text-gray-600">
            Seulement {perDay}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Passez {targetTier} pour débloquer plus de fonctionnalités
        </h3>
        
        <ul className="space-y-1 mb-4">
          {benefits.map(benefit => (
            <li key={benefit} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-[#10B981]" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center gap-3">
          <Link href="/upgrade">
            <Button className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4]">
              Passer {targetTier} - {price}
            </Button>
          </Link>
          
          {targetTier === 'STARTER' && (
            <span className="text-xs text-gray-600">
              🎁 7 jours gratuits
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
```

**Feature Lock Component**:
```tsx
// client/src/components/upgrade/FeatureLock.tsx
export const FeatureLock = ({
  requiredTier,
  featureName,
  preview,
  benefits = [],
}: FeatureLockProps) => {
  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="filter blur-sm pointer-events-none opacity-50">
        {preview}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-sm">
        <div className="text-center max-w-md p-8">
          <Lock className="w-12 h-12 mx-auto mb-4 text-[#0891B2]" />
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {featureName}
          </h3>
          
          <p className="text-gray-600 mb-4">
            Fonctionnalité réservée aux comptes {requiredTier}
          </p>
          
          {benefits.length > 0 && (
            <ul className="text-left mb-6 space-y-2">
              {benefits.map(benefit => (
                <li key={benefit} className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B] mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          )}
          
          <Button 
            className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4]"
            onClick={() => window.location.href = '/upgrade'}
          >
            Passer {requiredTier}
          </Button>
        </div>
      </div>
    </div>
  );
};
```

### **Trial System (FREE → STARTER)**

**Auto-trigger trial** after 3 properties published:
```typescript
// server/src/services/trialService.ts
export const checkAndActivateTrial = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      accountTier, 
      totalProperties, 
      subscriptionStartedAt,
      trialActivatedAt  // New field
    }
  });

  // Conditions pour trial gratuit:
  // 1. Est FREE
  // 2. A publié >= 3 annonces
  // 3. N'a jamais eu de trial/abonnement
  if (
    user.accountTier === 'FREE' &&
    user.totalProperties >= 3 &&
    !user.subscriptionStartedAt &&
    !user.trialActivatedAt
  ) {
    // Activer trial 7 jours STARTER
    await prisma.user.update({
      where: { id: userId },
      data: {
        accountTier: 'STARTER',
        propertyLimit: 25,
        imagesPerPropertyLimit: 15,
        videosPerPropertyLimit: 1,
        trialActivatedAt: new Date(),
        trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7j
      }
    });

    // Notification
    await sendEmail({
      to: user.email,
      template: 'trial_activated',
      data: {
        daysRemaining: 7,
        features: ['25 annonces', 'Analytics', 'Templates'],
      }
    });

    return true;
  }

  return false;
};
```

---

## 🗄️ PRISMA SCHEMA MODELS (v7.0)

### **Key Enums**

```prisma
enum AccountTier {
  FREE      // Particuliers (3 annonces, 8 images, 0 vidéos)
  STARTER   // Petites agences (25 annonces, 15 images, 1 vidéo)
  ELITE     // Grandes agences (∞ annonces, ∞ images, 3 vidéos)
}

enum BoostTier {
  NONE
  TIER_1_EN_AVANT    // 500/400/300 DA selon tier
  TIER_2_PREMIUM     // 0/800/700 DA (FREE bloqué)
  TIER_3_ULTRA       // 0/0/1500 DA (FREE+STARTER bloqué)
}

enum PropertyStatus {
  DRAFT
  PENDING_REVIEW     // Modération (24-48h FREE, 6h STARTER, 0h ELITE)
  ACTIVE
  SOLD
  RENTED
  EXPIRED
  REJECTED
  ARCHIVED
}
```

### **User Model (Extended)**

```prisma
model User {
  // ... existing fields

  // ACCOUNT TIER (v7.0)
  accountTier AccountTier @default(FREE)
  
  // SUBSCRIPTION (STARTER/ELITE)
  subscriptionStartedAt DateTime?
  subscriptionExpiresAt DateTime?
  subscriptionAutoRenew Boolean @default(false)
  subscriptionCancelledAt DateTime?
  
  // LIMITS PAR TIER
  propertyLimit Int @default(3)
  imagesPerPropertyLimit Int @default(8)
  videosPerPropertyLimit Int @default(0)
  
  // PRO FEATURES (STARTER/ELITE)
  companyName String?
  companyLogo String?
  companyDescription String? @db.Text
  
  // ELITE: Multi-users
  teamMemberEmails String[] @default([])  // Max 3
  
  // TRIAL
  trialActivatedAt DateTime?
  trialExpiresAt DateTime?
  
  // RELATIONS
  subscriptions Subscription[]
  // ... autres relations
}
```

### **Subscription Model (New)**

```prisma
model Subscription {
  id String @id @default(cuid())
  createdAt DateTime @default(now())
  
  userId String
  user User @relation(fields: [userId], references: [id])
  
  tier AccountTier  // STARTER ou ELITE
  
  startDate DateTime
  endDate DateTime
  isActive Boolean @default(true)
  autoRenew Boolean @default(false)
  
  amountPaid BigInt
  currency String @default("DZD")
  billingCycle String @default("MONTHLY")  // MONTHLY | YEARLY
  
  paymentId String?
  payment Payment? @relation(fields: [paymentId], references: [id])
  
  cancelledAt DateTime?
  cancellationReason String? @db.Text
  
  expiryWarningSenitAt Boolean @default(false)
}
```

### **BoostPricing Model (Updated)**

```prisma
model BoostPricing {
  id String @id @default(cuid())
  tier BoostTier @unique
  
  // Pricing différencié par accountTier
  priceFreePerWeek BigInt
  priceStarterPerWeek BigInt
  priceElitePerWeek BigInt
  
  // Restrictions
  availableForFree Boolean @default(false)
  availableForStarter Boolean @default(false)
  availableForElite Boolean @default(false)
  
  features Json  // ["Top résultats", "Badge doré", etc.]
  
  validFrom DateTime @default(now())
  validUntil DateTime?
  isActive Boolean @default(true)
}
```

### **Property Model (Unchanged but Context)**

```prisma
model Property {
  // Les limits sont vérifiées AVANT création:
  // - FREE: activeProperties < 3
  // - STARTER: activeProperties < 25
  // - ELITE: pas de limite
  
  // Images limit vérifié à l'upload:
  // - FREE: 8 max
  // - STARTER: 15 max
  // - ELITE: illimité
  
  // Vidéos:
  // - FREE: 0 (bloqué)
  // - STARTER: 1 (30 sec max)
  // - ELITE: 3 (2 min max chacune)
}
```

### **Database Queries Examples**

**Check Property Limit**:
```typescript
const user = await prisma.user.findUnique({
  where: { cognitoId },
  select: {
    accountTier,
    activeProperties,
    propertyLimit,
    _count: {
      select: {
        properties: {
          where: { status: 'ACTIVE' }
        }
      }
    }
  }
});

const canAddProperty = user._count.properties < user.propertyLimit;
```

**Get Active Subscription**:
```typescript
const subscription = await prisma.subscription.findFirst({
  where: {
    userId,
    isActive: true,
    endDate: { gte: new Date() }
  },
  include: { payment: true }
});
```

**Get Boost Price for User**:
```typescript
const boostPricing = await prisma.boostPricing.findUnique({
  where: { tier: 'TIER_2_PREMIUM' }
});

const priceForUser = {
  FREE: boostPricing.priceFreePerWeek,
  STARTER: boostPricing.priceStarterPerWeek,
  ELITE: boostPricing.priceElitePerWeek,
}[user.accountTier];

const isAvailable = {
  FREE: boostPricing.availableForFree,
  STARTER: boostPricing.availableForStarter,
  ELITE: boostPricing.availableForElite,
}[user.accountTier];
```

**Upgrade User to STARTER**:
```typescript
await prisma.$transaction([
  // Update user
  prisma.user.update({
    where: { id: userId },
    data: {
      accountTier: 'STARTER',
      propertyLimit: 25,
      imagesPerPropertyLimit: 15,
      videosPerPropertyLimit: 1,
      subscriptionStartedAt: new Date(),
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30j
      subscriptionAutoRenew: true,
    }
  }),
  
  // Create subscription record
  prisma.subscription.create({
    data: {
      userId,
      tier: 'STARTER',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true,
      autoRenew: true,
      amountPaid: 2500,
      billingCycle: 'MONTHLY',
      paymentId: payment.id,
    }
  })
]);
```

---

## 🏗️ Architecture & Data Flow
- **Client-Server Communication**:
  - The client uses **RTK Query** (`client/src/state/api.ts`) for data fetching.
  - **Authentication**: AWS Cognito via Amplify. ID tokens are passed in the `Authorization` header.
  - **User Resolution**: The frontend determines the user endpoint (`/pro/:id` or `/particulier/:id`) based on the `custom:role` claim in the Cognito token.
- **Database**:
  - **Prisma** is the ORM. `schema.prisma` is the single source of truth.
  - **PostGIS** is used for geospatial features (location-based search).
  - **Type Sharing**: Server types are generated by Prisma and **copied** to the client via the `postprisma:generate` script (`client/src/types/prismaTypes.d.ts`).

## 🛠️ Critical Workflows
- **Database Updates**:
  - After modifying `server/prisma/schema.prisma`, ALWAYS run:
    ```bash
    cd server && npm run prisma:generate
    ```
    *Note: This automatically copies types to the client via the `postprisma:generate` hook.*
- **Authentication**:
  - **Custom Auth Forms**: The project uses CUSTOM authentication forms (NOT Amplify UI).
  - Files: `client/src/components/auth/CustomSignIn.tsx` and `CustomSignUp.tsx`.
  - Auth pages: `client/src/app/(auth)/signin/page.tsx` and `signup/page.tsx`.
  - Auth config: `client/src/app/(auth)/authProvider.tsx` (Amplify configuration only, no UI).
  - When implementing protected routes/endpoints, verify the `Authorization` header using the Cognito JWKS.
  - User roles (`Particulier`, `Professionnel`) stored in `custom:role` attribute dictate accessible endpoints.
  - **Role-based routing**:
    - Particulier users → `/particulier/*` routes
    - Professionnel users → `/pro/*` routes
  - **After successful login/signup**: ALWAYS redirect to `/landing` (NOT `/`)

## 🎨 UI/UX Guidelines & Design System "Alger Vibrante"

### Color Palette (STRICT - Use these exact values)

**Mediterranean Blues (Primary)**
- `#0891B2` - Electric Blue (PRIMARY CTA, main actions)
- `#0369A1` - Deep Blue (Hover states, depth)
- `#06B6D4` - Bright Blue (Links, secondary actions)
- `#38BDF8` - Sky Blue (Accents, informational badges)
- `#CFFAFE` - Pale Blue (Backgrounds, subtle sections)

**Garden Greens (Success/Secondary)**
- `#059669` - Vibrant Green (Success, "À Louer" badges)
- `#10B981` - Fresh Green (Secondary CTA, positive actions)
- `#34D399` - Emerald Green (Light accents, available status)
- `#D1FAE5` - Pale Green (Success backgrounds)

**Warm Accents (Mediterranean Sunset)**
- `#F97316` - Coral (Promotions, special offers)
- `#FB923C` - Light Coral (Hover states)
- `#FFEDD5` - Pale Coral (Warm backgrounds)
- `#F59E0B` - Sunshine (Warnings, "Urgent" badges)
- `#FBBF24` - Amber (Featured items, premium)

**Bold Accents**
- `#DC2626` - Terracotta (Errors, "Vendu" badges)
- `#EF4444` - Light Terracotta (Error hover)
- `#DB2777` - Fuchsia (Premium/Exclusive - use sparingly!)
- `#EC4899` - Light Fuchsia (Premium accents)
- `#FCE7F3` - Pale Fuchsia (Premium backgrounds)

**Neutrals (White & Architecture)**
- `#FFFFFF` - White (Main backgrounds, 60-70% of interface)
- `#FAFAFA` - Off White (Section alternation)
- `#FEF3C7` - Cream (Warm accent backgrounds)
- `#FDE68A` - Beige (Highlights, badges)

**Grays (Text & Borders)**
- `#1F2937` - gray-900 (Primary text, headings)
- `#374151` - gray-800 (Secondary text)
- `#4B5563` - gray-700 (Tertiary text)
- `#6B7280` - gray-600 (Placeholder text)
- `#9CA3AF` - gray-500 (Disabled text)
- `#D1D5DB` - gray-400 (Medium borders)
- `#E5E7EB` - gray-300 (Light borders)
- `#F3F4F6` - gray-200 (Dividers)
- `#F9FAFB` - gray-100 (Light backgrounds)

**Semantic Colors**
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#06B6D4`

**⚠️ CRITICAL COLOR RULES**
- NEVER use custom color names like "blue-electric", "blue-pale" in code
- ALWAYS use HEX values: `#0891B2`, `#38BDF8`, etc.
- For Tailwind classes, use standard names: `text-gray-900`, `bg-cyan-600`
- Buttons should use gradients: `bg-gradient-to-r from-[#0891B2] to-[#38BDF8]`

### Gradients (Mediterranean Spirit)
```
Ocean: linear-gradient(135deg, #0891B2, #06B6D4)
Garden: linear-gradient(135deg, #059669, #34D399)
Sunset: linear-gradient(135deg, #F97316, #F59E0B)
Premium: linear-gradient(135deg, #DB2777, #EC4899)
```

### Typography
- **Display Font**: Poppins (Headings, prices, hero text)
- **Body Font**: Inter (Body text, UI elements)
- **Arabic Support**: Noto Sans Arabic (RTL support)

**Type Scale**
- Hero: 48-60px (text-5xl, text-6xl)
- H1: 36px (text-4xl)
- H2: 30px (text-3xl)
- H3: 24px (text-2xl)
- Body: 16px (text-base)
- Small: 14px (text-sm)
- Tiny: 12px (text-xs)

**Weights**
- Headings: Semibold (600) or Bold (700)
- Body: Regular (400)
- Prices: Bold (700)

### Spacing System
- xs: 4px (`space-1`)
- sm: 8px (`space-2`)
- md: 16px (`space-4`)
- lg: 24px (`space-6`)
- xl: 32px (`space-8`)
- 2xl: 48px (`space-12`)
- 3xl: 64px (`space-16`)

### Border Radius
- Small: 6px (`rounded-md`)
- Medium: 8px (`rounded-lg`)
- Large: 14px (`rounded-xl`)
- Card: 20px (`rounded-2xl`)
- Pill: 9999px (`rounded-full`)

### Shadows
```
sm: 0 1px 3px rgba(0,0,0,0.1)
md: 0 4px 8px rgba(0,0,0,0.15)
lg: 0 12px 24px rgba(0,0,0,0.2)
colored: 0 8px 16px rgba(8,145,178,0.3) // For hover states
```

### Components Style Guide

**Buttons**
- Primary: `bg-gradient-to-r from-[#0891B2] to-[#38BDF8]` white text
- Secondary: `bg-[#10B981]` white text
- Tertiary: `bg-[#F97316]` white text
- Outline: `border-2 border-[#0891B2] text-[#0891B2]`
- Hover: Add `shadow-lg` and darken gradient

**Cards**
- Background: `bg-white`
- Border: None or `border border-gray-200`
- Radius: `rounded-2xl`
- Shadow: `shadow-md` default, `shadow-lg` on hover
- Padding: `p-6`

**Badges**
- "À Louer": `bg-[#059669] text-white`
- "À Vendre": `bg-[#0891B2] text-white`
- "Premium": `bg-[#DB2777] text-white`
- "Urgent": `bg-[#F59E0B] text-white`
- "Vendu": `bg-[#DC2626] text-white`

**Dashboard Sidebar**
- Background: White (`#FFFFFF`)
- Text: Gray-900 (`#1F2937`)
- Active state: Light cyan background (`#CFFAFE`) with cyan text
- Hover: Light gray (`#F9FAFB`)
- Border: Light gray (`#E5E7EB`)

**Inputs**
- Border: `border-gray-300`
- Focus: `border-[#0891B2]` with `ring-[#0891B2]/50`
- Radius: `rounded-lg`
- Padding: `px-4 py-3`

### Responsive Breakpoints
- sm: 640px (Mobile landscape)
- md: 768px (Tablet)
- lg: 1024px (Desktop)
- xl: 1280px (Large desktop)
- 2xl: 1536px (Extra large)

### UI Components
- **Shadcn UI**: Located in `client/src/components/ui`
- **Icons**: Lucide React (consistent library)
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form + Zod validation
- **Maps**: Mapbox GL for property locations

### Dashboard Layout
- **Sidebar**: Collapsible with Shadcn Sidebar component
  - Desktop: Fixed width, always visible
  - Mobile: Overlay with backdrop blur
  - Uses `SidebarProvider`, `SidebarTrigger`, `SidebarInset`
- **Header**: Sticky with `SidebarTrigger` button
- **Content**: Responsive padding (p-4 md:p-6 lg:p-8)
- **Stats Cards**: Grid layout (1 col mobile → 4 cols desktop)
- **Main Grid**: Flexible with xl:grid-cols-3 for sidebar layouts

### Accessibility
- All color combinations meet WCAG AA contrast standards
- Focus states: 3px outline with appropriate color ring
- Keyboard navigation fully supported
- Screen reader friendly labels

## 🔐 Role-Based UI Adaptation
- **Navbar** (`client/src/components/ui/Navbar.tsx`):
  - Uses `fetchUserAttributes()` to get `custom:role`
  - Helper functions: `getDashboardLink()`, `getPublishLink()`
  - Dashboard link adapts: Professionnel → `/pro`, Particulier → `/particulier`
  - Publish button adapts: Professionnel → `/pro/properties/new`, Particulier → `/properties/new`
  - Shows avatar dropdown when authenticated, signin/signup buttons when not
  
- **Landing Page** (`client/src/app/(nondashboard)/landing/page.tsx`):
  - Fetches user state via `useAuthenticator()`
  - Passes `user` and `userRole` props to sections
  - Hides CTASection for authenticated users
  
- **HeroSection** (`client/src/app/(nondashboard)/landing/HeroSection.tsx`):
  - Personalized badge: Shows "Bienvenue {username}" when authenticated
  - Dynamic titles based on role
  - Quick actions for authenticated users:
    - Professionnel: "Mon Dashboard Pro", "Créer une annonce"
    - Particulier: "Mon Espace", "Mes Favoris"
  - Quick filters (Appartements, Villas, etc.) for non-authenticated users

## 🚨 Project-Specific Conventions
- **Type Safety**:
  - Do NOT manually define API response types in the client if they mirror DB models. Import them from `@/types/prismaTypes`.
- **State Management**:
  - Use Redux Toolkit for global state (auth, preferences).
  - Use RTK Query for server state.
- **Geography**:
  - The project handles Algerian administrative divisions (Wilayas, Communes). Ensure data validation respects these hierarchies.
- **Authentication Patterns**:
  - NEVER use Amplify UI components (Authenticator, etc.)
  - Use custom forms with `signIn()`, `signUp()`, `confirmSignUp()`, `fetchUserAttributes()` from `aws-amplify/auth`
  - Store user role in Cognito custom attribute: `custom:role` (values: "Particulier" or "Professionnel")
  - Use `useAuthenticator()` hook for auth state, NOT Amplify UI wrapper
  - **CRITICAL**: After `signIn()` use `window.location.href = '/landing'` NOT `router.push()` to ensure full auth state refresh
  - **CRITICAL**: After `signOut()` use `window.location.href = '/landing'` to clear all auth state
  - Auth pages (signin/signup) are protected: redirect to `/landing` if already authenticated via `(auth)/layout.tsx`
- **Routing Conventions**:
  - Home/Landing: `/landing` (NOT `/`)
  - Auth pages: `/(auth)/signin` and `/(auth)/signup`
  - Particulier dashboard: `/particulier`
  - Professionnel dashboard: `/pro`
  - Protected routes should check user role from `custom:role` attribute

## 🧪 Testing & Debugging
- **Server**: Run `npm run dev` in `/server`.
- **Client**: Run `npm run dev` in `/client`.
- **Logs**: Check server console for "aw yemchi..." to confirm startup.
- **Auth Testing**:
  - Test signup flow: Email confirmation required (6-digit code)
  - Test role selection: Verify `custom:role` is stored in Cognito
  - Test redirects: Should always go to `/landing` after login/signup
  - Test role-based UI: Check navbar links and landing content change based on role

## 📁 Key File Locations
- **Auth Components**: `client/src/components/auth/CustomSignIn.tsx`, `CustomSignUp.tsx`
- **Auth Pages**: `client/src/app/(auth)/signin/page.tsx`, `signup/page.tsx`
- **Auth Config**: `client/src/app/(auth)/authProvider.tsx`
- **Navbar**: `client/src/components/ui/Navbar.tsx` (role-aware navigation)
- **Landing**: `client/src/app/(nondashboard)/landing/page.tsx`, `HeroSection.tsx`
- **Dashboards**: 
  - `client/src/app/(dashboard)/layout.tsx` (protected layout with auth check)
  - `client/src/app/(dashboard)/particulier/page.tsx`
  - `client/src/app/(dashboard)/pro/page.tsx`
- **Dashboard Components**: `client/src/components/dashboard/` (StatsCard, SavedSearchCard, FavoritePropertyCard, ActivityTimeline, DashboardSidebar, DashboardWrapper)
- **Providers**: `client/src/app/providers.tsx` (AuthProvider, StoreProvider, Authenticator.Provider)
- **API State**: `client/src/state/api.ts` (RTK Query endpoints)
- **Database Schema**: `server/prisma/schema.prisma`
- **Seed Data**: `server/prisma/seedData/*.json`

## 🗺️ Routing Structure
```
app/
├── (auth)/                     → Public auth pages
│   ├── signin/page.tsx        → /signin
│   └── signup/page.tsx        → /signup
├── (nondashboard)/            → Public pages
│   └── landing/page.tsx       → /landing
└── (dashboard)/               → Protected dashboard routes
    ├── layout.tsx             → Auth protection + redirect logic
    ├── particulier/page.tsx   → /particulier (Particulier dashboard)
    ├── pro/
    │   ├── page.tsx          → /pro (Pro dashboard)
    │   └── properties/
    │       └── new/page.tsx  → /pro/properties/new
    ├── properties/
    │   └── new/page.tsx      → /properties/new (Particulier)
    ├── messages/page.tsx      → /messages (both roles)
    └── favorites/page.tsx     → /favorites (both roles)
```

**Route Groups Explanation**:
- `(auth)`, `(nondashboard)`, `(dashboard)` are route groups (don't affect URL)
- They allow shared layouts without adding URL segments
- `(dashboard)/layout.tsx` protects ALL dashboard routes with auth check
- Redirects unauthenticated users to `/signin?redirect=<current-path>`

## 🎯 Current Implementation Status
✅ **Completed**:
- Custom authentication UI (signin/signup forms)
- Role-based user registration (Particulier vs Professionnel)
- Email confirmation flow
- Role-aware Navbar navigation
- Personalized Landing page based on auth state and role
- Dynamic routing based on user role
- Custom auth forms fully functional with Cognito
- **Dashboard Particulier** with:
  - **Sidebar navigation** (collapsible on mobile, fixed on desktop)
  - **Fully responsive** design (mobile, tablet, desktop)
  - Stats cards (Favoris, Recherches, Messages, Notifications)
  - Saved searches management
  - Favorites grid
  - Activity timeline
  - Quick actions card
  - Proper color usage (HEX values: #0891B2, #38BDF8, #10B981)
- **Dashboard routes** with auth protection:
  - `/particulier` - Particulier dashboard (sidebar layout, role-protected)
  - `/pro` - Pro dashboard (role-protected, placeholder)
  - `/pro/properties/new` - Create property (Pro)
  - `/properties/new` - Publish property (Particulier)
  - `/messages` - Messages (placeholder)
  - `/favorites` - Favorites page (placeholder)

⏳ **Pending**:
- Complete Pro dashboard with KPIs, analytics, property management
- Property creation forms (multi-step)
- Messages system (real-time)
- Complete Favorites page with filters
- Notifications page
- Profile and Settings pages
- Property search and listing pages
- Connect dashboards to backend APIs
