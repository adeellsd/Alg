/**
 * MobileMenuGlass - Menu mobile "Alger Authentique v5.0"
 * 
 * @features
 * - Glassmorphism overlay full-screen
 * - Drawer avec pattern Zellige
 * - Slide animations fluides
 * - Links avec spacing généreux
 * - Close button doré
 * - CTA gradient doré
 * 
 * @palette
 * - Background: gradient beige + glassmorphism
 * - Overlay: bg-black/50 backdrop-blur
 * - Active: bleu électrique blue-electric
 * - CTA: gradient doré or → orange-brulant
 * 
 * @version 5.0 - Alger Authentique
 */
"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  X,
  Home,
  Building2,
  Info,
  Mail,
  LogOut,
  User,
  Settings,
  Plus,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
}

interface UserMenuItem {
  href: string
  label: string
  icon: LucideIcon
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  userMenuItems: UserMenuItem[]
  pathname: string
  user: { username?: string } | null | undefined
  signOut: () => void
  isAuthPage: boolean
}

const iconMap: Record<string, LucideIcon> = {
  "/": Home,
  "/properties": Building2,
  "/about": Info,
  "/contact": Mail,
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  userMenuItems,
  pathname,
  user,
  signOut,
  isAuthPage,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Overlay avec glassmorphism */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-linear-to-br from-black/60 to-black/40 backdrop-blur-md transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer avec effet glass et pattern Zellige */}
      <div
        className={cn(
          "fixed right-0 top-0 z-[70] h-full w-full max-w-md transform bg-linear-to-br from-sable/95 to-beige-casbah/95 backdrop-blur-2xl border-l-2 border-or/30 shadow-2xl transition-all duration-300 ease-out overflow-hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {/* Pattern Zellige background */}
        <div className="absolute inset-0 pattern-khatam opacity-[0.03] pointer-events-none" />
        
        {/* Header avec gradient */}
        <div className="relative flex items-center justify-between border-b-2 border-or/20 p-6 bg-gradient-to-r from-sable to-beige-casbah">
          <div className="flex items-center gap-3">
            {/* Logo avec pattern */}
            <div className="relative">
              <div className="absolute inset-0 pattern-khatam opacity-20 scale-125" />
              <div className="relative flex size-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-blue-electric to-turquoise-mer shadow-lg">
                <Home className="size-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold font-display">
              Rent<span className="text-or">Alg</span>
            </span>
          </div>

          {/* Close button doré */}
          <button
            onClick={onClose}
            className="flex size-12 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm text-gray-700 transition-all duration-200 hover:bg-or hover:text-white hover:scale-110 shadow-md"
            aria-label="Fermer le menu"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-[calc(100%-6rem)] flex-col">
          {/* Navigation Links avec spacing généreux */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-6">
            {/* Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 rounded-[14px] px-5 py-4 text-base font-semibold transition-all duration-200",
                isActive("/")
                  ? "bg-gradient-to-r from-blue-electric/20 to-turquoise-mer/20 text-blue-electric shadow-md"
                  : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
              )}
            >
              <Home className="size-5" />
              Accueil
            </Link>

            {/* Nav Items */}
            {navItems.map((item) => {
              const Icon = iconMap[item.href] || Building2
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 rounded-[14px] px-5 py-4 text-base font-semibold transition-all duration-200",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-electric/20 to-turquoise-mer/20 text-blue-electric shadow-md"
                      : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                  )}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              )
            })}

            {/* User Menu (Authenticated) */}
            {user && userMenuItems.length > 0 && (
              <>
                <div className="pb-2 pt-6">
                  <p className="px-5 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Mon Espace
                  </p>
                </div>

                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-4 rounded-[14px] px-5 py-4 text-base font-semibold transition-all duration-200",
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-electric/20 to-turquoise-mer/20 text-blue-electric shadow-md"
                        : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/profile"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 rounded-[14px] px-5 py-4 text-base font-semibold transition-all duration-200",
                    isActive("/profile")
                      ? "bg-gradient-to-r from-blue-electric/20 to-turquoise-mer/20 text-blue-electric shadow-md"
                      : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                  )}
                >
                  <User className="size-5" />
                  Profil
                </Link>

                <Link
                  href="/settings"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 rounded-[14px] px-5 py-4 text-base font-semibold transition-all duration-200",
                    isActive("/settings")
                      ? "bg-gradient-to-r from-blue-electric/20 to-turquoise-mer/20 text-blue-electric shadow-md"
                      : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                  )}
                >
                  <Settings className="size-5" />
                  Paramètres
                </Link>
              </>
            )}
          </nav>

          {/* Footer CTA avec gradient doré */}
          {!isAuthPage && (
            <div className="space-y-3 border-t-2 border-or/20 p-6 bg-gradient-to-r from-sable to-beige-casbah">
              {!user ? (
                <>
                  <Link href="/signin" onClick={onClose} className="block">
                    <Button variant="outline" className="w-full h-12 text-base font-semibold border-2 border-gray-300 hover:border-blue-electric hover:text-blue-electric">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={onClose} className="block">
                    <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-or to-orange-brulant text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      Inscription
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/properties/new"
                    onClick={onClose}
                    className="block"
                  >
                    <Button className="w-full h-12 gap-2 text-base font-semibold bg-gradient-to-r from-or to-orange-brulant text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      <Plus className="size-5" />
                      Publier une annonce
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut()
                      onClose()
                    }}
                    className="w-full h-12 gap-2 text-base font-semibold text-terracotta-fonce hover:bg-red-50 hover:text-terracotta-fonce"
                  >
                    <LogOut className="size-5" />
                    Déconnexion
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}