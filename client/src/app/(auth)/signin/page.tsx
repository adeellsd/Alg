"use client";
import Link from "next/link";
import { ArrowLeft, Sparkles, Home, TrendingUp, Shield } from "lucide-react";
import CustomSignIn from "@/components/auth/CustomSignIn";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-linear-to-br from-gray-50 via-blue-50/30 to-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-electric/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-vibrant/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-blue-bright/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side - Branding & Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-electric to-blue-deep p-12 flex-col justify-between overflow-hidden zellige-bg">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/50 rounded-full"></div>
        </div>

        {/* Logo */}
        <Link href="/landing" className="relative z-10 flex items-center gap-3 group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
            <Home className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-4xl font-bold font-display text-white leading-none">
            RENTALG
          </div>
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Plateforme N°1 en Algérie</span>
            </div>
            
            <h1 className="text-5xl font-bold text-white leading-tight">
              Bienvenue sur<br />
              <span className="text-green-fresh">RENTALG</span>
            </h1>
            
            <p className="text-xl text-blue-100 leading-relaxed max-w-md">
              Trouvez votre bien immobilier de rêve en Algérie. Des milliers d'annonces vérifiées vous attendent.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">12K+</div>
              <div className="text-sm text-blue-100">Propriétés</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">5K+</div>
              <div className="text-sm text-blue-100">Utilisateurs</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-blue-100">Satisfaction</div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Annonces vérifiées et sécurisées</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Prix compétitifs et transparents</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-blue-100">
          © 2025 RENTALG. Tous droits réservés.
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md relative">
          {/* Back Button */}
          <Link 
            href="/landing"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour à l'accueil</span>
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/landing" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-electric to-blue-bright flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-3xl font-bold font-display leading-none">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">RENT</span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-vibrant to-green-fresh">ALG</span>
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Connexion
            </h2>
            <p className="text-gray-600">
              Accédez à votre compte pour gérer vos biens
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <CustomSignIn />
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Conditions d'utilisation
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
