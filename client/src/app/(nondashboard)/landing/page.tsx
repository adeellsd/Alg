"use client";

import React from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { fetchUserAttributes } from 'aws-amplify/auth'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import DiscoverSection from './DiscoverSection'
import CTASection from './CTASection'
import { PropertyCard } from "@/components/ui/property-card"
import { Button } from "@/components/ui/button"

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
      
      {/* Properties Preview */}
      <section className="py-20 bg-blue-pale/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">Dernières Annonces</h2>
              <p className="text-gray-600">Découvrez les biens les plus récents sur le marché.</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-blue-electric text-blue-electric hover:bg-blue-pale">Voir tout</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <PropertyCard 
                key={item}
                variant={item === 2 ? "elite" : "standard"}
                title="Villa Moderne F4"
                location="Hydra, Alger"
                price="85,000"
                badge={item === 2 ? "ELITE" : "STARTER"}
                badgeVariant={item === 2 ? "premium" : "default"}
                rooms={4}
                surface={150}
                bathrooms={2}
                image="/placeholder.jpg"
              />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
             <Button variant="outline" className="w-full border-blue-electric text-blue-electric hover:bg-blue-pale">Voir tout</Button>
          </div>
        </div>
      </section>
      
      {/* Masquer la section CTA si l'utilisateur est connecté */}
      {!user && <CTASection />}
    </div>
  )
}

export default Landing
