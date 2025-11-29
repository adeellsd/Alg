# RentAlg - AI Agent Instructions

> **Real estate marketplace for Algeria** - Next.js 14 + Express + PostgreSQL + AWS  
> Production-ready monorepo with tiered subscription model (FREE/STARTER/PRO/ELITE)

---

## 🏗️ Architecture Overview

**Monorepo Structure:**
- `client/` - Next.js 14 (App Router) frontend with Tailwind v4, Redux Toolkit, AWS Amplify auth
- `server/` - Express.js REST API with Prisma ORM, PostgreSQL + PostGIS, AWS S3 integration

**Key Integration Points:**
- Authentication: AWS Cognito (JWT) → Express middleware validates tokens and fetches user tier from DB
- Frontend-Backend: RTK Query in `client/src/state/api.ts` auto-injects JWT tokens via `prepareHeaders`
- Database: Prisma Client generated types are synced to `client/src/types/prismaTypes.d.ts` via postgenerate hook
- File uploads: Multer → AWS S3 with watermarking via Sharp (backend handles this, not frontend)

**Critical Data Flows:**
1. User signup → Cognito creates user with `custom:role` → Frontend creates DB record on first API call → AuthMiddleware reads real `accountTier` from DB (source of truth)
2. Property search → Frontend RTK Query → `/api/properties` → PropertyController builds Prisma query with filters → Returns transformed data with boost priority sorting
3. Property location privacy → Public coordinates (±500m fuzzy) vs exact coordinates (requires LocationRequest approval)

---

## 🔐 Authentication & Authorization

**Auth Middleware Pattern** (`server/src/middleware/authMiddleware.ts`):
```typescript
// Routes protected by tier
app.use("/particulier", AuthMiddleware(["FREE"]), particulierRoutes);
app.use("/pro", AuthMiddleware(["STARTER", "PRO", "ELITE"]), proRoutes);
app.use("/api/properties", propertyRoutes); // Public + optionalAuthMiddleware
```

**Important:** 
- Cognito `custom:role` is ONLY used for initial user creation fallback
- Database `accountTier` field is the single source of truth for permissions
- Middleware fetches user from DB on every request to validate tier + account status (ACTIVE/SUSPENDED/BANNED)
- If user doesn't exist in DB yet, middleware allows through with default tier, frontend will create them

**Frontend Auth Flow** (`client/src/state/api.ts`):
```typescript
// getAuthUser tries /pro endpoint first (covers STARTER/PRO/ELITE), 
// falls back to /particulier (FREE), then creates user if 404
```

---

## 🗄️ Database Architecture (Prisma Schema v7.0)

**Tier System** (central to all business logic):
```prisma
enum AccountTier {
  FREE      // 3 properties, 8 images, 0 videos
  STARTER   // 25 properties, 15 images, 1 video
  PRO       // NEW tier (mid-tier features)
  ELITE     // Unlimited everything + analytics
}
```

**Key Models:**
- `User` - cognitoId (unique), accountTier, autoApprove (PRO fast-track)
- `Property` - status (DRAFT/PENDING_REVIEW/ACTIVE), coordinates privacy (exact vs public lat/lng)
- `PropertyBoost` - 3 tiers with differential pricing per account tier
- `Location` - Uses PostGIS for spatial queries (radius search, clustering)
- `Conversation` - 1:1 between buyer/seller per property (refactored in v6.0)
- `LocationRequest` - Privacy workflow for exact address sharing

**Critical Indexes:**
- Composite: `(status, propertyType, wilayaId)` on properties for search performance
- Spatial: `GIST(ST_MakePoint(longitude, latitude))` on locations
- Unread messages: `(receiverId, readAt)` WHERE readAt IS NULL

**Known Issue (P1 from AUDIT_REPORT.md):**
- Controllers create `new PrismaClient()` each time → Use singleton pattern from `server/src/lib/prisma.ts` instead

---

## 🎨 Design System v6.0 "Alger Nouvelle Vague"

**Styling Stack:**
- Tailwind CSS v4 with custom theme in `client/src/app/globals.css`
- Shadcn/ui components in `client/src/components/ui/` (customized variants)
- Framer Motion for page transitions and card hovers
- NO inline hex colors - all colors defined in Tailwind theme (60+ semantic colors)

