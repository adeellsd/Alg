import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-blue-electric text-white hover:bg-blue-deep shadow-blue hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-terracotta text-white hover:bg-terracotta-light shadow-md hover:shadow-lg focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 hover:-translate-y-0.5",
        outline:
          "border-2 border-blue-electric bg-transparent text-blue-electric hover:bg-blue-pale dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-green-vibrant text-white hover:bg-green-fresh shadow-green hover:shadow-lg hover:-translate-y-0.5",
        tertiary:
          "bg-coral text-white hover:bg-coral-light shadow-coral hover:shadow-lg hover:-translate-y-0.5",
        premium:
          "bg-gradient-to-r from-rose to-sunshine text-white shadow-rose hover:shadow-lg hover:-translate-y-0.5",
        ghost:
          "hover:bg-blue-pale hover:text-blue-electric dark:hover:bg-accent/50",
        link: "text-blue-electric underline-offset-4 hover:underline",
        glass:
          "glass-standard text-blue-electric hover:bg-white/20",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-4",
        sm: "h-9 rounded-[12px] gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-[14px] px-8 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
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
