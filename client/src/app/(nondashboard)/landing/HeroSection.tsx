/**
 * HeroSection - RentAlg Design System v6.0
 * Fresh, Modern & Clean Hero Component
 */

"use client";

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Search, MapPin, Home, Sparkles, LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AuthUser } from 'aws-amplify/auth';

interface HeroSectionProps {
  user?: AuthUser;
  userRole?: string | null;
}

const HeroSection = ({ user, userRole }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-700" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white">
                {user ? `Bienvenue, ${user.username}` : 'La Plateforme Immobilière #1 en Algérie'}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {user ? (
              <>
                Votre espace<br />
                <span className="text-teal-300">immobilier</span>
              </>
            ) : (
              <>
                Trouvez votre<br />
                <span className="text-teal-300">chez-vous idéal</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            {user 
              ? 'Gérez vos annonces et trouvez votre futur bien en toute simplicité'
              : 'Des milliers d\'annonces vérifiées pour acheter ou louer en Algérie'}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-3 p-3 bg-white rounded-2xl shadow-2xl">
              <div className="flex items-center flex-1 gap-3 px-4">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Appartement, Villa, Terrain..."
                  className="flex-1 border-none bg-transparent h-12 text-base placeholder:text-slate-400 focus:ring-0"
                />
              </div>
              <Button size="lg" className="h-12 px-8 rounded-xl">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {user ? (
              <>
                <Link href={userRole === 'Professionnel' ? '/pro' : '/particulier'}>
                  <Button variant="secondary" className="rounded-full">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Mon Dashboard
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button variant="outline" className="rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Search className="w-4 h-4 mr-2" />
                    Explorer
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {[
                  { icon: Home, label: 'Appartements', href: '/properties?type=apartment' },
                  { icon: Home, label: 'Villas', href: '/properties?type=villa' },
                  { icon: MapPin, label: 'Alger', href: '/properties?city=alger' },
                  { icon: MapPin, label: 'Oran', href: '/properties?city=oran' },
                ].map((filter, index) => (
                  <Link key={index} href={filter.href}>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all duration-200">
                      <filter.icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  </Link>
                ))}
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: 'Nouveau', label: 'Plateforme en lancement' },
              { value: '58 Wilayas', label: 'Couverture nationale' },
              { value: '100%', label: 'Annonces vérifiées' },
              { value: 'Gratuit', label: 'Publication d\'annonces' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
