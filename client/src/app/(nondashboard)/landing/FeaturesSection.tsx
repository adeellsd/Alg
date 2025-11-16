"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Search, Upload, Briefcase } from 'lucide-react';

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
    gradient: "from-blue-electric via-blue-bright to-blue-sky",
    accentColor: "blue-electric"
  },
  {
    icon: Upload,
    title: "Publication gratuite",
    description: "Créez votre annonce en quelques minutes avec photos, localisation précise et description détaillée. Visibilité garantie.",
    linkText: "Publier gratuitement",
    linkHref: "/post-listing",
    gradient: "from-green-vibrant via-green-fresh to-green-emerald",
    accentColor: "green-vibrant"
  },
  {
    icon: Briefcase,
    title: "Outils professionnels",
    description: "Solutions complètes pour agences immobilières et promoteurs : gestion centralisée, statistiques détaillées et options de mise en avant.",
    linkText: "En savoir plus",
    linkHref: "/pro",
    gradient: "from-fuchsia via-fuchsia-light to-coral",
    accentColor: "fuchsia"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative pb-0 pt-20 sm:pt-24 lg:pt-32 overflow-hidden bg-gradient-to-b from-white via-blue-pale/30 to-blue-pale/50">
      {/* Pattern géométrique carrés */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230891B2' fill-opacity='1'%3E%3Cpath d='M30 0h10v10h-10zm10 10h10v10h-10zm-10 10h10v10h-10zm-10 10h10v10h-10zm10 10h10v10h-10zm10 10h10v10h-10z'/%3E%3Cpath d='M0 30h10v10h-10zm10 10h10v10h-10zm10-10h10v10h-10zm10-10h10v10h-10zm10 10h10v10h-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={containerVariants} 
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-32"
      >
        {/* En-tête de section */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div 
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-pale/50 border border-blue-electric/20 text-blue-electric font-semibold text-sm">
              ✨ Pourquoi nous choisir
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4 leading-tight"
          >
            Tout ce dont vous avez besoin
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-electric via-blue-bright to-green-vibrant">
              pour réussir votre projet
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Une plateforme complète et intuitive pour tous vos besoins immobiliers
          </motion.p>
        </div>

        {/* Grille de features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Vague de transition fluide */}
      <div className="relative w-full h-32 sm:h-40 lg:h-48 -mt-1">
        <svg 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Vague arrière (plus claire) */}
          <path 
            d="M0,96 C360,160 720,64 1080,128 C1320,160 1440,96 1440,96 L1440,320 L0,320 Z" 
            fill="#D1FAE5"
            fillOpacity="0.6"
          />
          {/* Vague avant qui se termine exactement sur le bg de DiscoverSection */}
          <path 
            d="M0,160 C320,224 640,128 960,160 C1280,192 1440,160 1440,160 L1440,320 L0,320 Z" 
            fill="rgba(209, 250, 229, 0.4)"
          />
        </svg>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
  gradient,
  accentColor,
  index
}: {
  icon: any;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  gradient: string;
  accentColor: string;
  index: number;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Card container */}
      <div className="relative h-full bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-electric/30 overflow-hidden">
        
        {/* Gradient background animé au hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Icône avec gradient */}
        <div className="relative mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Contenu */}
        <div className="relative space-y-4">
          <h3 className="text-xl font-bold font-display text-gray-900 group-hover:text-blue-electric transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>

          {/* CTA Link */}
          <Link 
            href={linkHref} 
            className={`inline-flex items-center gap-2 text-${accentColor} font-semibold group/link hover:gap-3 transition-all duration-300`}
            scroll={false}
          >
            {linkText}
            <svg 
              className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Badge numéro */}
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm group-hover:bg-blue-pale group-hover:text-blue-electric transition-all duration-300">
          {index + 1}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
