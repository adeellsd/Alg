/**
 * NavbarAlgerGlass - Navigation "Alger Authentique v5.1 Refined"
 * 
 * @features
 * - Glassmorphism pur (effet verre dépoli)
 * - Logo avec icône bleue Méditerranée
 * - RentAlg branding simple et élégant
 * - Navigation links sobres
 * - CTA button bleu électrique (pas de gradient)
 * - User dropdown menu raffiné
 * - Mobile menu integration
 * 
 * @states
 * - Default: Transparent
 * - Scrolled: Glass blanc avec blur 20px
 * 
 * @palette
 * - 🌊 Bleu: blue-electric (principal), turquoise-mer (accents)
 * - 🏛️ Beige: beige-casbah (hover backgrounds)
 * - 🌿 Vert: green-vibrant (success states)
 * - NO gradients dorés
 * 
 * @version 5.1 - Refined & Elegant
 */
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthenticator } from "@aws-amplify/ui-react"
import { fetchUserAttributes } from "aws-amplify/auth"
import { NAVBAR_HEIGHT } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import MobileMenu from "./MobileMenu"
import {
  Menu,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  MessageSquare,
  Heart,
  Bell,
  ChevronDown,
  Plus,
  Home,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()
  const { user, signOut } = useAuthenticator((context) => [context.user])

  const isAuthPage = pathname === "/signin" || pathname === "/signup"

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = "/landing"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  useEffect(() => {
    const getUserRole = async () => {
      if (user) {
        try {
          const attributes = await fetchUserAttributes()
          setUserRole(attributes["custom:role"] || null)
        } catch (error) {
          console.error("Error fetching user attributes:", error)
        }
      } else {
        setUserRole(null)
      }
    }
    getUserRole()
  }, [user])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/properties", label: "Annonces" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ]

  const getDashboardLink = () => {
    if (!user || !userRole) return "/dashboard"
    return userRole === "Professionnel" ? "/pro" : "/particulier"
  }

  const getPublishLink = () => {
    if (!user || !userRole) return "/properties/new"
    return userRole === "Professionnel" ? "/pro/properties/new" : "/properties/new"
  }

  const userMenuItems = user
    ? [
        { href: getDashboardLink(), label: "Dashboard", icon: LayoutDashboard },
        { href: "/messages", label: "Messages", icon: MessageSquare },
        { href: "/favorites", label: "Favoris", icon: Heart },
        { href: "/notifications", label: "Notifications", icon: Bell },
      ]
    : []

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Fixed Navbar moderne - Blanc au scroll */}
      <header
        className="fixed left-0 top-0 z-50 w-full px-6 pt-4"
        style={{ height: `${NAVBAR_HEIGHT}px` }}
      >
        <nav className={cn(
          "mx-auto flex h-full max-w-[1400px] items-center px-8 transition-all duration-500 rounded-4xl",
          isScrolled ? "bg-white/70 backdrop-blur-xl shadow-lg border border-gray-200/60" : "bg-transparent"
        )}>
          <div className="flex h-20 w-full items-center justify-between">
            
            {/* LEFT: Navigation Links (Desktop) */}
            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-200 group",
                    isScrolled ? "text-gray-700 hover:text-blue-electric" : "text-white/90 hover:text-white",
                    isActive(item.href) && "font-semibold text-blue-electric"
                  )}
                >
                  {item.label}
                  {/* Underline bleu électrique */}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-blue-electric transition-all duration-300",
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}
            </div>

            {/* CENTER: Logo moderne avec forme arrondie */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              {/* Logo bleu Méditerranée avec forme circulaire parfaite */}
              <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-electric to-turquoise-mer flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 ring-4 ring-white/10">
                <Home className="w-5 h-5 text-white" />
              </div>
              {/* Branding RentAlg moderne et minimaliste */}
              <span className={cn(
                "text-xl font-bold font-display transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                Rent<span className="text-blue-electric">Alg</span>
              </span>
            </Link>

            {/* RIGHT: Auth & Actions */}
            <div className="flex items-center gap-4">
              {!isAuthPage && (
                <div className="hidden items-center gap-4 md:flex">
                  {!user ? (
                    <>
                      <Link href="/signin">
                        <Button 
                          variant="ghost" 
                          className={cn(
                            "transition-colors",
                            isScrolled ? "text-gray-700 hover:text-gray-900 hover:bg-beige-casbah/50" : "text-white hover:bg-white/20"
                          )}
                        >
                          Connexion
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button variant="default" className="bg-blue-electric hover:bg-blue-deep text-white font-semibold shadow-blue">
                          Inscription
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* CTA Publier bleu électrique */}
                      <Link href={getPublishLink()}>
                        <Button variant="default" className="gap-2 bg-blue-electric hover:bg-blue-deep text-white font-semibold shadow-blue">
                          <Plus className="size-4" />
                          Publier une annonce
                        </Button>
                      </Link>

                      {/* User Dropdown avec style raffiné */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "gap-2 px-3 transition-colors",
                              isScrolled ? "hover:bg-beige-casbah/50" : "hover:bg-white/20"
                            )}
                          >
                            <div className="flex size-10 items-center justify-center rounded-full bg-blue-electric text-sm font-bold text-white shadow-md">
                              {user.username?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <ChevronDown className={cn(
                              "size-4 transition-colors",
                              isScrolled ? "text-gray-500" : "text-white/80"
                            )} />
                          </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-56 glass-white-strong border-gray-200 shadow-xl rounded-lg">
                          <DropdownMenuLabel className="font-semibold text-gray-900">
                            Mon compte
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-200" />

                          {userMenuItems.map((item) => (
                            <DropdownMenuItem key={item.href} asChild className="rounded-sm focus:bg-beige-casbah/50">
                              <Link
                                href={item.href}
                                className="flex cursor-pointer items-center gap-3 text-gray-700 hover:text-blue-electric"
                              >
                                <item.icon className="size-4" />
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator className="bg-gray-200" />

                          <DropdownMenuItem asChild className="rounded-sm focus:bg-beige-casbah/50">
                            <Link
                              href="/profile"
                              className="flex cursor-pointer items-center gap-3 text-gray-700 hover:text-blue-electric"
                            >
                              <User className="size-4" />
                              Profil
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild className="rounded-sm focus:bg-beige-casbah/50">
                            <Link
                              href="/settings"
                              className="flex cursor-pointer items-center gap-3 text-gray-700 hover:text-blue-electric"
                            >
                              <Settings className="size-4" />
                              Paramètres
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-gray-200" />

                          <DropdownMenuItem
                            onClick={handleSignOut}
                            className="cursor-pointer rounded-sm text-terracotta-fonce focus:bg-red-50 focus:text-terracotta-fonce hover:bg-red-50"
                          >
                            <LogOut className="mr-3 size-4" />
                            Déconnexion
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              )}

              {/* Mobile Menu Button sobre */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-all duration-200 lg:hidden",
                  isScrolled 
                    ? "text-gray-700 hover:bg-beige-casbah/50 hover:text-blue-electric" 
                    : "text-white hover:bg-white/20"
                )}
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        userMenuItems={userMenuItems}
        pathname={pathname}
        user={user}
        signOut={handleSignOut}
        isAuthPage={isAuthPage}
      />
    </>
  )
}