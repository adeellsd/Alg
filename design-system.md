# 🎨 RentAlg Design System v5.0 — "Alger Authentique"

> **Inspiré par les magnifiques photos aériennes d'Alger et l'architecture traditionnelle algéroise**

---

## 🌅 **PALETTE DE COULEURS COMPLÈTE**

### **1. BLEUS MÉDITERRANÉENS** (Palette étendue)

```typescript
const BLUES = {
  // Mer & Ciel (des photos aériennes)
  turquoiseMer: '#40E0D0',      // Eau cristalline visible sur photos
  aquaMarine: '#7FDBDA',        // Reflets lumineux
  bleuCiel: '#87CEEB',          // Ciel d'Alger ensoleillé
  bleuElectrique: '#0891B2',    // PRIMARY CTA (conservé)
  bleuProfond: '#0369A1',       // Hover states (conservé)
  bleuBright: '#06B6D4',        // Accents (conservé)
  bleuPale: '#CFFAFE',          // Backgrounds (conservé)
  bleuNuit: '#1E3A5F',          // Headers, navigation sombre
  bleuCobalt: '#0047AB',        // Zellige, badges premium
}
```

### **2. BEIGES & TERRES** (Architecture Casbah)

```typescript
const NEUTRALS_WARM = {
  // Inspiré des façades de la Casbah
  beigeCasbah: '#E8D5B7',       // Backgrounds chauds, cards
  beigeChaud: '#D4B896',        // Hover states sur beige
  terracotta: '#C19A6B',        // Accents chaleureux
  sable: '#F5E6D3',             // Backgrounds très clairs
  crème: '#FFF8E7',             // Off-white premium
  
  // Toits & Architecture
  tuileOrange: '#CD5C5C',       // Toits traditionnels (visible photos)
  pierreClaire: '#F0E6D2',      // Pierres blanches Casbah
}
```

### **3. SUNSET PALETTE** (Couchers de soleil méditerranéens)

```typescript
const SUNSET = {
  corailVif: '#FF6B4A',         // Couchers de soleil intenses
  orangeBrulant: '#FF8C42',     // Horizon embrasé
  pêche: '#FFB88C',             // Lueur chaude
  ambre: '#FFAB4C',             // Golden hour
  coral: '#F97316',             // Promotions (conservé)
  sunshine: '#F59E0B',          // Warnings (conservé)
}
```

### **4. VERTS JARDIN** (Végétation luxuriante)

```typescript
const GREENS = {
  vertJardin: '#2D5016',        // Cyprès, pins (photos)
  vertVibrant: '#059669',       // Success (conservé)
  vertFresh: '#10B981',         // CTA secondaire (conservé)
  vertEmeraude: '#34D399',      // Zellige vert
  vertPale: '#D1FAE5',          // Backgrounds (conservé)
  vertOlive: '#6B8E23',         // Végétation méditerranéenne
}
```

### **5. ACCENTS PREMIUM**

```typescript
const PREMIUM = {
  // ELITE tier
  or: '#FFD700',                // Zellige doré, badges ELITE
  fuchsia: '#DB2777',           // Gradient ELITE (conservé)
  amethyste: '#9333EA',         // Premium accents
  
  // Urgence & Erreurs
  terracottaFoncé: '#DC2626',   // Errors (conservé)
  rouge: '#B91C1C',             // Critical
}
```

---

## 🎭 **PATTERNS ZELLIGE**

### **Motifs Géométriques Traditionnels**

```css
/* Pattern 1: Étoile à 8 branches (Khatam) */
.pattern-khatam {
  background-image: url('/patterns/zellige-khatam.svg');
  background-size: 120px 120px;
  opacity: 0.08;
}

/* Pattern 2: Motif floral stylisé */
.pattern-floral {
  background-image: url('/patterns/zellige-floral.svg');
  background-size: 80px 80px;
  opacity: 0.06;
}

/* Pattern 3: Géométrique simple (bordures) */
.pattern-border-zellige {
  border-image: url('/patterns/zellige-border.svg') 30 round;
}

/* Pattern 4: Mosaïque subtile (cards ELITE) */
.pattern-mosaic-elite {
  background-image: url('/patterns/zellige-mosaic.svg');
  background-size: 200px 200px;
  opacity: 0.04;
  mix-blend-mode: multiply;
}
```

### **Usage des Patterns**

```tsx
// Hero Section avec pattern subtil
<section className="relative bg-gradient-to-br from-[#E8D5B7] to-[#D4B896]">
  <div className="absolute inset-0 pattern-khatam" />
  <div className="relative z-10">
    {/* Contenu */}
  </div>
</section>

// Card ELITE avec bordure Zellige
<Card className="border-4 pattern-border-zellige bg-white/95 backdrop-blur-sm">
  <Badge variant="elite" className="pattern-mosaic-elite">
    ELITE
  </Badge>
</Card>
```

