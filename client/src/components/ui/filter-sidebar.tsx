"use client";

import React from "react";
import {
  X,
  Filter,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { FiltersConfig, SearchFilters } from "@/types/property-frontend";

interface FilterSidebarProps {
  filters: SearchFilters;
  filtersConfig: FiltersConfig;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onReset: () => void;
  className?: string;
}

export const FilterSidebar = ({
  filters,
  filtersConfig,
  onFiltersChange,
  onReset,
  className,
}: FilterSidebarProps) => {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2 text-gray-900">
          <Filter className="h-5 w-5 text-cyan-600" />
          Filtres
        </h3>
        <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-8 px-3 text-xs font-bold rounded-full"
        >
            Réinitialiser
        </Button>
      </div>

      {/* Transaction Type */}
      <div className="space-y-4">
        <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Type de transaction
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {filtersConfig.transactionTypes.map((type) => (
            <Button
              key={type.code}
              variant={filters.transactionType === type.code ? "default" : "outline"}
              size="sm"
              onClick={() => onFiltersChange({ transactionType: type.code })}
              className={cn(
                "h-12 font-bold text-sm transition-all rounded-2xl border",
                filters.transactionType === type.code
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white border-transparent shadow-lg shadow-cyan-500/20"
                  : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 text-gray-600 bg-white"
              )}
            >
              {type.nameFr}
            </Button>
          ))}
        </div>
      </div>

      {/* Property Types */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Type de bien
        </h4>
        <div className="space-y-2">
          {filtersConfig.propertyTypes.map((type) => {
             const isSelected = filters.propertyTypes.includes(type.code);
             return (
            <label
              key={type.code}
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all group",
                isSelected
                  ? "border-cyan-500 bg-cyan-50 shadow-sm"
                  : "border-gray-100 hover:border-cyan-300 hover:bg-white bg-white"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.propertyTypes, type.code]
                    : filters.propertyTypes.filter((t) => t !== type.code);
                  onFiltersChange({ propertyTypes: newTypes });
                }}
                className="data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 border-gray-300 rounded-md"
              />
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">{type.icon}</span>
              <span className={cn("text-sm font-medium flex-1", isSelected ? "text-cyan-900" : "text-gray-600")}>{type.nameFr}</span>
              {isSelected && <Check className="h-4 w-4 text-cyan-600" />}
            </label>
          )})}
        </div>
      </div>

      {/* Wilaya */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Localisation
        </h4>
        <Select
          value={filters.wilayaId || "all"}
          onValueChange={(value) => onFiltersChange({ wilayaId: value === "all" ? "" : value, communeId: "" })}
        >
          <SelectTrigger className="h-12 rounded-2xl bg-white/80 shadow-sm">
            <SelectValue placeholder="Toutes les wilayas" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] rounded-xl border-gray-100 shadow-xl">
            <SelectItem value="all" className="rounded-lg my-1">Toutes les wilayas</SelectItem>
            {filtersConfig.wilayas.map((wilaya) => (
              <SelectItem key={wilaya.id} value={wilaya.id} className="rounded-lg my-1">
                <div className="flex items-center justify-between w-full gap-3">
                  <span className="truncate">{wilaya.nameFr}</span>
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5 min-w-[1.5rem] justify-center bg-gray-100 text-gray-600">
                    {wilaya.propertyCount}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Budget (DA)
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-1">Minimum</label>
      <Input
        type="number"
        placeholder="0"
        value={filters.minPrice || ""}
        onChange={(e) => onFiltersChange({ minPrice: parseInt(e.target.value) || undefined })}
        className="h-11 rounded-2xl bg-white/80 shadow-sm"
      />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-1">Maximum</label>
      <Input
        type="number"
        placeholder="Illimité"
        value={filters.maxPrice || ""}
        onChange={(e) => onFiltersChange({ maxPrice: parseInt(e.target.value) || undefined })}
        className="h-11 rounded-2xl bg-white/80 shadow-sm"
      />
          </div>
        </div>
      </div>

      {/* Surface */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Surface (m²)
        </h4>
        <div className="grid grid-cols-2 gap-3">
           <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-1">Min</label>
      <Input
        type="number"
        placeholder="0"
        value={filters.minSurface || ""}
        onChange={(e) => onFiltersChange({ minSurface: parseInt(e.target.value) || undefined })}
        className="h-11 rounded-2xl bg-white/80 shadow-sm"
      />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-1">Max</label>
      <Input
        type="number"
        placeholder="Illimité"
        value={filters.maxSurface || ""}
        onChange={(e) => onFiltersChange({ maxSurface: parseInt(e.target.value) || undefined })}
        className="h-11 rounded-2xl bg-white/80 shadow-sm"
      />
          </div>
        </div>
      </div>

      {/* Rooms */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest">
          Pièces minimum
        </h4>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={filters.minRooms === num ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-10 w-10 p-0 font-bold text-sm transition-all rounded-xl border",
                filters.minRooms === num
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white border-transparent shadow-lg shadow-cyan-500/20"
                  : "border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 text-gray-600 bg-white"
              )}
              onClick={() => onFiltersChange({ minRooms: filters.minRooms === num ? undefined : num })}
            >
              {num}+
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
