"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "peer size-4 shrink-0 rounded border bg-white transition-all duration-200 outline-none",
        // Border & hover
        "border-gray-300 hover:border-gray-400",
        // Focus
        "focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2",
        // Checked state
        "data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 data-[state=checked]:text-white",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Error
        "aria-invalid:border-red-500",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
