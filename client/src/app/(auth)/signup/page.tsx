"use client";

import {
  Authenticator,
  useAuthenticator,
  ThemeProvider,
  Theme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const theme: Theme = {
  name: "alger-vintage-theme",
  tokens: {
    colors: {
      brand: {
        primary: {
          10: "#D1FAE5",
          20: "#A7F3D0",
          40: "#6EE7B7",
          60: "#34D399",
          80: "#059669",
          90: "#047857",
          100: "#065F46",
        },
      },
    },
    radii: {
      small: "0.375rem",
      medium: "0.875rem",
      large: "1.25rem",
    },
  },
};

const formFields = {
  signUp: {
    email: {
      label: "Adresse email",
      placeholder: "votre.email@example.com",
      order: 1,
      isRequired: true,
    },
    name: {
      label: "Nom complet",
      placeholder: "Jean Dupont",
      order: 2,
      isRequired: true,
    },
    password: {
      label: "Mot de passe",
      placeholder: "Créez un mot de passe sécurisé (min. 8 caractères)",
      order: 3,
      isRequired: true,
    },
    confirm_password: {
      label: "Confirmer le mot de passe",
      placeholder: "Confirmez votre mot de passe",
      order: 4,
      isRequired: true,
    },
  },
  confirmSignUp: {
    confirmation_code: {
      label: "Code de confirmation",
      placeholder: "Entrez le code envoyé à votre email",
    },
  },
};

const components = {
  Header() {
    return (
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          Créer un compte
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Rejoignez RentAlg aujourd&apos;hui
        </p>
      </div>
    );
  },
  Footer() {
    return (
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          En créant un compte, vous acceptez nos{" "}
          <Link
            href="/terms"
            className="text-green-600 hover:text-green-700 dark:text-green-400 underline"
          >
            conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link
            href="/privacy"
            className="text-green-600 hover:text-green-700 dark:text-green-400 underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    );
  },
};

function SignUpContent() {
  const { route } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  useEffect(() => {
    if (route === "authenticated") {
      router.push("/landing");
    }
  }, [route, router]);

  return (
    <div className="w-full max-w-md">
      <ThemeProvider theme={theme}>
        <Authenticator
          formFields={formFields}
          components={components}
          initialState="signUp"
        />
      </ThemeProvider>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Vous avez déjà un compte?{" "}
          <Link
            href="/signin"
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold transition-colors"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Authenticator.Provider>
      <SignUpContent />
    </Authenticator.Provider>
  );
}
