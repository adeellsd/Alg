"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  Home,
  Loader2,
  ChevronDown,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { 
  useGetFiltersConfigQuery, 
  useLazySearchPropertiesQuery 
} from "@/state/api";
import { FiltersConfig, SearchFilters, PropertyFrontend } from "@/types/property-frontend";
import { FilterSidebar } from "@/components/ui/filter-sidebar";
import { PropertyListingCard } from "@/components/ui/property-listing-card";

// =============================================================================
// SORT OPTIONS
// =============================================================================

const sortOptions = [
  { value: "date_desc", label: "Plus récents" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "surface_desc", label: "Grande surface" },
];

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

function PropertiesPageContent() {
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: searchParams.get("transaction") || "SALE",
    wilayaId: searchParams.get("wilaya") || "",
    communeId: searchParams.get("commune") || "",
    propertyTypes: searchParams.get("types")?.split(",").filter(Boolean) || [],
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
    minSurface: searchParams.get("minSurface") ? parseInt(searchParams.get("minSurface")!) : undefined,
    maxSurface: searchParams.get("maxSurface") ? parseInt(searchParams.get("maxSurface")!) : undefined,
    minRooms: searchParams.get("rooms") ? parseInt(searchParams.get("rooms")!) : undefined,
    sortBy: searchParams.get("sort") || "date_desc",
  });

  // Fetch filters config
  const { data: filtersConfigData, isLoading: filtersLoading } = useGetFiltersConfigQuery();
  
  const filtersConfig: FiltersConfig = filtersConfigData?.data || {
    propertyTypes: [],
    transactionTypes: [],
    wilayas: [],
    amenities: [],
    priceRanges: { sale: { min: 0, max: 100000000, step: 500000 }, rent: { min: 0, max: 500000, step: 5000 } },
    surfaceRanges: { min: 0, max: 1000, step: 10 },
  };

  // Search properties
  const [triggerSearch, { data: searchResults, isLoading }] = useLazySearchPropertiesQuery();

  const properties = (searchResults?.data?.properties || []) as PropertyFrontend[];

  // Trigger search when filters change
  useEffect(() => {
    triggerSearch({
      transactionType: filters.transactionType,
      wilayaId: filters.wilayaId || undefined,
      communeId: filters.communeId || undefined,
      propertyTypes: filters.propertyTypes.length ? filters.propertyTypes.join(',') : undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minSurface: filters.minSurface,
      maxSurface: filters.maxSurface,
      minRooms: filters.minRooms,
      sortBy: filters.sortBy,
      page: 1,
      limit: 20,
    });
  }, [filters, triggerSearch]);

  const handleFiltersChange = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      transactionType: "SALE",
      wilayaId: "",
      communeId: "",
      propertyTypes: [],
      minPrice: undefined,
      maxPrice: undefined,
      minSurface: undefined,
      maxSurface: undefined,
      minRooms: undefined,
      sortBy: "date_desc",
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.wilayaId) count++;
    if (filters.propertyTypes.length) count += filters.propertyTypes.length;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.minSurface) count++;
    if (filters.minRooms) count++;
    return count;
  }, [filters]);

  const currentSort = sortOptions.find(s => s.value === filters.sortBy) || sortOptions[0];

  return (
    <div className="relative min-h-screen bg-white" style={{ paddingTop: NAVBAR_HEIGHT }}>
      {/* Pattern Arabesque background subtil */}
      <div className="fixed inset-0 pattern-arabesque opacity-[0.015] pointer-events-none" />
      
      {/* ================================================================== */}
      {/* HERO SECTION - Search Bar intégrée */}
      {/* ================================================================== */}
      <section className="relative z-10 bg-linear-to-br from-blue-pale/30 via-white to-turquoise-mer/10 border-b border-gray-200/50">
        <div className="container mx-auto px-4 pt-6 sm:pt-8 pb-6 sm:pb-8">
          {/* Page Title avec gradient v5.0 */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-turquoise-mer">
                Trouvez votre bien idéal
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              {properties.length > 0 
                ? `${properties.length} bien${properties.length > 1 ? 's' : ''} disponible${properties.length > 1 ? 's' : ''}`
                : "Explorez nos annonces immobilières"
              }
            </p>
          </div>

          {/* Search Bar avec glassmorphism */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-blue-electric/10 border border-gray-200/50 p-3 sm:p-4 group hover:shadow-2xl hover:shadow-blue-electric/20 transition-all duration-300">
              {/* Pattern overlay subtil */}
              <div className="absolute inset-0 pattern-geometric opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 rounded-3xl" />
              
              <div className="relative z-10 flex flex-col gap-3">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-linear-to-br from-turquoise-mer to-blue-electric flex items-center justify-center">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Ville, quartier, wilaya..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 sm:h-16 pl-16 pr-4 w-full rounded-2xl bg-gray-50 border-0 text-base text-gray-900 placeholder:text-gray-500 focus:bg-white focus:ring-4 focus:ring-blue-pale focus-visible:ring-4 focus-visible:ring-blue-pale font-medium"
                  />
                </div>

                {/* Transaction Type Buttons avec nouveau design */}
                <div className="flex bg-linear-to-r from-gray-100 to-beige-pale rounded-2xl p-1.5 gap-1 overflow-x-auto">
                  {filtersConfig.transactionTypes.map((type) => (
                    <button
                      key={type.code}
                      onClick={() => handleFiltersChange({ transactionType: type.code })}
                      className={cn(
                        "flex-1 min-w-fit py-3.5 sm:py-4 px-5 sm:px-7 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap",
                        filters.transactionType === type.code
                          ? "bg-linear-to-r from-blue-electric to-turquoise-mer text-white shadow-lg shadow-blue-electric/30"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                      )}
                    >
                      {type.nameFr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TOOLBAR - Sort, View Mode, Mobile Filters */}
      {/* ================================================================== */}
      <div className="relative z-10 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Results count (desktop) */}
            <div className="hidden md:block">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                <p className="text-base text-gray-600">
                  <span className="font-bold text-blue-electric">{properties.length}</span> résultat{properties.length > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Center/Right: Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              {/* Mobile Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "lg:hidden h-10 px-3 sm:px-4 rounded-xl border-gray-200 gap-2 flex-1 sm:flex-none font-semibold",
                      activeFiltersCount > 0 && "border-blue-electric bg-blue-pale text-blue-electric shadow-blue"
                    )}
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="text-base">Filtres</span>
                    {activeFiltersCount > 0 && (
                      <span className="h-6 w-6 bg-linear-to-r from-blue-electric to-turquoise-mer text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 border-0">
                  <div className="flex flex-col h-full bg-white/95 backdrop-blur-md">
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                    </div>
                    <SheetHeader className="px-6 py-4 border-b border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-bold text-gray-900 font-display">
                          Filtres
                        </SheetTitle>
                        {activeFiltersCount > 0 && (
                          <button 
                            onClick={handleResetFilters}
                            className="text-base text-blue-electric font-bold hover:text-blue-deep"
                          >
                            Réinitialiser
                          </button>
                        )}
                      </div>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <FilterSidebar
                        filters={filters}
                        filtersConfig={filtersConfig}
                        onFiltersChange={handleFiltersChange}
                        onReset={handleResetFilters}
                      />
                    </div>
                    <div className="p-4 border-t border-gray-200/50 bg-white">
                      <SheetClose asChild>
                        <Button className="w-full h-12 rounded-xl bg-linear-to-r from-blue-electric to-turquoise-mer text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                          Voir les résultats
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-10 px-3 sm:px-4 rounded-xl border-gray-200 gap-1 sm:gap-2 flex-1 sm:flex-none hover:border-blue-electric hover:bg-blue-pale/50 transition-all duration-200 font-semibold"
                  >
                    <span className="text-sm truncate max-w-[100px] sm:max-w-none">{currentSort.label}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 bg-white/95 backdrop-blur-md border-gray-200/50 shadow-xl">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleFiltersChange({ sortBy: option.value })}
                      className={cn(
                        "rounded-lg cursor-pointer py-2.5 font-medium transition-all duration-200",
                        filters.sortBy === option.value 
                          ? "bg-blue-pale text-blue-electric font-bold" 
                          : "hover:bg-beige-pale"
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle (Desktop) */}
              <div className="hidden md:flex bg-linear-to-r from-gray-100 to-beige-pale rounded-xl p-1 gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all duration-200",
                    viewMode === "grid" 
                      ? "bg-linear-to-r from-blue-electric to-turquoise-mer text-white shadow-md" 
                      : "text-gray-400 hover:text-blue-electric"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all duration-200",
                    viewMode === "list" 
                      ? "bg-linear-to-r from-blue-electric to-turquoise-mer text-white shadow-md" 
                      : "text-gray-400 hover:text-blue-electric"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all duration-200",
                    viewMode === "map" 
                      ? "bg-linear-to-r from-blue-electric to-turquoise-mer text-white shadow-md" 
                      : "text-gray-400 hover:text-blue-electric"
                  )}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              {/* Active Filters Reset (Desktop) */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={handleResetFilters}
                  className="hidden md:flex h-10 px-3 rounded-xl text-gray-500 hover:text-terracotta-fonce hover:bg-terracotta-fonce/10 gap-1 font-semibold transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm">Effacer</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================================== */}
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar avec glassmorphism */}
          {viewMode !== "map" && (
            <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0">
              <div 
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 p-5 xl:p-6 sticky shadow-lg shadow-gray-200/30 overflow-hidden group hover:shadow-xl hover:shadow-blue-electric/10 transition-all duration-300"
                style={{ top: NAVBAR_HEIGHT + 16 }}
              >
                {/* Pattern overlay subtil */}
                <div className="absolute inset-0 pattern-hexagons opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <FilterSidebar
                    filters={filters}
                    filtersConfig={filtersConfig}
                    onFiltersChange={handleFiltersChange}
                    onReset={handleResetFilters}
                  />
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Loading State */}
            {isLoading && (
              <div className={cn(
                "grid gap-4 sm:gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                    <Skeleton className="aspect-4/3 w-full" />
                    <div className="p-4 sm:p-5 space-y-3">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && properties.length === 0 && (
              <div className="text-center py-16 sm:py-20 px-4 sm:px-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 bg-linear-to-br from-blue-pale to-turquoise-mer/30 rounded-2xl flex items-center justify-center">
                  <Home className="h-8 w-8 sm:h-10 sm:w-10 text-blue-electric" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-display">
                  Aucun bien trouvé
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm sm:text-base">
                  Essayez de modifier vos critères de recherche pour voir plus de résultats.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="rounded-lg h-10 sm:h-11 px-5 sm:px-6 bg-linear-to-r from-blue-electric to-turquoise-mer text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && properties.length > 0 && viewMode !== "map" && (
              <>
                <div className={cn(
                  "grid gap-4 sm:gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  <AnimatePresence mode="popLayout">
                    {properties.map((property) => (
                      <PropertyListingCard
                        key={property.id}
                        property={property}
                        viewMode={viewMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Load More */}
                <div className="mt-10 sm:mt-12 text-center">
                  <Button
                    variant="outline"
                    className="h-11 sm:h-12 px-8 sm:px-10 rounded-xl border-gray-200 hover:border-blue-electric hover:bg-blue-pale/50 text-gray-600 hover:text-blue-electric font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Voir plus de biens
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {/* Map View Placeholder */}
            {!isLoading && viewMode === "map" && (
              <div className="bg-linear-to-br from-blue-pale/30 to-turquoise-mer/10 rounded-2xl h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center border border-gray-200/50">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-blue-electric" />
                  </div>
                  <p className="text-gray-600 font-semibold text-sm sm:text-base">Vue carte bientôt disponible</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// EXPORT
// =============================================================================

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-electric mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}
