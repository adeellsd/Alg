"use client";

/**
 * FilterSidebarIntelligent - RentAlg Design System v6.0 "Alger Authentique"
 * Sidebar intelligente avec affichage contextuel basé sur le type de bien
 * Largeur fixe: 360px (définie dans le parent)
 */

import React from "react";
import { cn } from "@/lib/utils";
import { SearchFilters, FilterContext, FiltersConfig } from "@/types/property-frontend";
import { shouldShowFilter, getContextualAmenities, VIEW_TYPES, PROXIMITY_FILTERS } from "@/lib/filter-config";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarIntelligentProps {
  filters: SearchFilters;
  filtersConfig: FiltersConfig;
  onFiltersChange: (newFilters: Partial<SearchFilters>) => void;
  activeContext: FilterContext | null;
  contextualAmenities: string[];
  onReset?: () => void;
  className?: string;
  showHeader?: boolean;
}

export function FilterSidebarIntelligent({
  filters,
  filtersConfig,
  onFiltersChange,
  activeContext,
  contextualAmenities,
  onReset,
  className,
  showHeader = true,
}: FilterSidebarIntelligentProps) {
  
  // Déterminer si location ou vente
  const isRent = filters.transactionGroup === "RENT" || 
    ["RENT_DAILY", "RENT_MONTHLY", "RENT_YEARLY"].includes(filters.transactionType);
  const isSale = filters.transactionType === "SALE" || filters.transactionGroup === "SALE";
  
  const priceRange = isRent 
    ? filtersConfig.priceRanges.rent 
    : filtersConfig.priceRanges.sale;

  return (
    <div className={cn("space-y-5", className)}>
      {/* ============================================================ */}
      {/* HEADER */}
      {/* ============================================================ */}
      {showHeader && (
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#E8D5B7]">
          <h3 className="text-lg font-bold text-[#6B8E23] font-display">
            Affiner la recherche
          </h3>
          {onReset && (
            <button 
              onClick={onReset}
              className="text-sm font-bold text-[#CD5C5C] hover:text-[#0891B2] transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION: TYPE DE TRANSACTION (si pas dans Hero) */}
      {/* ============================================================ */}
      {/* Cette section peut être masquée si la transaction est gérée dans le Hero */}

      {/* ============================================================ */}
      {/* SECTION: BUDGET - TOUJOURS VISIBLE */}
      {/* ============================================================ */}
      <FilterSection title="💰 Budget (DA)">
        {/* Inputs min/max */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Min"
            value={filters.minPrice ? formatNumber(filters.minPrice) : ''}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, '')) || undefined;
              onFiltersChange({ minPrice: val });
            }}
            className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          />
          <input
            type="text"
            placeholder="Max"
            value={filters.maxPrice ? formatNumber(filters.maxPrice) : ''}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, '')) || undefined;
              onFiltersChange({ maxPrice: val });
            }}
            className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          />
        </div>

        {/* Presets rapides */}
        <div className="flex flex-wrap gap-2">
          {(isRent ? [
            { label: "< 30k", min: 0, max: 30_000 },
            { label: "30-60k", min: 30_000, max: 60_000 },
            { label: "60-120k", min: 60_000, max: 120_000 },
            { label: "> 120k", min: 120_000, max: priceRange.max },
          ] : [
            { label: "< 3M", min: 0, max: 3_000_000 },
            { label: "3-6M", min: 3_000_000, max: 6_000_000 },
            { label: "6-10M", min: 6_000_000, max: 10_000_000 },
            { label: "> 10M", min: 10_000_000, max: priceRange.max },
          ]).map((preset) => (
            <button
              key={preset.label}
              onClick={() => onFiltersChange({ minPrice: preset.min, maxPrice: preset.max })}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/70 border border-[#E8D5B7] text-[#6B8E23] hover:bg-white hover:border-[#0891B2] transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <Divider />

      {/* ============================================================ */}
      {/* SECTION: SURFACE HABITABLE - SI DISPONIBLE */}
      {/* ============================================================ */}
      {shouldShowFilter('surface', activeContext) && (
        <>
          <FilterSection title="📐 Surface habitable (m²)">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.minSurface || ''}
                onChange={(e) => onFiltersChange({ minSurface: parseInt(e.target.value) || undefined })}
                className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxSurface || ''}
                onChange={(e) => onFiltersChange({ maxSurface: parseInt(e.target.value) || undefined })}
                className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
            </div>
            
            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "< 60 m²", set: () => onFiltersChange({ minSurface: 0, maxSurface: 60 }) },
                { label: "60-100 m²", set: () => onFiltersChange({ minSurface: 60, maxSurface: 100 }) },
                { label: "100-150 m²", set: () => onFiltersChange({ minSurface: 100, maxSurface: 150 }) },
                { label: "> 150 m²", set: () => onFiltersChange({ minSurface: 150, maxSurface: undefined }) },
              ].map((p) => (
                <button 
                  key={p.label} 
                  onClick={p.set} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white/70 border border-[#E8D5B7] text-[#6B8E23] hover:bg-white"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: SURFACE TERRAIN - MAISONS/TERRAINS UNIQUEMENT */}
      {/* ============================================================ */}
      {shouldShowFilter('landArea', activeContext) && (
        <>
          <FilterSection title="🏞️ Surface terrain (m²)">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.minLandArea || ''}
                onChange={(e) => onFiltersChange({ minLandArea: parseInt(e.target.value) || undefined })}
                className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxLandArea || ''}
                onChange={(e) => onFiltersChange({ maxLandArea: parseInt(e.target.value) || undefined })}
                className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
            </div>
            
            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "< 200 m²", set: () => onFiltersChange({ minLandArea: 0, maxLandArea: 200 }) },
                { label: "200-500 m²", set: () => onFiltersChange({ minLandArea: 200, maxLandArea: 500 }) },
                { label: "> 500 m²", set: () => onFiltersChange({ minLandArea: 500, maxLandArea: undefined }) },
              ].map((p) => (
                <button 
                  key={p.label} 
                  onClick={p.set} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white/70 border border-[#E8D5B7] text-[#6B8E23] hover:bg-white"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: PIÈCES - RÉSIDENTIEL UNIQUEMENT */}
      {/* ============================================================ */}
      {shouldShowFilter('rooms', activeContext) && (
        <>
          <FilterSection title="🛏️ Pièces & chambres">
            {/* Pièces totales */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B8E23] uppercase tracking-wide">
                Pièces minimum
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => onFiltersChange({ minRooms: filters.minRooms === num ? undefined : num })}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
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

            {/* Chambres */}
            {shouldShowFilter('bedrooms', activeContext) && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#6B8E23] uppercase tracking-wide">
                  Chambres minimum
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => onFiltersChange({ minBedrooms: filters.minBedrooms === num ? undefined : num })}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                        filters.minBedrooms === num
                          ? "bg-[#0891B2] text-white shadow"
                          : "bg-white/60 text-[#6B8E23] hover:bg-white border border-[#E8D5B7]"
                      )}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Salles de bain */}
            {shouldShowFilter('bathrooms', activeContext) && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#6B8E23] uppercase tracking-wide">
                  Salles de bain minimum
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => onFiltersChange({ minBathrooms: filters.minBathrooms === num ? undefined : num })}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                        filters.minBathrooms === num
                          ? "bg-[#0891B2] text-white shadow"
                          : "bg-white/60 text-[#6B8E23] hover:bg-white border border-[#E8D5B7]"
                      )}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
            )}
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: ÉTAGES - APPARTEMENTS UNIQUEMENT */}
      {/* ============================================================ */}
      {shouldShowFilter('floor', activeContext) && (
        <>
          <FilterSection title="🏢 Étage & ascenseur">
            {/* Étage min/max */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Étage min"
                value={filters.minFloor || ''}
                onChange={(e) => onFiltersChange({ minFloor: parseInt(e.target.value) || undefined })}
                className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
              <input
                type="number"
                placeholder="Étage max"
                value={filters.maxFloor || ''}
                onChange={(e) => onFiltersChange({ maxFloor: parseInt(e.target.value) || undefined })}
                className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
            </div>

            {/* Options exclusion */}
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton
                active={!!filters.excludeGroundFloor}
                onClick={() => onFiltersChange({ excludeGroundFloor: !filters.excludeGroundFloor })}
                label="Pas RDC"
              />
              <ToggleButton
                active={!!filters.excludeTopFloor}
                onClick={() => onFiltersChange({ excludeTopFloor: !filters.excludeTopFloor })}
                label="Pas dernier"
              />
            </div>

            {/* Ascenseur */}
            {shouldShowFilter('elevator', activeContext) && (
              <ToggleButton
                active={!!filters.hasElevator}
                onClick={() => onFiltersChange({ hasElevator: !filters.hasElevator })}
                label="🛗 Avec ascenseur"
                fullWidth
              />
            )}
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: VUE - SI DISPONIBLE */}
      {/* ============================================================ */}
      {shouldShowFilter('view', activeContext) && (
        <>
          <FilterSection title="🏞️ Type de vue">
            <div className="grid grid-cols-2 gap-2">
              {VIEW_TYPES.filter(v => v.code !== 'NONE').map((view) => {
                const isSelected = filters.viewTypes?.includes(view.code) || false;
                return (
                  <button
                    key={view.code}
                    onClick={() => {
                      const current = new Set(filters.viewTypes || []);
                      if (isSelected) current.delete(view.code);
                      else current.add(view.code);
                      onFiltersChange({ viewTypes: Array.from(current) });
                    }}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
                      isSelected
                        ? "bg-[#0891B2] text-white border-transparent shadow-md"
                        : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
                    )}
                  >
                    {view.icon} {view.labelFr}
                  </button>
                );
              })}
            </div>
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: COMMODITÉS CONTEXTUELLES */}
      {/* ============================================================ */}
      {shouldShowFilter('amenities', activeContext) && (
        <>
          <FilterSection title="✨ Commodités">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {filtersConfig.amenities
                .filter(a => contextualAmenities.length === 0 || contextualAmenities.includes(a.id))
                .map((amenity) => {
                  const isSelected = filters.amenities?.includes(amenity.id) || false;
                  return (
                    <label 
                      key={amenity.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF8E7] cursor-pointer transition-colors group"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          const current = new Set(filters.amenities || []);
                          if (e.target.checked) current.add(amenity.id);
                          else current.delete(amenity.id);
                          onFiltersChange({ amenities: Array.from(current) });
                        }}
                        className="w-5 h-5 rounded-md border-2 border-[#E8D5B7] text-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#0891B2]">
                        {amenity.name}
                      </span>
                    </label>
                  );
                })}
            </div>
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: ÂGE DU BÂTIMENT - SI DISPONIBLE */}
      {/* ============================================================ */}
      {shouldShowFilter('buildingAge', activeContext) && (
        <>
          <FilterSection title="🏗️ Âge du bâtiment">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Neuf", max: 2 },
                { label: "< 5 ans", max: 5 },
                { label: "< 10 ans", max: 10 },
                { label: "< 20 ans", max: 20 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => onFiltersChange({ maxBuildingAge: preset.max })}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
                    filters.maxBuildingAge === preset.max
                      ? "bg-[#0891B2] text-white border-transparent"
                      : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: PROXIMITÉS - SI DISPONIBLE */}
      {/* ============================================================ */}
      {shouldShowFilter('proximities', activeContext) && (
        <>
          <FilterSection title="📍 Proximités">
            {PROXIMITY_FILTERS.map((prox) => {
              const filterKey = `maxDistanceTo${prox.code.charAt(0).toUpperCase() + prox.code.slice(1)}` as keyof SearchFilters;
              const currentValue = filters[filterKey] as number | undefined;

              return (
                <div key={prox.code} className="space-y-2">
                  <label className="text-xs font-semibold text-[#6B8E23] uppercase tracking-wide flex items-center gap-2">
                    {prox.icon} {prox.labelFr}
                  </label>
                  <div className="flex gap-2">
                    {prox.distances.map((dist) => (
                      <button
                        key={dist}
                        onClick={() => onFiltersChange({ [filterKey]: currentValue === dist ? undefined : dist })}
                        className={cn(
                          "flex-1 px-2 py-1.5 rounded-lg text-xs font-bold border transition-all",
                          currentValue === dist
                            ? "bg-[#0891B2] text-white border-transparent"
                            : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
                        )}
                      >
                        &lt; {dist}m
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </FilterSection>
          <Divider />
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: DOCUMENTS LÉGAUX - TOUJOURS VISIBLE */}
      {/* ============================================================ */}
      <FilterSection title="📄 Documents légaux">
        <div className="grid grid-cols-2 gap-2">
          <ToggleButton
            active={!!filters.hasLivretFoncier}
            onClick={() => onFiltersChange({ hasLivretFoncier: !filters.hasLivretFoncier ? true : undefined })}
            label="Livret foncier"
          />
          <ToggleButton
            active={!!filters.hasActeVente}
            onClick={() => onFiltersChange({ hasActeVente: !filters.hasActeVente ? true : undefined })}
            label="Acte notarié"
          />
          <ToggleButton
            active={!!filters.hasPermisConstruction}
            onClick={() => onFiltersChange({ hasPermisConstruction: !filters.hasPermisConstruction ? true : undefined })}
            label="Permis const."
          />
          <ToggleButton
            active={!!filters.arePapersComplete}
            onClick={() => onFiltersChange({ arePapersComplete: !filters.arePapersComplete ? true : undefined })}
            label="Dossier complet"
          />
        </div>
      </FilterSection>

      {/* ============================================================ */}
      {/* SECTION: OPTIONS LOCATION - SI LOCATION */}
      {/* ============================================================ */}
      {isRent && (
        <>
          <Divider />
          <FilterSection title="🔑 Options location">
            {/* Durée minimum */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B8E23] uppercase tracking-wide">
                Durée minimum (mois)
              </label>
              <div className="flex gap-2">
                {[1, 3, 6, 12].map((months) => (
                  <button
                    key={months}
                    onClick={() => onFiltersChange({ minRentDuration: filters.minRentDuration === months ? undefined : months })}
                    className={cn(
                      "flex-1 px-2 py-2 rounded-lg text-xs font-bold border transition-all",
                      filters.minRentDuration === months
                        ? "bg-[#0891B2] text-white border-transparent"
                        : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white"
                    )}
                  >
                    {months}m
                  </button>
                ))}
              </div>
            </div>

            {/* Caution max */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B8E23] uppercase tracking-wide">
                Caution max
              </label>
              <input
                type="text"
                placeholder="Montant max"
                value={filters.maxRentDeposit ? formatNumber(filters.maxRentDeposit) : ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\D/g, '')) || undefined;
                  onFiltersChange({ maxRentDeposit: val });
                }}
                className="w-full h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
            </div>
          </FilterSection>
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION: OPTIONS ACHAT - SI VENTE */}
      {/* ============================================================ */}
      {isSale && (
        <>
          <Divider />
          <FilterSection title="💰 Options achat">
            <ToggleButton
              active={!!filters.isNegotiable}
              onClick={() => onFiltersChange({ isNegotiable: !filters.isNegotiable ? true : undefined })}
              label="💬 Prix négociable"
              fullWidth
            />
          </FilterSection>
        </>
      )}
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-[#6B8E23] uppercase tracking-wide">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-linear-to-r from-transparent via-[#D4B896] to-transparent" />;
}

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  fullWidth?: boolean;
}

function ToggleButton({ active, onClick, label, fullWidth = false }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
        active 
          ? "bg-[#0891B2] text-white border-transparent shadow-md" 
          : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white hover:border-[#0891B2]",
        fullWidth && "w-full"
      )}
    >
      {label}
    </button>
  );
}

// ============================================================================
// HELPERS
// ============================================================================

function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-DZ').format(num);
}
