/**
 * Input Component - RentAlg Design System v6.0
 * Fresh, Modern & Accessible
 */

import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex w-full min-w-0 rounded-lg border bg-white px-4 py-2.5 text-slate-900 transition-all duration-200 outline-none",
        // Sizing
        "h-10 text-sm",
        // Border & focus
        "border-slate-200 hover:border-slate-300",
        "focus:border-primary-500 focus:ring-2 focus:ring-primary-100",
        // Placeholder
        "placeholder:text-slate-400",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700",
        // Error state
        "aria-invalid:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-100",
        className
      )}
      {...props}
    />
  )
}

export { Input }
