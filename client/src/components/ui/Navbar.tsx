'use client';

import React, { useState, useEffect } from 'react';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { href: '/properties', label: 'Annonces' },
    { href: '/about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ];

  // Check if a link is active
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Wrapper avec padding pour l'effet floating */}
      <div 
        className="fixed top-0 left-0 w-full z-50"
        style={{ height: `${NAVBAR_HEIGHT + 16}px` }}
      >
        <nav 
          className={`
            mx-auto mt-4
            max-w-[1400px] px-4 md:px-6
            transition-all duration-500 ease-out
            relative
          `}
        >
          {/* Glow subtil optionnel en arrière-plan */}
          <div 
            className={`
              absolute inset-0
              h-16 md:h-[4.5rem]
              rounded-full
              transition-all duration-500 ease-out
              pointer-events-none
              -z-20
              px-6 md:px-10
              ${isScrolled 
                ? 'opacity-20 blur-2xl' 
                : 'opacity-15 blur-xl'
              }
            `}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(8, 145, 178, 0.3) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* Container principal avec effet glass */}
          <div 
            className={`
              flex justify-between items-center
              h-16 md:h-[4.5rem]
              px-6 md:px-10
              rounded-full
              border border-white/20
              transition-all duration-500 ease-out
              relative
              overflow-hidden
              ${isScrolled 
                ? 'bg-[rgba(8,145,178,0.08)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]' 
                : 'bg-[rgba(8,145,178,0.05)] backdrop-blur-lg shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
              }
            `}
            style={{
              backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(150%)',
              WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(150%)',
            }}
          >
            {/* Effet de reflet subtil en haut */}
            <div 
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            
            {/* LEFT SIDE - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`
                    relative
                    font-medium text-[15px]
                    transition-all duration-200
                    ${isActive(item.href)
                      ? 'text-blue-electric font-semibold'
                      : 'text-gray-700 hover:text-blue-electric'
                    }
                  `}
                >
                  {item.label}
                  
                  {/* Subtle underline on active */}
                  {isActive(item.href) && (
                    <span className="
                      absolute -bottom-1 left-0 right-0
                      h-0.5 bg-blue-electric rounded-full
                    " />
                  )}
                </Link>
              ))}
            </div>

            {/* CENTER - Logo Brand */}
            <Link 
              href="/" 
              className="
                absolute left-1/2 -translate-x-1/2
                flex items-center gap-3
                group
              " 
              scroll={false}
            >
              {/* Logo minimaliste */}
              <div className="
                w-9 h-9 rounded-full 
                bg-gradient-to-br from-blue-electric via-blue-bright to-blue-sky
                flex items-center justify-center 
                shadow-sm
                transition-all duration-300
                group-hover:shadow-blue group-hover:scale-105
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

              {/* Brand Text */}
              <div className="hidden sm:block text-xl md:text-2xl font-bold font-display tracking-tight leading-none">
                <span className="
                  text-transparent bg-clip-text 
                  bg-gradient-to-r from-blue-electric to-blue-bright
                  transition-all duration-300
                ">
                  RENT
                </span>
                <span className="
                  text-transparent bg-clip-text 
                  bg-gradient-to-r from-green-vibrant to-green-fresh
                  transition-all duration-300
                ">
                  ALG
                </span>
              </div>
            </Link>

            {/* RIGHT SIDE - CTA Buttons & Mobile Menu */}
            <div className="flex items-center gap-3 ml-auto lg:ml-0">
              {/* Desktop CTA Buttons */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/signin">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="
                      px-5 py-2
                      text-gray-700 font-semibold text-[15px]
                      hover:text-blue-electric hover:bg-blue-pale/30
                      rounded-full
                      transition-all duration-200
                    "
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    size="sm"
                    className="
                      px-6 py-2.5
                      bg-gradient-to-r from-green-vibrant to-green-fresh
                      text-white font-bold text-[15px]
                      rounded-full
                      shadow-md hover:shadow-green
                      transition-all duration-200
                      hover:scale-105
                    "
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="
                  lg:hidden
                  p-2 rounded-full
                  text-gray-700 hover:text-blue-electric
                  hover:bg-blue-pale/30
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-electric/50
                "
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tagline flottant minimaliste */}
          <div 
            className="
              hidden xl:flex
              absolute top-full left-1/2 -translate-x-1/2 mt-2
              px-6 py-2.5 rounded-full
              bg-[rgba(8,145,178,0.05)] backdrop-blur-lg
              border border-white/20
              shadow-[0_4px_16px_rgba(8,145,178,0.1)]
              animate-fade-in
            "
            style={{
              backdropFilter: 'blur(16px) saturate(150%)',
              WebkitBackdropFilter: 'blur(16px) saturate(150%)',
            }}
          >
            <p className="text-sm font-display font-medium text-gray-700 tracking-wide whitespace-nowrap">
              Trouve ton bien de rêve en Algérie
            </p>
          </div>
        </nav>
      </div>



      {/* Mobile Menu Component */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        pathname={pathname}
      />
    </>
  );
};

export default Navbar;