/**
 * FeaturesSection.tsx
 * Design System v5.1 "Alger Vibrante Refined"
 * 
 * Section features avec background beige Casbah inspiré de l'architecture algéroise.
 * 
 * @colors
 * - Background: beige-casbah (couleur du design system)
 * - Icon backgrounds: blue-electric, green-vibrant, coral
 * - Cards: bg-white avec border subtile
 * 
 * @patterns
 * - Aucun pattern décoratif (clean, performant)
 * 
 * @version 5.1 - Alger Authentique
 */

"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, Upload, Briefcase, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.1,
      delayChildren: 0.1 
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4
    } 
  }
};

const features = [
  {
    icon: Search,
    title: "Recherche intelligente",
    description: "Trouvez votre bien idéal grâce à nos filtres avancés par localisation, prix, type et caractéristiques.",
    linkText: "Découvrir",
    linkHref: "/properties",
    iconBg: "bg-blue-electric"
  },
  {
    icon: Upload,
    title: "Publication gratuite",
    description: "Publiez votre annonce en quelques minutes avec photos, localisation et description détaillée.",
    linkText: "Publier",
    linkHref: "/post-listing",
    iconBg: "bg-green-vibrant"
  },
  {
    icon: Briefcase,
    title: "Outils professionnels",
    description: "Solutions complètes pour agences : gestion centralisée, statistiques et options de boost.",
    linkText: "En savoir plus",
    linkHref: "/pro",
    iconBg: "bg-coral"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-beige-casbah overflow-hidden">
      {/* Subtle gradient wash to add depth over beige background */}
  <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-sable/60 via-transparent to-beige-casbah/70" />
      
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={containerVariants} 
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header moderne et minimaliste */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tout pour réussir votre{' '}
              <span className="bg-linear-to-r from-blue-electric to-turquoise-mer bg-clip-text text-transparent">
                projet immobilier
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Une plateforme conçue pour simplifier vos démarches en Algérie
            </p>
          </motion.div>
        </div>

        {/* Grid moderne avec cards épurées */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
            >
              <Link href={feature.linkHref}>
                <div className="group h-full bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                  
                  <div className="relative z-10">
                    {/* Icon circulaire moderne */}
                    <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md ring-4 ring-black/5`}>
                      <feature.icon className="w-7 h-7 text-white drop-shadow-sm" strokeWidth={2.5} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* CTA avec animation */}
                    <div className="inline-flex items-center gap-2 font-semibold text-blue-electric transition-all duration-200">
                      {feature.linkText}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Decorative fade to connect with next section */}
  <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-beige-casbah to-transparent" />
    </section>
  )
}

export default FeaturesSection
