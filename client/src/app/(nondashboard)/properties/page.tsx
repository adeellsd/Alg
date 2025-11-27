"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  Home,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { 
  useGetFiltersConfigQuery, 
  useLazySearchPropertiesQuery 
} from "@/state/api";
import { FiltersConfig, SearchFilters, PropertyFrontend } from "@/types/property-frontend";
import { FilterSidebar } from "@/components/ui/filter-sidebar";
import { SearchBarProperties } from "@/components/ui/search-bar-properties";
import { PropertyListingCard } from "@/components/ui/property-listing-card";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
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

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Search Bar - Sticky */}
      <SearchBarProperties
        filters={filters}
        filtersConfig={filtersConfig}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
        activeFiltersCount={activeFiltersCount}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          {viewMode !== "map" && (
            <aside className="hidden lg:block w-[300px] xl:w-[340px] shrink-0">
              <div className="sticky top-[140px] bg-white rounded-3xl p-6 shadow-xl shadow-gray-100/50 border border-gray-100 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
                <FilterSidebar
                  filters={filters}
                  filtersConfig={filtersConfig}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>
          )}

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              {isLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  <span className="text-cyan-600">
                    {properties.length}
                  </span>
                  {" "}biens disponibles
                </h2>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden rounded-3xl border-0 shadow-sm">
                    <Skeleton className="h-64" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && properties.length === 0 && (
              <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Home className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Aucun bien trouvé
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Essayez de modifier vos critères de recherche pour voir plus de résultats
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20 rounded-xl h-12 px-8"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && properties.length > 0 && viewMode !== "map" && (
              <>
                <div className={cn(
                  "grid gap-6",
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
                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border rounded-full hover:border-cyan-300 hover:bg-cyan-50 font-semibold shadow-sm text-gray-600"
                  >
                    Voir plus de biens
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement des propriétés...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}
