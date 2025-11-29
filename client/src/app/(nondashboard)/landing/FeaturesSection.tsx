/**
 * FeaturesSection - RentAlg Design System v6.0
 * Fresh, Modern & Clean Features Display
 */

"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, Upload, Briefcase, ArrowRight, Shield, Clock, Users } from 'lucide-react';

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
    description: "Trouvez votre bien idéal grâce à nos filtres avancés par localisation, prix et caractéristiques.",
    linkText: "Découvrir",
    linkHref: "/properties",
    color: "primary"
  },
  {
    icon: Upload,
    title: "Publication gratuite",
    description: "Publiez votre annonce en quelques minutes avec photos et description détaillée.",
    linkText: "Publier",
    linkHref: "/post-listing",
    color: "teal"
  },
  {
    icon: Briefcase,
    title: "Outils professionnels",
    description: "Solutions complètes pour agences : gestion centralisée et options de visibilité.",
    linkText: "En savoir plus",
    linkHref: "/pro",
    color: "orange"
  }
];

const stats = [
  { icon: Shield, value: "100%", label: "Annonces vérifiées" },
  { icon: Clock, value: "24h", label: "Mise en ligne rapide" },
  { icon: Users, value: "58", label: "Wilayas couvertes" },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={containerVariants} 
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Tout pour réussir votre{' '}
              <span className="text-primary-600">projet immobilier</span>
            </h2>
            <p className="text-lg text-slate-600">
              Une plateforme conçue pour simplifier vos démarches en Algérie
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={feature.linkHref}>
                <div className="group h-full bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                    feature.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                    feature.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <feature.icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 font-semibold text-primary-600 group-hover:gap-3 transition-all duration-200">
                    {feature.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-slate-50">
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary-600" />
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FeaturesSection
