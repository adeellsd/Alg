/**
 * Textarea Component - Alger Authentique v5.0
 * Mêmes règles que Input component
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
            "flex w-full min-w-0 rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 outline-none resize-y",
        // Sizing
        "min-h-20 text-sm",
        // Border & focus
        "border-gray-300 hover:border-gray-400",
        "focus:border-blue-electric focus:ring-4 focus:ring-blue-pale",
        // Placeholder - WCAG AA
        "placeholder:text-gray-500",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 disabled:resize-none",
        // Error state
        "aria-invalid:border-terracotta-fonce aria-invalid:focus:border-terracotta-fonce aria-invalid:focus:ring-rose-pale",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
