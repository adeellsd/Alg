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
        "peer size-5 shrink-0 rounded-lg border border-transparent bg-white/80 shadow-sm transition-all outline-none hover:bg-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
        "focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2",
        "data-[state=checked]:bg-cyan-600 data-[state=checked]:text-white data-[state=checked]:border-cyan-600 data-[state=checked]:shadow-lg data-[state=checked]:shadow-cyan-600/20",
        "aria-invalid:border-rose-500 aria-invalid:bg-rose-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5 stroke-[3px]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
