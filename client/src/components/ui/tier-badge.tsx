"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Crown, Star, Sparkles } from "lucide-react"

export type TierType = "free" | "starter" | "pro" | "elite"

export interface TierBadgeProps extends React.ComponentProps<"span"> {
  tier: TierType
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

function TierBadge({
  className,
  tier,
  size = "md",
  showIcon = true,
  ...props
}: TierBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  }

  const iconSizes = {
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
  }

  const tierConfig = {
    free: {
      label: "Free",
      className: "bg-gray-100 text-gray-700 border-gray-200",
      icon: null,
    },
    starter: {
      label: "Starter",
      className: "bg-cyan-50 text-cyan-700 border-cyan-200",
      icon: Star,
    },
    pro: {
      label: "Pro",
      className: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Sparkles,
    },
    elite: {
      label: "Elite",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Crown,
    },
  }

  const config = tierConfig[tier]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        sizeClasses[size],
        config.className,
        className
      )}
      {...props}
    >
      {showIcon && Icon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  )
}

export { TierBadge }
