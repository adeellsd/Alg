'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Home, Building2, Info, Mail, LogOut, User, Settings, LayoutDashboard, MessageSquare, Heart, Bell, Plus } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
}

interface UserMenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  userMenuItems: UserMenuItem[];
  pathname: string;
  user: any;
  signOut: () => void;
  isAuthPage: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems, userMenuItems, pathname, user, signOut, isAuthPage }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Icons mapping
  const iconMap: Record<string, React.ReactNode> = {
    '/': <Home className="w-5 h-5" />,
    '/properties': <Building2 className="w-5 h-5" />,
    '/about': <Info className="w-5 h-5" />,
    '/contact': <Mail className="w-5 h-5" />,
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Overlay avec effet glass */}
      <div 
        className={`
          fixed inset-0 
          bg-blue-electric/20 backdrop-blur-md
          z-[60]
          transition-all duration-400
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
        style={{
          backdropFilter: 'blur(12px) saturate(120%)',
          WebkitBackdropFilter: 'blur(12px) saturate(120%)',
        }}
      />

      {/* Drawer avec effet glass */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96
          bg-white/80 backdrop-blur-3xl
          border-l border-white/30
          shadow-[-8px_0_32px_rgba(8,145,178,0.15)]
          z-[70]
          transform transition-all duration-400 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        {/* Header avec gradient */}
        <div 
          className="
            flex items-center justify-between 
            p-6 
            border-b border-white/30
            relative overflow-hidden
          "
        >
          {/* Gradient background header */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 50%, #38BDF8 100%)',
            }}
          />
          
          <div className="flex items-center gap-3 relative z-10">
            {/* Logo */}
            <div className="
              w-10 h-10 rounded-full 
              bg-gradient-to-br from-blue-electric via-blue-bright to-blue-sky
              flex items-center justify-center 
              shadow-sm
            ">
              <svg 
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M9 22V12H15V22" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            {/* Brand text */}
            <div className="text-xl font-bold font-display leading-none">
              <span className="
                text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-electric to-blue-bright
              ">
                RENT
              </span>
              <span className="
                text-transparent bg-clip-text 
                bg-gradient-to-r from-green-vibrant to-green-fresh
              ">
                ALG
              </span>
            </div>
          </div>

          {/* Close button avec effet glass */}
          <button
            onClick={onClose}
            className="
              relative z-10
              p-2 rounded-full
              text-gray-600 hover:text-gray-900
              bg-white/20 hover:bg-white/40
              backdrop-blur-sm
              border border-white/30
              transition-all duration-200
              focus:outline-none 
            "
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

          {/* Navigation Content */}
        <div className="flex flex-col h-[calc(100%-5rem)]">
          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {/* Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className={`
                flex items-center gap-4 
                px-4 py-3.5 rounded-xl
                font-semibold text-base
                backdrop-blur-sm
                border
                transition-all duration-200
                ${isActive('/') 
                  ? 'bg-blue-electric/10 text-blue-electric border-blue-electric/30 shadow-sm' 
                  : 'bg-white/20 text-gray-700 border-white/30 hover:bg-white/40'
                }
              `}
            >
              <Home className="w-5 h-5" />
              <span>Accueil</span>
            </Link>

            {/* Dynamic Nav Items */}
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-4 
                  px-4 py-3.5 rounded-xl
                  font-semibold text-base
                  backdrop-blur-sm
                  border
                  transition-all duration-200
                  ${isActive(item.href)
                    ? 'bg-blue-electric/10 text-blue-electric border-blue-electric/30 shadow-sm'
                    : 'bg-white/20 text-gray-700 border-white/30 hover:bg-white/40'
                  }
                `}
                style={{
                  animationDelay: `${(index + 1) * 50}ms`,
                }}
              >
                {iconMap[item.href]}
                <span>{item.label}</span>
              </Link>
            ))}

            {/* User Menu Items (if authenticated) */}
            {user && userMenuItems.length > 0 && (
              <>
                <div className="pt-4 pb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">
                    Mon Espace
                  </p>
                </div>
                {userMenuItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-4 
                      px-4 py-3.5 rounded-xl
                      font-semibold text-base
                      backdrop-blur-sm
                      border
                      transition-all duration-200
                      ${isActive(item.href)
                        ? 'bg-blue-electric/10 text-blue-electric border-blue-electric/30 shadow-sm'
                        : 'bg-white/20 text-gray-700 border-white/30 hover:bg-white/40'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}

                <Link
                  href="/profile"
                  onClick={onClose}
                  className={`
                    flex items-center gap-4 
                    px-4 py-3.5 rounded-xl
                    font-semibold text-base
                    backdrop-blur-sm
                    border
                    transition-all duration-200
                    ${isActive('/profile')
                      ? 'bg-blue-electric/10 text-blue-electric border-blue-electric/30 shadow-sm'
                      : 'bg-white/20 text-gray-700 border-white/30 hover:bg-white/40'
                    }
                  `}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={onClose}
                  className={`
                    flex items-center gap-4 
                    px-4 py-3.5 rounded-xl
                    font-semibold text-base
                    backdrop-blur-sm
                    border
                    transition-all duration-200
                    ${isActive('/settings')
                      ? 'bg-blue-electric/10 text-blue-electric border-blue-electric/30 shadow-sm'
                      : 'bg-white/20 text-gray-700 border-white/30 hover:bg-white/40'
                    }
                  `}
                >
                  <Settings className="w-5 h-5" />
                  <span>Paramètres</span>
                </Link>
              </>
            )}

            {/* Tagline avec gradient */}
            {!user && (
              <div 
                className="
                  mt-8 p-4 rounded-xl
                  backdrop-blur-sm
                  border border-white/30
                  relative overflow-hidden
                "
              >
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'linear-gradient(135deg, #0891B2 0%, #38BDF8 100%)',
                  }}
                />
                <p className="text-sm font-display font-medium text-gray-700 text-center leading-relaxed relative z-10">
                  Trouve ton bien de rêve en Algérie
                </p>
              </div>
            )}
          </nav>          {/* CTA Buttons (Bottom) avec effet glass */}
          {!isAuthPage && (
            <div 
              className="
                p-6 
                border-t border-white/30 
                space-y-3
                backdrop-blur-sm
                bg-white/10
              "
            >
              {!user ? (
                <>
                  <Link href="/signin" onClick={onClose} className="block">
                    <Button 
                      variant="ghost"
                      className="
                        w-full py-3
                        text-gray-700 font-semibold
                        bg-white/20 hover:bg-white/40
                        backdrop-blur-sm
                        border border-white/30
                        rounded-full
                        transition-all duration-200
                      "
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={onClose} className="block">
                    <Button 
                      className="
                        w-full py-3
                        bg-gradient-to-r from-green-vibrant to-green-fresh
                        text-white font-bold
                        rounded-full
                        shadow-md hover:shadow-green
                        transition-all duration-200
                        hover:scale-[1.02]
                        border border-green-vibrant/20
                      "
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/properties/new" onClick={onClose} className="block">
                    <Button 
                      className="
                        w-full py-3
                        bg-gradient-to-r from-green-vibrant to-green-fresh
                        text-white font-bold
                        rounded-full
                        shadow-md hover:shadow-green
                        transition-all duration-200
                        hover:scale-[1.02]
                        flex items-center justify-center gap-2
                      "
                    >
                      <Plus className="w-4 h-4" />
                      Publier une annonce
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    variant="ghost"
                    className="
                      w-full py-3
                      text-red-600 font-semibold
                      bg-white/20 hover:bg-red-50
                      backdrop-blur-sm
                      border border-white/30
                      rounded-full
                      transition-all duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;