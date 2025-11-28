/**
 * Badge Component - Alger Authentique v5.1 Refined
 * 
 * Variants de base:
 * - default: Bleu électrique (blue-electric)
 * - success: Vert jardin (green-vibrant)
 * - warning: Sunshine (sunshine)
 * - destructive: Terracotta (terracotta-fonce)
 * - secondary: Gris neutre
 * - outline: Bordure grise
 * 
 * Variants immobiliers:
 * - rent: Vert (À louer)
 * - sale: Bleu (Vente)
 * - new: Corail avec pulse (Nouveau)
 * - urgent: Terracotta avec pulse (Urgent)
 * 
 * Variants tiers (abonnements):
 * - free: Bleu pâle
 * - starter: Bleu électrique
 * - pro: Bleu électrique
 * - elite: Gradient bleu Méditerranée (blue-electric → turquoise-mer) + pattern Zellige
 * 
 * Border-radius: rounded-[8px] (badges)
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-[8px] border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-electric text-white shadow-blue",
        secondary:
          "border-transparent bg-gray-100 text-gray-700",
        destructive:
          "border-transparent bg-terracotta-fonce text-white",
        success:
          "border-transparent bg-green-vibrant text-white shadow-green",
        warning:
          "border-transparent bg-sunshine text-white shadow-coral",
        outline:
          "border-gray-200 bg-transparent text-gray-700",
        
        // Variants immobiliers v5.0
        rent:
          "border-transparent bg-green-vibrant text-white shadow-green font-bold",
        sale:
          "border-transparent bg-blue-electric text-white shadow-blue font-bold",
        new:
          "border-transparent bg-corail-vif text-white shadow-coral font-bold animate-pulse",
        urgent:
          "border-transparent bg-terracotta-fonce text-white shadow-sm font-bold animate-pulse",
        
        // Tier badges
        free:
          "border-blue-sky bg-blue-pale text-blue-deep",
        starter:
          "border-transparent bg-blue-electric text-white shadow-blue",
        pro:
          "border-transparent bg-blue-electric text-white shadow-blue",
        elite:
          "border-transparent bg-gradient-to-r from-blue-electric to-turquoise-mer text-white shadow-blue font-bold relative overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * BadgeElite - Badge ELITE avec pattern Zellige
 * Usage: <BadgeElite>ELITE</BadgeElite>
 */
function BadgeElite({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center gap-1 rounded-[8px] border-transparent bg-gradient-to-r from-blue-electric to-turquoise-mer text-white shadow-blue font-bold px-2.5 py-0.5 text-xs overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Pattern Zellige subtil en arrière-plan */}
      <span className="absolute inset-0 pattern-mosaic-elite opacity-[0.15] pointer-events-none" />
      {/* Contenu */}
      <span className="relative z-10">{children}</span>
    </span>
  )
}

export { Badge, BadgeElite, badgeVariants }
