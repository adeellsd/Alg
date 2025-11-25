"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Search, MapPin, Home, Sparkles, LayoutDashboard, Plus } from 'lucide-react';
import Link from 'next/link';
import { AuthUser } from 'aws-amplify/auth';

interface HeroSectionProps {
  user?: AuthUser;
  userRole?: string | null;
}

const HeroSection = ({ user, userRole }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-blue-electric to-blue-deep zellige-bg'>
      {/* Background avec pattern zellige */}
      <div className="absolute inset-0 -z-10">
        {/* Overlay subtil pour lisibilité */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-deep/30 to-blue-deep/60" />
      </div>

      {/* Contenu principal */}
      <div className='relative z-10 w-full px-6 sm:px-8 lg:px-12 pt-24 pb-16'>
        <div className='max-w-5xl mx-auto'>
          
          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                {user ? `Bienvenue ${user.username}` : 'La Plateforme Immobilière par Excellence'}
              </span>
            </div>
          </motion.div>

          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-tight mb-6 text-white'>
              <span>
                {user ? 'Votre espace' : 'Trouvez votre'}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-pale via-white to-blue-pale">
                {user ? 'immobilier' : 'bien idéal'}
              </span>
              <br />
              <span>
                {user ? (userRole === 'Professionnel' ? 'professionnel' : 'personnel') : 'en Algérie'}
              </span>
            </h1>
            
            <p className='text-lg sm:text-xl lg:text-2xl text-blue-pale max-w-3xl mx-auto font-medium'>
              {user 
                ? (userRole === 'Professionnel' 
                    ? 'Gérez vos annonces et développez votre activité'
                    : 'Recherchez, sauvegardez et trouvez votre futur bien')
                : 'La plateforme moderne pour acheter, louer ou investir'}
              <span className="text-white">
                {user ? '' : ' en toute simplicité'}
              </span>
            </p>
          </motion.div>

          {/* Barre de recherche moderne */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            {/* Search bar principale */}
            <div className="relative group">
              {/* Glow effect au hover */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-electric via-blue-bright to-green-vibrant rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300" />
              
              <div className="relative flex items-center bg-white rounded-xl shadow-blue overflow-hidden border-2 border-gray-200 hover:border-blue-electric/30 transition-all duration-300">
                {/* Icône de recherche */}
                <div className="pl-6 pr-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                
                {/* Input */}
                <Input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Appartement à Alger, Villa à Oran..." 
                  className="flex-1 border-none bg-transparent h-16 text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                />
                
                {/* Button recherche */}
                <Button 
                  onClick={() => console.log('Search:', searchQuery)}
                  size="lg"
                  variant="default"
                  className="m-2 h-12 px-8 rounded-lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>

            {/* Quick filters / Actions rapides */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              {user ? (
                // Actions rapides pour utilisateurs connectés
                userRole === 'Professionnel' ? (
                  <>
                    <Link href="/pro">
                      <Button variant="default" className="rounded-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Mon Dashboard Pro
                      </Button>
                    </Link>
                    <Link href="/pro/properties/new">
                      <Button variant="outline" className="rounded-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Créer une annonce
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/particulier">
                      <Button variant="default" className="rounded-full">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Mon Espace
                      </Button>
                    </Link>
                    <Link href="/favorites">
                      <Button variant="outline" className="rounded-full">
                        <Home className="w-4 h-4 mr-2" />
                        Mes Favoris
                      </Button>
                    </Link>
                  </>
                )
              ) : (
                // Quick filters pour utilisateurs non connectés
                [
                  { icon: Home, label: 'Appartements' },
                  { icon: Home, label: 'Villas' },
                  { icon: MapPin, label: 'Alger' },
                  { icon: MapPin, label: 'Oran' },
                ].map((filter, index) => (
                  <button
                    key={index}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-blue-electric/50 hover:shadow-md transition-all duration-300"
                  >
                    <filter.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-electric transition-colors" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {filter.label}
                    </span>
                  </button>
                ))
              )}
            </motion.div>
          </motion.div>

          {/* Stats en bas - VERSION HONNÊTE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: 'Nouveau', label: 'Plateforme en lancement' },
              { value: '69 Wilayas', label: 'Couverture nationale' },
              { value: '100%', label: 'Annonces vérifiées' },
              { value: 'Gratuit', label: 'Publication d\'annonces' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-blue-electric/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold font-display text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Effet de vague en bas */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection;