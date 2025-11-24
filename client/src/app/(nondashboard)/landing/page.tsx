"use client";

import React from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { fetchUserAttributes } from 'aws-amplify/auth'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import DiscoverSection from './DiscoverSection'
import CTASection from './CTASection'

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
      {/* Masquer la section CTA si l'utilisateur est connecté */}
      {!user && <CTASection />}
    </div>
  )
}

export default Landing
