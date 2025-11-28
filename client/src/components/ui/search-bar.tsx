"use client"

import * as React from "react"
import { Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"

export interface SearchBarProps extends React.ComponentProps<"div"> {
  onSearch?: (query: string) => void
}

function SearchBar({
  className,
  onSearch,
  ...props
}: SearchBarProps) {
  const [query, setQuery] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div
      className={cn(
  "rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl p-6 shadow-xl sm:p-8",
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-[1fr_1fr_auto] lg:grid-cols-[2fr_1.5fr_1fr_auto]">
          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Localisation
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Alger, Oran, Constantine..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 sm:h-12 rounded-lg"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Type de bien
            </label>
            <div className="relative">
              <select
                className={cn(
                  "flex h-12 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-10 text-sm text-gray-900",
                  "transition-colors duration-150",
                  "focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20",
                  "sm:h-12"
                )}
              >
                <option value="">Tous types</option>
                <option value="apartment">Appartement</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="land">Terrain</option>
                <option value="commercial">Local commercial</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Budget - Hidden on smallest screens */}
          <div className="hidden space-y-1.5 lg:block">
            <label className="block text-sm font-medium text-gray-700">
              Budget max
            </label>
            <Input
              type="text"
              placeholder="50 000 DA"
              className="h-12 sm:h-12 rounded-lg"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full gap-2 md:w-auto"
            >
              <Search className="size-4" />
              <span className="sm:hidden">Rechercher</span>
              <span className="hidden sm:inline">Rechercher</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { SearchBar }
