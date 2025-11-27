"use client";
import React from 'react'
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Pattern subtil en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M30 0h10v10h-10zm10 10h10v10h-10zm-10 10h10v10h-10zm-10 10h10v10h-10zm10 10h10v10h-10zm10 10h10v10h-10z'/%3E%3Cpath d='M0 30h10v10h-10zm10 10h10v10h-10zm10-10h10v10h-10zm10-10h10v10h-10zm10 10h10v10h-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Colonne 1: Brand + Description */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-electric via-blue-bright to-blue-sky flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-2xl font-bold font-display">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-electric to-blue-bright">
                  RENT
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-vibrant to-green-fresh">
                  ALG
                </span>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              La plateforme immobilière moderne pour trouver, louer ou acheter votre bien idéal en Algérie.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-electric flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-linear-to-br hover:from-pink-500 hover:to-orange-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2: Navigation rapide */}
          <div>
            <h3 className="text-lg font-bold font-display mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Rechercher', href: '/properties' },
                { label: 'Publier une annonce', href: '/post-listing' },
                { label: 'Solutions Pro', href: '/pro' },
                { label: 'À propos', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-electric transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-electric transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3: Catégories */}
          <div>
            <h3 className="text-lg font-bold font-display mb-6">Catégories</h3>
            <ul className="space-y-3">
              {[
                { label: 'Appartements', href: '/properties?type=apartment' },
                { label: 'Maisons', href: '/properties?type=house' },
                { label: 'Villas', href: '/properties?type=villa' },
                { label: 'Terrains', href: '/properties?type=land' },
                { label: 'Locaux commerciaux', href: '/properties?type=commercial' },
                { label: 'Bureaux', href: '/properties?type=office' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-green-vibrant transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-vibrant transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="text-lg font-bold font-display mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-electric shrink-0 mt-0.5" />
                <span>Alger, Algérie</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-green-vibrant shrink-0 mt-0.5" />
                <a href="tel:+213000000000" className="hover:text-white transition-colors">
                  +213 (0) 00 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                <a href="mailto:contact@rentalg.dz" className="hover:text-white transition-colors">
                  contact@rentalg.dz
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-electric transition-colors"
                />
                <button className="px-4 py-2 bg-linear-to-r from-blue-electric to-blue-bright rounded-lg hover:scale-105 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} RentAlg. Tous droits réservés.
          </p>
          
          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Decoration en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-electric via-green-vibrant to-coral" />
    </footer>
  );
};

export default Footer;