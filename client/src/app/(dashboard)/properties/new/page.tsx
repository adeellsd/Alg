"use client";

import React from 'react';
import { motion } from 'framer-motion';

const NewPropertyPageParticulier = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Publier une <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">annonce</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Vendez ou louez votre bien immobilier gratuitement
          </p>

          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-blue">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚧 Formulaire de publication en construction
            </h2>
            <p className="text-gray-600 mb-6">
              Le formulaire de publication d'annonce sera bientôt disponible.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Étapes à venir :</h3>
              <ul className="space-y-2 text-gray-700">
                <li>1️⃣ Type de bien et transaction (Vente/Location)</li>
                <li>2️⃣ Localisation et adresse</li>
                <li>3️⃣ Caractéristiques (Surface, Chambres, etc.)</li>
                <li>4️⃣ Photos de votre bien</li>
                <li>5️⃣ Description détaillée</li>
                <li>6️⃣ Prix et contact</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewPropertyPageParticulier;
