/**
 * Card Components - Alger Authentique v5.0
 * 
 * Card de base:
 * - Border-radius: rounded-[20px] (design system)
 * - Shadow: shadow-sm → shadow-md on hover
 * - Border: gray-200
 * 
 * Variants (via CardFeatured, CardPremium):
 * - CardFeatured: Border dorée + pattern Khatam
 * - CardPremium: Gradient beige + pattern Mosaic Elite
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
  "rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardFeatured - Card avec bordure dorée et pattern Zellige
 * Pour les annonces featured/sponsorisées
 */
function CardFeatured({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-featured"
      className={cn(
  "relative rounded-2xl border-2 border-or bg-white text-gray-900 shadow-lg transition-all duration-200 hover:shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
  {/* Decorative overlay disabled (zellige paused) */}
      {/* Contenu */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * CardPremium - Card avec gradient beige et pattern Mosaic Elite
 * Pour les annonces ELITE tier
 */
function CardPremium({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-premium"
      className={cn(
  "relative rounded-2xl border-2 border-fuchsia bg-linear-to-br from-white to-sable text-gray-900 shadow-rose transition-all duration-200 hover:shadow-2xl overflow-hidden",
        className
      )}
      {...props}
    >
  {/* Decorative overlay disabled (zellige paused) */}
      {/* Contenu */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-4 sm:p-5 lg:p-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-base sm:text-lg font-semibold leading-tight text-gray-900", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto shrink-0", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-4 pt-0 sm:p-5 sm:pt-0 lg:p-6 lg:pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2 border-t border-gray-100 p-4 sm:p-5 lg:p-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardFeatured,
  CardPremium,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
