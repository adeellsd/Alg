"use client";

import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';

// Configure Amplify once
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

/**
 * AuthProvider - Simple wrapper to ensure Amplify is configured
 * This component doesn't render any UI, it just ensures Amplify Auth is configured
 * The actual sign in/sign up forms are in CustomSignIn and CustomSignUp components
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log('✅ Amplify Auth configured');
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
