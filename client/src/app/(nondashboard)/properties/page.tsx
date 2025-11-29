"use client";

/**
 * Properties Page - RentAlg Design System v5.0 "Alger Authentique"
 * Vintage Algiers vibes with modern glassmorphism
 */

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Loader2,
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  X,
  Sparkles,
  TrendingUp,
  Building2,
  HomeIcon,
  Warehouse,
  Store,
  Bath as BathIcon,
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
import { NAVBAR_HEIGHT, PROPERTY_TYPE_GROUPS, PROPERTY_SUBTYPE_LABELS } from "@/lib/constants";
import { 
  useGetFiltersConfigQuery, 
  useLazySearchPropertiesQuery, 
  useGetCommunesByWilayaQuery 
} from "@/state/api";
import { FiltersConfig, SearchFilters, PropertyFrontend } from "@/types/property-frontend";
import { FilterSidebar } from "@/components/ui/filter-sidebar";
import { PropertyCardVintage } from "@/components/ui/property-card-vintage";
import { Slider } from "@/components/ui/slider";

// =============================================================================
// SORT OPTIONS
// =============================================================================

const sortOptions = [
  { value: "date_desc", label: "Plus récents", icon: TrendingUp },
  { value: "price_asc", label: "Prix ↑" },
  { value: "price_desc", label: "Prix ↓" },
  { value: "surface_desc", label: "Surface ↓" },
];

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