---

## 🏗️ **COMPOSANTS REFONTE COMPLÈTE**

### **1. Hero Section "Alger Vibrante"**

```tsx
export const HeroAlgerVibrant = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background gradient inspiré sunset */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#87CEEB] via-[#40E0D0] to-[#FF8C42]" />
      
      {/* Pattern Zellige subtil */}
      <div className="absolute inset-0 pattern-khatam opacity-[0.03]" />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      
      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-6 pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[72px] font-bold text-white drop-shadow-2xl font-display"
        >
          Trouvez votre<br />
          <span className="text-[#FFD700]">chez-vous</span> en Algérie
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[24px] text-white/90 mt-6 max-w-2xl"
        >
          La plateforme immobilière premium qui célèbre la beauté d'Alger
        </motion.p>
        
        {/* Search bar glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white/90 backdrop-blur-[20px] rounded-[28px] p-8 shadow-2xl max-w-4xl"
        >
          <SearchBarAdvanced />
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E8D5B7] to-transparent" />
    </section>
  );
};
```

### **2. Property Card "Casbah Edition"**

```tsx
export const PropertyCardCasbah = ({ property }: { property: Property }) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-gradient-to-br from-white to-[#F5E6D3] rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Zellige pattern overlay (très subtil) */}
      <div className="absolute inset-0 pattern-mosaic-elite opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image avec overlay gradient */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.thumbnail} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay inspiré sunset */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges avec nouveau style */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <Badge 
            variant={property.transactionType === 'RENT' ? 'rent' : 'sale'}
            className="bg-[#0891B2]/90 backdrop-blur-md text-white shadow-lg"
          >
            {property.transactionType === 'RENT' ? 'À louer' : 'Vente'}
          </Badge>
          
          {property.isBoosted && property.boostTier === 'TIER_3_ULTRA' && (
            <Badge className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6B4A] text-white shadow-lg pattern-mosaic-elite">
              ⭐ ULTRA
            </Badge>
          )}
        </div>
        
        {/* Favorite button avec effet Zellige */}
        <button 
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-[#FFD700] hover:scale-110 transition-all duration-200 group/fav"
        >
          <Heart className="w-5 h-5 text-gray-600 group-hover/fav:text-white group-hover/fav:fill-white transition-colors" />
        </button>
      </div>
      
      {/* Content avec nouveau spacing */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Prix avec style doré premium */}
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-bold bg-gradient-to-r from-[#0891B2] to-[#40E0D0] bg-clip-text text-transparent">
            {formatPrice(property.price)}
          </p>
          <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-[#F5E6D3] rounded-full">
            {getPropertyTypeLabel(property.propertyType)}
          </span>
        </div>
        
        {/* Titre */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-[#0891B2] transition-colors">
          {property.title}
        </h3>
        
        {/* Location avec icône stylisée */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#40E0D0] to-[#0891B2] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm truncate">
            {property.commune?.nameFr}, {property.wilaya.nameFr}
          </span>
        </div>
        
        {/* Features avec nouveau design */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#E8D5B7]">
          {property.bedrooms && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#F5E6D3] to-[#E8D5B7] rounded-[12px]">
              <BedDouble className="w-4 h-4 text-[#0891B2]" />
              <span className="text-sm font-medium text-gray-700">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#F5E6D3] to-[#E8D5B7] rounded-[12px]">
              <Bath className="w-4 h-4 text-[#0891B2]" />
              <span className="text-sm font-medium text-gray-700">{property.bathrooms}</span>
            </div>
          )}
          {property.surface && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#F5E6D3] to-[#E8D5B7] rounded-[12px]">
              <Maximize className="w-4 h-4 text-[#0891B2]" />
              <span className="text-sm font-medium text-gray-700">{property.surface} m²</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hover effect border (couleur Zellige) */}
      <div className="absolute inset-0 rounded-[24px] border-2 border-transparent group-hover:border-[#FFD700] transition-colors duration-300 pointer-events-none" />
    </motion.article>
  );
};
```

### **3. Navbar "Alger Glass"**

