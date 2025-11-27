"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  MapPin,
  Maximize,
  Bed,
  Bath,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice, getPropertyTypeLabel } from "@/lib/utils";
import { PropertyFrontend } from "@/types/property-frontend";

interface PropertyCardProps {
  property: PropertyFrontend;
  viewMode: "grid" | "list" | "map";
}

export const PropertyListingCard = ({ property, viewMode }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share logic
  };

  if (viewMode === "grid") {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 cursor-pointer h-full flex flex-col border border-transparent hover:border-cyan-100"
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
          <img
            src={imageError ? "/placeholder.jpg" : (property.thumbnail || "/placeholder.jpg")}
            alt={property.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-50 transition-opacity" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
            <div className="flex flex-col gap-2">
                {property.isBoosted && (
                <Badge className={cn(
                    "px-3 py-1.5 font-bold text-[10px] uppercase tracking-widest shadow-lg backdrop-blur-md border-0 rounded-full",
                    property.boostTier === "ULTRA" && "bg-linear-to-r from-amber-400 to-orange-500 text-white",
                    property.boostTier === "PREMIUM" && "bg-linear-to-r from-cyan-500 to-blue-600 text-white",
                    property.boostTier === "EN_AVANT" && "bg-white/90 text-cyan-700"
                )}>
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    {property.boostTier === "ULTRA" ? "ULTRA" : property.boostTier === "PREMIUM" ? "PREMIUM" : "TOP"}
                </Badge>
                )}
                <Badge className={cn(
                "px-3 py-1.5 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md shadow-lg w-fit rounded-full",
                property.transactionType === "RENT" 
                    ? "bg-emerald-500 text-white border-0" 
                    : "bg-cyan-600 text-white border-0"
                )}>
                {property.transactionType === "RENT" ? "Location" : "Vente"}
                </Badge>
            </div>
            
            <Button
              size="icon"
              onClick={handleFavoriteToggle}
              className={cn(
                "h-9 w-9 rounded-full shadow-lg transition-all duration-200 backdrop-blur-md border-0 hover:scale-110",
                isFavorite
                  ? "bg-rose-500 text-white hover:bg-rose-600"
                  : "bg-white/80 text-gray-700 hover:bg-white hover:text-rose-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Price & Rating */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {formatPrice(property.price.amount, property.transactionType)}
              </h3>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                {property.location.commune?.nameFr}, {property.location.wilaya.nameFr}
              </p>
            </div>
            {/* Property Type Badge */}
            <Badge variant="outline" className="border-gray-200 text-gray-600 font-medium text-xs px-2.5 py-1 rounded-lg bg-gray-50">
               {getPropertyTypeLabel(property.propertyType)}
            </Badge>
          </div>

          {/* Title */}
          <h4 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-cyan-700 transition-colors">
            {property.title}
          </h4>

          {/* Features */}
          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Bed className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Bath className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold">{property.bathrooms}</span>
              </div>
            )}
            {property.surface && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Maximize className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold">{property.surface} m²</span>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  // List View
  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row border border-transparent hover:border-cyan-100 h-full sm:h-48"
    >
      {/* Image */}
      <div className="relative w-full sm:w-64 h-48 sm:h-full shrink-0 bg-gray-100">
        <img
          src={imageError ? "/placeholder.jpg" : (property.thumbnail || "/placeholder.jpg")}
          alt={property.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
           <Badge className={cn(
                "px-2.5 py-1 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md shadow-lg rounded-full",
                property.transactionType === "RENT" 
                    ? "bg-emerald-500 text-white border-0" 
                    : "bg-cyan-600 text-white border-0"
            )}>
            {property.transactionType === "RENT" ? "Location" : "Vente"}
            </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {formatPrice(property.price.amount, property.transactionType)}
              </h3>
             <Button
              size="icon"
              variant="ghost"
              onClick={handleFavoriteToggle}
              className={cn(
                "h-8 w-8 rounded-full hover:bg-rose-50 hover:text-rose-500",
                isFavorite ? "text-rose-500" : "text-gray-400"
              )}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </Button>
          </div>
          
          <h4 className="font-semibold text-gray-800 line-clamp-1 mb-1 group-hover:text-cyan-700 transition-colors">
            {property.title}
          </h4>
          
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-600" />
            {property.location.commune?.nameFr}, {property.location.wilaya.nameFr}
          </p>
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-gray-50 mt-2">
            {property.bedrooms && (
              <div className="flex items-center gap-2 text-gray-600">
                <Bed className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold">{property.bedrooms} ch</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2 text-gray-600">
                <Bath className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold">{property.bathrooms} sdb</span>
              </div>
            )}
            {property.surface && (
              <div className="flex items-center gap-2 text-gray-600">
                <Maximize className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold">{property.surface} m²</span>
              </div>
            )}
        </div>
      </div>
    </motion.article>
  );
};
