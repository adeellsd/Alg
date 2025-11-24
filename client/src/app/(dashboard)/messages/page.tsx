"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">Messages</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gérez vos conversations avec les propriétaires et visiteurs
          </p>

          <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-blue text-center">
            <div className="w-20 h-20 bg-blue-electric/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-blue-electric" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚧 Messagerie en construction
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Le système de messagerie sera bientôt disponible pour communiquer en temps réel avec vos contacts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MessagesPage;
