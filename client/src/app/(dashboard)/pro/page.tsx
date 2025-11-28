/**
 * Pro Dashboard Page
 * Design System v5.0 "Alger Authentique"
 * 
 * Dashboard professionnel avec pattern Floral background,
 * gradient title, et composants refactorisés v5.0
 * 
 * @version 5.0 - Sprint 5
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGetAuthUserQuery } from '@/state/api';
import {
  Building2,
  TrendingUp,
  Eye,
  MessageSquare,
  Zap,
  Plus,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  QuickStats,
  QuickActions,
  TierInfo,
} from '@/components/dashboard';

const tierFeatures = {
  STARTER: {
    name: 'Starter',
    color: 'blue',
    features: ['15 annonces', '15 images/annonce', '1 vidéo/annonce', 'Boosts payants'],
  },
  PRO: {
    name: 'Pro',
    color: 'purple',
    features: ['50 annonces', '20 images/annonce', '2 vidéos/annonce', '1 boost gratuit/mois'],
  },
  ELITE: {
    name: 'Elite',
    color: 'amber',
    features: ['Annonces illimitées', 'Images illimitées', '3 vidéos/annonce', 'Boosts illimités'],
  },
};

export default function ProDashboard() {
  const { data: authUser, isLoading } = useGetAuthUserQuery();

  if (isLoading || !authUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  const user = authUser.userInfo;
  const tier = user.accountTier;

  if (tier === 'FREE') {
    return (
      <div className="max-w-[800px] mx-auto">
        <Card className="relative p-8 text-center bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
          <div className="absolute inset-0 pattern-floral opacity-[0.03]" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-beige-casbah to-beige-chaud flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-display">
              Accès Professionnel requis
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Ce dashboard est réservé aux comptes professionnels. Passez à un abonnement Pro pour gérer vos annonces.
            </p>
            <Link href="/pricing">
              <Button 
                size="lg"
                className="h-14 px-10 bg-linear-to-r from-or to-orange-brulant text-gray-900 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Voir les formules Pro
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const mockStats = [
    { label: 'Annonces actives', value: user.properties?.length || '0', icon: Building2, color: 'from-turquoise-mer to-blue-electric' },
    { label: 'Vues totales', value: '245', icon: Eye, color: 'from-purple-500 to-purple-700', trend: { value: '+12%', isPositive: true } },
    { label: 'Messages reçus', value: '18', icon: MessageSquare, color: 'from-vert-emeraude to-vert-vibrant', trend: { value: '+5 nouveaux', isPositive: true } },
    { label: 'Taux de conversion', value: '3.2%', icon: TrendingUp, color: 'from-orange-brulant to-coral', trend: { value: '+0.5%', isPositive: true } },
  ];

  const quickActions = [
    {
      label: 'Nouvelle annonce',
      href: '/pro/properties/new',
      icon: Plus,
      description: 'Publier un nouveau bien',
      variant: 'default' as const,
    },
    {
      label: 'Mes annonces',
      href: '/pro/properties',
      icon: Building2,
      description: 'Gérer vos biens',
      variant: 'outline' as const,
    },
    {
      label: 'Booster une annonce',
      href: '/pro/boosts',
      icon: Zap,
      description: 'Augmenter la visibilité',
      variant: 'outline' as const,
    },
    {
      label: 'Statistiques',
      href: '/pro/stats',
      icon: BarChart3,
      description: 'Analyser vos performances',
      variant: 'outline' as const,
    },
  ];

  const currentTierFeatures = tierFeatures[tier as 'STARTER' | 'PRO' | 'ELITE'];

  return (
    <div className="relative min-h-screen">
      {/* Pattern Floral background subtil */}
      <div className="fixed inset-0 pattern-floral opacity-[0.02] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
        {/* Header avec gradient title v5.0 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-display mb-2">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-turquoise-mer">
                  Dashboard Professionnel
                </span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Gérez vos annonces et suivez vos performances
              </p>
            </div>
            <Badge className={`bg-${currentTierFeatures.color}-500 text-white px-6 py-2.5 text-base font-bold rounded-xl shadow-lg`}>
              {currentTierFeatures.name}
            </Badge>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <QuickStats stats={mockStats} />
        </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions title="Actions rapides" actions={quickActions} />

          <Card className="p-6 bg-white border-0 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Aperçu des annonces
            </h3>
            {(user.properties?.length || 0) > 0 ? (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:border-blue-electric transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Appartement moderne - Hydra</h4>
                    <Badge variant="outline" className="text-vert-vibrant border-vert-vibrant">Actif</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div><Eye className="w-4 h-4 inline mr-1" />124 vues</div>
                    <div><MessageSquare className="w-4 h-4 inline mr-1" />8 messages</div>
                    <div><span className="text-or font-bold">★</span> 12 favoris</div>
                  </div>
                </div>
                <div className="text-center py-4">
                  <Link href="/pro/properties">
                    <Button variant="ghost">Voir toutes les annonces</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune annonce publiée
                </h4>
                <p className="text-gray-600 mb-6">
                  Commencez à publier vos biens immobiliers dès maintenant
                </p>
                <Link href="/pro/properties/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer ma première annonce
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white border-0 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance ce mois-ci
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-pale rounded-lg">
                <p className="text-sm text-blue-deep mb-1">Vues moyennes/annonce</p>
                <p className="text-2xl font-bold text-blue-deep">24.5</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Taux d'engagement</p>
                <p className="text-2xl font-bold text-purple-700">7.3%</p>
              </div>
              <div className="p-4 bg-green-pale rounded-lg">
                <p className="text-sm text-vert-vibrant mb-1">Messages reçus</p>
                <p className="text-2xl font-bold text-vert-vibrant">18</p>
              </div>
              <div className="p-4 bg-cream rounded-lg">
                <p className="text-sm text-orange-brulant mb-1">Favoris ajoutés</p>
                <p className="text-2xl font-bold text-orange-brulant">32</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <TierInfo
            tier={tier}
            stats={{
              propertiesUsed: user.properties?.length || 0,
              propertiesLimit: user.propertyLimit || 15,
              imagesLimit: user.imagesPerPropertyLimit || 15,
            }}
          />

          <Card className="p-6 bg-white border-0 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Votre formule {currentTierFeatures.name}
            </h3>
            <ul className="space-y-2">
              {currentTierFeatures.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-electric rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            {tier !== 'ELITE' && (
              <Link href="/pricing">
                <Button variant="outline" className="w-full mt-4">
                  <Zap className="w-4 h-4 mr-2" />
                  Améliorer mon abonnement
                </Button>
              </Link>
            )}
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}
