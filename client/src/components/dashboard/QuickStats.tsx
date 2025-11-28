/**
 * QuickStats.tsx
 * Design System v5.0 "Alger Authentique"
 * 
 * Stats cards component pour dashboards avec glassmorphism, gradient icons,
 * et hover effects sophistiqués.
 * 
 * @colors
 * - Cards: bg-white/95 backdrop-blur-md
 * - Icon gradients: from-turquoise-mer to-blue-electric (par défaut)
 * - Shadows: shadow-blue hover:shadow-2xl
 * 
 * @animations
 * - Hover: whileHover={{ y: -6, scale: 1.02 }}
 * 
 * @version 5.0 - Sprint 5
 */

'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
      value: string;
      isPositive: boolean;
    };
    color?: string;
  }>;
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClass = stat.color || 'from-turquoise-mer to-blue-electric';
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <Card className="relative p-6 bg-white/95 backdrop-blur-md hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-xl overflow-hidden group">
              {/* Pattern subtil au hover */}
              <div className="absolute inset-0 pattern-mosaic-elite opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <p className={`text-sm mt-2 font-bold flex items-center gap-1 ${stat.trend.isPositive ? 'text-vert-vibrant' : 'text-coral'}`}>
                      <span className="text-base">{stat.trend.isPositive ? '↗' : '↘'}</span>
                      {stat.trend.value}
                    </p>
                  )}
                </div>
                
                {/* Icon avec gradient v5.0 */}
                <div className={`p-4 rounded-xl bg-linear-to-br ${colorClass} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>
              
              {/* Border effet au hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-electric/20 transition-colors duration-300 pointer-events-none" />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
