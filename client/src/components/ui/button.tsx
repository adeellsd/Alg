import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold tracking-tight transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-ring",
  {
    variants: {
      variant: {
        default: "bg-cyan-600 text-white hover:bg-cyan-700 shadow-md hover:shadow-blue active:scale-[0.98]",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-600 shadow-md hover:shadow-rose active:scale-[0.98]",
        outline:
          "border border-cyan-600 bg-transparent text-cyan-600 hover:bg-cyan-50 hover:border-cyan-700",
        secondary:
          "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-green active:scale-[0.98]",
        tertiary:
          "bg-coral text-white hover:bg-coral-light shadow-md hover:shadow-coral active:scale-[0.98]",
        premium:
          "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-blue active:scale-[0.98]",
        ghost:
          "hover:bg-cyan-50 hover:text-cyan-700",
        link: "text-cyan-600 underline-offset-4 hover:underline",
        glass:
          "backdrop-blur-md bg-white/70 text-cyan-600 hover:bg-white/90 border border-transparent",
      },
      size: {
        default: "h-11 px-6 py-3 rounded-2xl has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-4 text-xs has-[>svg]:px-3",
        lg: "h-14 rounded-2xl px-8 text-base has-[>svg]:px-6",
        icon: "size-11 rounded-2xl",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-14 rounded-2xl",
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
