"use client";

/**
 * PropertyCardVintage - RentAlg Design System v6.0 "Alger Authentique"
 * Carte de propriété avec esthétique vintage algérienne
 */

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Heart, LayoutGrid, Bed, Bath } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyFrontend } from "@/types/property-frontend";

interface PropertyCardVintageProps {
  property: PropertyFrontend;
  viewMode: "grid" | "list" | "map";
}

const formatPrice = (price: number) => {
  return Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 0
  }).format(price).replace('DZD', 'DA');
};

export function PropertyCardVintage({ property, viewMode }: PropertyCardVintageProps) {
  // Extract data safely
  const thumbnailUrl = property.images?.[0] || property.thumbnail || "/placeholder.jpg";
  const price = typeof property.price === 'object' && property.price?.amount 
    ? (typeof property.price.amount === 'string' ? parseFloat(property.price.amount) : property.price.amount)
    : (typeof property.price === 'number' ? property.price : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative bg-white/70 backdrop-blur-sm rounded-[24px] border-2 border-[#E8D5B7] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500",
        viewMode === "list" && "flex flex-row"
      )}
    >
      {/* Ornamental corner - Or */}
      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#FFD700] rounded-tl-xl opacity-60 z-10" />
      
      {/* Zellige pattern overlay - TRÈS subtil */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M30 0L60 30L30 60L0 30z\\" fill=\\"%23CD5C5C\\"/%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Image container */}
      <div className={cn(
        "relative overflow-hidden",
        viewMode === "list" ? "w-1/3" : "w-full"
      )}>
        <img 
          src={thumbnailUrl}
          alt={property.title}
          className="aspect-[4/3] w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badge transaction - Position top-left */}
        <div className="absolute top-3 left-3 z-20">
          <span className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm",
            property.transactionType === "SALE" 
              ? "bg-[#0891B2] text-white" 
              : "bg-[#059669] text-white"
          )}>
            {property.transactionType === "SALE" ? "À VENDRE" : "À LOUER"}
          </span>
        </div>

        {/* Badge boost - Position top-right (SI boost actif) */}
        {property.boostTier && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-[#CD5C5C] text-white shadow-lg animate-pulse">
              ⭐ EN VEDETTE
            </span>
          </div>
        )}

        {/* Favorite button - Position absolute bottom-right dans l'image */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Implement favorite logic
          }}
          className="absolute bottom-3 right-3 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all"
        >
          <Heart className="w-5 h-5 text-[#CD5C5C]" />
        </button>
      </div>

      {/* Content */}
      <div className={cn(
        "p-5 space-y-3 relative z-10",
        viewMode === "list" && "flex-1"
      )}>
        {/* Prix - GROS et en bleu électrique */}
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-extrabold text-[#0891B2]">
            {formatPrice(price)}
          </h3>
          {property.pricePerSqm && (
            <span className="text-sm text-[#C19A6B] font-medium">
              {Intl.NumberFormat('fr-DZ').format(property.pricePerSqm)} DA/m²
            </span>
          )}
        </div>

        {/* Titre - VERT JARDIN ✨ */}
        <h4 className="text-base font-bold text-[#6B8E23] line-clamp-1">
          {property.title}
        </h4>

        {/* Localisation - Avec icône */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-[#40E0D0] shrink-0" />
          <span className="truncate">
            {property.location?.commune?.nameFr}, {property.location?.wilaya?.nameFr}
          </span>
        </div>

        {/* Specs - Icons horizontaux */}
        <div className="flex items-center gap-4 pt-2 border-t border-[#E8D5B7]">
          {property.surface && (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <div className="w-7 h-7 rounded-lg bg-[#E8D5B7]/40 flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 text-[#0891B2]" />
              </div>
              <span className="font-semibold">{property.surface} m²</span>
            </div>
          )}
          
          {property.bedrooms && (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <div className="w-7 h-7 rounded-lg bg-[#E8D5B7]/40 flex items-center justify-center">
                <Bed className="w-4 h-4 text-[#0891B2]" />
              </div>
              <span className="font-semibold">{property.bedrooms}</span>
            </div>
          )}

          {property.bathrooms && (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <div className="w-7 h-7 rounded-lg bg-[#E8D5B7]/40 flex items-center justify-center">
                <Bath className="w-4 h-4 text-[#0891B2]" />
              </div>
              <span className="font-semibold">{property.bathrooms}</span>
            </div>
          )}
        </div>

        {/* Badges bottom - Prix négociable, Papiers, etc */}
        <div className="flex flex-wrap gap-2 pt-2">
          {property.isNegotiable && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#059669]/10 text-[#059669] border border-[#059669]/20">
              Prix négociable
            </span>
          )}
          {property.hasLivretFoncier && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFD700]/20 text-[#6B8E23] border border-[#FFD700]/40">
              📄 Papiers ✓
            </span>
          )}
        </div>
      </div>

      {/* Hover effect - Border glow */}
      <div className="absolute inset-0 rounded-[24px] border-2 border-transparent group-hover:border-[#40E0D0]/40 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
