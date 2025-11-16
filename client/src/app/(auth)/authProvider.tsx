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

const components = {
    Header() {
        return (
            <View className='mt-4 mb-7'>
                <Heading level={3} className='text-center'>
                    Welcome to <span className='text-green-600 font-light hover:text-primary'>RentAlg</span>
                </Heading>

                <p className='text-muted-foreground mt-2 '>
                    <span className='font-bold'>Please Sign In to continue</span>
                </p>

            </View>
        );
    },
    SignIn: {
        Footer() {
            const { toSignUp } = useAuthenticator();
            return (
                <View className='text-center mt-4'>
                    <p className='text-muted-foregrouned'>
                        Don@t have an account?{' '}
                    
                        <button onClick={toSignUp} className='text-primary hover:underline bg-transparent border-0 p-0'>Sign Up</button>
                    </p>
                </View>
        );
        },
    },
};


const formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your email',
            isRequired: true,
            label: 'Email',
        },
        password: {
            placeholder: 'Enter your password',
            isRequired: true,
            label: 'Password',
        },
    },
    signUp: {
        username: {
            order: 1,
            placeholder: 'Choose a username',
            isRequired: true,
            label: 'Email',
        },
        email: {
            order: 2,
            placeholder: 'Enter your email address',
            isRequired: true,
            label: 'Email',
        },
        password: {
            order: 3,
            placeholder: 'Create a password',
            isRequired: true,
            label: 'Password',
        },
        confirm_password: {
            order: 4,
            placeholder: 'Confirm your password',
            isRequired: true,
            label: 'Confirm Password',
        },
    }, { ssr: true });
  }, []);

  return <>{children}</>;
}

export default Auth;
