/**
 * QuickActions.tsx
 * Design System v5.0 "Alger Authentique"
 * 
 * Quick actions cards pour dashboards avec gradient backgrounds pour primary,
 * glassmorphism pour outline, et pattern overlay au hover.
 * 
 * @colors
 * - Primary variant: bg-linear-to-r from-or to-orange-brulant
 * - Outline variant: bg-white/90 backdrop-blur-md border-blue-electric
 * 
 * @patterns
 * - Pattern mosaic-elite au hover
 * 
 * @version 5.0 - Sprint 5
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  variant?: 'default' | 'outline';
}

interface QuickActionsProps {
  title: string;
  actions: QuickAction[];
}

export function QuickActions({ title, actions }: QuickActionsProps) {
  return (
    <Card className="p-6 lg:p-8 bg-white/95 backdrop-blur-md border-0 shadow-lg rounded-xl">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isPrimary = action.variant === 'default';
          
          return (
            <Link key={index} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`
                  relative group overflow-hidden rounded-xl p-5 transition-all duration-300
                  ${isPrimary 
                    ? 'bg-linear-to-r from-or to-orange-brulant text-gray-900 shadow-lg hover:shadow-2xl' 
                    : 'bg-white/90 backdrop-blur-md border-2 border-blue-electric/30 hover:border-blue-electric text-gray-900 shadow-md hover:shadow-xl'
                  }
                `}
              >
                {/* Pattern overlay au hover */}
                <div className="absolute inset-0 pattern-mosaic-elite opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2.5 rounded-lg transition-all duration-300 group-hover:scale-110
                      ${isPrimary 
                        ? 'bg-white/30 backdrop-blur-sm' 
                        : 'bg-linear-to-br from-turquoise-mer to-blue-electric text-white'
                      }
                    `}>
                      <Icon className={`w-5 h-5 ${isPrimary ? 'text-gray-900' : 'text-white'}`} />
                    </div>
                    <span className="font-bold text-base">
                      {action.label}
                    </span>
                  </div>
                  
                  {action.description && (
                    <p className={`text-sm ${isPrimary ? 'text-gray-800' : 'text-gray-600'} font-medium`}>
                      {action.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
