/**
 * Input Component - Alger Authentique v5.0
 * 
 * Features:
 * - Border-radius: rounded-lg (design system refined)
 * - Focus ring: ring-4 ring-blue-pale
 * - Border: gray-300 → blue-electric on focus
 * - Placeholder: text-gray-500 (contraste WCAG AA)
 * - Error state: border-terracotta-fonce avec ring-rose-pale
 * - Animations: 200ms transition
 * 
 * Usage:
 * <Input type="text" placeholder="Entrez votre nom..." />
 * <Input aria-invalid={true} /> // Pour état d'erreur
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
  "flex w-full min-w-0 rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-all duration-200 outline-none",
        // Sizing - responsive
        "h-10 text-sm",
        "md:h-10",
        // Border & focus
        "border-gray-300 hover:border-gray-400",
        "focus:border-blue-electric focus:ring-4 focus:ring-blue-pale",
        // Placeholder - Meilleur contraste WCAG
        "placeholder:text-gray-500",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700",
        // Error state
        "aria-invalid:border-terracotta-fonce aria-invalid:focus:border-terracotta-fonce aria-invalid:focus:ring-rose-pale",
        className
      )}
      {...props}
    />
  )
}

export { Input }