```tsx
export const NavbarAlgerGlass = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/80 backdrop-blur-[20px] shadow-lg border-b border-gray-200/50" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo avec style doré */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Pattern Zellige derrière logo */}
              <div className="absolute inset-0 pattern-khatam opacity-20 scale-125" />
              <div className="relative w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#0891B2] to-[#40E0D0] flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className={cn(
              "text-2xl font-bold font-display transition-colors",
              scrolled ? "text-gray-900" : "text-white drop-shadow-lg"
            )}>
              Rent<span className="text-[#FFD700]">Alg</span>
            </span>
          </Link>
          
          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/properties" scrolled={scrolled}>
              Explorer
            </NavLink>
            <NavLink href="/about" scrolled={scrolled}>
              À propos
            </NavLink>
            <NavLink href="/pricing" scrolled={scrolled}>
              Tarifs
            </NavLink>
          </div>
          
          {/* CTA buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className={cn(
                "hidden md:inline-flex transition-colors",
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:bg-white/20"
              )}
            >
              Connexion
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Publier une annonce
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ 
  href, 
  children, 
  scrolled 
}: { 
  href: string; 
  children: React.ReactNode; 
  scrolled: boolean;
}) => (
  <Link 
    href={href}
    className={cn(
      "text-sm font-medium transition-colors relative group",
      scrolled 
        ? "text-gray-700 hover:text-[#0891B2]" 
        : "text-white/90 hover:text-white"
    )}
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] group-hover:w-full transition-all duration-300" />
  </Link>
);
```

---

## 📐 **SPACING & LAYOUT AMÉLIORÉS**

```typescript
// Nouveau système d'espacement inspiré architecture Casbah
const SPACING = {
  // Micro
  xs: '4px',      // 0.25rem
  sm: '8px',      // 0.5rem
  md: '12px',     // 0.75rem
  
  // Standard
  base: '16px',   // 1rem
  lg: '24px',     // 1.5rem
  xl: '32px',     // 2rem
  
  // Large (sections)
  '2xl': '48px',  // 3rem
  '3xl': '64px',  // 4rem
  '4xl': '96px',  // 6rem
  '5xl': '128px', // 8rem
  
  // Container
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',  // Nouveau max-width
  }
}
```

---

## 🎬 **ANIMATIONS MÉDITERRANÉENNES**

```typescript
// Animations inspirées des mouvements de la mer
const ANIMATIONS = {
  // Vagues douces
  wave: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.6, 
      ease: [0.4, 0, 0.2, 1],  // Cubic bezier "méditerranéenne"
    }
  },
  
  // Reflet soleil (hover cards)
  shimmer: {
    whileHover: {
      boxShadow: '0 20px 60px -10px rgba(255, 215, 0, 0.3)',
      scale: 1.02,
    },
    transition: { duration: 0.2 }
  },
  
  // Mouvement subtil (glassmorphism)
  float: {
    animate: {
      y: [0, -10, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
```

---

## 📱 **RESPONSIVE AMÉLIORÉ**

```css
/* Breakpoints Alger Vibrante */
@media (max-width: 480px) {
  /* Mobile portrait - UI tactile optimisée */
  .hero-title { font-size: 36px; }
  .search-bar { padding: 16px; border-radius: 20px; }
  .property-card { border-radius: 16px; }
}

@media (min-width: 481px) and (max-width: 768px) {
  /* Mobile landscape / Tablet portrait */
  .hero-title { font-size: 48px; }
  .property-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet landscape */
  .hero-title { font-size: 60px; }
  .property-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1025px) {
  /* Desktop */
  .hero-title { font-size: 72px; }
  .property-grid { grid-template-columns: repeat(4, 1fr); }
  .container { max-width: 1400px; }
}
```

---

## 🎯 **MISE EN ŒUVRE**

### **Ordre de refonte recommandé** :

1. **Week 1-2** : Mise à jour `globals.css` avec nouvelles couleurs + patterns Zellige SVG
2. **Week 3** : Refonte composants UI de base (Button, Badge, Input, Card)
3. **Week 4** : Hero section + Navbar glassmorphism
4. **Week 5-6** : PropertyCard + PropertyGrid avec nouveaux styles
5. **Week 7** : Pages complètes (Landing, Properties, Property Detail)
6. **Week 8** : Dashboard + formulaires
7. **Week 9-10** : Mobile optimization + animations
8. **Week 11** : Testing cross-browser + performance
9. **Week 12** : Polishing + A/B testing

### **Checklist Design System v5** :

- [ ] Créer fichiers SVG patterns Zellige (8 motifs)
- [ ] Mettre à jour `globals.css` avec 60+ nouvelles couleurs
- [ ] Créer composants Zellige (ZelligePattern, ZelligeBorder, ZelligeBadge)
- [ ] Photographier/scanner vrais carrelages algérois pour authenticité
- [ ] Tester contraste WCAG 2.1 AA sur toutes nouvelles couleurs
- [ ] Documenter usage patterns dans Storybook
- [ ] Créer Figma design system complet
- [ ] A/B test nouveau design vs ancien (conversion rates)

---

**Date** : 28 novembre 2025  
**Version** : 5.0 — Alger Authentique  
**Statut** : 🎨 DRAFT — Ready for implementation

Ce design system célèbre la beauté unique d'Alger tout en restant moderne et performant. 🇩🇿✨