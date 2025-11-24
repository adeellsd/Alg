'use client';

import { Crown, Zap } from 'lucide-react';
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

const tierConfig: Record<AccountTier, { label: string; color: string; bgColor: string }> = {
  FREE: { label: 'Gratuit', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  STARTER: { label: 'Starter', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  PRO: { label: 'Pro', color: 'text-purple-700', bgColor: 'bg-purple-50' },
  ELITE: { label: 'Elite', color: 'text-amber-700', bgColor: 'bg-amber-50' },
};

export function TierInfo({ tier, stats, trialInfo }: TierInfoProps) {
  const config = tierConfig[tier];
  const propertiesPercentage = (stats.propertiesUsed / stats.propertiesLimit) * 100;
  const canUpgrade = tier !== 'ELITE';

  return (
    <Card className="p-6 bg-white border-0 shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {tier === 'ELITE' ? (
              <Crown className="w-5 h-5 text-amber-500" />
            ) : (
              <Zap className="w-5 h-5 text-gray-500" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">Votre abonnement</h3>
          </div>
          <Badge className={`${config.bgColor} ${config.color} border-0 rounded-[14px]`}>
            {config.label}
          </Badge>
        </div>
        {canUpgrade && (
          <Link href="/pricing">
            <Button size="sm" variant="outline" className="rounded-[14px]">
              Améliorer
            </Button>
          </Link>
        )}
      </div>

      {/* Trial info for FREE users */}
      {tier === 'FREE' && trialInfo?.isEligible && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-[14px]">
          <p className="text-sm text-blue-900 font-medium">
            🎁 Essai gratuit disponible !
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Débloquez 14 jours de fonctionnalités Pro après votre 2ème annonce
          </p>
        </div>
      )}

      {/* Properties usage */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Annonces</span>
            <span className="font-semibold text-gray-900">
              {stats.propertiesUsed} / {stats.propertiesLimit === 999999 ? '∞' : stats.propertiesLimit}
            </span>
          </div>
          {stats.propertiesLimit !== 999999 && (
            <Progress value={propertiesPercentage} className="h-2" />
          )}
        </div>

        {stats.imagesLimit && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Images par annonce</span>
              <span className="font-semibold text-gray-900">
                Max {stats.imagesLimit === 999999 ? '∞' : stats.imagesLimit}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
