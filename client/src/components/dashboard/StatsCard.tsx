"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = 'text-blue-electric',
  iconBgColor = 'bg-blue-electric/10',
  trend,
  subtitle,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden border-gray-200 hover:border-blue-electric/30 transition-all duration-300 hover:shadow-lg group">
        {/* Gradient hover effect */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
              
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
              
              {trend && (
                <div className="flex items-center gap-1 mt-2">
                  <span
                    className={`text-xs font-semibold ${
                      trend.isPositive ? 'text-green-vibrant' : 'text-red-500'
                    }`}
                  >
                    {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                  </span>
                  <span className="text-xs text-gray-500">vs mois dernier</span>
                </div>
              )}
            </div>
            
            <div className={`shrink-0 ${iconBgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
