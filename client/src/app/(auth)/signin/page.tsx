"use client";
import Link from "next/link";
import { ArrowLeft, Sparkles, Home, TrendingUp, Shield } from "lucide-react";
import CustomSignIn from "@/components/auth/CustomSignIn";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex overflow-hidden bg-white">
      {/* Pattern Khatam background subtil */}
      <div className="fixed inset-0 pattern-khatam opacity-[0.015] pointer-events-none" />
      
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-turquoise-mer/20 to-blue-electric/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-vert-emeraude/15 to-vert-vibrant/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-blue-pale/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side - Branding & Hero avec design v5.0 */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-electric via-turquoise-mer to-blue-bright p-12 flex-col justify-between overflow-hidden">
        {/* Pattern floral overlay */}
        <div className="absolute inset-0 pattern-floral opacity-[0.08] mix-blend-overlay" />
        
        {/* Decorative Zellige Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 border-2 border-white/50 rounded-full pattern-border-zellige"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 border-2 border-white/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
        </div>

        {/* Logo avec glassmorphism */}
        <Link href="/landing" className="relative z-10 flex items-center gap-3 group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:border-white/60 transition-all duration-300 group-hover:scale-105 shadow-lg">
            <Home className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-4xl font-bold font-display text-white leading-none drop-shadow-lg">
            RENT<span className="text-or">ALG</span>
          </div>
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg">
              <Sparkles className="w-4 h-4 text-or animate-pulse" />
              <span className="text-sm font-bold text-white">Plateforme N°1 en Algérie</span>
            </div>
            
            <h1 className="text-5xl font-bold font-display text-white leading-tight drop-shadow-2xl">
              Bienvenue sur<br />
              <span className="text-or drop-shadow-lg">RENTALG</span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-md font-medium">
              Trouvez votre bien immobilier de rêve en Algérie. Des milliers d'annonces vérifiées vous attendent.
            </p>
          </div>

          {/* Stats avec glassmorphism */}
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            <div className="space-y-1 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white">12K+</div>
              <div className="text-sm text-white/80 font-medium">Propriétés</div>
            </div>
            <div className="space-y-1 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white">5K+</div>
              <div className="text-sm text-white/80 font-medium">Utilisateurs</div>
            </div>
            <div className="space-y-1 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-white/80 font-medium">Satisfaction</div>
            </div>
          </div>

          {/* Features avec nouveau style */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3 text-white p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-vert-emeraude to-vert-vibrant shadow-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold">Annonces vérifiées et sécurisées</span>
            </div>
            <div className="flex items-center gap-3 text-white p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-or to-orange-brulant shadow-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold">Prix compétitifs et transparents</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-white/70 font-medium">
          © 2025 RENTALG. Tous droits réservés.
        </div>
      </div>

      {/* Right Side - Auth Form avec glassmorphism */}
      <div className="relative flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md relative z-10">
          {/* Back Button avec nouveau style */}
          <Link 
            href="/landing"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-electric mb-8 group transition-all duration-200 font-semibold"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-pale flex items-center justify-center transition-all duration-200">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-sm">Retour à l'accueil</span>
          </Link>

          {/* Mobile Logo avec gradient */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/landing" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-turquoise-mer to-blue-electric flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-200">
                <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-3xl font-bold font-display leading-none">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-turquoise-mer">RENT</span>
                <span className="text-or">ALG</span>
              </div>
            </Link>
          </div>

          {/* Header avec gradient */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold font-display mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-turquoise-mer">
                Connexion
              </span>
            </h2>
            <p className="text-gray-600 text-base font-medium">
              Accédez à votre compte pour gérer vos biens
            </p>
          </div>

          {/* Auth Card avec glassmorphism amélioré */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-electric/10 border border-gray-200/50 p-8 overflow-hidden group hover:shadow-2xl hover:shadow-blue-electric/20 transition-all duration-300">
            {/* Pattern overlay subtil */}
            <div className="absolute inset-0 pattern-geometric opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />
            
            <div className="relative z-10">
              <CustomSignIn />
            </div>
          </div>

          {/* Footer Links avec nouveau style */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-blue-electric transition-colors font-medium">
              Conditions d'utilisation
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/privacy" className="hover:text-blue-electric transition-colors font-medium">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
