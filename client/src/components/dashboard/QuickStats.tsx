'use client';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClass = stat.color || 'from-blue-500 to-blue-600';
        
        return (
          <Card key={index} className="p-6 bg-white hover:shadow-xl transition-all duration-200 border-0 shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                {stat.trend && (
                  <p className={`text-sm mt-2 font-semibold ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend.isPositive ? '↑' : '↓'} {stat.trend.value}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-[14px] bg-linear-to-br ${colorClass} text-white shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
