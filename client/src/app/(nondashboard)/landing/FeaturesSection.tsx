"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, Upload, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      staggerChildren: 0.15,
      delayChildren: 0.2 
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5
    } 
  }
};

const features = [
  {
    icon: Search,
    title: "Recherche intelligente",
    description: "Filtres avancés par localisation, prix, type de bien et caractéristiques. Interface intuitive pour trouver exactement ce que vous cherchez.",
    linkText: "Découvrir",
    linkHref: "/search",
    color: "blue-electric",
    bg: "bg-blue-pale",
    text: "text-blue-electric"
  },
  {
    icon: Upload,
    title: "Publication gratuite",
    description: "Créez votre annonce en quelques minutes avec photos, localisation précise et description détaillée. Visibilité garantie.",
    linkText: "Publier gratuitement",
    linkHref: "/post-listing",
    color: "green-vibrant",
    bg: "bg-green-pale",
    text: "text-green-vibrant"
  },
  {
    icon: Briefcase,
    title: "Outils professionnels",
    description: "Solutions complètes pour agences immobilières et promoteurs : gestion centralisée, statistiques détaillées et options de mise en avant.",
    linkText: "En savoir plus",
    linkHref: "/pro",
    color: "coral",
    bg: "bg-coral-pale",
    text: "text-coral"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-off-white">
      {/* Pattern zellige subtil */}
      <div className="absolute inset-0 zellige-bg opacity-5" />

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={containerVariants} 
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* En-tête de section */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div 
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-pale text-blue-electric font-semibold text-sm border border-blue-electric/20">
              ✨ Pourquoi nous choisir
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6 leading-tight"
          >
            Tout ce dont vous avez besoin <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">
              pour votre projet immobilier
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Une plateforme conçue pour simplifier vos démarches et sécuriser vos transactions en Algérie.
          </motion.p>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-none shadow-blue hover:shadow-xl transition-all duration-300 bg-white rounded-xl group overflow-hidden">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.text}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed grow">
                    {feature.description}
                  </p>
                  
                  <Link 
                    href={feature.linkHref}
                    className={`inline-flex items-center gap-2 font-semibold ${feature.text} group-hover:gap-3 transition-all`}
                  >
                    {feature.linkText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default FeaturesSection
