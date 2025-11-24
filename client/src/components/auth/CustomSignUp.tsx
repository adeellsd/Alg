"use client";

import React, { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export default function CustomSignUp() {
  const router = useRouter();
  const [step, setStep] = useState<'signup' | 'confirm'>('signup');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Particulier',
  });
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);

    try {
      await signUp({
        username: formData.username,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            'custom:role': formData.role,
          },
        },
      });

      setStep('confirm');
    } catch (err: any) {
      console.error('Error signing up:', err);
      
      if (err.name === 'UsernameExistsException') {
        setError('Ce nom d\'utilisateur est déjà pris');
      } else if (err.name === 'InvalidPasswordException') {
        setError('Le mot de passe doit contenir au moins 8 caractères avec majuscules, minuscules et chiffres');
      } else if (err.name === 'InvalidParameterException') {
        setError('Email invalide');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp({
        username: formData.username,
        confirmationCode: confirmationCode,
      });

      // Redirect to sign in after successful confirmation
      router.push('/signin?confirmed=true');
    } catch (err: any) {
      console.error('Error confirming sign up:', err);
      
      if (err.name === 'CodeMismatchException') {
        setError('Code de vérification incorrect');
      } else if (err.name === 'ExpiredCodeException') {
        setError('Le code a expiré. Demandez un nouveau code.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Vérifiez votre email</h3>
          <p className="text-gray-600">
            Nous avons envoyé un code de vérification à<br />
            <span className="font-semibold text-gray-900">{formData.email}</span>
          </p>
        </div>

        <form onSubmit={handleConfirmSignUp} className="space-y-5">
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm font-semibold text-gray-700">
              Code de vérification
            </Label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="h-12 text-center text-2xl tracking-widest border-2 border-gray-200 focus:border-green-vibrant focus:ring-4 focus:ring-green-vibrant/10 transition-all"
              required
              maxLength={6}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-linear-to-r from-green-vibrant to-green-fresh hover:from-green-fresh hover:to-green-soft text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Vérification...
              </>
            ) : (
              'Confirmer mon compte'
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Vous n'avez pas reçu le code ?{' '}
            <button
              type="button"
              className="font-semibold text-green-vibrant hover:text-green-fresh transition-colors"
            >
              Renvoyer
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-5">
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium animate-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
          Nom d'utilisateur
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="username"
            type="text"
            placeholder="nom_utilisateur"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="pl-11 h-12 border-2 border-gray-200 focus:border-green-vibrant focus:ring-4 focus:ring-green-vibrant/10 transition-all"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="votre-email@exemple.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-11 h-12 border-2 border-gray-200 focus:border-green-vibrant focus:ring-4 focus:ring-green-vibrant/10 transition-all"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
          Mot de passe
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-11 pr-11 h-12 border-2 border-gray-200 focus:border-green-vibrant focus:ring-4 focus:ring-green-vibrant/10 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Minimum 8 caractères avec majuscules, minuscules et chiffres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
          Confirmer le mot de passe
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="pl-11 pr-11 h-12 border-2 border-gray-200 focus:border-green-vibrant focus:ring-4 focus:ring-green-vibrant/10 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-700">Type de compte</Label>
        <RadioGroup
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
          className="space-y-3"
        >
          <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-vibrant hover:bg-green-50/50 transition-all cursor-pointer">
            <RadioGroupItem value="Particulier" id="particulier" className="mt-1" />
            <Label htmlFor="particulier" className="flex-1 cursor-pointer">
              <div className="font-semibold text-gray-900">Particulier</div>
              <div className="text-sm text-gray-600">Pour chercher ou louer un bien</div>
            </Label>
          </div>
          <div className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-vibrant hover:bg-green-50/50 transition-all cursor-pointer">
            <RadioGroupItem value="Professionnel" id="professionnel" className="mt-1" />
            <Label htmlFor="professionnel" className="flex-1 cursor-pointer">
              <div className="font-semibold text-gray-900">Professionnel</div>
              <div className="text-sm text-gray-600">Pour publier des annonces professionnelles</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-linear-to-r from-green-vibrant to-green-fresh hover:from-green-fresh hover:to-green-soft text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Création du compte...
          </>
        ) : (
          'Créer mon compte'
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">Déjà inscrit ?</span>
        </div>
      </div>

      <Link href="/signin">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 border-2 border-gray-200 hover:border-green-vibrant hover:bg-green-50 font-semibold text-gray-700 hover:text-green-vibrant rounded-xl transition-all duration-300"
        >
          Se connecter à mon compte
        </Button>
      </Link>
    </form>
  );
}
