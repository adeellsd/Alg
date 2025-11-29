/**
 * Footer Component - RentAlg Design System v6.0
 * Fresh, Modern & Clean
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
  ArrowRight,
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
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-6 inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Rent<span className="text-primary-400">Alg</span>
              </span>
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              La plateforme immobilière moderne pour trouver votre bien idéal en Algérie.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-200 hover:bg-primary-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-200 hover:bg-primary-600 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-200 hover:bg-primary-600 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Catégories
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400" />
                <span>Alger, Algérie</span>
              </li>
              <li>
                <a
                  href="tel:+213000000000"
                  className="flex items-start gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-primary-400"
                >
                  <Phone className="w-4 h-4 mt-0.5" />
                  <span>+213 (0) 00 00 00 00</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@rentalg.dz"
                  className="flex items-start gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-primary-400"
                >
                  <Mail className="w-4 h-4 mt-0.5" />
                  <span>contact@rentalg.dz</span>
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="rounded-xl bg-slate-800 p-5">
              <h4 className="mb-3 text-sm font-semibold text-white">
                Newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="h-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button size="icon" className="shrink-0">
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-8 sm:flex-row">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {new Date().getFullYear()} RentAlg. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-slate-500 transition-colors duration-200 hover:text-primary-400"
            >
              Confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 transition-colors duration-200 hover:text-primary-400"
            >
              CGU
            </Link>
            <Link
              href="/cookies"
              className="text-slate-500 transition-colors duration-200 hover:text-primary-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
