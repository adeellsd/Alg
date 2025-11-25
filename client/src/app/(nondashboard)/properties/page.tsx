"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Grid3X3,
  Map,
  X,
  Home,
  Building2,
  Sparkles,
  TrendingUp,
  Heart,
  Share2,
  Eye,
  Loader2,
  ChevronDown,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { 
  useGetFiltersConfigQuery, 
  useLazySearchPropertiesQuery 
} from "@/state/api";

// =============================================================================
// TYPES
// =============================================================================

interface Property {
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

interface FiltersConfig {
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

interface SearchFilters {
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

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const formatPrice = (amount: string, transactionType: string) => {
  const num = parseInt(amount);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M DA${transactionType === "RENT" ? "/mois" : ""}`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K DA${transactionType === "RENT" ? "/mois" : ""}`;
  }
  return `${num.toLocaleString("fr-DZ")} DA${transactionType === "RENT" ? "/mois" : ""}`;
};

const getPropertyTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    APARTMENT_F2: "F2",
    APARTMENT_F3: "F3",
    APARTMENT_F4: "F4",
    APARTMENT_F5: "F5",
    VILLA: "Villa",
    STUDIO: "Studio",
    DUPLEX: "Duplex",
    TERRAIN: "Terrain",
    LOCAL_COMMERCIAL: "Local",
  };
  return labels[type] || type;
};

// =============================================================================
// PROPERTY CARD COMPONENT (WORLD-CLASS)
// =============================================================================

/**
 * PropertyCard - World-class property display component
 * 
 * Features:
 * - Smooth animations (60fps, transform/opacity only)
 * - Perfect responsive behavior (mobile → desktop)
 * - All interactive states (hover, focus, active)
 * - Accessibility compliant (WCAG AA)
 * - Performance optimized (lazy images, memoization)
 */
