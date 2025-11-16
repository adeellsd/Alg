"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, UserPlus, MapPin, ArrowRight, Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.15
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
};

const CTASection = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-blue-pale/20 to-green-pale/20">
      {/* Pattern en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='%230891B2'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-electric/10 to-green-vibrant/10 border border-blue-electric/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-electric" />
            <span className="text-sm font-semibold text-gray-700">
              Prêt à commencer ?
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight">
            Votre futur bien vous attend
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez des milliers d'algériens qui ont déjà trouvé leur bonheur avec RentAlg
          </p>
        </motion.div>

        {/* CTA Cards en grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Card 1: Explorer les annonces */}
          <motion.div variants={itemVariants}>
            <Link href="/properties" className="group block">
              <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-electric/30 overflow-hidden">
                {/* Gradient animé au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-electric/5 to-blue-sky/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icône */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-electric to-blue-bright shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Contenu */}
                  <h3 className="text-2xl font-bold font-display text-gray-900 mb-3 group-hover:text-blue-electric transition-colors">
                    Explorer les annonces
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Découvrez des milliers de biens disponibles partout en Algérie. Utilisez nos filtres avancés pour trouver exactement ce que vous cherchez.
                  </p>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-blue-electric font-bold group-hover:gap-3 transition-all duration-300">
                    <span>Voir les annonces</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Badge "Gratuit" */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-blue-pale text-blue-electric text-xs font-bold">
                  Gratuit
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 2: Créer un compte */}
          <motion.div variants={itemVariants}>
            <Link href="/signup" className="group block">
              <div className="relative h-full bg-gradient-to-br from-green-vibrant to-green-fresh rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icône */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserPlus className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Contenu */}
                  <h3 className="text-2xl font-bold font-display text-white mb-3">
                    Créer un compte
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Publiez vos annonces gratuitement, sauvegardez vos favoris et recevez des alertes personnalisées pour ne rien manquer.
                  </p>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all duration-300">
                    <span>S'inscrire maintenant</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Badge "Recommandé" */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/30">
                  Recommandé
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Carte Interactive - Teaser */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 hover:border-blue-electric/30 transition-all duration-300"
        >
          {/* Placeholder pour la carte */}
          <div className="relative h-[400px] sm:h-[500px] bg-gradient-to-br from-blue-pale/30 to-green-pale/30">
            {/* Overlay avec infos */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-lg px-6">
                <MapPin className="w-16 h-16 text-blue-electric mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 mb-3">
                  Explorez la carte interactive
                </h3>
                <p className="text-gray-600 mb-6">
                  Visualisez tous les biens disponibles directement sur une carte avec leurs emplacements exacts
                </p>
                <Link href="/map">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-electric to-blue-bright text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Ouvrir la carte
                  </button>
                </Link>
              </div>
            </div>

            {/* Points de localisation simulés */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-electric rounded-full shadow-lg animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-green-vibrant rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-coral rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.6s' }} />
            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-electric rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.9s' }} />
          </div>
        </motion.div>

        {/* Stats rapides */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Annonces actives', value: 'Nouveau', icon: '🏠' },
            { label: 'Villes couvertes', value: '58+', icon: '📍' },
            { label: 'Publication', value: 'Gratuite', icon: '✨' },
            { label: 'Support', value: '7j/7', icon: '💬' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200 hover:border-blue-electric/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-electric to-green-vibrant mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;