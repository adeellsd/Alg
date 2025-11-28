/**
 * TierInfo.tsx
 * Design System v5.0 "Alger Authentique"
 * 
 * Tier information card avec gradient backgrounds par tier,
 * pattern hexagons subtil, et progress bars avec gradient fills.
 * 
 * @colors
 * - FREE: beige-casbah background
 * - STARTER: blue-electric gradient
 * - PRO: violet gradient  
 * - ELITE: or gradient
 * 
 * @patterns
 * - Pattern hexagons opacity-[0.04]
 * 
 * @version 5.0 - Sprint 5
 */

'use client';

import { Crown, Zap, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { AccountTier } from '@/types/prismaTypes';
import Link from 'next/link';

interface TierInfoProps {
  tier: AccountTier;
  stats: {
    propertiesUsed: number;
    propertiesLimit: number;
    imagesUsed?: number;
    imagesLimit?: number;
  };
  trialInfo?: {
    isEligible: boolean;
    trialEndsAt?: Date;
  };
}

const tierConfig: Record<AccountTier, { 
  label: string; 
  icon: typeof Crown;
  gradient: string;
  badgeGradient: string;
  textColor: string;
}> = {
  FREE: { 
    label: 'Gratuit', 
    icon: Zap,
    gradient: 'bg-linear-to-br from-beige-casbah to-beige-chaud',
    badgeGradient: 'bg-linear-to-r from-beige-chaud to-terracotta',
    textColor: 'text-gray-900'
  },
  STARTER: { 
    label: 'Starter', 
    icon: TrendingUp,
    gradient: 'bg-linear-to-br from-blue-pale to-turquoise-mer/30',
    badgeGradient: 'bg-linear-to-r from-blue-electric to-turquoise-mer',
    textColor: 'text-white'
  },
  PRO: { 
    label: 'Pro', 
    icon: Zap,
    gradient: 'bg-linear-to-br from-purple-100 to-purple-200',
    badgeGradient: 'bg-linear-to-r from-purple-600 to-purple-700',
    textColor: 'text-white'
  },
  ELITE: { 
    label: 'Elite', 
    icon: Crown,
    gradient: 'bg-linear-to-br from-or/20 to-orange-brulant/30',
    badgeGradient: 'bg-linear-to-r from-or to-orange-brulant',
    textColor: 'text-gray-900'
  },
};

export function TierInfo({ tier, stats, trialInfo }: TierInfoProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;
  const propertiesPercentage = (stats.propertiesUsed / stats.propertiesLimit) * 100;
  const canUpgrade = tier !== 'ELITE';

  return (
    <Card className={`relative p-6 lg:p-8 ${config.gradient} border-0 shadow-xl rounded-xl overflow-hidden`}>
      {/* Pattern hexagons subtil */}
      <div className="absolute inset-0 pattern-hexagons opacity-[0.04]" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-2 rounded-lg ${config.badgeGradient} shadow-md`}>
                <Icon className={`w-5 h-5 ${config.textColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Votre abonnement</h3>
            </div>
            <Badge className={`${config.badgeGradient} ${config.textColor} border-0 rounded-lg px-4 py-1.5 text-sm font-bold shadow-lg`}>
              {config.label}
            </Badge>
          </div>
          {canUpgrade && (
            <Link href="/pricing">
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-lg border-2 border-blue-electric text-blue-electric hover:bg-blue-electric hover:text-white font-semibold transition-all duration-200 hover:scale-105"
              >
                Améliorer
              </Button>
            </Link>
          )}
        </div>

        {/* Trial info for FREE users - Style v5.0 */}
        {tier === 'FREE' && trialInfo?.isEligible && (
          <div className="mb-6 p-4 bg-white/80 backdrop-blur-md border-2 border-blue-electric/30 rounded-xl shadow-md">
            <p className="text-sm text-blue-electric font-bold flex items-center gap-2">
              🎁 Essai gratuit disponible !
            </p>
            <p className="text-xs text-gray-700 mt-2 font-medium">
              Débloquez 14 jours de fonctionnalités Pro après votre 2ème annonce
            </p>
          </div>
        )}

        {/* Properties usage - Progress bars avec gradient */}
        <div className="space-y-4">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-700 font-semibold">Annonces</span>
              <span className="font-bold text-gray-900">
                {stats.propertiesUsed} / {stats.propertiesLimit === 999999 ? '∞' : stats.propertiesLimit}
              </span>
            </div>
            {stats.propertiesLimit !== 999999 && (
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-electric to-turquoise-mer rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(propertiesPercentage, 100)}%` }}
                />
              </div>
            )}
          </div>

          {stats.imagesLimit && (
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-semibold">Images par annonce</span>
                <span className="font-bold text-gray-900">
                  Max {stats.imagesLimit === 999999 ? '∞' : stats.imagesLimit}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
