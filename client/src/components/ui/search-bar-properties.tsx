"use client";

import React from "react";
import { Search, Filter, ArrowUpDown, X, LayoutGrid, List, Map } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FiltersConfig, SearchFilters } from "@/types/property-frontend";
import { FilterSidebar } from "./filter-sidebar";

interface SearchBarProps {
  filters: SearchFilters;
  filtersConfig: FiltersConfig;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onReset: () => void;
  activeFiltersCount: number;
  viewMode: "grid" | "list" | "map";
  setViewMode: (mode: "grid" | "list" | "map") => void;
}

export const SearchBarProperties = ({
  filters,
  filtersConfig,
  onFiltersChange,
  onReset,
  activeFiltersCount,
  viewMode,
  setViewMode,
}: SearchBarProps) => {
  return (
    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          {/* Search Input */}
          <div className="flex-1 flex gap-3 w-full">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-cyan-600 transition-colors" />
              <Input
                type="text"
                placeholder="Rechercher par ville, quartier..."
                className="h-12 pl-12 pr-4 text-base rounded-2xl transition-all shadow-sm bg-white/70 hover:bg-white focus:bg-white"
              />
            </div>
            <Select
              value={filters.transactionType}
              onValueChange={(value) => onFiltersChange({ transactionType: value })}
            >
              <SelectTrigger className="w-40 h-12 rounded-2xl transition-all font-semibold shadow-sm bg-white/70 hover:bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-gray-100">
                {filtersConfig.transactionTypes.map((type) => (
                  <SelectItem key={type.code} value={type.code} className="rounded-lg my-1">
                    {type.nameFr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full lg:w-auto">
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden flex-1 h-12 px-4 rounded-2xl transition-all font-semibold shadow-sm bg-white/80 hover:bg-white">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-cyan-600 text-white border-0 rounded-full px-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0 border-r-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-xl font-bold text-gray-900">Filtres de recherche</SheetTitle>
                </SheetHeader>
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                  <FilterSidebar
                    filters={filters}
                    filtersConfig={filtersConfig}
                    onFiltersChange={onFiltersChange}
                    onReset={onReset}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                  <Button className="w-full h-12 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                    Voir les résultats
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFiltersChange({ sortBy: value })}
            >
              <SelectTrigger className="w-full lg:w-[180px] h-12 rounded-2xl transition-all font-medium shadow-sm bg-white/80 hover:bg-white">
                <ArrowUpDown className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-gray-100">
                <SelectItem value="date_desc" className="rounded-lg my-1">Plus récents</SelectItem>
                <SelectItem value="price_asc" className="rounded-lg my-1">Prix croissant</SelectItem>
                <SelectItem value="price_desc" className="rounded-lg my-1">Prix décroissant</SelectItem>
                <SelectItem value="surface_desc" className="rounded-lg my-1">Surface décroissante</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggles (Desktop) */}
            <div className="hidden lg:flex bg-gray-100 p-1 rounded-xl">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-10 w-10 rounded-lg transition-all",
                  viewMode === "grid" ? "bg-white shadow-sm text-cyan-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-10 w-10 rounded-lg transition-all",
                  viewMode === "list" ? "bg-white shadow-sm text-cyan-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <List className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("map")}
                className={cn(
                  "h-10 w-10 rounded-lg transition-all",
                  viewMode === "map" ? "bg-white shadow-sm text-cyan-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Map className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
