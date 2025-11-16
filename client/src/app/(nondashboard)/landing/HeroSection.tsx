"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Search, MapPin, Home, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Background avec overlay gradient */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/hero-background-v2.svg" 
          alt="Hero Background" 
          fill 
          className="object-cover object-center" 
          priority 
        />
        {/* Overlay gradient pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-electric/20 via-transparent to-white/40" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-electric/30 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-electric" />
              <span className="text-sm font-semibold text-gray-800">
                La Plateforme Immobilière par Excellence
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
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-tight mb-6'>
              <span className="text-gray-900">
                Trouvez votre
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-electric via-blue-bright to-green-vibrant">
                bien idéal
              </span>
              <br />
              <span className="text-gray-900">
                en Algérie
              </span>
            </h1>
            
            <p className='text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium'>
              La plateforme moderne pour acheter, louer ou investir
              <span className="text-blue-electric"> en toute simplicité</span>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-electric via-blue-bright to-green-vibrant rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
              
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
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
                  className="flex-1 border-none bg-transparent h-16 text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                
                {/* Button recherche */}
                <Button 
                  onClick={() => console.log('Search:', searchQuery)}
                  size="lg"
                  className="m-2 h-12 px-8 bg-gradient-to-r from-blue-electric to-blue-bright hover:from-blue-deep hover:to-blue-electric text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>

            {/* Quick filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              {[
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
              ))}
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
              { value: '58 Wilayas', label: 'Couverture nationale' },
              { value: '100%', label: 'Annonces vérifiées' },
              { value: 'Gratuit', label: 'Publication d\'annonces' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-blue-electric/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-electric to-blue-bright">
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