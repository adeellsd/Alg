import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export type BadgeVariant = 
  | "default"
  | "secondary" 
  | "destructive"
  | "outline"
  | "coral"
  | "sunshine"
  | "premium"
  | "free"
  | "starter"
  | "elite"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wide w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-blue-electric bg-blue-electric text-white shadow-blue [a&]:hover:bg-blue-deep",
        secondary:
          "border-green-vibrant bg-green-vibrant text-white shadow-green [a&]:hover:bg-green-fresh",
        destructive:
          "border-terracotta bg-terracotta text-white shadow-md [a&]:hover:bg-terracotta-light focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-blue-electric bg-transparent text-blue-electric [a&]:hover:bg-blue-pale",
        coral:
          "border-coral bg-coral text-white shadow-coral [a&]:hover:bg-coral-light",
        sunshine:
          "border-sunshine bg-sunshine text-white shadow-md [a&]:hover:opacity-90",
        premium:
          "border-transparent bg-gradient-to-r from-rose to-sunshine text-white shadow-rose [a&]:hover:opacity-90 animate-pulse",
        free:
          "border-blue-sky bg-blue-pale text-blue-deep [a&]:hover:bg-blue-pale/80",
        starter:
          "border-transparent bg-blue-electric text-white shadow-blue [a&]:hover:bg-blue-deep",
        elite:
          "border-transparent bg-gradient-to-r from-rose to-sunshine text-white shadow-rose animate-pulse",
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

export { Badge, badgeVariants }
