"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, BellOff, Trash2, MapPin, Home, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SavedSearchCardProps {
  id: string;
  title: string;
  location: string;
  propertyType?: string;
  priceRange?: string;
  newListings: number;
  alertsEnabled: boolean;
  onToggleAlert: () => void;
  onDelete: () => void;
}

const SavedSearchCard = ({
  title,
  location,
  propertyType,
  priceRange,
  newListings,
  alertsEnabled,
  onToggleAlert,
  onDelete,
}: SavedSearchCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white border-0 shadow-blue hover:shadow-lg transition-all duration-300 rounded-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-3 bg-blue-pale rounded-xl shrink-0">
                <Search className="w-5 h-5 text-blue-electric" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                {newListings > 0 && (
                  <Badge className="bg-green-pale text-green-vibrant hover:bg-green-pale border-0 font-semibold">
                    {newListings} nouvelle{newListings > 1 ? 's' : ''} annonce{newListings > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Search Criteria */}
          <div className="space-y-3 mb-5 bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-blue-electric" />
              <span className="font-medium">{location}</span>
            </div>
            {propertyType && (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Home className="w-4 h-4 text-blue-electric" />
                <span className="font-medium">{propertyType}</span>
              </div>
            )}
            {priceRange && (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Coins className="w-4 h-4 text-blue-electric" />
                <span className="font-medium">{priceRange}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Link href="/properties" className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-blue-electric text-blue-electric hover:bg-blue-pale font-medium transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                Voir les résultats
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleAlert}
              className={alertsEnabled ? 'text-blue-electric hover:bg-blue-pale' : 'text-gray-400 hover:bg-gray-100'}
            >
              {alertsEnabled ? (
                <Bell className="w-4 h-4" />
              ) : (
                <BellOff className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-terracotta hover:bg-terracotta/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SavedSearchCard;
