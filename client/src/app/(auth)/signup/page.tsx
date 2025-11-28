"use client";
import Link from "next/link";
import { ArrowLeft, Sparkles, Home, Users, CheckCircle2, Star } from "lucide-react";
import CustomSignUp from "@/components/auth/CustomSignUp";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex overflow-hidden bg-white">
      {/* Pattern Arabesque background subtil */}
      <div className="fixed inset-0 pattern-arabesque opacity-[0.015] pointer-events-none" />
      
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-linear-to-br from-vert-emeraude/20 to-vert-vibrant/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-linear-to-br from-turquoise-mer/20 to-blue-electric/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-green-pale/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side - Branding & Hero avec design v5.0 */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-vert-vibrant via-vert-emeraude to-turquoise-mer p-12 flex-col justify-between overflow-hidden">
        {/* Pattern hexagons overlay */}
        <div className="absolute inset-0 pattern-hexagons opacity-[0.08] mix-blend-overlay" />
        
        {/* Decorative Zellige Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 border-2 border-white/50 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-2 border-white/30 rounded-full"></div>
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
              <Star className="w-4 h-4 text-or fill-or animate-pulse" />
              <span className="text-sm font-bold text-white">Inscription gratuite</span>
            </div>
            
            <h1 className="text-5xl font-bold font-display text-white leading-tight drop-shadow-2xl">
              Commencez votre<br />
              <span className="text-or drop-shadow-lg">aventure immobilière</span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-md font-medium">
              Rejoignez des milliers d'utilisateurs qui ont trouvé leur bien idéal sur RENTALG.
            </p>
          </div>

          {/* Benefits avec glassmorphism */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-start gap-4 text-white p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-electric to-turquoise-mer shadow-lg flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Créez votre profil en 2 minutes</div>
                <div className="text-sm text-white/80 font-medium">Simple, rapide et sécurisé</div>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-or to-orange-brulant shadow-lg flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Publiez gratuitement vos annonces</div>
                <div className="text-sm text-white/80 font-medium">Sans commission ni frais cachés</div>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-purple-700 shadow-lg flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Accédez à des milliers d'offres</div>
                <div className="text-sm text-white/80 font-medium">Actualisées quotidiennement</div>
              </div>
            </div>
          </div>

          {/* Social Proof avec glassmorphism */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white flex items-center justify-center shadow-lg"
                >
                  <Users className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">5,000+ utilisateurs</div>
              <div className="text-sm text-white/80 font-medium">nous font confiance</div>
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
            className="inline-flex items-center gap-2 text-gray-600 hover:text-vert-vibrant mb-8 group transition-all duration-200 font-semibold"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-green-pale flex items-center justify-center transition-all duration-200">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="text-sm">Retour à l'accueil</span>
          </Link>

          {/* Mobile Logo avec gradient */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/landing" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-vert-vibrant to-vert-emeraude flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-200">
                <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-3xl font-bold font-display leading-none">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-vert-vibrant to-vert-emeraude">RENT</span>
                <span className="text-or">ALG</span>
              </div>
            </Link>
          </div>

          {/* Header avec gradient */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold font-display mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-vert-vibrant to-vert-emeraude">
                Créer un compte
              </span>
            </h2>
            <p className="text-gray-600 text-base font-medium">
              Commencez gratuitement dès aujourd'hui
            </p>
          </div>

          {/* Auth Card avec glassmorphism amélioré */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-vert-vibrant/10 border border-gray-200/50 p-8 overflow-hidden group hover:shadow-2xl hover:shadow-vert-vibrant/20 transition-all duration-300">
            {/* Pattern overlay subtil */}
            <div className="absolute inset-0 pattern-hexagons opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />
            
            <div className="relative z-10">
              <CustomSignUp />
            </div>
          </div>

          {/* Footer Links avec nouveau style */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-vert-vibrant transition-colors font-medium">
              Conditions d'utilisation
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/privacy" className="hover:text-vert-vibrant transition-colors font-medium">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
