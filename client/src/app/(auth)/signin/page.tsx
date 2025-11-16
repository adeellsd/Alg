"use client";

import { Authenticator, useAuthenticator, ThemeProvider, Theme } from "@aws-amplify/ui-react";
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
          10: "#E0F2FE",
          20: "#BAE6FD",
          40: "#7DD3FC",
          60: "#38BDF8",
          80: "#0891B2",
          90: "#0369A1",
          100: "#075985",
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
  signIn: {
    username: {
      label: "Adresse email",
      placeholder: "votre.email@example.com",
    },
    password: {
      label: "Mot de passe",
      placeholder: "Entrez votre mot de passe",
    },
  },
  signUp: {
    email: {
      label: "Adresse email",
      placeholder: "votre.email@example.com",
      order: 1,
    },
    name: {
      label: "Nom complet",
      placeholder: "Jean Dupont",
      order: 2,
    },
    password: {
      label: "Mot de passe",
      placeholder: "Créez un mot de passe sécurisé",
      order: 3,
    },
    confirm_password: {
      label: "Confirmer le mot de passe",
      placeholder: "Confirmez votre mot de passe",
      order: 4,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: "Entrez votre nouveau mot de passe",
    },
  },
  forgotPassword: {
    username: {
      placeholder: "Entrez votre adresse email",
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: "Entrez votre code de confirmation",
      label: "Code de confirmation",
    },
    password: {
      placeholder: "Entrez votre nouveau mot de passe",
    },
    confirm_password: {
      placeholder: "Confirmez votre nouveau mot de passe",
    },
  },
};

const components = {
  Header() {
    return (
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          Bienvenue sur RentAlg
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Connectez-vous pour continuer
        </p>
      </div>
    );
  },
  Footer() {
    return (
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          En vous connectant, vous acceptez nos{" "}
          <Link
            href="/terms"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
          >
            conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    );
  },
};

function SignInContent() {
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
          initialState="signIn"
          hideSignUp={true}
        />
      </ThemeProvider>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Vous n&apos;avez pas de compte?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Authenticator.Provider>
      <SignInContent />
    </Authenticator.Provider>
  );
}
