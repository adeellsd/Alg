"use client";

import React, { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing if already authenticated
    if (authStatus === 'authenticated') {
      router.push('/landing');
    }
  }, [authStatus, router]);

  // Show loading while checking auth
  if (authStatus === 'configuring') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-pale/10">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  // Don't show auth pages if already authenticated (will redirect)
  if (authStatus === 'authenticated') {
    return null;
  }

  return <>{children}</>;
}