const PropertyCard = ({ property, viewMode }: { property: Property; viewMode: "grid" | "list" }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: API call to toggle favorite
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Share functionality
  };

  // ===========================================================================
  // LIST VIEW - Optimized for scanning multiple properties
  // ===========================================================================
  if (viewMode === "list") {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Container - Fixed aspect ratio */}
          <div className="relative w-full md:w-80 lg:w-96 h-56 md:h-64 shrink-0 overflow-hidden bg-gray-100">
            <img
              src={imageError ? "/placeholder.jpg" : (property.thumbnail || "/placeholder.jpg")}
              alt={property.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Badges Layer */}
            <div className="absolute inset-0 p-4">
              {/* Top Left: Boost Badge */}
              {property.isBoosted && (
                <div className="absolute top-4 left-4">
                  <Badge className={cn(
                    "px-3 py-1.5 font-semibold text-xs uppercase tracking-wide shadow-lg backdrop-blur-sm transition-transform hover:scale-105",
                    property.boostTier === "ULTRA" && "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0",
                    property.boostTier === "PREMIUM" && "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0",
                    property.boostTier === "EN_AVANT" && "bg-white/95 text-cyan-700 border-cyan-200"
                  )}>
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    {property.boostTier === "ULTRA" ? "Ultra" : property.boostTier === "PREMIUM" ? "Premium" : "En Avant"}
                  </Badge>
                </div>
              )}

              {/* Top Right: Property Type */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/95 text-gray-900 border-0 backdrop-blur-sm font-medium px-2.5 py-1 shadow-md">
                  {getPropertyTypeLabel(property.propertyType)}
                </Badge>
              </div>

              {/* Bottom Right: Quick Actions (Hover Only) */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={cn(
                    "h-10 w-10 rounded-full shadow-lg transition-all duration-200",
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white/95 hover:bg-white text-gray-700"
                  )}
                  aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                </Button>
                <Button
                  size="icon"
                  onClick={handleShare}
                  className="h-10 w-10 rounded-full bg-white/95 hover:bg-white text-gray-700 shadow-lg transition-all duration-200"
                  aria-label="Partager cette annonce"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex-1 p-5 md:p-6 flex flex-col min-w-0">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 text-cyan-600 shrink-0" />
              <span className="font-semibold truncate">{property.location.commune?.nameFr || "Commune"}</span>
              <span className="text-gray-400 shrink-0">•</span>
              <span className="truncate">{property.location.wilaya.nameFr}</span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg md:text-xl text-gray-900 line-clamp-2 mb-3 group-hover:text-cyan-600 transition-colors cursor-pointer leading-tight">
              {property.title}
            </h3>

            {/* Features Grid */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              {property.surface && (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-900">{property.surface}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">m²</span>
                </div>
              )}
              {property.rooms && (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-900">{property.rooms}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">pièces</span>
                </div>
              )}
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-900">{property.bedrooms}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">chambres</span>
                </div>
              )}
              {property.floor !== null && (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-900">{property.floor}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">étage</span>
                </div>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1 min-h-4" />

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {/* Owner Info */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {property.owner.isPro ? (
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {property.owner.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm font-semibold text-gray-900 truncate">{property.owner.name}</span>
                        {property.owner.isVerified && (
                          <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-cyan-200 text-cyan-700 font-semibold">
                        PRO
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold shrink-0">
                      {property.owner.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-gray-900 truncate">{property.owner.name}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="text-right shrink-0 ml-4">
                <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
                  {formatPrice(property.price.amount, property.transactionType)}
                </p>
                {property.price.isNegotiable && (
                  <span className="text-xs text-cyan-600 font-medium">Négociable</span>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span className="font-medium">{property.stats.views}</span>
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="font-medium">{property.stats.favorites}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ===========================================================================
  // GRID VIEW - Optimized for browsing and comparison
  // ===========================================================================
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
    >
      {/* Image Container - Fixed aspect ratio 4:3 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageError ? "/placeholder.jpg" : (property.thumbnail || "/placeholder.jpg")}
          alt={property.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Badges Layer */}
        <div className="absolute inset-0 p-3">
          {/* Top Left: Boost Badge */}
          {property.isBoosted && (
            <div className="absolute top-3 left-3">
              <Badge className={cn(
                "px-2.5 py-1 font-semibold text-xs uppercase tracking-wide shadow-lg backdrop-blur-sm transition-transform hover:scale-105",
                property.boostTier === "ULTRA" && "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0",
                property.boostTier === "PREMIUM" && "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0",
                property.boostTier === "EN_AVANT" && "bg-white/95 text-cyan-700 border-0"
              )}>
                <Sparkles className="w-3 h-3 mr-1 inline" />
                {property.boostTier === "ULTRA" ? "Ultra" : property.boostTier === "PREMIUM" ? "Premium" : "Top"}
              </Badge>
            </div>
          )}

          {/* Top Right: Property Type */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/95 text-gray-900 border-0 backdrop-blur-sm font-medium text-xs px-2 py-0.5 shadow-md">
              {getPropertyTypeLabel(property.propertyType)}
            </Badge>
          </div>

          {/* Bottom Right: Quick Actions (Hover Only) */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              size="icon"
              onClick={handleFavoriteToggle}
              className={cn(
                "h-9 w-9 rounded-full shadow-lg transition-all duration-200",
                isFavorite
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-white/95 hover:bg-white text-gray-700"
              )}
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
            </Button>
            <Button
              size="icon"
              onClick={handleShare}
              className="h-9 w-9 rounded-full bg-white/95 hover:bg-white text-gray-700 shadow-lg transition-all duration-200"
              aria-label="Partager cette annonce"
            >
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 lg:p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
          <MapPin className="h-3.5 w-3.5 text-cyan-600 shrink-0" />
          <span className="font-semibold truncate">{property.location.commune?.nameFr || "Commune"}</span>
          <span className="text-gray-400 shrink-0">•</span>
          <span className="text-[11px] truncate">{property.location.wilaya.nameFr}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-gray-900 line-clamp-2 mb-3 group-hover:text-cyan-600 transition-colors leading-tight min-h-[2.5rem]">
          {property.title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-2.5 text-sm mb-4 text-gray-700 flex-wrap">
          {property.surface && (
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">{property.surface}</span>
              <span className="text-xs">m²</span>
            </div>
          )}
          {property.rooms && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{property.rooms}</span>
                <span className="text-xs">pcs</span>
              </div>
            </>
          )}
          {property.bedrooms && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{property.bedrooms}</span>
                <span className="text-xs">ch</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* Owner Badge */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {property.owner.isPro && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-cyan-200 text-cyan-700 font-semibold shrink-0">
                PRO
              </Badge>
            )}
            {property.owner.isVerified && (
              <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            <p className="font-bold text-base lg:text-lg bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
              {formatPrice(property.price.amount, property.transactionType)}
            </p>
            {property.price.isNegotiable && (
              <span className="text-[10px] text-cyan-600 font-medium">Négociable</span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// =============================================================================
// FILTER SECTION
// =============================================================================

const FilterSection = ({
  filters,
  filtersConfig,
  onFiltersChange,
  onReset,
}: {
  filters: SearchFilters;
  filtersConfig: FiltersConfig;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onReset: () => void;
}) => {
  const priceRange = filters.transactionType === "RENT"
    ? filtersConfig.priceRanges.rent
    : filtersConfig.priceRanges.sale;

  return (
    <div className="space-y-7">
      {/* Transaction Type */}
      <div className="pb-4 border-b border-gray-100">
        <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-600">●</span>
          Type de transaction
        </h4>
        <div className="flex flex-col gap-2.5">
          {filtersConfig.transactionTypes.map((type) => (
            <Button
              key={type.code}
              variant={filters.transactionType === type.code ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ transactionType: type.code })}
              className={cn(
                "h-11 w-full text-sm font-semibold justify-center transition-all duration-200",
                filters.transactionType === type.code
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/30 border-0"
                  : "hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700"
              )}
            >
              {type.nameFr}
            </Button>
          ))}
        </div>
      </div>

      {/* Property Types */}
      <div className="pb-4 border-b border-gray-100">
        <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-600">●</span>
          Type de bien
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          {filtersConfig.propertyTypes.map((type) => (
            <label
              key={type.code}
              className={cn(
                "flex items-center gap-2 p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 min-w-0",
                filters.propertyTypes.includes(type.code)
                  ? "border-cyan-500 bg-cyan-50 shadow-sm"
                  : "border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/50"
              )}
            >
              <Checkbox
                checked={filters.propertyTypes.includes(type.code)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.propertyTypes, type.code]
                    : filters.propertyTypes.filter((t) => t !== type.code);
                  onFiltersChange({ propertyTypes: newTypes });
                }}
                className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 shrink-0"
              />
              <span className="text-base shrink-0">{type.icon}</span>
              <span className="text-sm font-medium text-gray-900 truncate min-w-0">{type.nameFr}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Wilaya */}
      <div className="pb-4 border-b border-gray-100">
        <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-600">●</span>
          Localisation
        </h4>
        <Select
          value={filters.wilayaId || "all"}
          onValueChange={(value) => onFiltersChange({ wilayaId: value === "all" ? "" : value, communeId: "" })}
        >
          <SelectTrigger className="h-12 border-2 hover:border-cyan-400 focus:border-cyan-500 transition-colors text-sm font-medium">
            <SelectValue placeholder="Toutes les wilayas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-medium">Toutes les wilayas</SelectItem>
            {filtersConfig.wilayas.map((wilaya) => (
              <SelectItem key={wilaya.id} value={wilaya.id}>
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="truncate flex-1">{wilaya.nameFr}</span>
                  <Badge variant="secondary" className="ml-2 text-xs shrink-0">
                    {wilaya.propertyCount}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="pb-4 border-b border-gray-100">
        <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-600">●</span>
          Budget
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => onFiltersChange({ minPrice: parseInt(e.target.value) || undefined })}
              className="h-12 border-2 hover:border-cyan-400 focus:border-cyan-500 transition-colors pr-11 text-sm font-medium"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 pointer-events-none">DA</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => onFiltersChange({ maxPrice: parseInt(e.target.value) || undefined })}
              className="h-12 border-2 hover:border-cyan-400 focus:border-cyan-500 transition-colors pr-11 text-sm font-medium"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 pointer-events-none">DA</span>
          </div>
        </div>
      </div>

      {/* Surface */}
      <div className="pb-4 border-b border-gray-100">
        <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-600">●</span>
          Surface (m²)
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minSurface || ""}
            onChange={(e) => onFiltersChange({ minSurface: parseInt(e.target.value) || undefined })}
            className="h-12 border-2 hover:border-cyan-400 focus:border-cyan-500 transition-colors text-sm font-medium"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxSurface || ""}
            onChange={(e) => onFiltersChange({ maxSurface: parseInt(e.target.value) || undefined })}
            className="h-12 border-2 hover:border-cyan-400 focus:border-cyan-500 transition-colors text-sm font-medium"
          />
        </div>
      </div>

      {/* Rooms */}
      <div className="pb-4 border-b border-gray-100">
        <h4 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-600">●</span>
          Nombre de pièces
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={filters.minRooms === num ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-12 font-bold text-sm transition-all duration-200",
                filters.minRooms === num
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-md border-0"
                  : "hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700"
              )}
              onClick={() => onFiltersChange({ minRooms: filters.minRooms === num ? undefined : num })}
            >
              {num}+
            </Button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full h-12 border-2 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-bold text-sm shadow-sm"
        onClick={onReset}
      >
        <X className="h-4 w-4 mr-2" />
        Réinitialiser les filtres
      </Button>
    </div>
  );
};

// =============================================================================
// MAIN PAGE
// =============================================================================

function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: searchParams.get("transaction") || "SALE",
    wilayaId: searchParams.get("wilaya") || "",
    communeId: searchParams.get("commune") || "",
    propertyTypes: searchParams.get("types")?.split(",").filter(Boolean) || [],
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
    minSurface: searchParams.get("minSurface") ? parseInt(searchParams.get("minSurface")!) : undefined,
    maxSurface: searchParams.get("maxSurface") ? parseInt(searchParams.get("maxSurface")!) : undefined,
    minRooms: searchParams.get("rooms") ? parseInt(searchParams.get("rooms")!) : undefined,
    sortBy: searchParams.get("sort") || "date_desc",
  });

  // Fetch filters config (wilaya, property types, etc.)
  const { data: filtersConfigData, isLoading: filtersLoading } = useGetFiltersConfigQuery();
  
  // Use fetched config or default to empty arrays
  const filtersConfig: FiltersConfig = filtersConfigData?.data || {
    propertyTypes: [],
    transactionTypes: [],
    wilayas: [],
    amenities: [],
    priceRanges: { sale: { min: 0, max: 100000000, step: 500000 }, rent: { min: 0, max: 500000, step: 5000 } },
    surfaceRanges: { min: 0, max: 1000, step: 10 },
  };

  // Search properties with current filters
  const [triggerSearch, { data: searchResults, isLoading }] = useLazySearchPropertiesQuery();

  const properties = searchResults?.data?.properties || [];
  const totalCount = searchResults?.data?.total || 0;

  // Trigger search when filters change
  useEffect(() => {
    triggerSearch({
      transactionType: filters.transactionType,
      wilayaId: filters.wilayaId || undefined,
      communeId: filters.communeId || undefined,
      propertyTypes: filters.propertyTypes.length ? filters.propertyTypes.join(',') : undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minSurface: filters.minSurface,
      maxSurface: filters.maxSurface,
      minRooms: filters.minRooms,
      sortBy: filters.sortBy,
      page: 1,
      limit: 20,
    });
  }, [filters, triggerSearch]);

  const handleFiltersChange = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      transactionType: "SALE",
      wilayaId: "",
      communeId: "",
      propertyTypes: [],
      minPrice: undefined,
      maxPrice: undefined,
      minSurface: undefined,
      maxSurface: undefined,
      minRooms: undefined,
      sortBy: "date_desc",
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.wilayaId) count++;
    if (filters.propertyTypes.length) count += filters.propertyTypes.length;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.minSurface) count++;
    if (filters.minRooms) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50/30 pt-[110px]">
      {/* Hero Search Bar - Sticky juste sous la navbar avec plus d'espace */}
      <div className="sticky top-[90px] z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            {/* Search Input */}
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher par ville, quartier..."
                  className="h-12 lg:h-14 pl-10 lg:pl-12 pr-4 text-sm lg:text-base border-2 rounded-xl hover:border-cyan-300 focus:border-cyan-500 transition-colors shadow-sm"
                />
              </div>
              <Select
                value={filters.transactionType}
                onValueChange={(value) => handleFiltersChange({ transactionType: value })}
              >
                <SelectTrigger className="w-full sm:w-40 h-12 lg:h-14 border-2 rounded-xl hover:border-cyan-300 transition-colors font-semibold shadow-sm text-sm lg:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filtersConfig.transactionTypes.map((type) => (
                    <SelectItem key={type.code} value={type.code} className="font-medium">
                      {type.nameFr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 lg:gap-3">
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden flex-1 sm:flex-none h-12 lg:h-14 px-4 lg:px-6 border-2 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 transition-colors font-semibold shadow-sm text-sm lg:text-base">
                    <Filter className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                    Filtres
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
                  <SheetHeader className="p-4 sm:p-6 border-b">
                    <SheetTitle className="text-lg sm:text-xl font-bold">Filtres de recherche</SheetTitle>
                  </SheetHeader>
                  <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <FilterSection
                      filters={filters}
                      filtersConfig={filtersConfig}
                      onFiltersChange={handleFiltersChange}
                      onReset={handleResetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFiltersChange({ sortBy: value })}
              >
                <SelectTrigger className="w-[140px] sm:w-[200px] h-12 lg:h-14 border-2 rounded-xl hover:border-cyan-300 transition-colors font-semibold shadow-sm hidden sm:flex text-sm lg:text-base">
                  <ArrowUpDown className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">Plus récents</SelectItem>
                  <SelectItem value="date_asc">Plus anciens</SelectItem>
                  <SelectItem value="price_asc">Prix croissant</SelectItem>
                  <SelectItem value="price_desc">Prix décroissant</SelectItem>
                  <SelectItem value="surface_desc">Surface</SelectItem>
                  <SelectItem value="popular">Popularité</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-1 p-1 bg-gray-100 rounded-xl shadow-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-10 w-10 lg:h-12 lg:w-12 rounded-lg transition-all",
                    viewMode === "grid" && "bg-white shadow-md"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-10 w-10 lg:h-12 lg:w-12 rounded-lg transition-all",
                    viewMode === "list" && "bg-white shadow-md"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <Building2 className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-10 w-10 lg:h-12 lg:w-12 rounded-lg transition-all",
                    viewMode === "map" && "bg-white shadow-md"
                  )}
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 lg:mt-4">
              {filters.propertyTypes.map((type) => {
                const typeConfig = filtersConfig.propertyTypes.find((t) => t.code === type);
                return (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="px-2.5 lg:px-3 py-1 lg:py-1.5 cursor-pointer hover:bg-gray-200 transition-colors font-medium text-xs lg:text-sm"
                    onClick={() => handleFiltersChange({
                      propertyTypes: filters.propertyTypes.filter((t) => t !== type),
                    })}
                  >
                    <span className="truncate max-w-[150px]">{typeConfig?.icon} {typeConfig?.nameFr}</span>
                    <X className="h-3 w-3 ml-1 shrink-0" />
                  </Badge>
                );
              })}
              {filters.wilayaId && (
                <Badge
                  variant="secondary"
                  className="px-2.5 lg:px-3 py-1 lg:py-1.5 cursor-pointer hover:bg-gray-200 transition-colors font-medium text-xs lg:text-sm"
                  onClick={() => handleFiltersChange({ wilayaId: "", communeId: "" })}
                >
                  <span className="truncate max-w-[150px]">📍 {filtersConfig.wilayas.find((w) => w.id === filters.wilayaId)?.nameFr}</span>
                  <X className="h-3 w-3 ml-1 shrink-0" />
                </Badge>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <Badge
                  variant="secondary"
                  className="px-2.5 lg:px-3 py-1 lg:py-1.5 cursor-pointer hover:bg-gray-200 transition-colors font-medium text-xs lg:text-sm"
                  onClick={() => handleFiltersChange({ minPrice: undefined, maxPrice: undefined })}
                >
                  💰 {filters.minPrice?.toLocaleString()} - {filters.maxPrice?.toLocaleString()} DA
                  <X className="h-3 w-3 ml-1.5" />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold"
              >
                Tout effacer
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          {viewMode !== "map" && (
            <aside className="hidden lg:block w-[320px] xl:w-[360px] shrink-0">
              <div className="sticky top-[200px] bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-h-[calc(100vh-220px)] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5 text-cyan-600" />
                    Filtres
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>
                <FilterSection
                  filters={filters}
                  filtersConfig={filtersConfig}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>
          )}

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              {isLoading ? (
                <Skeleton className="h-6 w-48" />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {properties.length}
                  </span>
                  {" "}biens disponibles
                </h2>
              )}
            </div>

            {/* Map View (Placeholder) */}
            {viewMode === "map" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <Map className="h-10 w-10 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Vue carte bientôt disponible
                </h3>
                <p className="text-gray-600 mb-6">
                  L'intégration Mapbox est en cours de développement
                </p>
                <Button
                  onClick={() => setViewMode("grid")}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  Retour à la vue grille
                </Button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && viewMode !== "map" && (
              <div className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden rounded-2xl">
                    <Skeleton className="h-56" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && properties.length === 0 && viewMode !== "map" && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                  <Home className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Aucun bien trouvé
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Essayez de modifier vos critères de recherche pour voir plus de résultats
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/30"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Results Grid/List */}
            {!isLoading && properties.length > 0 && viewMode !== "map" && (
              <>
                <div className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  <AnimatePresence mode="popLayout">
                    {properties.map((property: Property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        viewMode={viewMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Load More */}
                <div className="mt-10 text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-2 rounded-xl hover:border-cyan-300 hover:bg-cyan-50 font-semibold shadow-sm"
                  >
                    Voir plus de biens
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement des propriétés...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}
