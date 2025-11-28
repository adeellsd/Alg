/**
 * CTASection.tsx
 * Design System v5.1 "Alger Vibrante Refined"
 * 
 * Section CTA finale avec gradient beige Casbah, cards glassmorphism,
 * et XXL buttons BLEUS (pas de doré).
 * 
 * @colors
 * - Gradient background: from-beige-casbah to-beige-chaud
 * - CTA buttons: bleu électrique / vert (pas de doré)
 * - Cards glassmorphism: bg-white/90 backdrop-blur-md
 * 
 * @patterns
 * - Pattern Zellige Hexagons opacity-[0.05]
 * 
 * @version 5.1 - Refined & Elegant
 */

"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, UserPlus, ArrowRight, Sparkles } from 'lucide-react';

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
    <section className="relative py-32 overflow-hidden">
  {/* Gradient beige Casbah - Inspiré de l'architecture algéroise */}
  <div className="absolute inset-0 bg-linear-to-br from-beige-casbah to-beige-chaud" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-lg mb-8"
          >
            <Sparkles className="w-5 h-5 text-or" />
            <span className="text-base font-bold text-gray-900">Rejoignez la communauté</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900 mb-6 leading-tight"
          >
            Prêt à trouver votre <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-turquoise-mer">
              chez-vous idéal ?
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed font-medium"
          >
            Que vous cherchiez à louer, acheter ou investir, RentAlg vous accompagne à chaque étape de votre projet immobilier.
          </motion.p>
        </div>

        {/* CTA Cards - Style glassmorphism v5.0 */}
        <motion.div 
          variants={itemVariants} 
          className="grid sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto"
        >
          {/* Card 1: Je cherche un bien */}
          <Link 
            href="/search" 
            className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md p-8 shadow-2xl hover:shadow-[0_20px_60px_-10px_rgba(8,145,178,0.4)] transition-all duration-300 hover:-translate-y-2 border border-white/60"
          >
            {/* Decorative overlay disabled (zellige paused) */}
            
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              {/* Icon avec gradient */}
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-turquoise-mer to-blue-electric flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-4 ring-white/10">
                <Search className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-display group-hover:text-blue-electric transition-colors">
                Je cherche un bien
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Parcourez des milliers d'annonces vérifiées à travers toute l'Algérie
              </p>
              
              {/* XXL CTA Button - Bleu électrique v5.1 */}
              <div className="mt-auto w-full">
                <div className="h-16 px-12 rounded-xl bg-blue-electric flex items-center justify-center gap-3 text-white font-bold text-xl shadow-2xl group-hover:shadow-[0_10px_40px_-10px_rgba(8,145,178,0.6)] group-hover:scale-105 transition-all duration-300">
                  Commencer
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Border bleu au hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-electric/40 transition-colors duration-300 pointer-events-none" />
          </Link>

          {/* Card 2: Je suis propriétaire */}
          <Link 
            href="/signup" 
            className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md p-8 shadow-2xl hover:shadow-[0_20px_60px_-10px_rgba(5,150,105,0.4)] transition-all duration-300 hover:-translate-y-2 border border-white/60"
          >
            {/* Decorative overlay disabled (zellige paused) */}
            
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              {/* Icon avec gradient */}
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-green-emerald to-green-vibrant flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-4 ring-white/10">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-display group-hover:text-green-vibrant transition-colors">
                Je suis propriétaire
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Publiez vos annonces gratuitement et touchons des milliers d'acheteurs
              </p>
              
              {/* XXL CTA Button - Vert success v5.1 */}
              <div className="mt-auto w-full">
                <div className="h-16 px-12 rounded-xl bg-green-vibrant flex items-center justify-center gap-3 text-white font-bold text-xl shadow-2xl group-hover:shadow-[0_10px_40px_-10px_rgba(5,150,105,0.6)] group-hover:scale-105 transition-all duration-300">
                  S'inscrire
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Border vert au hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-vibrant/40 transition-colors duration-300 pointer-events-none" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
