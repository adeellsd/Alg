"use client";

import React from 'react';
import { motion } from 'framer-motion';

const NewPropertyPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-pale/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Créer une <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">nouvelle annonce</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Publiez votre bien immobilier en quelques étapes simples
          </p>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚧 Formulaire de création en construction
            </h2>
            <p className="text-gray-600 mb-6">
              Le formulaire de création d'annonce sera bientôt disponible.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Étapes à venir :</h3>
              <ul className="space-y-2 text-gray-700">
                <li>1️⃣ Informations générales (Type, Prix, Surface)</li>
                <li>2️⃣ Localisation (Wilaya, Commune, Adresse)</li>
                <li>3️⃣ Détails du bien (Chambres, Salles de bain, etc.)</li>
                <li>4️⃣ Photos et médias</li>
                <li>5️⃣ Description et équipements</li>
                <li>6️⃣ Publication</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewPropertyPage;
