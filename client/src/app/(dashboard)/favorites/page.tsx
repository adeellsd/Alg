"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FavoritesPage = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mes <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">Favoris</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Retrouvez tous vos biens immobiliers favoris
          </p>

          <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-blue text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚧 Page Favoris en construction
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Cette page affichera tous les biens que vous avez sauvegardés pour y accéder facilement.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FavoritesPage;
