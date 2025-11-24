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
    <section 
      className="relative py-24 overflow-hidden"
    >
      {/* Dégradé méditerranéen - Coucher de soleil chaleureux */}
      <div className="absolute inset-0 bg-linear-to-r from-coral to-sunshine opacity-90 z-0" />
      
      {/* Pattern zellige */}
      <div className="absolute inset-0 zellige-bg opacity-10" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Rejoignez la communauté</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold font-display text-white mb-6 leading-tight">
            Prêt à trouver votre <br/>
            <span className="text-white">chez-vous idéal ?</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-white/90 mb-8 leading-relaxed">
            Que vous cherchiez à louer, acheter ou investir, RENTALG vous accompagne à chaque étape de votre projet immobilier.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link href="/search" className="group relative overflow-hidden rounded-2xl bg-white p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-full bg-white rounded-xl p-6 flex flex-col items-center text-center border border-gray-100 group-hover:border-coral/30 transition-colors">
              <div className="w-14 h-14 rounded-full bg-coral-pale flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-7 h-7 text-coral" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Je cherche un bien</h3>
              <p className="text-gray-600 mb-6 text-sm">Parcourez des milliers d'annonces vérifiées</p>
              <div className="mt-auto flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                Commencer <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link href="/signup" className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-full rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Je suis propriétaire</h3>
              <p className="text-white/80 mb-6 text-sm">Publiez vos annonces gratuitement</p>
              <div className="mt-auto flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                S'inscrire <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;