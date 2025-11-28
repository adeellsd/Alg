/**
 * Button Component - Alger Authentique v5.1 Refined
 * 
 * Variants:
 * - default: Bleu électrique (blue-electric) - PRIMARY CTA
 * - success: Vert jardin (green-vibrant) - Actions positives
 * - coral: Corail vif (corail-vif) - Promotions, urgence
 * - destructive: Terracotta (terracotta-fonce) - Actions destructives
 * - outline: Bordure bleue - Actions secondaires
 * - secondary: Gris neutre - Actions tertiaires
 * - ghost: Transparent - Actions subtiles
 * - link: Texte souligné - Liens inline
 * 
 * Sizes: sm (h-8), default (h-10), lg (h-12), xl (h-14), icon variants
 * Border-radius: rounded-[14px] (strict design system)
 * Focus ring: ring-blue-pale
 * Animations: 200ms, scale on hover
 * 
 * REMOVED: variant 'premium' (trop de gradient doré)
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-pale",
  {
    variants: {
      variant: {
        default: 
          "bg-blue-electric text-white shadow-blue hover:bg-blue-deep hover:shadow-lg hover:scale-[1.02]",
        destructive:
          "bg-terracotta-fonce text-white shadow-sm hover:bg-rouge hover:shadow-md hover:scale-[1.02]",
        outline:
          "border-2 border-blue-electric bg-white text-blue-electric hover:bg-blue-pale hover:border-blue-deep",
        secondary:
          "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
        success:
          "bg-green-vibrant text-white shadow-green hover:bg-green-fresh hover:shadow-lg hover:scale-[1.02]",
        ghost:
          "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        link: 
          "text-blue-electric underline-offset-4 hover:underline p-0 h-auto",
        // Variant coral conservé pour promotions
        coral:
          "bg-corail-vif text-white shadow-coral hover:bg-orange-brulant hover:shadow-lg hover:scale-[1.02]",
      },
      size: {
  default: "h-10 px-5 text-sm rounded-lg [&_svg]:size-4",
  sm: "h-8 px-3 text-xs rounded-lg [&_svg]:size-3.5",
  lg: "h-12 px-6 text-base rounded-lg [&_svg]:size-5",
  xl: "h-14 px-8 text-lg rounded-lg [&_svg]:size-5",
  icon: "size-10 rounded-lg [&_svg]:size-4",
  "icon-sm": "size-8 rounded-lg [&_svg]:size-4",
  "icon-lg": "size-12 rounded-lg [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
