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
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-cyan-600 text-white shadow-sm [a&]:hover:bg-cyan-700",
        secondary:
          "border-transparent bg-emerald-500 text-white shadow-sm [a&]:hover:bg-emerald-600",
        destructive:
          "border-transparent bg-rose-500 text-white shadow-sm [a&]:hover:bg-rose-600",
        outline:
          "border-cyan-600 bg-transparent text-cyan-600 [a&]:hover:bg-cyan-50",
        coral:
          "border-transparent bg-coral text-white shadow-sm [a&]:hover:bg-coral-light",
        sunshine:
          "border-transparent bg-sunshine text-white shadow-sm [a&]:hover:opacity-90",
        premium:
          "border-transparent bg-linear-to-r from-rose to-sunshine text-white shadow-md [a&]:hover:opacity-90 animate-pulse",
        free:
          "border-cyan-200 bg-cyan-50 text-cyan-700 [a&]:hover:bg-cyan-100",
        starter:
          "border-transparent bg-cyan-600 text-white shadow-sm [a&]:hover:bg-cyan-700",
        elite:
          "border-transparent bg-linear-to-r from-rose to-sunshine text-white shadow-md animate-pulse",
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
