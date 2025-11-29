/**
 * Button Component - RentAlg Design System v6.0
 * Fresh, Modern & Accessible
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg",
        secondary:
          "bg-teal-600 text-white shadow-md hover:bg-teal-700 hover:shadow-lg",
        success:
          "bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg",
        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg",
        warning:
          "bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg",
        outline:
          "border-2 border-primary-600 text-primary-600 bg-white hover:bg-primary-50",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        link:
          "text-primary-600 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 text-sm rounded-lg [&_svg]:size-4",
        sm: "h-8 px-3 text-xs rounded-md [&_svg]:size-3.5",
        lg: "h-12 px-6 text-base rounded-lg [&_svg]:size-5",
        xl: "h-14 px-8 text-lg rounded-xl [&_svg]:size-5",
        icon: "size-10 rounded-lg [&_svg]:size-4",
        "icon-sm": "size-8 rounded-md [&_svg]:size-4",
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
