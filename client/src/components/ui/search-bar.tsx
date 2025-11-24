/**
 * SearchBar Component - Alger Vibrante v4
 * 
 * Barre de recherche premium avec glassmorphism
 * Utilisée dans le hero de la landing page
 */

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface SearchBarProps extends React.ComponentProps<"div"> {
  variant?: "standard" | "glass" | "premium"
  onSearch?: (query: string) => void
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, variant = "standard", onSearch, ...props }, ref) => {
    const [query, setQuery] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSearch?.(query)
    }

    const variantClasses = {
      standard: "bg-white border-2 border-gray-200 shadow-xl",
      glass: "search-bar-glass",
      premium: "search-bar-glass-premium",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[20px] p-6 relative overflow-hidden",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Zellige pattern decoratif */}
        {variant !== "standard" && (
          <div
            className="absolute -top-5 -right-5 w-32 h-32 opacity-100 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230891B2' fill-opacity='0.04'%3E%3Cpath d='M30 0h10v10h-10zm10 10h10v10h-10zm-10 10h10v10h-10zm-10 10h10v10h-10zm10 10h10v10h-10zm10 10h10v10h-10z'/%3E%3Cpath d='M0 30h10v10h-10zm10 10h10v10h-10zm10-10h10v10h-10zm10-10h10v10h-10zm10 10h10v10h-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_auto] gap-4 items-end">
            {/* Localisation */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Localisation
            </label>
            <input
              type="text"
              placeholder="Alger, Oran, Constantine..."
              className={cn(
                "w-full px-4 py-3 rounded-[14px]",
                "border border-gray-300",
                "focus:outline-none focus:border-cyan-600",
                "transition-all duration-200",
                "text-gray-900 placeholder:text-gray-500"
              )}
            />
          </div>            {/* Type de bien */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Type de bien
              </label>
              <select
                className={cn(
                  "w-full px-4 py-3 rounded-[14px]",
                  "border border-gray-300",
                  "focus:outline-none focus:border-cyan-600",
                  "transition-all duration-200",
                  "text-gray-900 appearance-none bg-white cursor-pointer",
                  "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3e%3cpath fill=%27%234B5563%27 d=%27M6 9L1 4h10z%27/%3e%3c/svg%3e')]",
                  "bg-no-repeat bg-[right_0.75rem_center]"
                )}
              >
                <option>Appartement</option>
                <option>Villa</option>
                <option>Studio</option>
                <option>Terrain</option>
                <option>Local commercial</option>
              </select>
            </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Budget max
            </label>
            <input
              type="text"
              placeholder="50 000 DA"
              className={cn(
                "w-full px-4 py-3 rounded-[14px]",
                "border border-gray-300",
                "focus:outline-none focus:border-cyan-600",
                "transition-all duration-200",
                "text-gray-900 placeholder:text-gray-500"
              )}
            />
          </div>            {/* Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto"
            >
              <Search className="w-5 h-5" />
              Rechercher
            </Button>
          </div>
        </form>
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }
