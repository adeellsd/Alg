/**
 * DiscoverSection - RentAlg Design System v6.0
 * Fresh, Modern & Clean "How it Works" Section
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
    color: "primary"
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Contactez",
    description: "Échangez directement avec les propriétaires. Posez vos questions et planifiez vos visites.",
    color: "teal"
  },
  {
    icon: Key,
    number: "03",
    title: "Concrétisez",
    description: "Emménagez dans votre nouveau chez-vous. Votre nouvelle vie commence ici.",
    color: "orange"
  }
];

const DiscoverSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-slate-50">
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
              Comment <span className="text-primary-600">ça marche</span>
            </h2>
            <p className="text-lg text-slate-600">
              De la recherche à l'emménagement, en 3 étapes simples
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[16.67%] right-[16.67%] h-0.5 bg-slate-200 z-0" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="relative bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                  {/* Step Number Badge */}
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    step.color === 'primary' ? 'bg-primary-600' :
                    step.color === 'teal' ? 'bg-teal-600' :
                    'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    step.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                    step.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <step.icon className="w-8 h-8" strokeWidth={2} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
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
