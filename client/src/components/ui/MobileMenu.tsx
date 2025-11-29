/**
 * MobileMenu Component - RentAlg Design System v6.0
 * Fresh, Modern & Clean Mobile Navigation
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
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-[70] h-full w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Rent<span className="text-primary-500">Alg</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-5rem)] flex-col">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {/* Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive("/")
                  ? "bg-primary-50 text-primary-600"
                  : "text-slate-600 hover:bg-slate-100"
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
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-600"
                      : "text-slate-600 hover:bg-slate-100"
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
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Mon Espace
                  </p>
                </div>

                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-600"
                        : "text-slate-600 hover:bg-slate-100"
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
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive("/profile")
                      ? "bg-primary-50 text-primary-600"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <User className="size-5" />
                  Profil
                </Link>

                <Link
                  href="/settings"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive("/settings")
                      ? "bg-primary-50 text-primary-600"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Settings className="size-5" />
                  Paramètres
                </Link>
              </>
            )}
          </nav>

          {/* Footer CTA */}
          {!isAuthPage && (
            <div className="space-y-2 border-t border-slate-200 p-4">
              {!user ? (
                <>
                  <Link href="/signin" onClick={onClose} className="block">
                    <Button variant="outline" className="w-full">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={onClose} className="block">
                    <Button className="w-full">
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
                    <Button className="w-full gap-2">
                      <Plus className="size-4" />
                      Publier une annonce
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut()
                      onClose()
                    }}
                    className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="size-4" />
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
