/**
 * DiscoverSection.tsx
 * Design System v5.1 "Alger Vibrante Refined"
 * 
 * Section "Comment ça marche" avec timeline moderne,
 * cards épurées et numérotation claire sur fond blanc.
 * 
 * @version 5.1 - Refined & Modern
 */

"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Key } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
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
      duration: 0.5
    } 
  }
};

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "Recherchez",
    description: "Explorez les biens disponibles avec nos filtres avancés par localisation, prix et caractéristiques.",
    iconColor: "bg-blue-electric",
    numberColor: "text-blue-electric"
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Contactez",
    description: "Échangez directement avec les propriétaires. Posez vos questions et planifiez vos visites.",
    iconColor: "bg-green-vibrant",
    numberColor: "text-green-vibrant"
  },
  {
    icon: Key,
    number: "03",
    title: "Concrétisez",
    description: "Emménagez dans votre nouveau chez-vous. Votre nouvelle vie commence ici.",
    iconColor: "bg-coral",
    numberColor: "text-coral"
  }
];

const DiscoverSection = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-white">
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comment <span className="text-blue-electric">ça marche</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              De la recherche à l'emménagement, en 3 étapes simples
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Ligne de connexion desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-100 z-0" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="relative bg-white rounded-2xl p-8 text-center">
                  {/* Numéro grand et visible */}
                  <div className={`text-6xl font-bold ${step.numberColor} opacity-20 mb-4`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${step.iconColor} flex items-center justify-center mx-auto mb-6 shadow-md`}>
                    <step.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DiscoverSection;
