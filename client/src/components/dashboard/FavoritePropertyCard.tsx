"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, BedDouble, Bath, Maximize, MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface FavoritePropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  imageUrl: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  addedDate: string;
  onRemove: () => void;
}

const FavoritePropertyCard = ({
  id,
  title,
  price,
  location,
  imageUrl,
  propertyType,
  bedrooms,
  bathrooms,
  area,
  addedDate,
  onRemove,
}: FavoritePropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-white border-0 shadow-blue hover:shadow-lg transition-all duration-300 group rounded-xl">
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Favorite badge */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              size="sm"
              variant="ghost"
              onClick={onRemove}
              className="h-10 w-10 p-0 bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-white"
            >
              <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
            </Button>
          </div>

          {/* Property type badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white text-gray-900 hover:bg-white border-0 shadow-md font-semibold px-3 py-1.5">
              {propertyType}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Location */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-electric transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-electric" />
              <span className="font-medium">{location}</span>
            </div>
          </div>

          {/* Features */}
          {(bedrooms || bathrooms || area) && (
            <div className="flex items-center gap-5 mb-4 pb-4 border-b border-gray-100">
              {bedrooms && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <BedDouble className="w-4 h-4 text-blue-electric" />
                  <span className="font-semibold">{bedrooms}</span>
                </div>
              )}
              {bathrooms && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Bath className="w-4 h-4 text-blue-electric" />
                  <span className="font-semibold">{bathrooms}</span>
                </div>
              )}
              {area && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Maximize className="w-4 h-4 text-blue-electric" />
                  <span className="font-semibold">{area}m²</span>
                </div>
              )}
            </div>
          )}

          {/* Price & Actions */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-2xl font-bold bg-linear-to-r from-blue-electric to-blue-bright bg-clip-text text-transparent">
                {price}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                Ajouté le {new Date(addedDate).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/properties/${id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-electric text-blue-electric hover:bg-blue-pale h-10 w-10 p-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
              
              <Button
                size="sm"
                className="bg-linear-to-r from-blue-electric to-blue-bright hover:from-blue-deep hover:to-blue-electric text-white shadow-md hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline font-medium">Contacter</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FavoritePropertyCard;
