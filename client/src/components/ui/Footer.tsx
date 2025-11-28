/**
 * FooterCasbah - Footer "Alger Authentique v5.1 Refined"
 * 
 * @features
 * - Pattern checkers background subtil
 * - Sections avec gradient beige
 * - Links avec hover bleu turquoise
 * - Social icons: bleu Méditerranée (pas de fuchsia/or)
 * - Newsletter avec style glassmorphism + CTA vert
 * - Accent bar: beige Casbah (pas de gradient doré)
 * 
 * @palette
 * - 🌊 Bleu: blue-electric, turquoise-mer (social, links)
 * - 🏛️ Beige: beige-casbah (backgrounds, accents)
 * - 🌿 Vert: green-vibrant (success actions)
 * - NO gradients dorés (theme Alger uniquement)
 * 
 * @version 5.1 - Refined & Elegant
 */
"use client"

import React from "react"
import Link from "next/link"
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Home,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Rechercher", href: "/properties" },
  { label: "Publier une annonce", href: "/post-listing" },
  { label: "Solutions Pro", href: "/pro" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const categoryLinks = [
  { label: "Appartements", href: "/properties?type=apartment" },
  { label: "Maisons", href: "/properties?type=house" },
  { label: "Villas", href: "/properties?type=villa" },
  { label: "Terrains", href: "/properties?type=land" },
  { label: "Locaux commerciaux", href: "/properties?type=commercial" },
  { label: "Bureaux", href: "/properties?type=office" },
]

export default function Footer() {
  return (
    <footer className="relative bg-linear-to-br from-beige-casbah via-sable to-beige-chaud overflow-hidden">
      
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-20">
          {/* Brand Section avec pattern Zellige */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-6 inline-flex items-center gap-3 group">
              {/* Logo avec pattern */}
              <div className="relative">
                <div className="relative flex size-12 items-center justify-center rounded-lg bg-linear-to-br from-blue-electric to-turquoise-mer shadow-lg transition-all duration-200 group-hover:scale-105 ring-4 ring-white/10">
                  <Home className="size-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold font-display">
                Rent<span className="text-or">Alg</span>
              </span>
            </Link>

            <p className="mb-6 text-base leading-relaxed text-gray-700">
              La plateforme immobilière premium qui célèbre la beauté d'Alger
            </p>

            {/* Social Links avec gradient */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-blue-electric to-turquoise-mer text-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-blue-electric to-turquoise-mer text-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-turquoise-mer to-blue-sky text-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 font-medium transition-colors duration-200 hover:text-blue-electric hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Catégories
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 font-medium transition-colors duration-200 hover:text-blue-electric hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact
            </h3>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-electric to-turquoise-mer flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="mt-1">Alger, Algérie</span>
              </li>
              <li>
                <a
                  href="tel:+213000000000"
                  className="flex items-start gap-3 text-sm text-gray-700 transition-all duration-200 hover:text-blue-electric group"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-vibrant to-green-emerald flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="mt-1">+213 (0) 00 00 00 00</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@rentalg.dz"
                  className="flex items-start gap-3 text-sm text-gray-700 transition-all duration-200 hover:text-blue-electric group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-electric flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="mt-1">contact@rentalg.dz</span>
                </a>
              </li>
            </ul>

            {/* Newsletter avec glassmorphism */}
            <div className="relative rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 p-5 shadow-lg">
              <h4 className="mb-4 text-sm font-semibold text-gray-900">
                Newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="h-11 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500"
                />
                <Button variant="success" className="size-11 shrink-0 hover:scale-105 transition-transform">
                  <Mail className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-300/50 py-8 sm:flex-row">
          <p className="text-center text-sm text-gray-600 sm:text-left">
            © {new Date().getFullYear()} RentAlg. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-600 font-medium transition-colors duration-200 hover:text-blue-electric"
            >
              Confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 font-medium transition-colors duration-200 hover:text-blue-electric"
            >
              CGU
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 font-medium transition-colors duration-200 hover:text-blue-electric"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Accent Bar Beige Casbah */}
      <div className="h-2 bg-beige-casbah" />
    </footer>
  )
}