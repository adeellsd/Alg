"use client";

import React from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { fetchUserAttributes } from 'aws-amplify/auth'
import { motion } from 'framer-motion'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import DiscoverSection from './DiscoverSection'
import CTASection from './CTASection'
import { PropertyCard } from "@/components/ui/property-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

const Landing = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUserRole = async () => {
      if (user) {
        try {
          const attributes = await fetchUserAttributes();
          setUserRole(attributes['custom:role'] || null);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setUserRole(null);
      }
    };
    getUserRole();
  }, [user]);

  return (
    <div className="w-full">
      <HeroSection user={user} userRole={userRole} />
      <FeaturesSection />
      <DiscoverSection />
      
      {/* Properties Preview - Modern & Clean */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Dernières <span className="text-blue-electric">annonces</span>
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez les biens les plus récents
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block"
            >
              <Button 
                variant="outline" 
                className="h-12 px-6 border-2 border-gray-200 text-gray-700 hover:border-blue-electric hover:text-blue-electric font-semibold rounded-xl transition-all"
              >
                Voir tout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
          
          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PropertyCard 
                  variant={item === 2 ? "featured" : "default"}
                  title="Villa Moderne F4"
                  location="Hydra, Alger"
                  price="85,000"
                  badge={item === 2 ? "ELITE" : "STARTER"}
                  badgeVariant={item === 2 ? "default" : "secondary"}
                  rooms={4}
                  surface={150}
                  bathrooms={2}
                  image="/placeholder.jpg"
                />
              </motion.div>
            ))}
          </div>
          
          {/* CTA mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 sm:hidden"
          >
            <Button 
              variant="outline" 
              className="w-full h-12 border-2 border-gray-200 text-gray-700 hover:border-blue-electric hover:text-blue-electric font-semibold rounded-xl transition-all"
            >
              Voir tout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Masquer la section CTA si l'utilisateur est connecté */}
      {!user && <CTASection />}
    </div>
  )
}

export default Landing