function PropertiesPageContent() {
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [showPropertyFilters, setShowPropertyFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: searchParams.get("transaction") || "SALE",
    transactionGroup: (() => {
      const t = searchParams.get("transaction");
      return t && t.startsWith("RENT") ? "RENT" : (t === "SALE" ? "SALE" : undefined);
    })(),
    wilayaId: searchParams.get("wilaya") || "",
    communeId: searchParams.get("commune") || "",
    propertyTypes: searchParams.get("types")?.split(",").filter(Boolean) || [],
    minPrice: searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined,
    maxPrice: searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined,
    minSurface: searchParams.get("minSurface") ? parseInt(searchParams.get("minSurface")!) : undefined,
    maxSurface: searchParams.get("maxSurface") ? parseInt(searchParams.get("maxSurface")!) : undefined,
    minRooms: searchParams.get("rooms") ? parseInt(searchParams.get("rooms")!) : undefined,
    bedrooms: searchParams.get("bedrooms") ? parseInt(searchParams.get("bedrooms")!) : undefined,
    bathrooms: searchParams.get("bathrooms") ? parseInt(searchParams.get("bathrooms")!) : undefined,
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    isNegotiable: searchParams.get("isNegotiable") === "true" ? true : undefined,
    minRentDeposit: searchParams.get("minRentDeposit") ? parseInt(searchParams.get("minRentDeposit")!) : undefined,
    hasLivretFoncier: searchParams.get("hasLivretFoncier") === "true" ? true : undefined,
    hasActeVente: searchParams.get("hasActeVente") === "true" ? true : undefined,
    hasPermisConstruction: searchParams.get("hasPermisConstruction") === "true" ? true : undefined,
    arePapersComplete: searchParams.get("arePapersComplete") === "true" ? true : undefined,
    sortBy: searchParams.get("sort") || "date_desc",
  });

  // Fetch filters config
  const { data: filtersConfigData } = useGetFiltersConfigQuery();
  
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
      transactionGroup: !filters.transactionType && filters.transactionGroup ? filters.transactionGroup : undefined,
      wilayaId: filters.wilayaId || undefined,
      communeId: filters.communeId || undefined,
      propertyTypes: filters.propertyTypes.length ? filters.propertyTypes.join(',') : undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minSurface: filters.minSurface,
      maxSurface: filters.maxSurface,
      minRooms: filters.minRooms,
      minBedrooms: filters.bedrooms,
      minBathrooms: filters.bathrooms,
      amenities: filters.amenities?.length ? filters.amenities.join(',') : undefined,
      isNegotiable: filters.isNegotiable,
      minRentDeposit: filters.minRentDeposit,
      hasLivretFoncier: filters.hasLivretFoncier,
      hasActeVente: filters.hasActeVente,
      hasPermisConstruction: filters.hasPermisConstruction,
      arePapersComplete: filters.arePapersComplete,
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
      transactionGroup: undefined,
      wilayaId: "",
      communeId: "",
      propertyTypes: [],
      minPrice: undefined,
      maxPrice: undefined,
      minSurface: undefined,
      maxSurface: undefined,
      minRooms: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      amenities: [],
      isNegotiable: undefined,
      minRentDeposit: undefined,
      hasLivretFoncier: undefined,
      hasActeVente: undefined,
      hasPermisConstruction: undefined,
      arePapersComplete: undefined,
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
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.amenities && filters.amenities.length) count += filters.amenities.length;
    if (filters.hasLivretFoncier) count++;
    if (filters.hasActeVente) count++;
    if (filters.hasPermisConstruction) count++;
    if (filters.arePapersComplete) count++;
    return count;
  }, [filters]);

  const currentSort = sortOptions.find(s => s.value === filters.sortBy) || sortOptions[0];

  // Use centralized type groups configuration
  const typeGroups = PROPERTY_TYPE_GROUPS;
  const subtypeLabelMap = PROPERTY_SUBTYPE_LABELS;

  const isRent = (filters.transactionGroup === "RENT") || ["RENT_DAILY", "RENT_MONTHLY", "RENT_YEARLY"].includes(filters.transactionType);
  const priceRange = isRent ? filtersConfig.priceRanges.rent : filtersConfig.priceRanges.sale;

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#F5E6D3] via-white to-[#E8D5B7]/20" style={{ paddingTop: NAVBAR_HEIGHT }}>
      {/* Zellige Pattern Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width="80" height="80" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h40v40H0zm40 40h40v40H40z" fill="%230891B2" fill-opacity="0.4"/%3E%3C/svg%3E")',
             backgroundSize: '80px 80px'
           }} 
      />
      
      {/* ================================================================== */}
      {/* HERO SECTION - Vintage Algiers Style */}
      {/* ================================================================== */}
      <section className="relative z-10 overflow-hidden">
        {/* Decorative top border - terracotta accent */}
        <div className="h-1 bg-linear-to-r from-transparent via-[#CD5C5C] to-transparent" />
        
        <div className="container mx-auto px-4 pt-8 sm:pt-12 pb-8 sm:pb-10">
          {/* Ornamental Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-12 bg-linear-to-r from-transparent to-[#CD5C5C]" />
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
                <div className="h-0.5 w-12 bg-linear-to-l from-transparent to-[#CD5C5C]" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0891B2] to-[#40E0D0]">
                Trouvez votre bien idéal
              </span>
            </h1>
            <p className="text-[#6B8E23] text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              {properties.length > 0 
                ? `${properties.length} bien${properties.length > 1 ? 's' : ''} disponible${properties.length > 1 ? 's' : ''} en Algérie`
                : "Des milliers d'opportunités immobilières vous attendent"
              }
            </p>
          </div>

          {/* Enhanced Search Bar - User-Friendly */}
          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              {/* Ornamental corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#FFD700] rounded-tl-lg opacity-60" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#FFD700] rounded-tr-lg opacity-60" />
              
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-[28px] shadow-[0_8px_32px_0_rgba(205,92,92,0.15)] border border-[#E8D5B7]/50 p-4 sm:p-5 transition-all duration-500 group-hover:shadow-[0_16px_48px_0_rgba(205,92,92,0.25)]">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 rounded-[28px] opacity-[0.02]"
                     style={{ 
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0L60 30L30 60L0 30z" fill="%23CD5C5C"/%3E%3C/svg%3E")',
                       backgroundSize: '60px 60px'
                     }} 
                />
                
                <div className="relative z-10 space-y-4">
                  {/* Quick Action Buttons - What users want */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => handleFiltersChange({ transactionType: "SALE", transactionGroup: undefined })}
                      className={cn(
                        "relative group/btn py-4 sm:py-5 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 overflow-hidden",
                        (filters.transactionType === "SALE" && !filters.transactionGroup)
                          ? "bg-linear-to-r from-[#0891B2] to-[#40E0D0] text-white shadow-[0_8px_24px_0_rgba(8,145,178,0.35)] scale-[1.02]"
                          : "bg-white/60 text-[#6B8E23] hover:bg-white/90 hover:shadow-md hover:scale-[1.01]"
                      )}
                    >
                      {(filters.transactionType === "SALE" && !filters.transactionGroup) && (
                        <div className="absolute inset-0 rounded-xl opacity-10"
                             style={{ 
                               backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0L40 20L20 40L0 20z" fill="white"/%3E%3C/svg%3E")',
                               backgroundSize: '40px 40px'
                             }} 
                        />
                      )}
                      <div className="relative z-10">
                        <div className="text-xs sm:text-sm opacity-80 mb-1">Je veux</div>
                        <div className="text-base sm:text-lg font-extrabold">Acheter</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleFiltersChange({ transactionType: "", transactionGroup: "RENT" })}
                      className={cn(
                        "relative group/btn py-4 sm:py-5 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 overflow-hidden",
                        (filters.transactionGroup === "RENT")
                          ? "bg-linear-to-r from-[#0891B2] to-[#40E0D0] text-white shadow-[0_8px_24px_0_rgba(8,145,178,0.35)] scale-[1.02]"
                          : "bg-white/60 text-[#6B8E23] hover:bg-white/90 hover:shadow-md hover:scale-[1.01]"
                      )}
                    >
                      {filters.transactionGroup === "RENT" && (
                        <div className="absolute inset-0 rounded-xl opacity-10"
                             style={{ 
                               backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0L40 20L20 40L0 20z" fill="white"/%3E%3C/svg%3E")',
                               backgroundSize: '40px 40px'
                             }} 
                        />
                      )}
                      <div className="relative z-10">
                        <div className="text-xs sm:text-sm opacity-80 mb-1">Je veux</div>
                        <div className="text-base sm:text-lg font-extrabold">Louer</div>
                      </div>
                    </button>
                  </div>

                  {/* Rent period removed per product decision */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-linear-to-br from-[#40E0D0] via-[#0891B2] to-[#0369A1] flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Où cherchez-vous ? (Alger, Oran, Annaba...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-16 sm:h-[72px] pl-20 pr-6 w-full rounded-2xl bg-linear-to-r from-[#FFF8E7] to-white border-2 border-[#D4B896]/30 text-base text-gray-900 placeholder:text-[#C19A6B] focus:border-[#40E0D0] focus:ring-4 focus:ring-[#40E0D0]/10 font-medium shadow-inner transition-all duration-300"
                    />
                  </div>

                  {/* Location selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <select
                      value={filters.wilayaId}
                      onChange={(e) => handleFiltersChange({ wilayaId: e.target.value, communeId: "" })}
                      className="h-12 rounded-xl bg-white/80 border-2 border-[#E8D5B7] px-3 text-sm font-medium text-gray-700 focus:border-[#0891B2]"
                    >
                      <option value="">Wilaya</option>
                      {filtersConfig.wilayas.map(w => (
                        <option key={w.id} value={w.id}>{w.nameFr}</option>
                      ))}
                    </select>
                    <WilayaCommuneSelect wilayaId={filters.wilayaId} value={filters.communeId} onChange={(v)=>handleFiltersChange({ communeId: v })} />
                  </div>

                    {/* Property Type Selection - Elegant Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {/* Appartement */}
                      <button
                        onClick={() => {
                          const type = "APARTMENT";
                          if (selectedPropertyType === type) {
                            setSelectedPropertyType("");
                            setShowPropertyFilters(false);
                            handleFiltersChange({ propertyTypes: [] });
                          } else {
                            setSelectedPropertyType(type);
                            setShowPropertyFilters(true);
                            handleFiltersChange({ propertyTypes: typeGroups[type].codes });
                          }
                        }}
                        className={cn(
                          "group relative p-4 rounded-xl transition-all duration-300 overflow-hidden",
                          selectedPropertyType === "APARTMENT"
                            ? "bg-linear-to-br from-[#0891B2] to-[#40E0D0] text-white shadow-lg scale-105"
                            : "bg-white/70 text-[#6B8E23] hover:bg-white hover:shadow-md hover:scale-102 border-2 border-[#E8D5B7]"
                        )}
                      >
                        {selectedPropertyType === "APARTMENT" && (
                          <div className="absolute inset-0 opacity-10"
                               style={{ 
                                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width="30" height="30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15 0L30 15L15 30L0 15z" fill="white"/%3E%3C/svg%3E")',
                                 backgroundSize: '30px 30px'
                               }} 
                          />
                        )}
                        <Building2 className={cn(
                          "w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110",
                          selectedPropertyType === "APARTMENT" ? "text-white" : "text-[#0891B2]"
                        )} />
                        <div className="text-xs sm:text-sm font-bold relative z-10">Appartement</div>
                      </button>

                      {/* Maison */}
                      <button
                        onClick={() => {
                          const type = "HOUSE";
                          if (selectedPropertyType === type) {
                            setSelectedPropertyType("");
                            setShowPropertyFilters(false);
                            handleFiltersChange({ propertyTypes: [] });
                          } else {
                            setSelectedPropertyType(type);
                            setShowPropertyFilters(true);
                            handleFiltersChange({ propertyTypes: typeGroups[type].codes });
                          }
                        }}
                        className={cn(
                          "group relative p-4 rounded-xl transition-all duration-300 overflow-hidden",
                          selectedPropertyType === "HOUSE"
                            ? "bg-linear-to-br from-[#0891B2] to-[#40E0D0] text-white shadow-lg scale-105"
                            : "bg-white/70 text-[#6B8E23] hover:bg-white hover:shadow-md hover:scale-102 border-2 border-[#E8D5B7]"
                        )}
                      >
                        {selectedPropertyType === "HOUSE" && (
                          <div className="absolute inset-0 opacity-10"
                               style={{ 
                                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width="30" height="30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15 0L30 15L15 30L0 15z" fill="white"/%3E%3C/svg%3E")',
                                 backgroundSize: '30px 30px'
                               }} 
                          />
                        )}
                        <HomeIcon className={cn(
                          "w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110",
                          selectedPropertyType === "HOUSE" ? "text-white" : "text-[#0891B2]"
                        )} />
                        <div className="text-xs sm:text-sm font-bold relative z-10">Maison</div>
                      </button>

                      {/* Local Commercial */}
                      <button
                        onClick={() => {
                          const type = "COMMERCIAL";
                          if (selectedPropertyType === type) {
                            setSelectedPropertyType("");
                            setShowPropertyFilters(false);
                            handleFiltersChange({ propertyTypes: [] });
                          } else {
                            setSelectedPropertyType(type);
                            setShowPropertyFilters(false);
                            handleFiltersChange({ propertyTypes: typeGroups[type].codes });
                          }
                        }}
                        className={cn(
                          "group relative p-4 rounded-xl transition-all duration-300 overflow-hidden",
                          selectedPropertyType === "COMMERCIAL"
                            ? "bg-linear-to-br from-[#0891B2] to-[#40E0D0] text-white shadow-lg scale-105"
                            : "bg-white/70 text-[#6B8E23] hover:bg-white hover:shadow-md hover:scale-102 border-2 border-[#E8D5B7]"
                        )}
                      >
                        {selectedPropertyType === "COMMERCIAL" && (
                          <div className="absolute inset-0 opacity-10"
                               style={{ 
                                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width="30" height="30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15 0L30 15L15 30L0 15z" fill="white"/%3E%3C/svg%3E")',
                                 backgroundSize: '30px 30px'
                               }} 
                          />
                        )}
                        <Store className={cn(
                          "w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110",
                          selectedPropertyType === "COMMERCIAL" ? "text-white" : "text-[#0891B2]"
                        )} />
                        <div className="text-xs sm:text-sm font-bold relative z-10">Commerce</div>
                      </button>

                      {/* Terrain */}
                      <button
                        onClick={() => {
                          const type = "LAND";
                          if (selectedPropertyType === type) {
                            setSelectedPropertyType("");
                            setShowPropertyFilters(false);
                            handleFiltersChange({ propertyTypes: [] });
                          } else {
                            setSelectedPropertyType(type);
                            setShowPropertyFilters(false);
                            handleFiltersChange({ propertyTypes: typeGroups[type].codes });
                          }
                        }}
                        className={cn(
                          "group relative p-4 rounded-xl transition-all duration-300 overflow-hidden",
                          selectedPropertyType === "LAND"
                            ? "bg-linear-to-br from-[#0891B2] to-[#40E0D0] text-white shadow-lg scale-105"
                            : "bg-white/70 text-[#6B8E23] hover:bg-white hover:shadow-md hover:scale-102 border-2 border-[#E8D5B7]"
                        )}
                      >
                        {selectedPropertyType === "LAND" && (
                          <div className="absolute inset-0 opacity-10"
                               style={{ 
                                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width="30" height="30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15 0L30 15L15 30L0 15z" fill="white"/%3E%3C/svg%3E")',
                                 backgroundSize: '30px 30px'
                               }} 
                          />
                        )}
                        <Warehouse className={cn(
                          "w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110",
                          selectedPropertyType === "LAND" ? "text-white" : "text-[#0891B2]"
                        )} />
                        <div className="text-xs sm:text-sm font-bold relative z-10">Terrain</div>
                      </button>
                    </div>

                    {/* Subtypes for selected group */}
                    {selectedPropertyType && typeGroups[selectedPropertyType] && (
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">
                          {typeGroups[selectedPropertyType].label}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {typeGroups[selectedPropertyType].codes.map(code => {
                            const active = filters.propertyTypes.includes(code);
                            return (
                              <button
                                key={code}
                                onClick={() => {
                                  const set = new Set(filters.propertyTypes);
                                  if (active) set.delete(code); else set.add(code);
                                  handleFiltersChange({ propertyTypes: Array.from(set) });
                                }}
                                className={cn(
                                  "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
                                  active ? "bg-[#0891B2] text-white border-transparent" : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
                                )}
                              >
                                {subtypeLabelMap[code] || code.replaceAll("_", " ")}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Advanced Filters for Apartment/House */}
                    {showPropertyFilters && (selectedPropertyType === "APARTMENT" || selectedPropertyType === "HOUSE") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 pt-2"
                      >
                        <div className="h-px bg-linear-to-r from-transparent via-[#D4B896] to-transparent" />
                      
                        {/* Rooms/Bedrooms */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">
                              Pièces min
                            </label>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => handleFiltersChange({ minRooms: filters.minRooms === num ? undefined : num })}
                                  className={cn(
                                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200",
                                    filters.minRooms === num
                                      ? "bg-linear-to-br from-[#0891B2] to-[#40E0D0] text-white shadow-md scale-105"
                                      : "bg-white/60 text-[#6B8E23] hover:bg-white border border-[#E8D5B7]"
                                  )}
                                >
                                  {num}+
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">
                              Chambres
                            </label>
                            <div className="flex gap-1.5">
                              {[1, 2, 3, 4].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => handleFiltersChange({ bedrooms: filters.bedrooms === num ? undefined : num })}
                                  className={cn(
                                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200",
                                    filters.bedrooms === num ? "bg-[#0891B2] text-white shadow" : "bg-white/60 text-[#6B8E23] hover:bg-white border border-[#E8D5B7]"
                                  )}
                                >
                                  {num}+
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Bathrooms & Balcony */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide flex items-center gap-1">
                              <BathIcon className="w-3 h-3" />
                              Salles de bain
                            </label>
                            <div className="flex gap-1.5">
                              {[1, 2, 3].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => handleFiltersChange({ bathrooms: filters.bathrooms === num ? undefined : num })}
                                  className={cn(
                                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200",
                                    filters.bathrooms === num ? "bg-[#0891B2] text-white shadow" : "bg-white/60 text-[#6B8E23] hover:bg-white border border-[#E8D5B7]"
                                  )}
                                >
                                  {num}+
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">
                              Balcon
                            </label>
                            <AmenitiesToggle
                              label="Balcon"
                              amenityCode="BALCON"
                              selected={filters.amenities || []}
                              onChange={(arr) => handleFiltersChange({ amenities: arr })}
                            />
                          </div>
                        </div>

                        {/* Price & Surface */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">Prix (DZD)</label>
                              <span className="text-xs text-[#C19A6B] font-semibold">
                                {Intl.NumberFormat('fr-DZ').format(filters.minPrice ?? priceRange.min)} — {Intl.NumberFormat('fr-DZ').format(filters.maxPrice ?? priceRange.max)}
                              </span>
                            </div>
                            <Slider
                              min={0}
                              max={priceRange.max}
                              defaultValue={[filters.minPrice ?? 0, filters.maxPrice ?? priceRange.max]}
                              onValueChange={(vals: number[]) => {
                                const [minV, maxV] = vals;
                                handleFiltersChange({
                                  minPrice: Math.max(0, Math.min(minV, maxV)),
                                  maxPrice: Math.min(priceRange.max, Math.max(minV, maxV)),
                                });
                              }}
                            />
                            <div className="flex flex-wrap gap-2 pt-2">
                              {(
                                isRent
                                  ? [
                                      { label: "< 30k", set: () => handleFiltersChange({ minPrice: 0, maxPrice: 30_000 }) },
                                      { label: "30–60k", set: () => handleFiltersChange({ minPrice: 30_000, maxPrice: 60_000 }) },
                                      { label: "60–120k", set: () => handleFiltersChange({ minPrice: 60_000, maxPrice: 120_000 }) },
                                      { label: "> 120k", set: () => handleFiltersChange({ minPrice: 120_000, maxPrice: priceRange.max }) },
                                    ]
                                  : [
                                      { label: "< 3M", set: () => handleFiltersChange({ minPrice: 0, maxPrice: 3_000_000 }) },
                                      { label: "3–6M", set: () => handleFiltersChange({ minPrice: 3_000_000, maxPrice: 6_000_000 }) },
                                      { label: "6–10M", set: () => handleFiltersChange({ minPrice: 6_000_000, maxPrice: 10_000_000 }) },
                                      { label: "10–20M", set: () => handleFiltersChange({ minPrice: 10_000_000, maxPrice: 20_000_000 }) },
                                      { label: "> 20M", set: () => handleFiltersChange({ minPrice: 20_000_000, maxPrice: priceRange.max }) },
                                    ]
                              ).map((p) => (
                                <button key={p.label} onClick={p.set} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/70 border border-[#E8D5B7] text-[#6B8E23] hover:bg-white">
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">Surface (m²)</label>
                              <span className="text-xs text-[#C19A6B] font-semibold">
                                {filters.minSurface ?? filtersConfig.surfaceRanges.min} — {filters.maxSurface ?? filtersConfig.surfaceRanges.max}
                              </span>
                            </div>
                            <Slider
                              min={0}
                              max={filtersConfig.surfaceRanges.max}
                              defaultValue={[filters.minSurface ?? 0, filters.maxSurface ?? filtersConfig.surfaceRanges.max]}
                              onValueChange={(vals: number[]) => {
                                const [minV, maxV] = vals;
                                handleFiltersChange({
                                  minSurface: Math.max(0, Math.min(minV, maxV)),
                                  maxSurface: Math.min(filtersConfig.surfaceRanges.max, Math.max(minV, maxV)),
                                });
                              }}
                            />
                            <div className="flex flex-wrap gap-2 pt-2">
                              {[
                                { label: "< 60 m²", set: () => handleFiltersChange({ minSurface: 0, maxSurface: 60 }) },
                                { label: "60–100 m²", set: () => handleFiltersChange({ minSurface: 60, maxSurface: 100 }) },
                                { label: "> 100 m²", set: () => handleFiltersChange({ minSurface: 100, maxSurface: filtersConfig.surfaceRanges.max }) },
                              ].map((p) => (
                                <button key={p.label} onClick={p.set} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/70 border border-[#E8D5B7] text-[#6B8E23] hover:bg-white">
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Amenities quick grid */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#6B8E23] uppercase tracking-wide">Commodités populaires</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {(filtersConfig.amenities || []).slice(0, 9).map(a => (
                              <AmenityPill
                                key={a.id}
                                amenity={a}
                                selected={filters.amenities?.includes(a.id) || false}
                                toggle={(id, on) => {
                                  const current = new Set(filters.amenities || []);
                                  if (on) current.add(id); else current.delete(id);
                                  handleFiltersChange({ amenities: Array.from(current) })
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Legal docs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <LegalToggle label="Livret foncier" value={!!filters.hasLivretFoncier} onChange={(v)=>handleFiltersChange({ hasLivretFoncier: v ? true : undefined })} />
                          <LegalToggle label="Acte notarié" value={!!filters.hasActeVente} onChange={(v)=>handleFiltersChange({ hasActeVente: v ? true : undefined })} />
                          <LegalToggle label="Permis const." value={!!filters.hasPermisConstruction} onChange={(v)=>handleFiltersChange({ hasPermisConstruction: v ? true : undefined })} />
                          <LegalToggle label="Dossier complet" value={!!filters.arePapersComplete} onChange={(v)=>handleFiltersChange({ arePapersComplete: v ? true : undefined })} />
                        </div>
                      </motion.div>
                    )}
                </div>
              </div>
              
              {/* Ornamental bottom corners */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#FFD700] rounded-bl-lg opacity-60" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#FFD700] rounded-br-lg opacity-60" />
            </div>
          </div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="h-12 bg-linear-to-b from-transparent to-white/50" />
      </section>

      {/* ================================================================== */}
      {/* TOOLBAR - Vintage Enhanced */}
      {/* ================================================================== */}
      <div className="relative z-10 border-y border-[#E8D5B7]/60 bg-white/60 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Results count */}
            <div className="hidden md:block">
              {isLoading ? (
                <Skeleton className="h-5 w-32 bg-[#E8D5B7]/30" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-linear-to-r from-[#CD5C5C] to-[#FFD700] animate-pulse" />
                  <p className="text-base text-gray-700">
                    <span className="font-bold text-[#0891B2]">{properties.length}</span> bien{properties.length > 1 ? 's' : ''} trouvé{properties.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Center/Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto sm:ml-auto">
              {/* Mobile Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "lg:hidden h-11 px-4 rounded-[14px] border-2 border-[#E8D5B7] gap-2 flex-1 sm:flex-none font-bold bg-white/80 backdrop-blur-sm hover:bg-[#FFF8E7] hover:border-[#CD5C5C] transition-all duration-200",
                      activeFiltersCount > 0 && "border-[#0891B2] bg-[#CFFAFE]/50 text-[#0891B2]"
                    )}
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="text-sm">Filtres</span>
                    {activeFiltersCount > 0 && (
                      <span className="h-6 w-6 bg-linear-to-r from-[#CD5C5C] to-[#FFD700] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] rounded-t-4xl p-0 border-0">
                  <div className="flex flex-col h-full bg-linear-to-b from-[#FFF8E7] to-white">
                    <div className="flex justify-center pt-3 pb-2">
                      <div className="w-12 h-1.5 bg-[#D4B896] rounded-full" />
                    </div>
                    <SheetHeader className="px-6 py-5 border-b border-[#E8D5B7]/50">
                      <div className="flex items-center justify-between">
                        <SheetTitle className="text-2xl font-bold text-gray-900 font-display">
                          Affinez votre recherche
                        </SheetTitle>
                        {activeFiltersCount > 0 && (
                          <button 
                            onClick={handleResetFilters}
                            className="text-sm text-[#CD5C5C] font-bold hover:text-[#FFD700] transition-colors"
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
                    <div className="p-5 border-t border-[#E8D5B7]/50 bg-white/90 backdrop-blur-sm">
                      <SheetClose asChild>
                        <Button className="w-full h-14 rounded-xl bg-linear-to-r from-[#0891B2] to-[#40E0D0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 text-base">
                          Afficher les résultats
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown - Vintage Style */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-11 px-4 rounded-[14px] border-2 border-[#E8D5B7] gap-2 flex-1 sm:flex-none bg-white/80 backdrop-blur-sm hover:bg-[#FFF8E7] hover:border-[#0891B2] transition-all duration-200 font-semibold"
                  >
                    <span className="text-sm truncate max-w-[100px] sm:max-w-none">{currentSort.label}</span>
                    <ChevronDown className="h-4 w-4 text-[#C19A6B] shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 bg-white/95 backdrop-blur-xl border-2 border-[#E8D5B7] shadow-xl">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleFiltersChange({ sortBy: option.value })}
                      className={cn(
                        "rounded-lg cursor-pointer py-3 px-3 font-medium transition-all duration-200",
                        filters.sortBy === option.value 
                          ? "bg-linear-to-r from-[#CFFAFE] to-[#D1FAE5] text-[#0891B2] font-bold" 
                          : "hover:bg-[#F5E6D3]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && <option.icon className="w-4 h-4" />}
                        {option.label}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-linear-to-r from-[#E8D5B7] to-[#D4B896] rounded-[14px] p-1.5 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "h-9 w-9 rounded-[10px] transition-all duration-200",
                    viewMode === "grid" 
                      ? "bg-white text-[#0891B2] shadow-md scale-105" 
                      : "text-[#C19A6B] hover:text-[#0891B2] hover:bg-white/50"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "h-9 w-9 rounded-[10px] transition-all duration-200",
                    viewMode === "list" 
                      ? "bg-white text-[#0891B2] shadow-md scale-105" 
                      : "text-[#C19A6B] hover:text-[#0891B2] hover:bg-white/50"
                  )}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "h-9 w-9 rounded-[10px] transition-all duration-200",
                    viewMode === "map" 
                      ? "bg-white text-[#0891B2] shadow-md scale-105" 
                      : "text-[#C19A6B] hover:text-[#0891B2] hover:bg-white/50"
                  )}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>

              {/* Active Filters Reset */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={handleResetFilters}
                  className="hidden md:flex h-11 px-4 rounded-[14px] text-[#CD5C5C] hover:text-white hover:bg-[#CD5C5C] gap-2 font-bold transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm">Effacer</span>
                </Button>
              )}
            </div>
          </div>

          {/* Active filter badges */}
          <ActiveFilterBadges
            filters={filters}
            filtersConfig={filtersConfig}
            onChange={handleFiltersChange}
            clearAll={handleResetFilters}
          />
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================================== */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-10">
        <div className="flex gap-8 lg:gap-10">
          {/* Desktop Sidebar - Casbah Edition */}
          {viewMode !== "map" && (
            <aside className="hidden lg:block w-[280px] xl:w-[300px] shrink-0">
              <div 
                className="bg-white/70 backdrop-blur-2xl rounded-[24px] border-2 border-[#E8D5B7]/50 p-6 xl:p-7 sticky shadow-[0_8px_32px_0_rgba(232,213,183,0.4)] overflow-hidden group hover:shadow-[0_16px_48px_0_rgba(205,92,92,0.2)] transition-all duration-500"
                style={{ top: NAVBAR_HEIGHT + 20 }}
              >
                {/* Ornamental top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#FFD700] to-transparent" />
                
                {/* Zellige pattern overlay */}
                <div className="absolute inset-0 opacity-[0.015]"
                     style={{ 
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M50 0L100 50L50 100L0 50z" fill="%23CD5C5C"/%3E%3C/svg%3E")',
                       backgroundSize: '100px 100px'
                     }} 
                />
                
                <div className="relative z-10">
                  <FilterSidebar
                    filters={filters}
                    filtersConfig={filtersConfig}
                    onFiltersChange={handleFiltersChange}
                    onReset={handleResetFilters}
                  />
                </div>
                
                {/* Ornamental bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#FFD700] to-transparent" />
              </div>
            </aside>
          )}

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Loading State */}
            {isLoading && (
              <div className={cn(
                "grid gap-5 sm:gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden rounded-[24px] border-2 border-[#E8D5B7]/50 bg-white/70 backdrop-blur-sm">
                    <Skeleton className="aspect-4/3 w-full bg-[#E8D5B7]/30" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-1/3 bg-[#E8D5B7]/30" />
                      <Skeleton className="h-4 w-2/3 bg-[#E8D5B7]/30" />
                      <Skeleton className="h-4 w-1/2 bg-[#E8D5B7]/30" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State - Algiers Vibes */}
            {!isLoading && properties.length === 0 && (
              <div className="text-center py-20 sm:py-24 px-4 sm:px-6">
                <div className="relative inline-block mb-6">
                  {/* Ornamental corners */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#FFD700] rounded-tl-2xl" />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#FFD700] rounded-br-2xl" />
                  
                  <div className="w-24 h-24 bg-linear-to-br from-[#E8D5B7] to-[#D4B896] rounded-[24px] flex items-center justify-center shadow-lg">
                    <Home className="h-12 w-12 text-[#0891B2]" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-display">
                  Aucun bien disponible
                </h3>
                <p className="text-[#6B8E23] mb-8 max-w-md mx-auto text-base sm:text-lg">
                  Modifiez vos critères pour découvrir d&apos;autres merveilles algéroises
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="rounded-xl h-12 px-8 bg-linear-to-r from-[#0891B2] to-[#40E0D0] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Réinitialiser la recherche
                </Button>
              </div>
            )}

            {/* Results Grid - Vintage Cards */}
            {!isLoading && properties.length > 0 && viewMode !== "map" && (
              <>
                <div className={cn(
                  "grid gap-5 sm:gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  <AnimatePresence mode="popLayout">
                    {properties.map((property) => (
                      <PropertyCardVintage
                        key={property.id}
                        property={property}
                        viewMode={viewMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Load More - Ornamental */}
                <div className="mt-12 sm:mt-16 text-center">
                  <div className="inline-block">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-0.5 w-20 bg-linear-to-r from-transparent to-[#D4B896]" />
                      <Sparkles className="w-5 h-5 text-[#FFD700]" />
                      <div className="h-0.5 w-20 bg-linear-to-l from-transparent to-[#D4B896]" />
                    </div>
                    <Button
                      variant="outline"
                      className="h-14 px-10 rounded-xl border-2 border-[#E8D5B7] hover:border-[#CD5C5C] hover:bg-[#FFF8E7] text-gray-700 hover:text-[#0891B2] font-bold text-base shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Découvrir plus de biens
                      <ChevronDown className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Map View Placeholder */}
            {!isLoading && viewMode === "map" && (
              <div className="bg-linear-to-br from-[#E8D5B7]/40 to-[#CFFAFE]/30 rounded-[28px] h-[500px] lg:h-[650px] flex items-center justify-center border-2 border-[#E8D5B7]/50 overflow-hidden relative">
                {/* Ornamental corners */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#FFD700] rounded-tl-2xl" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#FFD700] rounded-br-2xl" />
                
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-5 bg-white/90 backdrop-blur-sm rounded-[24px] flex items-center justify-center shadow-xl">
                    <MapPin className="h-12 w-12 text-[#0891B2]" />
                  </div>
                  <p className="text-[#6B8E23] font-bold text-lg">Vue carte - Bientôt disponible</p>
                  <p className="text-[#C19A6B] text-sm mt-2">Explorez Alger sur une carte interactive</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Small components (inline to keep file cohesive)
function WilayaCommuneSelect({ wilayaId, value, onChange }: { wilayaId: string; value: string; onChange: (v: string) => void }) {
  const { data, isLoading } = useGetCommunesByWilayaQuery(wilayaId, { skip: !wilayaId });
  const communes: Array<{ id: string; nameFr: string }> = data?.data || [];
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={!wilayaId || isLoading}
      className="h-12 rounded-xl bg-white/80 border-2 border-[#E8D5B7] px-3 text-sm font-medium text-gray-700 focus:border-[#0891B2] disabled:opacity-50"
    >
      <option value="">Commune</option>
      {communes.map((c) => (
        <option key={c.id} value={c.id}>{c.nameFr}</option>
      ))}
    </select>
  );
}

function AmenitiesToggle({ label, amenityCode, selected, onChange }: { label: string; amenityCode: string; selected: string[]; onChange: (arr: string[]) => void }) {
  const set = new Set(selected);
  const isOn = set.has(amenityCode);
  return (
    <button
      onClick={() => {
        const next = new Set(selected);
        if (isOn) next.delete(amenityCode); else next.add(amenityCode);
        onChange(Array.from(next));
      }}
      className={cn(
        "w-full py-2 rounded-lg text-xs font-bold transition-all",
        isOn ? "bg-[#0891B2] text-white shadow" : "bg-white/60 text-[#6B8E23] hover:bg-white border border-[#E8D5B7]"
      )}
    >
      {label}
    </button>
  );
}

function AmenityPill({ amenity, selected, toggle }: { amenity: { id: string; name: string }; selected: boolean; toggle: (id: string, on: boolean) => void }) {
  return (
    <button
      onClick={() => toggle(amenity.id, !selected)}
      className={cn(
        "px-3 py-2 rounded-lg text-xs font-semibold border transition-all",
        selected ? "bg-[#0891B2] text-white border-transparent" : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
      )}
      title={amenity.name}
    >
      {amenity.name}
    </button>
  );
}

function LegalToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
        value ? "bg-[#0891B2] text-white border-transparent" : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
      )}
    >
      {label}
    </button>
  );
}

function ActiveFilterBadges({
  filters,
  filtersConfig,
  onChange,
  clearAll,
}: {
  filters: SearchFilters;
  filtersConfig: FiltersConfig;
  onChange: (f: Partial<SearchFilters>) => void;
  clearAll: () => void;
}) {
  const communeQuery = useGetCommunesByWilayaQuery(filters.wilayaId, { skip: !filters.wilayaId });
  const communes: Array<{ id: string; nameFr: string }> = communeQuery.data?.data || [];
  const wilaya = filtersConfig.wilayas.find(w => w.id === filters.wilayaId);
  const commune = communes.find(c => c.id === filters.communeId);

  const badges: Array<{ key: string; label: string; remove: () => void }> = [];

  // Transaction (use group if present)
  if (filters.transactionGroup === 'RENT') {
    badges.push({ key: 'txn', label: 'Location', remove: () => onChange({ transactionType: 'SALE', transactionGroup: undefined }) });
  } else if (filters.transactionType === 'SALE') {
    badges.push({ key: 'txn', label: 'Vente', remove: () => onChange({ transactionType: 'SALE', transactionGroup: undefined }) });
  }

  if (wilaya) badges.push({ key: 'wilaya', label: wilaya.nameFr, remove: () => onChange({ wilayaId: '', communeId: '' }) });
  if (commune) badges.push({ key: 'commune', label: commune.nameFr, remove: () => onChange({ communeId: '' }) });

  if (filters.propertyTypes && filters.propertyTypes.length) {
    const names = filters.propertyTypes.slice(0, 3).map(c => PROPERTY_SUBTYPE_LABELS[c] || c);
    const extra = filters.propertyTypes.length > 3 ? ` +${filters.propertyTypes.length - 3}` : '';
    badges.push({ key: 'types', label: `Types: ${names.join(', ')}${extra}` , remove: () => onChange({ propertyTypes: [] }) });
  }

  if (filters.minPrice || filters.maxPrice) {
    const fmt = (n: number) => Intl.NumberFormat('fr-DZ').format(n) + " DA";
    const min = filters.minPrice ? fmt(filters.minPrice) : '';
    const max = filters.maxPrice ? fmt(filters.maxPrice) : '';
    badges.push({ key: 'price', label: max && min ? `Prix ${min} – ${max}` : `Prix ${min || max}` , remove: () => onChange({ minPrice: undefined, maxPrice: undefined }) });
  }

  if (filters.minSurface || filters.maxSurface) {
    const min = filters.minSurface ? `${filters.minSurface} m²` : '';
    const max = filters.maxSurface ? `${filters.maxSurface} m²` : '';
    badges.push({ key: 'surface', label: max && min ? `Surface ${min} – ${max}` : `Surface ${min || max}` , remove: () => onChange({ minSurface: undefined, maxSurface: undefined }) });
  }

  if (filters.minRooms) badges.push({ key: 'rooms', label: `≥ ${filters.minRooms} pièces`, remove: () => onChange({ minRooms: undefined }) });
  if (filters.bedrooms) badges.push({ key: 'bedrooms', label: `≥ ${filters.bedrooms} ch`, remove: () => onChange({ bedrooms: undefined }) });
  if (filters.bathrooms) badges.push({ key: 'bathrooms', label: `≥ ${filters.bathrooms} sdb`, remove: () => onChange({ bathrooms: undefined }) });

  if (filters.amenities && filters.amenities.length) {
    const names = filters.amenities
      .map(id => filtersConfig.amenities.find(a => a.id === id)?.name)
      .filter(Boolean) as string[];
    const label = names.length ? `Commodités: ${names.slice(0,2).join(', ')}${names.length>2 ? '…' : ''}` : `Commodités (${filters.amenities.length})`;
    badges.push({ key: 'amenities', label, remove: () => onChange({ amenities: [] }) });
  }

  if (filters.isNegotiable) {
    badges.push({ key: 'nego', label: 'Prix négociable', remove: () => onChange({ isNegotiable: undefined }) });
  }
  if (filters.minRentDeposit) {
    const val = Intl.NumberFormat('fr-DZ').format(filters.minRentDeposit) + ' DA';
    badges.push({ key: 'deposit', label: `Caution ≥ ${val}` , remove: () => onChange({ minRentDeposit: undefined }) });
  }

  if (filters.hasLivretFoncier) badges.push({ key: 'lf', label: 'Livret foncier', remove: () => onChange({ hasLivretFoncier: undefined }) });
  if (filters.hasActeVente) badges.push({ key: 'acte', label: 'Acte notarié', remove: () => onChange({ hasActeVente: undefined }) });
  if (filters.hasPermisConstruction) badges.push({ key: 'permis', label: 'Permis construction', remove: () => onChange({ hasPermisConstruction: undefined }) });
  if (filters.arePapersComplete) badges.push({ key: 'papers', label: 'Dossier complet', remove: () => onChange({ arePapersComplete: undefined }) });

  if (!badges.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {badges.map(b => (
        <span key={b.key} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFF8E7]/80 border border-[#E8D5B7] text-gray-700">
          {b.label}
          <button onClick={b.remove} className="p-0.5 rounded-full hover:bg-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      <button onClick={clearAll} className="ml-2 text-xs font-bold text-[#CD5C5C] hover:text-[#0891B2]">Tout effacer</button>
    </div>
  );
}

// =============================================================================
// EXPORT
// =============================================================================

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-b from-[#F5E6D3] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mb-6 bg-linear-to-br from-[#E8D5B7] to-[#D4B896] rounded-[24px] flex items-center justify-center shadow-lg mx-auto animate-pulse">
            <Loader2 className="h-10 w-10 animate-spin text-[#0891B2]" />
          </div>
          <p className="text-[#6B8E23] font-semibold text-lg">Chargement des biens...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}
