# Dashboard Particulier - Documentation

## 📁 Structure

```
client/src/
├── app/
│   └── (dashboard)/
│       ├── layout.tsx              # Layout pour tous les dashboards
│       └── particulier/
│           └── page.tsx            # Dashboard Particulier principal
└── components/
    └── dashboard/
        ├── index.ts                # Export centralisé
        ├── StatsCard.tsx           # Carte statistique réutilisable
        ├── SavedSearchCard.tsx     # Carte de recherche sauvegardée
        ├── FavoritePropertyCard.tsx # Carte de bien favori
        └── ActivityTimeline.tsx    # Timeline d'activité
```

## 🎨 Composants

### **StatsCard**
Carte de statistique avec icône, valeur, et tendance optionnelle.

**Props:**
- `title`: string - Titre de la statistique
- `value`: number | string - Valeur à afficher
- `icon`: LucideIcon - Icône Lucide
- `iconColor?`: string - Couleur de l'icône (Tailwind class)
- `iconBgColor?`: string - Couleur de fond de l'icône
- `trend?`: { value: number, isPositive: boolean } - Tendance optionnelle
- `subtitle?`: string - Sous-titre optionnel

### **SavedSearchCard**
Carte affichant une recherche sauvegardée avec critères et actions.

**Props:**
- `id`: string
- `title`: string - Titre de la recherche
- `location`: string - Localisation
- `propertyType?`: string - Type de bien
- `priceRange?`: string - Fourchette de prix
- `newListings`: number - Nombre de nouvelles annonces
- `alertsEnabled`: boolean - État des alertes
- `onToggleAlert`: () => void - Toggle alertes
- `onDelete`: () => void - Supprimer la recherche

### **FavoritePropertyCard**
Carte d'un bien immobilier favori avec image et détails.

**Props:**
- `id`: string
- `title`: string - Titre du bien
- `price`: string - Prix
- `location`: string - Localisation
- `imageUrl`: string - URL de l'image
- `propertyType`: string - Type (Vente/Location)
- `bedrooms?`: number - Nombre de chambres
- `bathrooms?`: number - Nombre de salles de bain
- `area?`: number - Surface en m²
- `addedDate`: string - Date d'ajout
- `onRemove`: () => void - Retirer des favoris

### **ActivityTimeline**
Timeline affichant l'activité récente de l'utilisateur.

**Props:**
- `activities`: ActivityItem[] - Liste des activités

**ActivityItem:**
```typescript
{
  id: string;
  type: 'favorite' | 'message' | 'search' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}
```

## 📱 Responsive Design

Le dashboard est entièrement responsive avec breakpoints:
- **Mobile** (< 640px): Disposition en colonne unique
- **Tablet** (640px - 1024px): Grid 2 colonnes pour les cartes
- **Desktop** (> 1024px): Layout 3 colonnes avec sidebar

### Classes Tailwind utilisées:
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` - Stats cards
- `grid-cols-1 md:grid-cols-2` - Recherches et favoris
- `lg:col-span-2` - Colonne principale large
- `flex-col sm:flex-row` - Header adaptatif

## 🎯 Fonctionnalités

### ✅ Implémenté
- **Vue d'ensemble**: 4 cartes de statistiques (Favoris, Recherches, Messages, Notifications)
- **Recherches sauvegardées**: Liste avec gestion des alertes
- **Favoris**: Grid de biens avec actions rapides
- **Activité récente**: Timeline des dernières actions
- **Actions rapides**: Sidebar avec liens directs
- **Authentication check**: Redirection si non authentifié ou si Professionnel
- **Loading state**: Spinner pendant chargement
- **Animations**: Framer Motion pour transitions fluides

### 🔄 À implémenter (prochaines étapes)
- Connexion aux API backend (remplacer mock data)
- Pagination pour favoris et recherches
- Filtres et tri pour les listes
- Modal de confirmation pour suppression
- Toast notifications pour les actions
- Real-time updates (WebSocket)
- Dark mode

## 🔌 Intégration API

Pour connecter aux vraies données, remplacer les `mock*` variables par:

```typescript
// Exemple avec RTK Query
import { useGetFavoritesQuery, useGetSavedSearchesQuery } from '@/state/api';

const { data: favorites, isLoading: favoritesLoading } = useGetFavoritesQuery();
const { data: savedSearches } = useGetSavedSearchesQuery();
```

## 🎨 Style Guide

**Couleurs principales:**
- Primary: `blue-electric`, `blue-bright`, `blue-deep`
- Accents: `green-vibrant`, `red-500`, `orange-500`
- Neutral: `gray-50` à `gray-900`

**Spacing:**
- Padding section: `p-6` (mobile), `p-8` (desktop)
- Gap entre éléments: `gap-4` (mobile), `gap-6` (desktop)
- Margin bottom section: `mb-8 sm:mb-12`

**Typography:**
- Titre page: `text-3xl sm:text-4xl font-bold`
- Titre section: `text-2xl font-bold`
- Titre carte: `text-lg font-bold`
- Body: `text-sm` ou `text-base`

**Transitions:**
- Hover effects: `transition-all duration-300`
- Animations Framer Motion: `duration: 0.3-0.5s`
- Stagger children: `delay: 0.05-0.1s`

## 🚀 Utilisation

```typescript
// Import du dashboard
import ParticulierDashboard from '@/app/(dashboard)/particulier/page';

// Ou import des composants individuels
import { StatsCard, FavoritePropertyCard } from '@/components/dashboard';

// Exemple d'utilisation
<StatsCard
  title="Favoris"
  value={12}
  icon={Heart}
  iconColor="text-red-500"
  iconBgColor="bg-red-50"
/>
```

## 📋 Checklist de test

- [ ] Affichage correct sur mobile (< 640px)
- [ ] Affichage correct sur tablet (640px - 1024px)
- [ ] Affichage correct sur desktop (> 1024px)
- [ ] Redirection si non authentifié
- [ ] Redirection si utilisateur Professionnel
- [ ] Stats cards interactives (hover effects)
- [ ] Toggle alertes fonctionne
- [ ] Suppression recherche fonctionne
- [ ] Retrait favoris fonctionne
- [ ] Liens vers pages externes fonctionnent
- [ ] Animations fluides au scroll
- [ ] Loading state visible au chargement
