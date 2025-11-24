"use client";

import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';

export default function CustomSignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({
        username: formData.username,
        password: formData.password,
      });
      
      // Force a full page reload to ensure auth state is updated everywhere
      window.location.href = '/landing';
    } catch (err: any) {
      console.error('Error signing in:', err);
      
      if (err.name === 'UserNotConfirmedException') {
        setError('Veuillez vérifier votre email pour confirmer votre compte');
      } else if (err.name === 'NotAuthorizedException') {
        setError('Email ou mot de passe incorrect');
      } else if (err.name === 'UserNotFoundException') {
        setError('Aucun compte trouvé avec cet email');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-coral-pale border-2 border-coral text-gray-900 text-sm font-medium animate-in slide-in-from-top-2">
          {error}
        </div>
      )}

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
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="pl-11 h-12"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Mot de passe
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-electric hover:text-blue-deep transition-colors"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-11 pr-11 h-12"
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
      </div>

      <Button
        type="submit"
        disabled={loading}
        variant="default"
        size="lg"
        className="w-full h-12"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Connexion en cours...
          </>
        ) : (
          'Se connecter'
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">Nouveau sur RENTALG ?</span>
        </div>
      </div>

      <Link href="/signup">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full h-12"
        >
          Créer un compte gratuitement
        </Button>
      </Link>
    </form>
  );
}
