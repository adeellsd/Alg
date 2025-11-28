/**
 * PropertyCardCasbah - Carte propriété "Alger Authentique v5.0"
 * 
 * @features
 * - Gradient beige Casbah (from-sable to-beige-casbah)
 * - Pattern Zellige subtil (pattern-mosaic-elite sur hover)
 * - Hover border doré (border-or)
 * - Border-radius arrondi (rounded-[24px])
 * - Badges avec gradients colorés
 * - Features pills avec fond beige
 * - Animations méditerranéennes (200ms)
 * 
 * @variants
 * - default: Card standard avec hover effects
 * - featured: Ring bleu turquoise + shadow-blue
 * - elite: Pattern Zellige visible + gradient doré
 * - compact: Version horizontale pour mobile
 * 
 * @palette
 * - Beige: sable, beige-casbah (Casbah)
 * - Bleu: blue-electric, turquoise-mer (Méditerranée)
 * - Or: or (Zellige premium)
 * - Corail: corail-vif (Sunset)
 * 
 * @version 5.0 - Alger Authentique
 */
"use client"

import * as React from "react"
import Image from "next/image"
import { Heart, MapPin, Bed, Bath, Maximize } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

export type PropertyCardVariant = "default" | "featured" | "elite" | "compact"

export interface PropertyCardProps extends React.ComponentProps<"div"> {
  variant?: PropertyCardVariant
  image?: string
  title?: string
  location?: string
  price?: string | number
  priceUnit?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "outline" | "success" | "destructive" | "rent" | "sale" | "new" | "urgent"
  boostTier?: "TIER_1" | "TIER_2" | "TIER_3_ULTRA" | null
  rooms?: number
  bathrooms?: number
  surface?: number
  isFavorite?: boolean
  onFavoriteClick?: () => void
}

function PropertyCard({
  className,
  variant = "default",
  image,
  title,
  location,
  price,
  priceUnit = "DA/mois",
  badge,
  badgeVariant = "secondary",
  boostTier,
  rooms,
  bathrooms,
  surface,
  isFavorite = false,
  onFavoriteClick,
  children,
  ...props
}: PropertyCardProps) {
  const formatPrice = (p: string | number | undefined) => {
    if (!p) return null
    const num = typeof p === "string" ? parseFloat(p) : p
    return new Intl.NumberFormat("fr-DZ").format(num)
  }

  // Détection variant elite automatique si boostTier ULTRA
  const isElite = variant === "elite" || boostTier === "TIER_3_ULTRA"

  return (
    <div
      className={cn(
  "group relative flex flex-col overflow-hidden rounded-3xl border-2 border-transparent",
  "bg-linear-to-br from-white to-sable",
        "transition-all duration-200",
        "shadow-lg hover:shadow-2xl",
        // Hover effects
        "hover:border-or hover:-translate-y-2 hover:scale-[1.02]",
        // Variant styles
        variant === "featured" && "ring-2 ring-turquoise-mer ring-offset-2 shadow-blue",
        isElite && "border-or shadow-[0_20px_60px_-10px_rgba(255,215,0,0.3)]",
  variant === "compact" && "flex-row rounded-xl",
        className
      )}
      {...props}
    >
      {/* Decorative overlay disabled (zellige paused) */}
      {/* Intentionally removed pattern overlay for a cleaner look */}
      {/* Image Container avec gradient overlay */}
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100",
          variant === "compact" ? "w-32 sm:w-40 shrink-0" : "aspect-4/3"
        )}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt={title || "Property"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Gradient overlay sunset (apparaît au hover) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-beige-casbah to-beige-chaud">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Aucune image
            </span>
          </div>
        )}

        {/* Badges avec nouveau style */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 gap-2">
          {badge && variant !== "compact" && (
            <Badge 
              variant={badgeVariant} 
              className={cn(
                "shadow-lg backdrop-blur-md",
                badgeVariant === "rent" && "bg-green-vibrant/90",
                badgeVariant === "sale" && "bg-blue-electric/90"
              )}
            >
              {badge}
            </Badge>
          )}
          
          {/* Badge ULTRA pour boost tier elite */}
          {isElite && variant !== "compact" && (
            <Badge className="bg-linear-to-r from-or via-orange-brulant to-corail-vif text-white shadow-lg">
              ⭐ ULTRA
            </Badge>
          )}
        </div>

        {/* Favorite Button avec effet Zellige */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteClick?.()
          }}
          className={cn(
            "absolute top-4 right-4 z-10",
            "flex size-12 items-center justify-center rounded-full",
            "bg-white/90 backdrop-blur-md shadow-lg border border-white/50",
            "transition-all duration-200",
            "hover:bg-or hover:text-white hover:scale-110 active:scale-95",
            isFavorite ? "text-terracotta-fonce" : "text-gray-600"
          )}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            className={cn(
              "size-5",
              isFavorite && "fill-current"
            )}
          />
        </button>
      </div>

      {/* Content avec nouveau spacing v5.0 */}
      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col",
          variant === "compact" ? "p-3 sm:p-4" : "p-6 space-y-4"
        )}
      >
        {/* Prix avec style doré premium */}
        {price && (
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold bg-linear-to-r from-blue-electric to-turquoise-mer bg-clip-text text-transparent">
              {formatPrice(price)}
            </p>
            <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-sable rounded-full">
              {priceUnit}
            </span>
          </div>
        )}

        {/* Titre avec hover bleu turquoise */}
        {title && (
          <h3
            className={cn(
              "font-semibold text-gray-900 line-clamp-2 transition-colors duration-200",
              "group-hover:text-blue-electric",
              variant === "compact" ? "text-sm" : "text-xl"
            )}
          >
            {title}
          </h3>
        )}

        {/* Location avec icône stylisée */}
        {location && (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-turquoise-mer to-blue-electric flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm truncate">{location}</span>
          </div>
        )}

        {/* Features pills avec fond beige Casbah */}
        {(rooms || bathrooms || surface) && variant !== "compact" && (
          <div className="flex items-center gap-4 pt-4 border-t border-beige-casbah">
            {rooms !== undefined && (
              <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-br from-sable to-beige-casbah rounded-[12px]">
                <Bed className="w-4 h-4 text-blue-electric" />
                <span className="text-sm font-medium text-gray-700">{rooms}</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-br from-sable to-beige-casbah rounded-[12px]">
                <Bath className="w-4 h-4 text-blue-electric" />
                <span className="text-sm font-medium text-gray-700">{bathrooms}</span>
              </div>
            )}
            {surface !== undefined && (
              <div className="flex items-center gap-2 px-3 py-2 bg-linear-to-br from-sable to-beige-casbah rounded-[12px]">
                <Maximize className="w-4 h-4 text-blue-electric" />
                <span className="text-sm font-medium text-gray-700">{surface} m²</span>
              </div>
            )}
          </div>
        )}

        {/* Badge pour compact variant */}
        {badge && variant === "compact" && (
          <div className="mt-2">
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          </div>
        )}

        {children}
      </div>
      
      {/* Hover effect border Zellige doré (animation méditerranéenne) */}
  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-or transition-all duration-200 pointer-events-none" />
    </div>
  )
}

export { PropertyCard }

