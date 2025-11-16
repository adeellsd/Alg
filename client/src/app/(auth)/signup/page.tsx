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
                    Créer un compte <span style={{ color: '#059669' }}>RentAlg</span>
                </Heading>
                <Text color={tokens.colors.font.secondary}>
                    Rejoignez notre communauté
                </Text>
            </View>
        );
    },
    Footer() {
        const { tokens } = useTheme();
        return (
            <View textAlign="center" padding={tokens.space.medium}>
                <Text color={tokens.colors.font.secondary}>
                    Vous avez déjà un compte?{' '}
                    <Link href="/signin" style={{ color: '#059669', fontWeight: 600 }}>
                        Se connecter
                    </Link>
                </Text>
            </View>
        );
    },
};

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: 'Nom d\'utilisateur',
            isRequired: true,
            label: 'Nom d\'utilisateur',
        },
        email: {
            order: 2,
            placeholder: 'Votre adresse email',
            isRequired: true,
            label: 'Email',
        },
        phone_number: {
            order: 3,
            placeholder: '+213 XX XX XX XX XX',
            isRequired: false,
            label: 'Téléphone (optionnel)',
            dialCode: '+213',
        },
        password: {
            order: 4,
            placeholder: 'Créez un mot de passe sécurisé',
            isRequired: true,
            label: 'Mot de passe',
        },
        confirm_password: {
            order: 5,
            placeholder: 'Confirmez votre mot de passe',
            isRequired: true,
            label: 'Confirmer le mot de passe',
        },
    },
};

export default function SignUpPage() {
    const router = useRouter();
    const { route } = useAuthenticator((context) => [context.route]);

    if (route === 'authenticated') {
        router.push('/landing');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <Link 
                        href="/landing" 
                        className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center gap-2"
                    >
                        ← Retour à l'accueil
                    </Link>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                    <Authenticator
                        initialState="signUp"
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
