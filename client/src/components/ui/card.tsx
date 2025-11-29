/**
 * Card Components - RentAlg Design System v6.0
 * Fresh, Modern & Clean
 */

import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

function CardFeatured({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-featured"
      className={cn(
        "relative rounded-xl border-2 border-primary-500 bg-white shadow-lg transition-all duration-200 hover:shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-teal-500" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function CardPremium({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-premium"
      className={cn(
        "relative rounded-xl border-2 border-orange-500 bg-gradient-to-br from-white to-orange-50 shadow-lg transition-all duration-200 hover:shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-tight text-slate-900", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-slate-500", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto shrink-0", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-5 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2 border-t border-slate-100 p-5", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardFeatured,
  CardPremium,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
