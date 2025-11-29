/**
 * PropertyCard Component - RentAlg Design System v6.0
 * Fresh, Modern & Clean Property Display
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

  const isElite = variant === "elite" || boostTier === "TIER_3_ULTRA"

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white",
        "transition-all duration-300",
        "shadow-sm hover:shadow-xl",
        "hover:-translate-y-1",
        variant === "default" && "border-slate-200",
        variant === "featured" && "border-primary-500 ring-2 ring-primary-100",
        isElite && "border-orange-500 ring-2 ring-orange-100",
        variant === "compact" && "flex-row rounded-xl",
        className
      )}
      {...props}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-slate-100",
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <span className="text-xs font-medium text-slate-400">
              Aucune image
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10 gap-2">
          {badge && variant !== "compact" && (
            <Badge variant={badgeVariant} className="shadow-sm">
              {badge}
            </Badge>
          )}
          {isElite && variant !== "compact" && (
            <Badge variant="elite" className="shadow-sm">
              ⭐ ULTRA
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteClick?.()
          }}
          className={cn(
            "absolute top-3 right-3 z-10",
            "flex size-10 items-center justify-center rounded-full",
            "bg-white/90 backdrop-blur-sm shadow-md",
            "transition-all duration-200",
            "hover:bg-white hover:scale-110 active:scale-95",
            isFavorite ? "text-red-500" : "text-slate-400"
          )}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={cn("size-5", isFavorite && "fill-current")} />
        </button>
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 flex-col",
          variant === "compact" ? "p-3 sm:p-4" : "p-5 gap-3"
        )}
      >
        {/* Price */}
        {price && (
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-bold text-primary-600">
              {formatPrice(price)}
              <span className="ml-1 text-sm font-normal text-slate-500">
                {priceUnit}
              </span>
            </p>
          </div>
        )}

        {/* Title */}
        {title && (
          <h3
            className={cn(
              "font-semibold text-slate-900 line-clamp-2 transition-colors duration-200",
              "group-hover:text-primary-600",
              variant === "compact" ? "text-sm" : "text-lg"
            )}
          >
            {title}
          </h3>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>
        )}

        {/* Features */}
        {(rooms || bathrooms || surface) && variant !== "compact" && (
          <div className="flex items-center gap-4 pt-3 mt-auto border-t border-slate-100">
            {rooms !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{rooms}</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{bathrooms}</span>
              </div>
            )}
            {surface !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Maximize className="w-4 h-4 text-slate-400" />
                <span>{surface} m²</span>
              </div>
            )}
          </div>
        )}

        {badge && variant === "compact" && (
          <div className="mt-2">
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export { PropertyCard }
