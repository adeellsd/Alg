/**
 * CTASection - RentAlg Design System v6.0
 * Fresh, Modern & Clean CTA Section
 */

"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="py-24 sm:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-700 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Prêt à trouver votre{' '}
            <span className="text-teal-300">chez-vous idéal ?</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-lg sm:text-xl text-white/80"
          >
            Que vous cherchiez à louer, acheter ou investir, RentAlg vous accompagne à chaque étape.
          </motion.p>
        </div>

        {/* CTA Cards */}
        <motion.div 
          variants={itemVariants} 
          className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {/* Card 1: Je cherche un bien */}
          <Link 
            href="/properties" 
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Je cherche un bien
              </h3>
              
              <p className="text-slate-600 mb-8">
                Parcourez des milliers d'annonces vérifiées à travers toute l'Algérie
              </p>
              
              <Button size="lg" className="mt-auto w-full gap-2">
                Commencer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>

          {/* Card 2: Je suis propriétaire */}
          <Link 
            href="/signup" 
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-8 h-8 text-teal-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Je suis propriétaire
              </h3>
              
              <p className="text-slate-600 mb-8">
                Publiez vos annonces gratuitement et touchez des milliers d'acheteurs
              </p>
              
              <Button size="lg" variant="secondary" className="mt-auto w-full gap-2">
                S'inscrire
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
