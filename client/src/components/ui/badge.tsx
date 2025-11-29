/**
 * Badge Component - RentAlg Design System v6.0
 * Fresh, Modern & Clean
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors [&>svg]:size-3 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white",
        secondary:
          "border-transparent bg-slate-100 text-slate-700",
        destructive:
          "border-transparent bg-red-600 text-white",
        success:
          "border-transparent bg-green-600 text-white",
        warning:
          "border-transparent bg-orange-500 text-white",
        outline:
          "border-slate-200 bg-white text-slate-700",
        
        // Real estate specific variants
        rent:
          "border-transparent bg-teal-600 text-white font-bold",
        sale:
          "border-transparent bg-primary-600 text-white font-bold",
        new:
          "border-transparent bg-orange-500 text-white font-bold animate-pulse",
        urgent:
          "border-transparent bg-red-600 text-white font-bold animate-pulse",
        
        // Tier badges
        free:
          "border-primary-200 bg-primary-50 text-primary-700",
        starter:
          "border-transparent bg-primary-600 text-white",
        pro:
          "border-transparent bg-gradient-to-r from-primary-600 to-teal-600 text-white",
        elite:
          "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold",
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

function BadgeElite({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-2.5 py-0.5 text-xs",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </span>
  )
}

export { Badge, BadgeElite, badgeVariants }
