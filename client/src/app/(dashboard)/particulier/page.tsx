'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGetAuthUserQuery } from '@/state/api';
import {
  Search,
  Heart,
  MessageSquare,
  Bell,
  Plus,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  QuickStats,
  QuickActions,
  TierInfo,
  SavedSearchCard,
  FavoritePropertyCard,
  ActivityTimeline,
} from '@/components/dashboard';

const mockStats = [
  { label: 'Recherches actives', value: '2', icon: Search, color: 'from-blue-500 to-blue-600' },
  { label: 'Favoris', value: '5', icon: Heart, color: 'from-pink-500 to-pink-600' },
  { label: 'Messages', value: '3', icon: MessageSquare, color: 'from-green-500 to-green-600', trend: { value: '+2 nouveaux', isPositive: true } },
  { label: 'Vues reçues', value: '12', icon: Eye, color: 'from-purple-500 to-purple-600' },
];

const mockSavedSearches = [
  {
    id: '1',
    title: 'Appartement à Alger Centre',
    location: 'Alger Centre',
    propertyType: 'Appartement',
    priceRange: '50,000 - 100,000 DA/mois',
    newListings: 5,
    alertsEnabled: true,
  },
];

const mockFavorites = [
  {
    id: '1',
    title: 'Appartement moderne - Hydra',
    location: 'Hydra, Alger',
    price: '85,000 DA/mois',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    propertyType: 'Appartement',
    surface: '120m²',
    rooms: 3,
    addedDate: '2024-11-15',
  },
];

const mockActivities = [
  {
    id: '1',
    type: 'alert' as const,
    title: 'Nouvelle annonce correspondante',
    description: 'Un bien correspond à votre recherche',
    timestamp: '2024-11-23T10:00:00Z',
  },
];

export default function ParticulierDashboard() {
  const { data: authUser, isLoading } = useGetAuthUserQuery();

  const handleToggleAlert = (searchId: string) => {
    console.log('Toggle alert for search:', searchId);
    // TODO: Implement alert toggle
  };

  const handleDeleteSearch = (searchId: string) => {
    console.log('Delete search:', searchId);
    // TODO: Implement search deletion
  };

  const handleRemoveFavorite = (favoriteId: string) => {
    console.log('Remove favorite:', favoriteId);
    // TODO: Implement favorite removal
  };

  if (isLoading || !authUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const user = authUser.userInfo;

  const quickActions = [
    {
      label: 'Nouvelle recherche',
      href: '/properties',
      icon: Search,
      description: 'Trouver votre bien idéal',
      variant: 'default' as const,
    },
    {
      label: 'Mes favoris',
      href: '/favorites',
      icon: Heart,
      description: 'Voir vos biens sauvegardés',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bonjour, {user.name || user.email?.split('@')[0]} 👋
        </h1>
        <p className="text-gray-600">
          Bienvenue sur votre dashboard. Voici un aperçu de vos activités.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <QuickStats stats={mockStats} />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions title="Actions rapides" actions={quickActions} />

          <Card className="p-6 bg-white border-0 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recherches sauvegardées</h3>
              <Link href="/particulier/searches">
                <Button variant="ghost" size="sm">Voir tout</Button>
              </Link>
            </div>
            {mockSavedSearches.length > 0 ? (
              <div className="space-y-3">
                {mockSavedSearches.map((search) => (
                  <SavedSearchCard 
                    key={search.id} 
                    {...search}
                    onToggleAlert={() => handleToggleAlert(search.id)}
                    onDelete={() => handleDeleteSearch(search.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Aucune recherche sauvegardée</p>
                <Link href="/properties">
                  <Button><Plus className="w-4 h-4 mr-2" />Créer une recherche</Button>
                </Link>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white border-0 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Favoris récents</h3>
              <Link href="/favorites">
                <Button variant="ghost" size="sm">Voir tout</Button>
              </Link>
            </div>
            {mockFavorites.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {mockFavorites.map((favorite) => (
                  <FavoritePropertyCard 
                    key={favorite.id} 
                    {...favorite}
                    onRemove={() => handleRemoveFavorite(favorite.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Aucun favori enregistré</p>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <TierInfo
            tier={user.accountTier}
            stats={{
              propertiesUsed: user.properties?.length || 0,
              propertiesLimit: user.propertyLimit || 5,
              imagesLimit: user.imagesPerPropertyLimit || 10,
            }}
            trialInfo={{
              isEligible: !user.trialUsed && (user.properties?.length || 0) >= 2,
            }}
          />

          <Card className="p-6 bg-white border-0 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
            <ActivityTimeline activities={mockActivities} />
          </Card>
        </div>
      </div>
    </div>
  );
}
