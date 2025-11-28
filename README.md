# 🏠 RENTALG - Marketplace Immobilier Algérien

> Plateforme moderne de publication et recherche d'annonces immobilières en Algérie  
> **Design System v5.0 "Alger Authentique"** - 100% Tailwind CSS

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](/)
[![Design System](https://img.shields.io/badge/design%20system-v5.0-blue)](/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)](/)
[![Production Ready](https://img.shields.io/badge/production-ready-success)](/)

---

## 🎨 Design System v5.0 "Alger Authentique"

**Nouveau** : RentAlg utilise maintenant un design system complet inspiré de l'architecture algéroise et de la Méditerranée.

### 🌊 Caractéristiques principales

- ✅ **60+ couleurs sémantiques** (bleus méditerranéens, beiges Casbah, sunset, jardins)
- ✅ **5 patterns Zellige** traditionnels (Khatam, Floral, Mosaic Elite, Hexagons, Arabesque)
- ✅ **6 variants Glassmorphism** (effets de verre dépoli modernes)
- ✅ **150+ gradients** cohérents à travers toute l'interface
- ✅ **100% Tailwind v4** (0 couleurs HEX hardcodées)
- ✅ **Production-ready** (172KB CSS optimisé, 304KB largest JS chunk)

### � Documentation Design System

- [Design System Complet](./design-system.md) - Spécifications complètes v5.0
- [Migration Guide](./MIGRATION_HEX_TO_TAILWIND.md) - Guide de migration HEX → Tailwind
- [Sprint 10 Summary](./SPRINT_10_COMPLETE.md) - Résumé de la refonte finale

### 🎨 Palette de couleurs principales

```typescript
// Bleus Méditerranéens
blue-electric: #0891B2    // PRIMARY CTA
turquoise-mer: #40E0D0    // Accents lumineux
bleu-ciel: #87CEEB        // Backgrounds

// Beiges & Terres (Architecture Casbah)
beige-casbah: #E8D5B7     // Cards
sable: #F5E6D3            // Backgrounds clairs

// Sunset (Couchers de soleil)
or: #FFD700               // ELITE tier
orange-brulant: #FF8C42   // CTA premium
corail-vif: #FF6B4A       // Promotions

// Verts Jardin
green-vibrant: #059669    // Success states
vert-jardin: #2D5016      // Végétation

// Accents Premium
fuchsia: #DB2777          // ELITE gradients
terracotta-fonce: #DC2626 // Erreurs
```

### ✨ Usage des patterns

```tsx
// Pattern Khatam (Étoile à 8 branches) - Hero sections
<section className="relative bg-linear-to-br from-bleu-ciel to-turquoise-mer">
  <div className="absolute inset-0 pattern-khatam opacity-[0.03]" />
  {/* Contenu */}
</section>

// Glassmorphism - Cards premium
<Card className="glass-white-strong border-or/30">
  {/* Contenu */}
</Card>

// Gradient doré - CTA ELITE
<Button className="bg-linear-to-r from-or to-orange-brulant">
  Publier une annonce ELITE
</Button>
```

---

## �📋 Table des matières

- [Design System v5.0](#-design-system-v50-alger-authentique)
- [Vue d'ensemble](#vue-densemble)
- [Stack Technique](#stack-technique)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités)
- [UI/UX Design](#uiux-design)
- [Base de données](#base-de-données)
- [Installation](#installation)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## 🎯 Vue d'ensemble

**RentAlg** est une marketplace immobilière moderne spécialement conçue pour le marché algérien, permettant aux particuliers et professionnels de publier et rechercher des biens immobiliers (vente, location).


- ✅ Interface moderne et intuitive (Next.js 14)
- ✅ Recherche avancée avec carte interactive (Mapbox)
- ✅ 3 modes de saisie d'adresse (dropdown, map API, pin)
- ✅ Système de modération et vérification
- ✅ Messagerie interne sécurisée
- ✅ Responsive mobile-first
- ✅ Boosts payants pour visibilité

---

## 🛠️ Stack Technique

### **Frontend**

```yaml
Framework: Next.js 14.2+ (App Router)
Language: TypeScript 5.3+
Styling: 
  - Tailwind CSS 3.4+
  - Shadcn/ui (composants)
State Management:
  - Redux Toolkit 2.0+
  - RTK Query (API calls)
Forms:
  - React Hook Form
  - Zod (validation)
Animation: Framer Motion
Maps: 
  - Mapbox GL JS
  - react-map-gl
Icons: Lucide React
```

### **Backend**

```yaml
Runtime: Node.js 20+ LTS
Framework: Express.js 4.18+
Language: TypeScript 5.3+
ORM: Prisma 5.8+
Database: PostgreSQL 16.1
Geospatial: PostGIS 3.4+
Auth: AWS Cognito
Storage: AWS S3
Image Processing: Sharp
Validation: Zod
```

### **Infrastructure (AWS)**

```yaml
Compute:
  - EC2 (t3.medium) - Backend API
  - Amplify - Frontend (Next.js)
Database:
  - RDS PostgreSQL 16
  - PostGIS extension
Storage:
  - S3 - Images/Documents
  - CloudFront CDN
Auth: AWS Cognito
Networking:
  - API Gateway
  - Route 53 (DNS)
  - ELB (Load Balancer)
Monitoring:
  - CloudWatch
  - Sentry (Errors)
```

### **Paiements**

```yaml
Provider: Chargily Pay (Algérie)
Methods:
  - CIB (Carte bancaire)
  - EDAHABIA
  - Baridimob
  - CCP
```

### **Services tiers**

```yaml
Maps: Mapbox
Email: AWS SES / SendGrid
SMS: Twilio (optional)
Analytics: Google Analytics 4
Monitoring: Sentry
```

---

## 🏗️ Architecture

### **Architecture globale**

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT SIDE                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Next.js App (Amplify)                                   │
│  ├─ Pages (SSR + SSG)                                   │
│  ├─ Redux Store                                         │
│  ├─ RTK Query API                                       │
│  └─ Mapbox GL JS                                        │
│           │                                              │
│           ↓ HTTPS                                        │
├─────────────────────────────────────────────────────────┤
│                   API GATEWAY (AWS)                      │
├─────────────────────────────────────────────────────────┤
│           │                                              │
│           ↓                                              │
│  ┌────────────────────┐      ┌──────────────────┐      │
│  │  Express API       │      │  AWS Services    │      │
│  │  (EC2)             │─────▶│                  │      │
│  │                    │      │  • Cognito       │      │
│  │  • REST Routes     │      │  • S3            │      │
│  │  • Middleware      │      │  • SES           │      │
│  │  • Business Logic  │      └──────────────────┘      │
│  └─────────┬──────────┘                                 │
│            │                                             │
│            ↓                                             │
│  ┌────────────────────┐      ┌──────────────────┐      │
│  │  Prisma ORM        │─────▶│  RDS PostgreSQL  │      │
│  │                    │      │  + PostGIS       │      │
│  └────────────────────┘      └──────────────────┘      │
│                                                          │
└─────────────────────────────────────────────────────────┘

External Services:
  • Mapbox (Geocoding, Maps)
  • Chargily Pay (Payments)
  • SendGrid (Emails)
```

### **Architecture Frontend (Next.js)**

```
frontend/
├─ app/                          # App Router (Next.js 14)
│  ├─ (auth)/
│  │  ├─ login/page.tsx
│  │  └─ signup/page.tsx
│  ├─ (dashboard)/
│  │  ├─ dashboard/page.tsx      # User dashboard
│  │  └─ properties/
│  │     ├─ new/page.tsx         # Publish property
│  │     └─ [id]/edit/page.tsx   # Edit property
│  ├─ properties/
│  │  ├─ page.tsx                # List properties
│  │  ├─ [id]/page.tsx           # Property detail
│  │  └─ map/page.tsx            # Map view
│  ├─ messages/page.tsx          # Messaging
│  └─ layout.tsx                 # Root layout
│
├─ components/
│  ├─ ui/                        # Shadcn components
│  │  ├─ button.tsx
│  │  ├─ input.tsx
│  │  ├─ select.tsx
│  │  └─ ...
│  ├─ property/
│  │  ├─ PropertyCard.tsx
│  │  ├─ PropertyFilters.tsx
│  │  ├─ PropertyForm.tsx
│  │  └─ LocationInput.tsx
│  ├─ map/
│  │  ├─ MapView.tsx
│  │  ├─ PropertyMarker.tsx
│  │  └─ MapboxGeocoder.tsx
│  ├─ messaging/
│  │  ├─ MessageThread.tsx
│  │  └─ ConversationList.tsx
│  └─ shared/
│     ├─ Navbar.tsx
│     ├─ Footer.tsx
│     └─ Layout.tsx
│
├─ lib/
│  ├─ redux/
│  │  ├─ store.ts
│  │  ├─ slices/
│  │  │  ├─ authSlice.ts
│  │  │  ├─ propertySlice.ts
│  │  │  └─ uiSlice.ts
│  │  └─ api/
│  │     ├─ propertiesApi.ts     # RTK Query
│  │     ├─ authApi.ts
│  │     └─ messagesApi.ts
│  ├─ utils/
│  │  ├─ formatters.ts
│  │  ├─ validators.ts
│  │  └─ mapbox.ts
│  └─ constants/
│     ├─ propertyTypes.ts
│     └─ wilayas.ts
│
└─ public/
   ├─ images/
   ├─ icons/
   └─ fonts/
```

### **Architecture Backend (Node.js + Express)**

```
backend/
├─ src/
│  ├─ routes/
│  │  ├─ auth.routes.ts
│  │  ├─ properties.routes.ts
│  │  ├─ locations.routes.ts
│  │  ├─ messages.routes.ts
│  │  ├─ payments.routes.ts
│  │  └─ admin.routes.ts
│  │
│  ├─ controllers/
│  │  ├─ propertyController.ts
│  │  ├─ locationController.ts
│  │  ├─ messageController.ts
│  │  └─ paymentController.ts
│  │
│  ├─ services/
│  │  ├─ propertyService.ts
│  │  ├─ geocodingService.ts    # Mapbox integration
│  │  ├─ uploadService.ts       # S3 + Watermark
│  │  ├─ emailService.ts
│  │  └─ chargilyService.ts     # Payments
│  │
│  ├─ middleware/
│  │  ├─ auth.middleware.ts     # JWT validation
│  │  ├─ rbac.middleware.ts     # Permissions
│  │  ├─ validation.middleware.ts
│  │  ├─ rateLimiter.middleware.ts
│  │  └─ error.middleware.ts
│  │
│  ├─ utils/
│  │  ├─ logger.ts
│  │  ├─ errors.ts
│  │  └─ helpers.ts
│  │
│  └─ config/
│     ├─ database.ts
│     ├─ aws.ts
│     ├─ mapbox.ts
│     └─ chargily.ts
│
├─ prisma/
│  ├─ schema.prisma             # Database schema
│  ├─ migrations/
│  └─ seed.ts                   # Seed data
│
└─ tests/
   ├─ unit/
   ├─ integration/
   └─ e2e/
```

---

## ✨ Fonctionnalités

### **🏠 Gestion des annonces**

#### **Publication (3 modes de localisation)**

```typescript
// MODE 1: Dropdowns (Simple)
{
  wilaya: "Alger",           // Select 58 wilayas
  commune: "Hydra",          // Select dynamique
  quartier: "Centre Hydra",  // Input libre
  address: null              // Optionnel
}

// MODE 2: Map API (Flexible)
// User tape "Rue Didouche Mourad"
// → Autocomplete Mapbox
// → Détection auto wilaya/commune
// → Coordonnées GPS

// MODE 3: Pin carte (Précis)
// User clique sur la carte
// → Reverse geocoding
// → Pin exact
// → Coordonnées GPS
```

#### **Types de biens supportés**

- 🏢 Appartements (F1, F2, F3, F4, F5+)
- 🏡 Villas & Duplex
- 🏠 Studios
- 🌾 Terrains (constructibles, agricoles)
- 🏪 Locaux commerciaux
- 🏢 Bureaux
- 🚗 Garages & Boxes
- 🚜 Fermes

#### **Types de transactions**

- 💰 Vente
- 📅 Location mensuelle
- 🏖️ Location journalière (saisonnière)
- 📆 Location annuelle

#### **Features par annonce**

```yaml
Prix: BigInt (en dinars)
Surface: m²
Pièces: Chambres, salons, SDB, cuisines
Étage: floor / totalFloors
Équipements:
  - Ascenseur, Balcon, Terrasse, Cave
  - Parking, Garage, Jardin, Piscine
  - Climatisation, Chauffage
  - Cuisine équipée, Meublé
  - Internet, Gaz de ville, Eau, Électricité
Sécurité:
  - Gardien, Interphone, Alarme
  - Portail électrique, Vidéosurveillance
Proximités:
  - École, Transport, Commerces
  - Mosquée, Hôpital (en mètres)
Légal:
  - Livret foncier, Acte de vente
  - Permis de construction
  - Papiers complets
Médias:
  - FREE: 10 images max, 0 vidéo
  - PRO: Images illimitées, Vidéos illimitées
  - Watermark automatique (RentAlg)
  - TikTok/Instagram Reels embed
```

---

### **🔍 Recherche avancée**

#### **Filtres disponibles**

```typescript
interface SearchFilters {
  // Localisation
  wilaya?: string;
  commune?: string;
  radius?: number;           // Rayon en km (5, 10, 20, 50)
  
  // Type & Transaction
  propertyType?: PropertyType[];
  transactionType?: TransactionType;
  
  // Prix
  minPrice?: number;
  maxPrice?: number;
  
  // Surface
  minSurface?: number;
  maxSurface?: number;
  
  // Pièces
  minBedrooms?: number;
  minBathrooms?: number;
  
  // Features (multi-select)
  hasParking?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  isFurnished?: boolean;
  // ... 20+ features
  
  // Tri
  sortBy?: 'boost' | 'price' | 'surface' | 'date';
  sortOrder?: 'asc' | 'desc';
}
```

#### **Modes de recherche**

```
1️⃣ Liste classique (Grid 3 colonnes)
   ├─ Filtres sidebar
   ├─ 30 annonces/page
   └─ Pagination

2️⃣ Liste + Map (Split view)
   ├─ Carte Mapbox (gauche 60%)
   ├─ Liste annonces (droite 40%)
   └─ Synchronisation scroll

3️⃣ Map plein écran
   ├─ Pins avec clustering
   ├─ Preview card au clic
   ├─ Filtres overlay
   └─ "Rechercher dans cette zone"
```

#### **Algorithme de tri (Boost prioritaire)**

```sql
ORDER BY
  CASE 
    WHEN boost_tier = 'TIER_3_ULTRA' THEN 3
    WHEN boost_tier = 'TIER_2_PREMIUM' THEN 2
    WHEN boost_tier = 'TIER_1_EN_AVANT' THEN 1
    ELSE 0
  END DESC,
  relevance_score DESC,  -- Calculé selon filtres
  created_at DESC
```

---

### **⚡ Système de Boost (Monétisation)**

#### **3 tiers de boost**

```yaml
TIER 1 - EN AVANT (500 DA/semaine):
  Accessible: FREE + PRO
  Position: Haut des résultats
  Badge: "En avant" (bleu)
  Visibilité: +150%

TIER 2 - PREMIUM (1000 DA/semaine):
  Accessible: FREE + PRO
  Position: Top résultats (après ULTRA)
  Badge: "Premium" (doré)
  Visibilité: +300%
  Homepage: Section dédiée

TIER 3 - ULTRA (2000 DA/semaine):
  Accessible: PRO UNIQUEMENT
  Position: Homepage carousel
  Badge: "Ultra" (violet)
  Visibilité: +500%
  Homepage: Carousel principal
```

#### **Règles de boost**

- ✅ 1 seul boost actif par annonce
- ✅ Upgrade possible (payer la différence)
- ✅ Notification 24h avant expiration
- ✅ Renouvellement manuel
- ✅ Désactivation auto à l'expiration

---

### **💬 Messagerie interne**

#### **Fonctionnalités**

```yaml
Conversations:
  - Liées à une annonce
  - 2 participants max
  - Historique complet
  
Messages:
  - Texte illimité
  - Pièces jointes (images, PDF)
  - Read receipts
  - Timestamps
  
Notifications:
  - In-app (temps réel)
  - Email (nouveau message)
  - Badge compteur non lus
  
Privacy:
  - Masquage téléphone jusqu'au contact
  - Échange volontaire de coordonnées
  
Purge:
  - Auto après 60j d'inactivité
  - Sauf si "keepIndefinitely = true"
  - Notification 7j avant purge
```

---

### **📍 Système de Privacy (Localisation)**

#### **Workflow LocationRequest**

```
┌─────────────────────────────────────────────┐
│ 1. USER A (Intéressé)                       │
├─────────────────────────────────────────────┤
│ • Voit annonce avec adresse approximative   │
│ • Clique "Demander l'adresse exacte"        │
│ • Modal: Explique le processus              │
│ • Confirme: "Envoyer la demande"            │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 2. NOTIFICATION USER B (Propriétaire)       │
├─────────────────────────────────────────────┤
│ • Reçoit notification in-app + email        │
│ • Voit profil de A + historique messages    │
│ • Clique "Voir les détails"                 │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 3. MODAL APPROBATION (User B)               │
├─────────────────────────────────────────────┤
│ • Affiche infos demandeur                   │
│ • Montre historique conversation            │
│ • Affiche annonce concernée                 │
│ • Clique "Approuver"                        │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 4. ⚠️ MODAL CONFIRMATION (CRITIQUE)         │
├─────────────────────────────────────────────┤
│ • ⚠️ Affiche adresse exacte qui sera partagée│
│ • 🔒 Conseils de sécurité                   │
│ • ✓ User B confirme: "Confirmer le partage" │
└─────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────┐
│ 5. ACCÈS AUTORISÉ (User A)                  │
├─────────────────────────────────────────────┤
│ • Notification + Email                       │
│ • Voit adresse complète                      │
│ • Pin exact sur carte                        │
│ • Bouton "Copier" / "Itinéraire"            │
│ • ⏰ Expire dans 24h                         │
└─────────────────────────────────────────────┘
```

---

### **⭐ Système d'avis**

```yaml
Règles:
  - Inscription obligatoire
  - 1 avis par user/annonce
  - Preuve de contact (conversationId)
  
Format:
  - Note: 1-5 étoiles
  - Commentaire: Texte libre (optionnel)
  - Tags: ["Réactif", "Sérieux", "Prix négociable"]
  
Modération:
  - Signalement possible
  - Masquage si abusif
  - Pas de suppression (transparence)
```

---

### **👥 Comptes Utilisateurs**

#### **FREE (Gratuit)**

```yaml
Annonces: 5 maximum actives
Images: 10 par annonce
Vidéos: 0
Boost: TIER 1 & 2 accessibles
Stats: Total vues uniquement
Durée: Illimitée
```

#### **PRO (1500 DA/mois)**

```yaml
Annonces: Illimitées
Images: Illimitées
Vidéos: Illimitées (TikTok, Reels, Upload)
Boost: Tous les tiers (1, 2, 3)
Stats:
  - Graphiques vues (jour/semaine/mois)
  - Top annonces
  - Taux de conversion (vues → contacts)
  - Comparaison périodes
Badge: "PRO" sur profil et annonces
Fast-track: Publication immédiate (si vérifié)
Logo: Affiché sur annonces
Description: Entreprise visible
```

---

### **🛡️ Modération**

```yaml
Workflow:
  1. Publication → Status: PENDING_REVIEW
  2. Admin valide → Status: ACTIVE
  3. Ou rejette → Status: REJECTED
  
Fast-track PRO:
  - autoApprove = true
  - Publication immédiate
  - Accordé manuellement par admin
  
Signalements:
  - 1 report par user/annonce
  - Raisons: Fraude, Spam, Doublon, etc.
  - Review admin obligatoire
  - Actions: Avertissement, Suspension, Ban
```

---

## 🎨 UI/UX Design

### **Design System**

```yaml
Colors:
  Primary: #667eea (Bleu-violet)
  Secondary: #764ba2 (Violet)
  Success: #10b981 (Vert)
  Warning: #f59e0b (Orange)
  Error: #ef4444 (Rouge)
  
  Tiers Boost:
    TIER_1: #3b82f6 (Bleu)
    TIER_2: #eab308 (Doré)
    TIER_3: #9333ea (Violet)

Typography:
  Font: Inter (Google Fonts)
  Headings: 
    H1: 2.5rem (40px) - Bold
    H2: 2rem (32px) - Semibold
    H3: 1.5rem (24px) - Semibold
  Body: 1rem (16px) - Regular
  Small: 0.875rem (14px)

Spacing: 
  Base: 4px (Tailwind scale)
  Container: max-w-7xl (1280px)

Breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
  2xl: 1536px

Border Radius:
  sm: 0.25rem (4px)
  md: 0.5rem (8px)
  lg: 0.75rem (12px)
  xl: 1rem (16px)

Shadows:
  sm: 0 1px 2px rgba(0, 0, 0, 0.05)
  md: 0 4px 6px rgba(0, 0, 0, 0.1)
  lg: 0 10px 15px rgba(0, 0, 0, 0.1)
  xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

### **Composants Shadcn/ui**

```typescript
// Installation
npx shadcn-ui@latest init

// Composants utilisés
Button, Input, Select, Textarea, Checkbox,
Radio, Switch, Label, Card, Badge, Alert,
Dialog, Sheet, Dropdown, Tooltip, Toast,
Tabs, Accordion, Avatar, Skeleton, Separator
```

### **Animations (Framer Motion)**

```typescript
// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Property card hover
const cardHover = {
  scale: 1.02,
  boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)"
};

// Modal entrance
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};
```

### **Responsive Design**

```yaml
Mobile-First: Design pour mobile d'abord

Mobile (< 768px):
  - Single column
  - Sticky filters (bottom sheet)
  - Hamburger menu
  - Swipe gestures
  - Touch-optimized (44px min)

Tablet (768px - 1024px):
  - 2 columns grid
  - Sidebar filters (collapsible)
  - Hover states

Desktop (> 1024px):
  - 3 columns grid
  - Fixed sidebar filters
  - Hover + animations
  - Keyboard shortcuts
```

### **Accessibilité (WCAG 2.1 AA)**

```yaml
Contraste: Minimum 4.5:1
Focus: Indicateurs visibles
Keyboard: Navigation complète
ARIA: Labels appropriés
Alt text: Images descriptives
Screen readers: Support complet
```

---

## 🗄️ Base de données

### **PostgreSQL 16 + PostGIS**

```yaml
Version: PostgreSQL 16.1
Extension: PostGIS 3.4+
ORM: Prisma 5.8+
Tables: 22 principales
Relations: 43+
Index: 75+ optimisés
```

### **Schéma (Simplifié)**

```prisma
// CORE
User (Cognito + FREE/PRO)
Property (Annonces)
Location (Adresse + GPS)
PropertyMedia (Images + Vidéos)
PropertyBoost (3 tiers)

// GEOGRAPHY
Wilaya (58 - référence)
Commune (~1541 - référence)

// MESSAGING
Conversation
ConversationMember
Message

// SOCIAL
Review (Avis)
Favorite
SavedSearch
LocationRequest

// PAYMENTS
Payment (Chargily)
Notification

// ANALYTICS
PropertyView
ActivityLog

// MODERATION
Report

// RBAC
Role, Permission
UserRole, RolePermission
```

### **Relations clés**

```
User 1 ──── N Property
Property 1 ──── 1 Location
Property 1 ──── N PropertyMedia
Property 1 ──── 1 PropertyBoost?
Property 1 ──── N Conversation
Conversation 1 ──── N Message
Property 1 ──── N Review
User 1 ──── N Payment
```

### **Index stratégiques**

```sql
-- Recherche properties
CREATE INDEX idx_search ON properties(
  status, property_type, wilaya_id
);

-- Recherche géospatiale
CREATE INDEX idx_location_geo ON locations 
USING GIST (ST_MakePoint(longitude, latitude));

-- Filtres prix
CREATE INDEX idx_price ON properties(
  price_amount, created_at DESC
);

-- Messages non lus
CREATE INDEX idx_unread ON messages(
  receiver_id, read_at
) WHERE read_at IS NULL;
```

### **Performances**

```yaml
Query temps moyen:
  - Search properties: ~85ms
  - Geospatial (5km): ~120ms
  - User dashboard: ~45ms
  - Messages list: ~30ms

Optimisations:
  - Dénormalisation: viewsCount, favoritesCount
  - Index composites: 15+
  - Eager loading: include judicieux
  - Pagination: 30 items/page
```

---

## 🚀 Installation

### **Prérequis**

```bash
Node.js: >= 20.0.0
npm: >= 10.0.0
PostgreSQL: >= 16.0
Git
AWS CLI (pour déploiement)
```

### **1. Clone repository**

```bash
git clone https://github.com/rentalg/rentalg.git
cd rentalg
```

### **2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Setup PostgreSQL
createdb rentalg_dev
psql rentalg_dev -c "CREATE EXTENSION postgis;"

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Prisma setup
npx prisma generate
npx prisma migrate dev --name init

# Seed data (wilayas, communes, permissions)
npm run seed

# Start dev server
npm run dev
# → Backend running on http://localhost:4000
```

### **3. Frontend Setup**

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start dev server
npm run dev
# → Frontend running on http://localhost:3000
```

### **4. Configuration fichiers**

#### **backend/.env**

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/rentalg_dev"

# AWS
AWS_REGION="eu-west-1"
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"

# AWS Cognito
COGNITO_USER_POOL_ID="eu-west-1_xxxxx"
COGNITO_CLIENT_ID="xxxxxxxxxxxxx"

# AWS S3
S3_BUCKET_NAME="rentalg-images-dev"
S3_REGION="eu-west-1"

# Mapbox
MAPBOX_ACCESS_TOKEN="pk.xxxxxxxxxxxxxxxxxx"

# Chargily Pay
CHARGILY_API_KEY="test_sk_xxxxxxxxxx"
CHARGILY_SECRET="your_webhook_secret"

# Email
EMAIL_FROM="noreply@rentalg.dz"
SENDGRID_API_KEY="SG.xxxxxxxxxx"

# App
NODE_ENV="development"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

#### **frontend/.env.local**

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_MAPBOX_TOKEN="pk.xxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_GOOGLE_ANALYTICS="G-XXXXXXXXXX"

# AWS Amplify (for auth)
NEXT_PUBLIC_COGNITO_REGION="eu-west-1"
NEXT_PUBLIC_COGNITO_USER_POOL_ID="eu-west-1_xxxxx"
NEXT_PUBLIC_COGNITO_CLIENT_ID="xxxxxxxxxxxxx"
```

---

## ⚙️ Configuration

### **AWS Cognito Setup**

```bash
# 1. Create User Pool
aws cognito-idp create-user-pool \
  --pool-name rentalg-users \
  --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true}" \
  --auto-verified-attributes email \
  --schema Name=email,Required=true

# 2. Create App Client
aws cognito-idp create-user-pool-client \
  --user-pool-id eu-west-1_xxxxx \
  --client-name rentalg-web \
  --no-generate-secret

# 3. Configure Social Login (Google, Apple)
# Via AWS Console
```

### **AWS S3 Setup**

```bash
# 1. Create bucket
aws s3 mb s3://rentalg-images

# 2. Configure CORS
aws s3api put-bucket-cors \
  --bucket rentalg-images \
  --cors-configuration file://cors.json

# cors.json
{
  "CORSRules": [{
    "AllowedOrigins": ["https://rentalg.dz"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"]
  }]
}

# 3. Configure Lifecycle (auto-delete old uploads)
aws s3api put-bucket-lifecycle-configuration \
  --bucket rentalg-images \
  --lifecycle-configuration file://lifecycle.json
```

### **Mapbox Setup**

```bash
# 1. Create account: https://mapbox.com
# 2. Generate access token
# 3. Configure allowed URLs
#    - http://localhost:3000 (dev)
#    - https://rentalg.dz (prod)
```

### **Chargily Pay Setup**

```bash
# 1. Create account: https://chargily.com
# 2. Get API keys (test + production)
# 3. Configure webhook URL
#    POST https://api.rentalg.dz/webhooks/chargily
# 4. Setup products:
#    - BOOST_TIER_1 (500 DA)
#    - BOOST_TIER_2 (1000 DA)
#    - BOOST_TIER_3 (2000 DA)
#    - PRO_UPGRADE (1500 DA)
```

---

## 🚢 Déploiement

### **Production Stack (AWS)**

```yaml
Frontend:
  Service: AWS Amplify
  Build: Next.js SSR
  CDN: CloudFront automatic
  SSL: Auto-provisioned
  
Backend:
  Service: AWS EC2 (t3.medium)
  OS: Ubuntu 22.04 LTS
  Runtime: Node.js 20
  Process Manager: PM2
  Reverse Proxy: Nginx
  
Database:
  Service: AWS RDS PostgreSQL
  Instance: db.t3.medium
  Storage: 100GB SSD
  Backups: Daily automatic
  
Storage:
  Service: AWS S3
  CDN: CloudFront
  Regions: eu-west-1 (primary)
```

### **1. Backend Deployment (EC2)**

```bash
# 1. Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-xxxxxxxxx \
  --instance-type t3.medium \
  --key-name rentalg-key \
  --security-groups rentalg-api

# 2. Connect and setup
ssh -i rentalg-key.pem ubuntu@ec2-xx-xx-xx-xx.compute.amazonaws.com

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm nginx postgresql-client

# Clone repo
git clone https://github.com/rentalg/rentalg.git
cd rentalg/backend
npm install
npm run build

# Setup PM2
npm install -g pm2
pm2 start dist/index.js --name rentalg-api
pm2 startup
pm2 save

# Configure Nginx
sudo nano /etc/nginx/sites-available/rentalg
# Add reverse proxy config
sudo ln -s /etc/nginx/sites-available/rentalg /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.rentalg.dz
```

### **2. Frontend Deployment (Amplify)**

```bash
# Via AWS Amplify Console
# 1. Connect GitHub repository
# 2. Configure build settings:

# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*

# 3. Environment variables (via console)
# 4. Deploy branch: main
# 5. Custom domain: rentalg.dz
```

### **3. Database (RDS)**

```bash
# 1. Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier rentalg-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 16.1 \
  --master-username admin \
  --master-user-password ChangeMe123! \
  --allocated-storage 100 \
  --vpc-security-group-ids sg-xxxxxx \
  --backup-retention-period 7 \
  --preferred-backup-window "03:00-04:00"

# 2. Enable PostGIS
psql -h rentalg-db.xxxxxx.eu-west-1.rds.amazonaws.com \
     -U admin -d postgres
CREATE EXTENSION postgis;

# 3. Run migrations
DATABASE_URL="postgresql://admin:password@rentalg-db.xxx.rds.amazonaws.com:5432/postgres" \
npx prisma migrate deploy

# 4. Seed production data
npm run seed:production
```

### **4. Monitoring Setup**

```bash
# CloudWatch
aws logs create-log-group --log-group-name /rentalg/api
aws logs create-log-group --log-group-name /rentalg/frontend

# Sentry
npm install @sentry/node @sentry/nextjs
# Configure Sentry DSN in .env
```

---

## 🗺️ Roadmap

### **Phase 1 : MVP (Mois 1-4)** ✅

- [x] Architecture & Stack
- [x] Database schema v3.0
- [x] Auth (Cognito)
- [x] CRUD Properties
- [x] Location system (3 modes)
- [x] Search (filters + map)
- [x] Messaging
- [x] Boost system
- [x] Payment (Chargily)
- [x] Moderation
- [x] Responsive UI

### **Phase 2 : Optimisation (Mois 5-6)** 🚧

- [ ] Messagerie temps réel (WebSockets)
- [ ] Notifications push (PWA)
- [ ] Recherches sauvegardées avec alertes
- [ ] Analytics avancées (admin)
- [ ] Dashboard stats marché
- [ ] Export données (PDF, Excel)
- [ ] API publique (REST)
- [ ] Tests E2E complets

### **Phase 3 : Features avancées (Mois 7-9)** 📅

- [ ] Recommandations IA
- [ ] Détection prix aberrants (ML)
- [ ] Visite virtuelle 360°
- [ ] Comparateur de biens
- [ ] Historique de prix
- [ ] Estimation prix automatique
- [ ] Programme fidélité
- [ ] Partenariats agences

### **Phase 4 : Expansion (Mois 10-12)** 🌍

- [ ] Application mobile (React Native)
- [ ] Support Tunisie/Maroc
- [ ] Multi-langue (Français, Arabe, Anglais)
- [ ] Intégration banques (crédit)
- [ ] Programme affiliation
- [ ] Blog intégré
- [ ] SEO avancé
- [ ] Marketing automation

---

## 👥 Contributing

### **Code Style**

```bash
# ESLint + Prettier
npm run lint
npm run format

# Pre-commit hooks
npm run prepare
```

### **Git Workflow**

```bash
# Branches
main         # Production
develop      # Development
feature/*    # Nouvelles features
bugfix/*     # Corrections bugs
hotfix/*     # Hotfixes production

# Commits (Conventional Commits)
feat: Add boost tier 3
fix: Resolve map clustering issue
docs: Update README installation
style: Format code with Prettier
refactor: Simplify location detection
test: Add unit tests for PropertyService
chore: Update dependencies
```

### **Pull Request Process**

1. Fork le repo
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Ouvrir Pull Request

---

## 📄 License

MIT License - voir [LICENSE](LICENSE)

---

## 📧 Contact

**Email:** contact@rentalg.dz  
**Website:** https://rentalg.dz  
**GitHub:** https://github.com/rentalg  
**Twitter:** @RentAlgDZ  

---

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Mapbox](https://www.mapbox.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Chargily Pay](https://chargily.com/)
- [AWS](https://aws.amazon.com/)

---

