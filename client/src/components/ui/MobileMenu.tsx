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
          "fixed inset-0 z-[60] bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-md transition-all duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-[70] h-full w-full max-w-sm transform transition-all duration-500 ease-out",
          "bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 backdrop-blur-2xl",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border-l border-white/20",
          "m-2 mr-0 mb-0 mt-0 rounded-l-[32px]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/50 p-6 backdrop-blur-xl bg-white/40">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-primary-500 via-primary-400 to-teal-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Rent<span className="bg-gradient-to-r from-primary-500 to-teal-500 bg-clip-text text-transparent">Alg</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-[14px] text-slate-600 hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-50 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Fermer le menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-5rem)] flex-col">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto p-5">
            {/* Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3.5 rounded-[16px] px-5 py-3.5 text-sm font-medium transition-all duration-200",
                isActive("/")
                  ? "bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/60 hover:backdrop-blur-xl hover:shadow-md active:scale-95"
              )}
            >
              <div className={cn(
                "p-2 rounded-[10px] transition-colors",
                isActive("/") ? "bg-white/20" : "bg-slate-100"
              )}>
                <Home className="size-4" />
              </div>
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
                    "flex items-center gap-3.5 rounded-[16px] px-5 py-3.5 text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]"
                      : "text-slate-700 hover:bg-white/60 hover:backdrop-blur-xl hover:shadow-md active:scale-95"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-[10px] transition-colors",
                    isActive(item.href) ? "bg-white/20" : "bg-slate-100"
                  )}>
                    <Icon className="size-4" />
                  </div>
                  {item.label}
                </Link>
              )
            })}

            {/* User Menu (Authenticated) */}
            {user && userMenuItems.length > 0 && (
              <>
                <div className="pt-6 pb-3 px-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4" />
                  <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Mon Espace
                  </p>
                </div>

                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3.5 rounded-[16px] px-5 py-3.5 text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]"
                        : "text-slate-700 hover:bg-white/60 hover:backdrop-blur-xl hover:shadow-md active:scale-95"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-[10px] transition-colors",
                      isActive(item.href) ? "bg-white/20" : "bg-slate-100"
                    )}>
                      <item.icon className="size-4" />
                    </div>
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/profile"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3.5 rounded-[16px] px-5 py-3.5 text-sm font-medium transition-all duration-200",
                    isActive("/profile")
                      ? "bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]"
                      : "text-slate-700 hover:bg-white/60 hover:backdrop-blur-xl hover:shadow-md active:scale-95"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-[10px] transition-colors",
                    isActive("/profile") ? "bg-white/20" : "bg-slate-100"
                  )}>
                    <User className="size-4" />
                  </div>
                  Profil
                </Link>

                <Link
                  href="/settings"
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3.5 rounded-[16px] px-5 py-3.5 text-sm font-medium transition-all duration-200",
                    isActive("/settings")
                      ? "bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]"
                      : "text-slate-700 hover:bg-white/60 hover:backdrop-blur-xl hover:shadow-md active:scale-95"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-[10px] transition-colors",
                    isActive("/settings") ? "bg-white/20" : "bg-slate-100"
                  )}>
                    <Settings className="size-4" />
                  </div>
                  Paramètres
                </Link>
              </>
            )}
          </nav>

          {/* Footer CTA */}
          {!isAuthPage && (
            <div className="space-y-3 border-t border-white/30 p-6 backdrop-blur-xl bg-gradient-to-br from-white/50 to-slate-50/50">
              {!user ? (
                <>
                  <Link href="/signin" onClick={onClose} className="block">
                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-[14px] border-2 font-semibold hover:bg-white/60 hover:backdrop-blur-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={onClose} className="block">
                    <Button className="w-full h-12 rounded-[14px] bg-gradient-to-r from-primary-500 to-teal-500 font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-95">
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
                    <Button className="w-full h-12 rounded-[14px] gap-2 bg-gradient-to-r from-primary-500 to-teal-500 font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-95">
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
                    className="w-full h-12 rounded-[14px] gap-2 text-red-600 hover:bg-red-50/80 hover:text-red-700 hover:backdrop-blur-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
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
