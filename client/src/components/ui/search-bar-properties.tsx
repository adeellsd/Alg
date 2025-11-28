"use client"

import React, { useState } from "react"
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  ChevronDown,
  X,
  Home,
  Building2,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Clock,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FiltersConfig, SearchFilters } from "@/types/property-frontend"
import { FilterSidebar } from "./filter-sidebar"

interface SearchBarProps {
  filters: SearchFilters
  filtersConfig: FiltersConfig
  onFiltersChange: (filters: Partial<SearchFilters>) => void
  onReset: () => void
  activeFiltersCount: number
  viewMode: "grid" | "list" | "map"
  setViewMode: (mode: "grid" | "list" | "map") => void
}

const transactionConfig: Record<
  string,
  { icon: React.ReactNode; color: string }
> = {
  SALE: { icon: <Home className="size-4" />, color: "text-green-vibrant" },
  RENT_MONTHLY: {
    icon: <Building2 className="size-4" />,
    color: "text-blue-electric",
  },
  RENT_DAILY: {
    icon: <Sparkles className="size-4" />,
    color: "text-sunshine",
  },
}

const sortOptions = [
  { value: "date_desc", label: "Plus récents", icon: Clock },
  { value: "price_asc", label: "Prix croissant", icon: TrendingUp },
  { value: "price_desc", label: "Prix décroissant", icon: TrendingDown },
  { value: "surface_desc", label: "Grande surface", icon: Maximize2 },
]

export function SearchBarProperties({
  filters,
  filtersConfig,
  onFiltersChange,
  onReset,
  activeFiltersCount,
  viewMode,
  setViewMode,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const currentSort =
    sortOptions.find((s) => s.value === filters.sortBy) || sortOptions[0]

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        {/* ===== MOBILE LAYOUT ===== */}
        <div className="space-y-3 lg:hidden">
          {/* Search Input */}
          <div
            className={cn(
              "relative rounded-lg transition-all duration-150",
              isSearchFocused && "ring-2 ring-blue-pale"
            )}
          >
            <Search
              className={cn(
                "absolute left-3 top-1/2 size-5 -translate-y-1/2 transition-colors",
                isSearchFocused ? "text-blue-electric" : "text-gray-400"
              )}
            />
            <Input
              type="text"
              placeholder="Alger, Oran, Constantine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="h-11 w-full border-gray-200 bg-gray-50 pl-10 pr-4 text-base placeholder:text-gray-400 focus:bg-white"
            />
          </div>

          {/* Actions Row */}
          <div className="flex items-center gap-2">
            {/* Transaction Type Pills */}
            <div className="-mx-1 flex flex-1 gap-1 overflow-x-auto px-1 scrollbar-hide">
              {filtersConfig.transactionTypes.slice(0, 3).map((type) => {
                const config = transactionConfig[type.code] || {
                  icon: null,
                  color: "text-gray-600",
                }
                const isActive = filters.transactionType === type.code
                return (
                  <button
                    key={type.code}
                    onClick={() =>
                      onFiltersChange({ transactionType: type.code })
                    }
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-pale text-blue-electric"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    <span className={isActive ? config.color : ""}>
                      {config.icon}
                    </span>
                    <span>{type.nameFr}</span>
                  </button>
                )
              })}
            </div>

            {/* Filters Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "relative size-10 shrink-0",
                    activeFiltersCount > 0 &&
                      "border-blue-pale bg-blue-pale text-blue-electric"
                  )}
                >
                  <SlidersHorizontal className="size-4" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-blue-electric text-[10px] font-bold text-white">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="h-[85vh] rounded-t-2xl border-0 p-0"
              >
                <div className="flex h-full flex-col bg-white">
                  {/* Handle */}
                  <div className="flex justify-center pb-2 pt-3">
                    <div className="h-1 w-10 rounded-full bg-gray-300" />
                  </div>

                  {/* Header */}
                  <SheetHeader className="shrink-0 border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-lg font-semibold text-gray-900">
                        Filtres
                      </SheetTitle>
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={onReset}
                          className="text-sm font-medium text-blue-electric hover:text-blue-deep"
                        >
                          Réinitialiser ({activeFiltersCount})
                        </button>
                      )}
                    </div>
                  </SheetHeader>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    <FilterSidebar
                      filters={filters}
                      filtersConfig={filtersConfig}
                      onFiltersChange={onFiltersChange}
                      onReset={onReset}
                    />
                  </div>

                  {/* Footer */}
                  <div className="shrink-0 border-t border-gray-100 bg-white p-4">
                    <SheetClose asChild>
                      <Button className="h-12 w-full">Voir les résultats</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-10 shrink-0">
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onFiltersChange({ sortBy: option.value })}
                    className={cn(
                      "gap-2",
                      filters.sortBy === option.value && "bg-blue-pale text-blue-electric"
                    )}
                  >
                    <option.icon className="size-4" />
                    <span>{option.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Search Input */}
          <div
            className={cn(
              "relative max-w-md flex-1 rounded-lg transition-all duration-150",
              isSearchFocused && "ring-2 ring-blue-pale"
            )}
          >
            <Search
              className={cn(
                "absolute left-3 top-1/2 size-5 -translate-y-1/2 transition-colors",
                isSearchFocused ? "text-blue-electric" : "text-gray-400"
              )}
            />
            <Input
              type="text"
              placeholder="Rechercher une ville, un quartier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="h-11 border-gray-200 bg-gray-50 pl-10 pr-4 placeholder:text-gray-400 focus:bg-white"
            />
          </div>

          {/* Transaction Type Selector */}
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            {filtersConfig.transactionTypes.map((type) => {
              const config = transactionConfig[type.code] || {
                icon: null,
                color: "text-gray-600",
              }
              const isActive = filters.transactionType === type.code
              return (
                <button
                  key={type.code}
                  onClick={() => onFiltersChange({ transactionType: type.code })}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <span className={isActive ? config.color : ""}>
                    {config.icon}
                  </span>
                  <span>{type.nameFr}</span>
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200" />

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-gray-700">
                <currentSort.icon className="size-4 text-gray-400" />
                <span>{currentSort.label}</span>
                <ChevronDown className="size-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onFiltersChange({ sortBy: option.value })}
                  className={cn(
                    "gap-2",
                    filters.sortBy === option.value && "bg-blue-pale text-blue-electric"
                  )}
                >
                  <option.icon className="size-4" />
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "size-9 rounded-md",
                viewMode === "grid"
                  ? "bg-white text-blue-electric shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(
                "size-9 rounded-md",
                viewMode === "list"
                  ? "bg-white text-blue-electric shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <List className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("map")}
              className={cn(
                "size-9 rounded-md",
                viewMode === "map"
                  ? "bg-white text-blue-electric shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <MapPin className="size-4" />
            </Button>
          </div>

          {/* Active Filters Badge */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={onReset}
              className="gap-2 bg-blue-pale text-blue-electric hover:bg-aqua-marine"
            >
              <span>
                {activeFiltersCount} filtre{activeFiltersCount > 1 ? "s" : ""}
              </span>
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
