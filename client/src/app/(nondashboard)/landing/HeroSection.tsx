/**
 * HeroSection.tsx
 * Design System v5.1 "Alger Vibrante Refined"
 * 
 * Hero section avec gradient bleu méditerranéen inspiré des photos aériennes d'Alger.
 * 
 * @colors
 * - Gradient mer: bleu-ciel → turquoise-mer (couleurs du design system)
 * - Titre: gray-900 avec accent turquoise-mer
 * - CTAs: blue-electric (couleur primary du design system)
 * - Search glassmorphism: bg-white/90 backdrop-blur-xl
 * 
 * @patterns
 * - Pattern Zellige Khatam opacity-[0.03]
 * 
 * @version 5.1 - Inspired by Alger's aerial photos
 */

"use client";

import React, { useState } from 'react'
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
    <section className='relative min-h-[90vh] flex items-center overflow-hidden'>
  {/* Background gradient bleu méditerranéen - Inspiré des photos aériennes d'Alger */}
  <div className="absolute inset-0 bg-linear-to-br from-bleu-ciel/20 via-turquoise-mer/15 to-aqua-marine/10" />
      
      {/* Overlay glassmorphism pour profondeur */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Contenu principal */}
      <div className='relative z-10 w-full px-6 sm:px-8 lg:px-12 pt-32 pb-20'>
        <div className='max-w-6xl mx-auto'>
          
          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-turquoise-mer" />
              <span className="text-sm font-semibold text-gray-700">
                {user ? `Bienvenue ${user.username}` : 'La Plateforme Immobilière par Excellence'}
              </span>
            </div>
          </motion.div>

          {/* Titre principal - Style "Alger Vibrante" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-gray-900 drop-shadow-sm'>
              {user ? (
                <>
                  <span>Votre espace</span>
                  <br />
                  <span className="text-turquoise-mer drop-shadow-sm">
                    immobilier
                  </span>
                  <br />
                  <span>{userRole === 'Professionnel' ? 'professionnel' : 'personnel'}</span>
                </>
              ) : (
                <>
                  <span>Trouvez votre</span>
                  <br />
                  <span className="text-turquoise-mer drop-shadow-sm">
                    chez-vous idéal
                  </span>
                  <br />
                  <span>en Algérie</span>
                </>
              )}
            </h1>
            
            <p className='text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed'>
              {user 
                ? (userRole === 'Professionnel' 
                    ? 'Gérez vos annonces et développez votre activité immobilière'
                    : 'Recherchez, sauvegardez et trouvez votre futur bien en toute simplicité')
                : 'La plateforme immobilière premium qui célèbre la beauté d\'Alger'}
            </p>
          </motion.div>

          {/* Search bar glassmorphism - Style "Alger Vibrante" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search bar principale glassmorphism moderne */}
            <div className="relative">
              {/* Container glassmorphism */}
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-3 sm:p-4 gap-3 sm:gap-0 border border-white/50">
                
                {/* Input section */}
                <div className="flex items-center flex-1 px-4">
                  <Search className="w-6 h-6 text-blue-electric shrink-0 mr-3" />
                  
                  <Input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Appartement à Alger, Villa à Oran, Terrain à Constantine..." 
                    className="flex-1 border-none bg-transparent h-12 text-base sm:text-lg placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none font-medium"
                  />
                </div>
                
                {/* Button recherche - Bleu électrique du design system */}
                <Button 
                  onClick={() => console.log('Search:', searchQuery)}
                  variant="default"
                  size="lg"
                  className="h-14 px-10 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {user ? (
                // Actions rapides pour utilisateurs connectés
                userRole === 'Professionnel' ? (
                  <>
                    <Link href="/pro">
                      <Button variant="default" className="rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Mon Dashboard Pro
                      </Button>
                    </Link>
                    <Link href="/pro/properties/new">
                      <Button variant="outline" className="rounded-full bg-white/80 backdrop-blur-md border-white/50 text-gray-900 font-semibold hover:bg-white hover:scale-105 transition-all duration-200">
                        <Plus className="w-4 h-4 mr-2" />
                        Créer une annonce
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/particulier">
                      <Button variant="default" className="rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Mon Espace
                      </Button>
                    </Link>
                    <Link href="/favorites">
                      <Button variant="outline" className="rounded-full bg-white/80 backdrop-blur-md border-white/50 text-gray-900 font-semibold hover:bg-white hover:scale-105 transition-all duration-200">
                        <Home className="w-4 h-4 mr-2" />
                        Mes Favoris
                      </Button>
                    </Link>
                  </>
                )
              ) : (
                // Quick filters pour utilisateurs non connectés
                [
                  { icon: Home, label: 'Appartements', href: '/properties?type=apartment' },
                  { icon: Home, label: 'Villas', href: '/properties?type=villa' },
                  { icon: MapPin, label: 'Alger', href: '/properties?city=alger' },
                  { icon: MapPin, label: 'Oran', href: '/properties?city=oran' },
                ].map((filter, index) => (
                  <Link key={index} href={filter.href}>
                    <button className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-turquoise-mer border border-white/50 hover:border-turquoise-mer hover:shadow-md transition-all duration-200">
                      <filter.icon className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
                        {filter.label}
                      </span>
                    </button>
                  </Link>
                ))
              )}
            </motion.div>
          </motion.div>

          {/* Stats en bas - VERSION moderne épurée */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
          >
            {[
              { value: 'Nouveau', label: 'Plateforme en lancement' },
              { value: '58 Wilayas', label: 'Couverture nationale' },
              { value: '100%', label: 'Annonces vérifiées' },
              { value: 'Gratuit', label: 'Publication d\'annonces' },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="text-center p-5 sm:p-6 rounded-2xl bg-white border border-white/50 hover:border-turquoise-mer/30 hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-bold text-turquoise-mer mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection;
