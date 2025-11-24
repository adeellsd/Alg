/**
 * TierBadge Component - Alger Vibrante v4
 * 
 * Badges pour les tiers FREE, STARTER, ELITE
 * Utilisé dans les dashboards, pricing, cartes utilisateur
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export type TierType = "free" | "starter" | "elite"

export interface TierBadgeProps extends React.ComponentProps<"span"> {
  tier: TierType
  size?: "sm" | "md" | "lg"
}

const TierBadge = React.forwardRef<HTMLSpanElement, TierBadgeProps>(
  ({ className, tier, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "px-2 py-1 text-[10px]",
      md: "px-3 py-1.5 text-xs",
      lg: "px-4 py-2 text-sm",
    }

    const tierClasses = {
      free: "tier-badge-free",
      starter: "tier-badge-starter",
      elite: "tier-badge-elite",
    }

    const tierLabels = {
      free: "FREE",
      starter: "STARTER",
      elite: "ELITE",
    }

    return (
      <span
        ref={ref}
        className={cn(
          tierClasses[tier],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {tierLabels[tier]}
      </span>
    )
  }
)

TierBadge.displayName = "TierBadge"

export { TierBadge }
