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
  { label: 'Recherches actives', value: '2', icon: Search, color: 'from-turquoise-mer to-blue-electric' },
  { label: 'Favoris', value: '5', icon: Heart, color: 'from-fuchsia to-pink-500' },
  { label: 'Messages', value: '3', icon: MessageSquare, color: 'from-vert-emeraude to-vert-vibrant', trend: { value: '+2 nouveaux', isPositive: true } },
  { label: 'Vues reçues', value: '12', icon: Eye, color: 'from-purple-500 to-purple-700' },
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
          <div className="w-12 h-12 border-4 border-blue-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
    <div className="relative min-h-screen">
      {/* Pattern Khatam background subtil */}
      <div className="fixed inset-0 pattern-khatam opacity-[0.02] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
        {/* Header avec gradient title v5.0 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl lg:text-5xl font-bold font-display mb-2">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-turquoise-mer to-blue-electric">
              Bonjour, {user.name || user.email?.split('@')[0]}
            </span>
            <span className="ml-3 animate-wave inline-block">👋</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Bienvenue sur votre dashboard. Voici un aperçu de vos activités.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <QuickStats stats={mockStats} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuickActions title="Actions rapides" actions={quickActions} />

            <Card className="relative p-6 bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-xl overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 pattern-geometric opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
              <div className="relative z-10">
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
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-pale to-turquoise-mer/30 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-blue-electric" />
                    </div>
                    <p className="text-gray-500 mb-4 font-medium">Aucune recherche sauvegardée</p>
                    <Link href="/properties">
                      <Button className="bg-linear-to-r from-turquoise-mer to-blue-electric text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <Plus className="w-4 h-4 mr-2" />Créer une recherche
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>

            <Card className="relative p-6 bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-xl overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 pattern-geometric opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
              <div className="relative z-10">
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
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-pink-100 to-fuchsia/20 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-fuchsia" />
                    </div>
                    <p className="text-gray-500 mb-4 font-medium">Aucun favori enregistré</p>
                  </div>
                )}
              </div>
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

            <Card className="relative p-6 bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-xl overflow-hidden">
              <div className="absolute inset-0 pattern-hexagons opacity-[0.02]" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <ActivityTimeline activities={mockActivities} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