**Design Principles:**
- Mediterranean color palette (primary blue #0ea5e9, teal #14b8a6, warm orange #fb923c)
- Glassmorphism effects: `bg-white/90 backdrop-blur-[20px]`
- Zellige patterns in `/public/patterns/` (SVG overlays at 3-8% opacity)
- Responsive breakpoints: Mobile-first, 480/768/1024/1280px

**⭐ IMPORTANT - Vintage Algiers Theme (USE AS DEFAULT):**
```tsx
// The /properties page has a validated vintage Algiers aesthetic that works exceptionally well
// USE THIS THEME as the default for all new public-facing pages unless explicitly requested otherwise

APPROVED COLOR PALETTE (use these exact colors):
Background gradient: bg-linear-to-b from-[#F5E6D3] via-white to-[#E8D5B7]/20
Decorative divider: bg-linear-to-r from-transparent via-[#CD5C5C] (terracotta)
Title gradient: from-[#0891B2] to-[#40E0D0] (turquoise)
Subtitle text: text-[#6B8E23] (olive green)
Accent gold: #FFD700
Corner borders: border-[#FFD700]

WHEN TO USE THIS THEME:
✅ New public pages (landing sections, about, contact, etc.)
✅ Property-related pages (detail, favorites, saved searches)
✅ Marketing/promotional content
✅ Homepage hero sections and feature showcases

WHEN TO USE DIFFERENT COLORS:
- Dashboard pages (use neutral/professional tones)
- Admin interfaces (use standard design system)
- Forms and data-heavy pages (prioritize usability)
- If user explicitly requests different aesthetic

// Reference implementation: client/src/app/(nondashboard)/properties/page.tsx
// This theme combines warm Mediterranean tones with modern gradients
```

**Component Patterns:**
```tsx
// ALWAYS use cn() for className merging
import { cn } from "@/lib/utils";
<div className={cn("base-classes", conditionalClass && "active-state")} />

// Animations - wave entrance pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
/>
```

**Route Group Layouts:**
- `(auth)/` - Signin/signup, uses AuthProvider
- `(dashboard)/` - Protected routes, shared dashboard layout with sidebar
- `(nondashboard)/` - Public pages (landing, properties list)

---

## 📡 API Conventions

**Backend Route Structure:**
- `/particulier/*` - FREE tier endpoints (protected, single tier)
- `/pro/*` - STARTER/PRO/ELITE endpoints (protected, multiple tiers)
- `/api/properties` - Public search + detail (optionalAuthMiddleware for favorites)
- `/api/config` - Dynamic config (property types, amenities, wilayas) - TODO: Add admin auth

**Request/Response Patterns:**
```typescript
// Search filters - URL query params
GET /api/properties?wilayaId=16&minPrice=5000000&propertyTypes=APARTMENT_F3,APARTMENT_F4

// Response always includes metadata
{
  data: Property[],
  meta: { total: 156, page: 1, limit: 30, hasMore: true },
  filters: { applied: {...}, available: {...} }
}
```

**Image Handling:**
- Frontend sends File → Backend Multer → Sharp watermark → AWS S3 → Returns URLs
- Property images stored as JSONB: `{ url, thumbnailUrl, mediumUrl, largeUrl, blurhash }`
- Extract thumbnail via `extractThumbnailUrl()` helper in PropertyController

**Known Gaps (from AUDIT_REPORT.md):**
- No rate limiting on public endpoints (P1 priority)
- Input validation incomplete server-side (P0 priority - add Zod schemas)

---

## 🚀 Development Workflows

**Starting dev servers:**
```bash
# Terminal 1 - Frontend (Next.js)
cd client && npm run dev
# → http://localhost:3000

# Terminal 2 - Backend (Express)
cd server && npm run dev
# → Compiles TS + starts nodemon on http://localhost:4000 (or PORT from .env)
```

**Database workflows:**
```bash
cd server

# Apply migrations
npx prisma migrate dev --name description_of_change

# Regenerate client (auto-syncs types to frontend via postgenerate hook)
npm run prisma:generate

# Seed development data (wilayas, communes, config tables)
npm run seed
```

**Type Safety:**
- Backend generates `@prisma/client` types
- Frontend imports from `@/types/prismaTypes.d.ts` (auto-synced)
- `strict: true` in both tsconfigs
- Known issue: 516 ESLint errors in prismaTypes.d.ts → Add to `.eslintignore`

**Environment variables:**
- Backend: `DATABASE_URL`, AWS credentials, Cognito pool ID/region/issuer
- Frontend: `NEXT_PUBLIC_API_BASE_URL` (default: http://localhost:4000), Cognito config
- Never commit `.env` files - use `.env.example` templates

---

## 🎯 Business Logic Patterns

**Property Search Algorithm:**
1. Build Prisma `where` clause from filters (wilaya, commune, price range, amenities)
2. Apply boost tier sorting: `TIER_3_ULTRA > TIER_2_PREMIUM > TIER_1_EN_AVANT > NONE`
3. Secondary sort by date or price
4. Transform: Extract thumbnail URLs, format prices, add isFavorited if authed

**Tier Limit Enforcement:**
```typescript
// Before creating property, check:
const activeCount = await prisma.property.count({
  where: { ownerId: userId, status: { in: ['ACTIVE', 'PENDING_REVIEW'] }}
});

const limits = { FREE: 3, STARTER: 25, PRO: 50, ELITE: Infinity };
if (activeCount >= limits[user.accountTier]) throw new Error('Limit reached');
```

**Location Privacy Workflow:**
1. Property stores `exactLatitude/exactLongitude` + `publicLatitude/publicLongitude` (±500m offset)
2. Public API returns public coords only
3. Interested user sends `LocationRequest` → Owner approves → Requester sees exact coords for 24h

**Boost Pricing (per tier):**
- Defined in `BoostPricingConfig` table (dynamic, not hardcoded)
- Example: TIER_1 costs 500 DA for FREE users, 400 DA for STARTER users
- Query pricing: Join Property → User → BoostPricingConfig filtered by tier

---

## 📝 Code Style & Conventions

**Frontend:**
- Server Components by default (use `"use client"` sparingly - only for hooks/state)
- File naming: `PascalCase.tsx` for components, `kebab-case.ts` for utils
- Import alias: `@/` maps to `client/src/`
- Form validation: React Hook Form + Zod schemas in `lib/schemas.ts`

**Backend:**
- Controllers: Business logic only, delegate DB calls to separate service layer (TODO: Refactor - currently mixed)
- Error handling: Use try/catch, return `res.status(code).json({ message, error? })`
- Prisma queries: ALWAYS use `include` to avoid N+1 (see AUDIT_REPORT.md warning)

**Shared:**
- Use TypeScript `interface` over `type` for object shapes
- Async/await over .then() chains
- Destructure props in function signatures
- Comments: JSDoc for public APIs, inline for complex logic

---

## 🐛 Known Issues & TODOs

**From AUDIT_REPORT.md (prioritized):**
1. **P0** - Add Zod validation on all server endpoints (currently client-side only)
2. **P0** - Fix 516 ESLint errors: Add `src/types/prismaTypes.d.ts` to `.eslintignore`
3. **P1** - Implement rate limiting (express-rate-limit on public routes)
4. **P1** - Refactor controllers to use singleton Prisma client from `lib/prisma.ts`
5. **P1** - Add indexes for N+1 query prevention in PropertyController
6. **P2** - Add unit/E2E tests (currently zero test coverage)
7. **P2** - Self-host Google Fonts (privacy/latency issue)

**Feature Gaps:**
- No admin dashboard for moderation (properties go to PENDING_REVIEW but no UI to approve)
- Messaging system exists in schema but no frontend implementation
- Boost system backend ready, payment integration incomplete (Chargily Pay stub)

---

## 🔍 Key Files Reference

**Must-read for context:**
- `server/prisma/schema.prisma` - Complete data model (2018 lines, 60+ models)
- `server/src/middleware/authMiddleware.ts` - Auth logic, tier validation
- `server/src/controllers/propertyController.ts` - Search algorithm, boost sorting
- `client/src/state/api.ts` - RTK Query endpoints, auth flow
- `client/src/app/globals.css` - Design system color tokens
- `AUDIT_REPORT.md` - Technical debt, performance issues, security gaps
- `README.md` - Full project documentation (stack, features, deployment)

**Quick navigation:**
- Frontend components: `client/src/components/ui/` (Shadcn), `/dashboard/`, `/auth/`
- Backend routes: `server/src/routes/*.ts`
- Seed data: `server/prisma/seedData/*.json` (58 wilayas, 1541 communes, etc.)

---

## 💡 Tips for AI Agents

1. **Before editing server code:** Check if Prisma schema needs migration
2. **Before adding new endpoint:** Verify tier permissions required, update AuthMiddleware if needed
3. **When working with properties:** Remember exact vs public coordinates - don't accidentally expose exact location
4. **Design system changes:** Update `globals.css` theme, not inline styles - keep HEX→Tailwind token conversion
5. **Database queries:** Always consider tier limits (FREE=3 properties, etc.) - enforce in both frontend UX and backend validation
6. **Testing changes:** Both servers must be running, check browser network tab for CORS/auth errors

**Common pitfall:** Frontend RTK Query caches aggressively - invalidate tags or use `refetch()` when testing mutations

---

## 🔍 Property Filtering System - Intelligent & Contextual

**Critical Implementation:** The property filtering system must be **intelligent and context-aware** based on property type selected.

### Transaction Type Logic (MANDATORY)

```typescript
// Level 1: ALWAYS VISIBLE
[Acheter] [Louer]

// Level 2: CONDITIONAL (only if "Louer" selected)
IF transactionGroup === "RENT":
  Show period selector: [Journalière] [Mensuelle] [Annuelle]
  
State management:
- "Acheter" → transactionType = "SALE", transactionGroup = undefined
- "Louer" → transactionType = "", transactionGroup = "RENT"
- "Mensuelle" → transactionType = "RENT_MONTHLY"
- "Journalière" → transactionType = "RENT_DAILY"
- "Annuelle" → transactionType = "RENT_YEARLY"
```

### Filter Contexts (Property Type-Based)

```typescript
// Define in lib/filter-config.ts
APARTMENT: {
  availableFilters: ['price', 'surface', 'rooms', 'bedrooms', 'bathrooms', 
                     'floor', 'elevator', 'view', 'amenities', 'buildingAge']
  // NO landArea, NO terrain-specific filters
}

VILLA/HOUSE: {
  availableFilters: ['price', 'surface', 'landArea', 'rooms', 'bedrooms',
                     'amenities', 'view']
  // NO floor, NO elevator
}

TERRAIN: {
  availableFilters: ['price', 'landArea', 'legalDocs', 'proximities']
  // NO rooms, NO bedrooms, NO bathrooms
}

LOCAL_COMMERCIAL: {
  availableFilters: ['price', 'surface', 'amenities', 'legalDocs']
  // Specific amenities: vitrine, parking client
}

GARAGE: {
  availableFilters: ['price', 'surface', 'amenities']
  // Minimal filters
}
```

### Intelligent Reset Logic

```typescript
// When propertyType changes:
IF newPropertyType !== oldPropertyType:
  RESET incompatible filters:
  - floor/elevator (if moving away from apartment)
  - landArea (if moving to apartment)
  - amenities[] (context changes)

// When transactionGroup changes:
IF "RENT" → "SALE":
  RESET: minRentDuration, rentDeposit
  SHOW: priceNegotiable

IF "SALE" → "RENT":
  RESET: priceNegotiable
  SHOW: minRentDuration, rentDeposit
```

### Sidebar Specifications

**Width:** 360px (FIXED - no text truncation)
**Position:** `sticky` with `top: NAVBAR_HEIGHT + 20px`
**Conditional Rendering:** Use `shouldShowFilter(filterName)` based on active context

```typescript
// Implementation pattern
const shouldShowFilter = (filterName: string): boolean => {
  if (!activeContext) return false;
  return activeContext.availableFilters.includes(filterName);
};

// In sidebar component
{shouldShowFilter('floor') && (
  <FloorFilter />
)}
```

### Contextual Amenities

```typescript
// Define in lib/filter-config.ts
CONTEXTUAL_AMENITIES = {
  APARTMENT: ['ASCENSEUR', 'BALCON', 'TERRASSE', 'PARKING', 'CAVE'],
  VILLA: ['JARDIN', 'PISCINE', 'GARAGE', 'PORTAIL_ELECTRIQUE'],
  TERRAIN: ['EAU', 'ELECTRICITE', 'GAZ', 'ASSAINISSEMENT'],
  LOCAL_COMMERCIAL: ['VITRINE', 'PARKING_CLIENT', 'CLIMATISATION'],
  GARAGE: ['SECURISE', 'ELECTRICITE', 'VIDEO_SURVEILLANCE']
}
```

### Hero Search Integration

```tsx
// Hero must update sidebar state bidirectionally
<HeroSearchSection
  filters={filters}
  onFiltersChange={handleFiltersChange} // Shared state
  activeContext={activeContext}
/>

// Transaction buttons in hero
<div className="grid grid-cols-2 gap-3">
  <Button 
    onClick={() => handleFiltersChange({ 
      transactionType: 'SALE', 
      transactionGroup: undefined 
    })}
  >
    Acheter
  </Button>
  <Button 
    onClick={() => handleFiltersChange({ 
      transactionType: '', 
      transactionGroup: 'RENT' 
    })}
  >
    Louer
  </Button>
</div>

{/* Conditional rental period */}
<AnimatePresence>
  {filters.transactionGroup === 'RENT' && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      {/* Rental period buttons */}
    </motion.div>
  )}
</AnimatePresence>
```

### Complete SearchFilters Interface

```typescript
// types/property-frontend.ts
export interface SearchFilters {
  // CORE
  transactionType: TransactionType | ''
  transactionGroup?: 'SALE' | 'RENT'
  propertyTypes: PropertyType[]
  wilayaId: string
  communeId: string
  
  // BUDGET
  minPrice?: number
  maxPrice?: number
  
  // DIMENSIONS
  minSurface?: number
  maxSurface?: number
  minLandArea?: number
  maxLandArea?: number
  
  // ROOMS (residential)
  minRooms?: number
  minBedrooms?: number
  minBathrooms?: number
  
  // FLOORS (apartments only)
  minFloor?: number
  maxFloor?: number
  hasElevator?: boolean
  excludeGroundFloor?: boolean
  excludeTopFloor?: boolean
  
  // CONSTRUCTION
  maxBuildingAge?: number
  minConstructionYear?: number
  
  // VIEW
  viewTypes?: ViewType[]
  
  // PROXIMITIES (in meters)
  maxDistanceToSchool?: number
  maxDistanceToTransport?: number
  maxDistanceToShops?: number
  
  // LEGAL DOCS
  hasLivretFoncier?: boolean
  hasActeVente?: boolean
  hasPermisConstruction?: boolean
  arePapersComplete?: boolean
  
  // AMENITIES (contextual)
  amenities?: string[]
  
  // RENTAL SPECIFIC
  minRentDuration?: number
  maxRentDeposit?: number
  
  // SALE SPECIFIC
  isNegotiable?: boolean
  
  // SORTING & PAGINATION
  sortBy: string
  page?: number
  limit?: number
}
```

### File Structure

```
lib/
  filter-config.ts          # NEW: Context definitions, amenities mapping

components/ui/
  filter-sidebar-intelligent.tsx  # RENAME from filter-sidebar-vintage.tsx
  
app/(nondashboard)/properties/
  page.tsx                  # Refactored with intelligent filtering
  
types/
  property-frontend.ts      # Extended SearchFilters interface
```

### Validation Checklist

Before considering implementation complete:

**Logic:**
- ✅ Acheter/Louer works correctly
- ✅ Rental period appears ONLY when "Louer" selected
- ✅ Property type change resets incompatible filters
- ✅ Transaction type change resets correct fields
- ✅ Amenities filtered by context
- ✅ Floor/Elevator only for apartments
- ✅ Land area only for houses/terrain

**UI:**
- ✅ Sidebar 360px width (no text truncation)
- ✅ All labels readable
- ✅ Vintage Algiers theme colors preserved
- ✅ Smooth animations (Framer Motion)
- ✅ Mobile: Sheet with same logic

**Technical:**
- ✅ TypeScript types correct and exhaustive
- ✅ No `any` types
- ✅ Performance optimized (useMemo, useCallback)
- ✅ Code commented at critical points