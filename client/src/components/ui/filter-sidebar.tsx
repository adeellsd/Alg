"use client"

import React from "react"
import { RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { FiltersConfig, SearchFilters } from "@/types/property-frontend"

interface FilterSidebarProps {
  filters: SearchFilters
  filtersConfig: FiltersConfig
  onFiltersChange: (filters: Partial<SearchFilters>) => void
  onReset: () => void
  className?: string
  showHeader?: boolean
}

export function FilterSidebar({
  filters,
  filtersConfig,
  onFiltersChange,
  onReset,
  className,
  showHeader = true,
}: FilterSidebarProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      {showHeader && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              <RotateCcw className="size-3.5" />
              Réinitialiser
            </button>
          </div>
          <div className="h-px bg-gray-200" />
        </>
      )}

      {/* Transaction Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          Type de transaction
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {filtersConfig.transactionTypes.map((type) => (
            <button
              key={type.code}
              onClick={() => onFiltersChange({ transactionType: type.code })}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                filters.transactionType === type.code
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {type.nameFr}
            </button>
          ))}
        </div>
      </div>

      {/* Property Types */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Type de bien</h4>
        <div className="space-y-2">
          {filtersConfig.propertyTypes.map((type) => {
            const isSelected = filters.propertyTypes.includes(type.code)
            return (
              <label
                key={type.code}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                  isSelected
                    ? "border-cyan-200 bg-cyan-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const newTypes = checked
                      ? [...filters.propertyTypes, type.code]
                      : filters.propertyTypes.filter((t) => t !== type.code)
                    onFiltersChange({ propertyTypes: newTypes })
                  }}
                />
                {type.icon && <span className="text-base">{type.icon}</span>}
                <span
                  className={cn(
                    "flex-1 text-sm font-medium",
                    isSelected ? "text-cyan-700" : "text-gray-700"
                  )}
                >
                  {type.nameFr}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Wilaya */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Localisation</h4>
        <Select
          value={filters.wilayaId || "all"}
          onValueChange={(value) =>
            onFiltersChange({
              wilayaId: value === "all" ? "" : value,
              communeId: "",
            })
          }
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Toutes les wilayas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les wilayas</SelectItem>
            {filtersConfig.wilayas.map((wilaya) => (
              <SelectItem key={wilaya.id} value={wilaya.id}>
                <div className="flex w-full items-center justify-between gap-2">
                  <span>{wilaya.nameFr}</span>
                  <Badge variant="secondary" className="text-xs">
                    {wilaya.propertyCount}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Budget (DA)</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs text-gray-500">Min</label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFiltersChange({
                  minPrice: parseInt(e.target.value) || undefined,
                })
              }
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs text-gray-500">Max</label>
            <Input
              type="number"
              placeholder="Illimité"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFiltersChange({
                  maxPrice: parseInt(e.target.value) || undefined,
                })
              }
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Surface */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Surface (m²)</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs text-gray-500">Min</label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minSurface || ""}
              onChange={(e) =>
                onFiltersChange({
                  minSurface: parseInt(e.target.value) || undefined,
                })
              }
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs text-gray-500">Max</label>
            <Input
              type="number"
              placeholder="Illimité"
              value={filters.maxSurface || ""}
              onChange={(e) =>
                onFiltersChange({
                  maxSurface: parseInt(e.target.value) || undefined,
                })
              }
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Rooms */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Pièces minimum</h4>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() =>
                onFiltersChange({
                  minRooms: filters.minRooms === num ? undefined : num,
                })
              }
              className={cn(
                "flex size-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
                filters.minRooms === num
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {num}+
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
