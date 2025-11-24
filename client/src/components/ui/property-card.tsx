/**
 * PropertyCard Component - Alger Vibrante v4
 * 
 * Carte de propriété premium avec:
 * - Border-radius XL (20px)
 * - Ombres colorées
 * - Animations douces
 * - Variantes: standard, glass, featured, elite
 * - Zellige pattern subtil au hover
 */

import * as React from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

export type PropertyCardVariant = "standard" | "glass" | "featured" | "elite"

export interface PropertyCardProps extends React.ComponentProps<"div"> {
  variant?: PropertyCardVariant
  image?: string
  title?: string
  location?: string
  price?: string
  priceUnit?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "coral" | "sunshine" | "premium"
  rooms?: number
  bathrooms?: number
  surface?: number
  isFavorite?: boolean
  onFavoriteClick?: () => void
}

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      variant = "standard",
      image,
      title,
      location,
      price,
      priceUnit = "DA/mois",
      badge,
      badgeVariant = "default",
      rooms,
      bathrooms,
      surface,
      isFavorite = false,
      onFavoriteClick,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      standard:
        "bg-white border-2 border-gray-200 shadow-blue hover:shadow-lg",
      glass:
        "property-card-glass",
      featured:
        "bg-cream border-3 border-sunshine shadow-coral hover:shadow-xl",
      elite:
        "property-card-elite",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group relative",
          "hover:-translate-y-2",
          variantClasses[variant],
          // Zellige pattern on hover
          variant === "elite" && "zellige-coral",
          className
        )}
        {...props}
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={title || "Property"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              No Image
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant={badgeVariant}>{badge}</Badge>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavoriteClick?.()
            }}
            className={cn(
              "absolute top-3 left-3 z-10",
              "w-11 h-11 rounded-full bg-white border-2 border-gray-200",
              "flex items-center justify-center",
              "transition-all duration-200",
              "hover:scale-110 hover:border-rose hover:shadow-md",
              isFavorite && "border-rose"
            )}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all",
                isFavorite ? "fill-rose stroke-rose" : "stroke-rose stroke-[2.5]"
              )}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 relative z-1">
          {/* Price */}
          {price && (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-electric font-display">
                {price}
              </span>
              <span className="text-sm text-gray-600">{priceUnit}</span>
            </div>
          )}

          {/* Title */}
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 font-display">
              {title}
            </h3>
          )}

          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <svg
                className="w-4 h-4 text-coral shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="line-clamp-1">{location}</span>
            </div>
          )}

          {/* Specs */}
          {(rooms || bathrooms || surface) && (
            <div className="flex items-center gap-4 pt-3 border-t-2 border-gray-200">
              {rooms && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg
                    className="w-4 h-4 text-green-vibrant"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="font-medium">{rooms} ch.</span>
                </div>
              )}

              {bathrooms && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg
                    className="w-4 h-4 text-green-vibrant"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                  <span className="font-medium">{bathrooms} sdb</span>
                </div>
              )}

              {surface && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg
                    className="w-4 h-4 text-green-vibrant"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                    />
                  </svg>
                  <span className="font-medium">{surface} m²</span>
                </div>
              )}
            </div>
          )}

          {/* Custom Children */}
          {children}
        </div>
      </div>
    )
  }
)

PropertyCard.displayName = "PropertyCard"

export { PropertyCard }
