/**
 * Navbar Component - RentAlg Design System v6.0
 * Fresh, Modern & Clean Navigation
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
      <header
        className="fixed left-0 top-0 z-50 w-full"
        style={{ height: `${NAVBAR_HEIGHT}px` }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
          <nav
            className={cn(
              "flex h-16 items-center justify-between px-6 rounded-2xl transition-all duration-500 ease-in-out",
              isScrolled
                ? "bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] border border-white/40"
                : "bg-white/30 backdrop-blur-xl border border-white/20"
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span
                className={cn(
                  "text-xl font-bold transition-colors duration-200",
                  isScrolled ? "text-slate-900" : "text-slate-900"
                )}
              >
                Rent<span className={cn("transition-colors duration-200", isScrolled ? "text-primary-600" : "text-primary-500")}>Alg</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-primary-500/10 text-primary-700 backdrop-blur-sm"
                      : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {!isAuthPage && (
                <div className="hidden md:flex items-center gap-3">
                  {!user ? (
                    <>
                      <Link href="/signin">
                        <Button
                          variant="ghost"
                          className="text-slate-700 hover:text-slate-900 hover:bg-slate-900/5"
                        >
                          Connexion
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button>Inscription</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={getPublishLink()}>
                        <Button className="gap-2">
                          <Plus className="size-4" />
                          Publier
                        </Button>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="gap-2 px-2 hover:bg-slate-900/5"
                          >
                            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-500 text-sm font-bold text-white">
                              {user.username?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <ChevronDown className="size-4 text-slate-600" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="w-56 bg-white border-slate-200 shadow-xl rounded-xl"
                        >
                          <DropdownMenuLabel className="font-semibold text-slate-900">
                            Mon compte
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {userMenuItems.map((item) => (
                            <DropdownMenuItem key={item.href} asChild>
                              <Link
                                href={item.href}
                                className="flex cursor-pointer items-center gap-3 text-slate-600 hover:text-primary-600"
                              >
                                <item.icon className="size-4" />
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem asChild>
                            <Link
                              href="/profile"
                              className="flex cursor-pointer items-center gap-3 text-slate-600 hover:text-primary-600"
                            >
                              <User className="size-4" />
                              Profil
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link
                              href="/settings"
                              className="flex cursor-pointer items-center gap-3 text-slate-600 hover:text-primary-600"
                            >
                              <Settings className="size-4" />
                              Paramètres
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={handleSignOut}
                            className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex size-10 items-center justify-center rounded-xl transition-all duration-200 lg:hidden text-slate-700 hover:bg-slate-900/5"
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
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
