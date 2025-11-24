"use client";
import Link from "next/link";
import { ArrowLeft, Sparkles, Home, Users, CheckCircle2, Star } from "lucide-react";
import CustomSignUp from "@/components/auth/CustomSignUp";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-linear-to-br from-gray-50 via-green-50/30 to-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-vibrant/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-electric/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-green-fresh/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side - Branding & Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-electric to-blue-deep p-12 flex-col justify-between overflow-hidden zellige-bg">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-2 border-white rounded-full"></div>
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
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-semibold text-white">Inscription gratuite</span>
            </div>
            
            <h1 className="text-5xl font-bold text-white leading-tight">
              Commencez votre<br />
              <span className="text-blue-bright">aventure immobilière</span>
            </h1>
            
            <p className="text-xl text-green-100 leading-relaxed max-w-md">
              Rejoignez des milliers d'utilisateurs qui ont trouvé leur bien idéal sur RENTALG.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-start gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">Créez votre profil en 2 minutes</div>
                <div className="text-sm text-green-100">Simple, rapide et sécurisé</div>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">Publiez gratuitement vos annonces</div>
                <div className="text-sm text-green-100">Sans commission ni frais cachés</div>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">Accédez à des milliers d'offres</div>
                <div className="text-sm text-green-100">Actualisées quotidiennement</div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border-2 border-green-vibrant flex items-center justify-center"
                >
                  <Users className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div className="text-white">
              <div className="font-bold">5,000+ utilisateurs</div>
              <div className="text-sm text-green-100">nous font confiance</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-green-100">
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
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-vibrant to-green-fresh flex items-center justify-center shadow-lg">
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
              Créer un compte
            </h2>
            <p className="text-gray-600">
              Commencez gratuitement dès aujourd'hui
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <CustomSignUp />
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
