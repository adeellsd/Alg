"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Key, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    color: "blue-electric",
    bg: "bg-blue-pale",
    text: "text-blue-electric"
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Contactez le propriétaire",
    description: "Échangez directement avec les propriétaires ou agences. Posez vos questions, planifiez des visites et négociez en toute simplicité via notre messagerie sécurisée.",
    color: "green-vibrant",
    bg: "bg-green-pale",
    text: "text-green-vibrant"
  },
  {
    icon: Key,
    number: "03",
    title: "Concrétisez votre projet",
    description: "Emménagez dans votre nouveau chez-vous, lancez votre activité ou démarrez votre projet immobilier. Votre nouvelle vie commence ici.",
    color: "coral",
    bg: "bg-coral-pale",
    text: "text-coral"
  }
];

const DiscoverSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-pale text-green-vibrant font-semibold text-sm border border-green-vibrant/20">
              🚀 Comment ça marche
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6 leading-tight"
          >
            Trouvez votre bien en <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-green-vibrant">
              3 étapes simples
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            De la recherche à l'emménagement, nous vous accompagnons à chaque étape de votre parcours immobilier.
          </motion.p>
        </div>

        {/* Timeline des étapes */}
        <div className="relative">
          {/* Ligne de connexion (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

          {/* Grille de cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group overflow-hidden relative">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <step.icon className={`w-8 h-8 ${step.text}`} />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-400">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DiscoverSection;