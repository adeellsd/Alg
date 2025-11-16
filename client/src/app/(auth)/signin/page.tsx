"use client";

import { Authenticator, Heading, View, useTheme, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthenticator } from '@aws-amplify/ui-react';

const components = {
    Header() {
        const { tokens } = useTheme();
        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Heading level={3}>
                    Bienvenue sur <span style={{ color: '#059669' }}>RentAlg</span>
                </Heading>
                <Text color={tokens.colors.font.secondary}>
                    Connectez-vous pour continuer
                </Text>
            </View>
        );
    },
    Footer() {
        const { tokens } = useTheme();
        return (
            <View textAlign="center" padding={tokens.space.medium}>
                <Text color={tokens.colors.font.secondary}>
                    Vous n'avez pas de compte?{' '}
                    <Link href="/signup" style={{ color: '#0891B2', fontWeight: 600 }}>
                        Créer un compte
                    </Link>
                </Text>
            </View>
        );
    },
};

const formFields = {
    signIn: {
        username: {
            placeholder: 'Nom d\'utilisateur, email ou téléphone',
            isRequired: true,
            label: 'Identifiant',
        },
        password: {
            placeholder: 'Entrez votre mot de passe',
            isRequired: true,
            label: 'Mot de passe',
        },
    },
};

export default function SignInPage() {
    const router = useRouter();
    const { route } = useAuthenticator((context) => [context.route]);

    if (route === 'authenticated') {
        router.push('/landing');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <Link 
                        href="/landing" 
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-2"
                    >
                        ← Retour à l'accueil
                    </Link>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                    <Authenticator
                        initialState="signIn"
                        hideSignUp={true}
                        components={components}
                        formFields={formFields}
                    >
                        {({ signOut, user }) => null}
                    </Authenticator>
                </div>
            </div>
        </div>
    );
}
