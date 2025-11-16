"use client";

import React from 'react';
import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
            loginWith: {
                username: true,
                email: true,
                phone: true,
            },
        },
    },
});

const Auth = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Ensure Amplify is configured
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
                userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
                loginWith: {
                    username: true,
                    email: true,
                    phone: true,
                },
            },
        },
    }, { ssr: true });
  }, []);

  return <>{children}</>;
}

export default Auth;
