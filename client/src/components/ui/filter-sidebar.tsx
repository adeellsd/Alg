"use client";

/**
 * FilterSidebar - RentAlg Design System v6.0 "Alger Authentique"
 * Sidebar de filtrage avec esthétique vintage algérienne
 */

import React from "react";
import { cn } from "@/lib/utils";
import { FiltersConfig, SearchFilters } from "@/types/property-frontend";

interface FilterSidebarProps {
  filters: SearchFilters;
  filtersConfig: FiltersConfig;
  onFiltersChange: (newFilters: Partial<SearchFilters>) => void;
  onReset: () => void;
  className?: string;
  showHeader?: boolean;
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
      {/* Header avec reset */}
      {showHeader && (
        <>
          <div className="flex items-center justify-between pb-4 border-b-2 border-[#E8D5B7]">
            <h3 className="text-lg font-bold text-[#6B8E23] font-display">
              Affinez votre recherche
            </h3>
            <button 
              onClick={onReset}
              className="text-sm font-bold text-[#CD5C5C] hover:text-[#0891B2] transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </>
      )}

      {/* Section Prix */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-[#6B8E23] uppercase tracking-wide flex items-center gap-2">
          💰 Budget (DA)
        </label>
        
        {/* Inputs min/max */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, '')) || undefined;
              onFiltersChange({ minPrice: val });
            }}
            className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          />
          <input
            type="text"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, '')) || undefined;
              onFiltersChange({ maxPrice: val });
            }}
            className="h-11 px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#E8D5B7] text-sm font-medium text-gray-700 placeholder:text-[#C19A6B] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          />
        </div>

        {/* Presets rapides - Pills beiges */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: "< 3M", min: 0, max: 3_000_000 },
            { label: "3-6M", min: 3_000_000, max: 6_000_000 },
            { label: "6-10M", min: 6_000_000, max: 10_000_000 },
            { label: "> 10M", min: 10_000_000, max: 100_000_000 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => onFiltersChange({ minPrice: preset.min, maxPrice: preset.max })}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/70 border border-[#E8D5B7] text-[#6B8E23] hover:bg-white hover:border-[#0891B2] transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider ornamental */}
      <div className="h-px bg-linear-to-r from-transparent via-[#D4B896] to-transparent" />

      {/* Section Surface */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-[#6B8E23] uppercase tracking-wide flex items-center gap-2">
          📐 Surface (m²)
        </label>
        
        {/* Même pattern que Prix */}
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
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-[#D4B896] to-transparent" />

      {/* Section Commodités */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-[#6B8E23] uppercase tracking-wide">
          ✨ Commodités
        </label>
        
        <div className="space-y-2">
          {(filtersConfig.amenities || []).map((amenity) => {
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
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-[#D4B896] to-transparent" />

      {/* Section Documents légaux */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-[#6B8E23] uppercase tracking-wide">
          📄 Documents légaux
        </label>
        
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
      </div>
    </div>
  );
}

// Helper component
function ToggleButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg text-xs font-bold border transition-all",
        active 
          ? "bg-[#0891B2] text-white border-transparent shadow-md" 
          : "bg-white/70 text-[#6B8E23] border-[#E8D5B7] hover:bg-white hover:border-[#0891B2]"
      )}
    >
      {label}
    </button>
  );
}
