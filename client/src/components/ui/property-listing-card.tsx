"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  MapPin,
  Maximize,
  BedDouble,
  Bath,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, getPropertyTypeLabel } from "@/lib/utils"
import { PropertyFrontend } from "@/types/property-frontend"

interface PropertyCardProps {
  property: PropertyFrontend
  viewMode: "grid" | "list" | "map"
}

const formatDisplayPrice = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1).replace(".0", "")} Md DA`
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1).replace(".0", "")} M DA`
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)} K DA`
  }
  return `${amount.toLocaleString("fr-FR")} DA`
}

export function PropertyListingCard({ property, viewMode }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const transactionLabel =
    property.transactionType === "RENT" ? "Location" : "Vente"
  const priceAmount =
    typeof property.price.amount === "string"
      ? parseFloat(property.price.amount)
      : property.price.amount
  const displayPrice = formatDisplayPrice(priceAmount)

  // =========================================================================
  // GRID VIEW
  // =========================================================================
  if (viewMode === "grid") {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
  className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-lg"
      >
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
          <img
            src={
              imageError
                ? "/placeholder.jpg"
                : property.thumbnail || "/placeholder.jpg"
            }
            alt={property.title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top badges */}
          <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              {/* Boost Badge */}
              {property.isBoosted && (
                <Badge
                  className={cn(
                    "shadow-rose",
                    property.boostTier === "ULTRA" &&
                      "border-0 bg-linear-to-r from-fuchsia to-sunshine text-white font-bold",
                    property.boostTier === "PREMIUM" &&
                      "border-0 bg-linear-to-r from-blue-electric to-blue-bright text-white shadow-blue",
                    property.boostTier === "EN_AVANT" &&
                      "border-0 bg-white text-gray-700"
                  )}
                >
                  <Sparkles className="mr-1 size-3" />
                  {property.boostTier === "ULTRA"
                    ? "Ultra"
                    : property.boostTier === "PREMIUM"
                      ? "Premium"
                      : "Top"}
                </Badge>
              )}

              {/* Transaction Badge */}
              <Badge
                className={cn(
                  "border-0",
                  property.transactionType === "RENT"
                    ? "bg-green-vibrant text-white shadow-green"
                    : "bg-blue-electric text-white shadow-blue"
                )}
              >
                {transactionLabel}
              </Badge>
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className={cn(
                "flex size-9 items-center justify-center rounded-full shadow-sm transition-all",
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
              )}
            >
              <Heart className={cn("size-4", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 p-4">
          {/* Price & Type */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
              {displayPrice}
            </p>
            <Badge variant="secondary" className="shrink-0 text-sm font-medium">
              {getPropertyTypeLabel(property.propertyType)}
            </Badge>
          </div>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-base text-gray-600">
            <MapPin className="size-4 shrink-0 text-blue-electric" />
            <span className="truncate">
              {property.location.commune?.nameFr},{" "}
              {property.location.wilaya.nameFr}
            </span>
          </p>

          {/* Title */}
          <h3 className="line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-electric sm:text-lg">
            {property.title}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
            {property.bedrooms != null && property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <BedDouble className="size-4" />
                <span className="text-base font-medium">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms != null && property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Bath className="size-4" />
                <span className="text-base font-medium">
                  {property.bathrooms}
                </span>
              </div>
            )}
            {property.surface && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Maximize className="size-4" />
                <span className="text-base font-medium">
                  {property.surface} m²
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    )
  }

  // =========================================================================
  // LIST VIEW
  // =========================================================================
  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-lg sm:flex-row"
    >
      {/* Image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:w-48 md:w-64 lg:w-72">
        <img
          src={
            imageError
              ? "/placeholder.jpg"
              : property.thumbnail || "/placeholder.jpg"
          }
          alt={property.title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Transaction Badge */}
        <div className="absolute left-3 top-3">
          <Badge
            className={cn(
              "border-0",
              property.transactionType === "RENT"
                ? "bg-green-vibrant text-white shadow-green"
                : "bg-blue-electric text-white shadow-blue"
            )}
          >
            {transactionLabel}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div className="space-y-2">
          {/* Price & Favorite */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              {displayPrice}
            </p>
            <button
              onClick={handleFavoriteToggle}
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                isFavorite
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              )}
            >
              <Heart
                className={cn("size-5", isFavorite && "fill-current")}
              />
            </button>
          </div>

          {/* Title */}
          <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-electric sm:text-base">
            {property.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="size-3.5 shrink-0 text-blue-electric" />
            <span className="truncate">
              {property.location.commune?.nameFr},{" "}
              {property.location.wilaya.nameFr}
            </span>
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3">
          {property.bedrooms != null && property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <BedDouble className="size-4" />
              <span className="text-sm font-medium">
                {property.bedrooms} ch.
              </span>
            </div>
          )}
          {property.bathrooms != null && property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <Bath className="size-4" />
              <span className="text-sm font-medium">
                {property.bathrooms} sdb
              </span>
            </div>
          )}
          {property.surface && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <Maximize className="size-4" />
              <span className="text-sm font-medium">{property.surface} m²</span>
            </div>
          )}
          <Badge
            variant="secondary"
            className="ml-auto hidden text-xs sm:inline-flex"
          >
            {getPropertyTypeLabel(property.propertyType)}
          </Badge>
        </div>
      </div>
    </motion.article>
  )
}
