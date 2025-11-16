"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { MapPin, MessageCircle, Key } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
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
      duration: 0.6
    } 
  }
};

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "Recherchez sur la carte",
    description: "Explorez les biens disponibles avec notre carte interactive. Filtres avancés par localisation, prix, surface et caractéristiques pour trouver exactement ce que vous cherchez.",
    gradient: "from-blue-electric via-blue-bright to-blue-sky",
    iconBg: "bg-blue-pale",
    iconColor: "text-blue-electric"
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Contactez le propriétaire",
    description: "Échangez directement avec les propriétaires ou agences. Posez vos questions, planifiez des visites et négociez en toute simplicité via notre messagerie sécurisée.",
    gradient: "from-green-vibrant via-green-fresh to-green-emerald",
    iconBg: "bg-green-pale",
    iconColor: "text-green-vibrant"
  },
  {
    icon: Key,
    number: "03",
    title: "Concrétisez votre projet",
    description: "Emménagez dans votre nouveau chez-vous, lancez votre activité ou démarrez votre projet immobilier. Votre nouvelle vie commence ici.",
    gradient: "from-coral via-coral-light to-amber",
    iconBg: "bg-coral-pale",
    iconColor: "text-coral"
  }
];

const DiscoverSection = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(209, 250, 229, 0.4) 0%, rgba(209, 250, 229, 0.2) 50%, #ffffff 100%)' }}>
      {/* Pattern différent - Cercles au lieu de carrés */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310B981' fill-opacity='1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='0' cy='0' r='3'/%3E%3Ccircle cx='0' cy='80' r='3'/%3E%3Ccircle cx='80' cy='0' r='3'/%3E%3Ccircle cx='80' cy='80' r='3'/%3E%3Ccircle cx='40' cy='0' r='2'/%3E%3Ccircle cx='0' cy='40' r='2'/%3E%3Ccircle cx='40' cy='80' r='2'/%3E%3Ccircle cx='80' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-pale/50 border border-green-vibrant/20 text-green-vibrant font-semibold text-sm">
              🚀 Comment ça marche
            </span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className='space-y-4'
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight text-gray-900">
              Trouvez votre bien en
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-electric via-blue-bright to-green-vibrant"> 3 étapes</span>
            </h2>
            <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto'>
              De la recherche à l'emménagement, nous vous accompagnons à chaque étape
            </p>
          </motion.div>
        </div>

        {/* Timeline des étapes */}
        <div className="relative">
          {/* Ligne de connexion (desktop) */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-electric via-green-vibrant to-coral opacity-20" 
               style={{ width: 'calc(100% - 200px)', left: '100px' }} 
          />

          {/* Grille de cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const StepCard = ({
  icon: Icon,
  number,
  title,
  description,
  gradient,
  iconBg,
  iconColor,
  index
}: {
  icon: any;
  number: string;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  index: number;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
    >
      {/* Card container */}
      <div className="relative h-full bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-electric/30 overflow-hidden">
        
        {/* Gradient background subtil */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Numéro de l'étape en grand (background) */}
        <div className="absolute -top-4 -right-4 text-[120px] font-bold text-gray-100 leading-none pointer-events-none">
          {number}
        </div>

        {/* Contenu */}
        <div className="relative z-10 space-y-6">
          {/* Icône */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${iconBg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={2.5} />
          </div>

          {/* Titre */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-sm font-bold ${iconColor}`}>
                ÉTAPE {number}
              </span>
            </div>
            <h3 className="text-2xl font-bold font-display text-gray-900 group-hover:text-blue-electric transition-colors duration-300">
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>

          {/* Indicateur de progression */}
          <div className="flex items-center gap-2 pt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i <= index 
                    ? `bg-gradient-to-r ${gradient} flex-1` 
                    : 'bg-gray-200 flex-1'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flèche de connexion (visible sur desktop uniquement) */}
        {index < 2 && (
          <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
            <div className={`w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-md`}>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DiscoverSection;