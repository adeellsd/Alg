"use client"

import {
  CheckCircle2,
  Info,
  Loader2,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <CheckCircle2 className="size-4 text-emerald-500" />,
        info: <Info className="size-4 text-cyan-500" />,
        warning: <AlertTriangle className="size-4 text-amber-500" />,
        error: <XCircle className="size-4 text-red-500" />,
        loading: <Loader2 className="size-4 animate-spin text-cyan-600" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group toast flex items-center gap-3 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
          title: "text-sm font-medium text-gray-900",
          description: "text-sm text-gray-500",
          actionButton:
            "inline-flex h-8 items-center justify-center rounded-md bg-cyan-600 px-3 text-sm font-medium text-white hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
          cancelButton:
            "inline-flex h-8 items-center justify-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50",
          closeButton:
            "absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100",
          success: "border-emerald-200 bg-emerald-50",
          error: "border-red-200 bg-red-50",
          warning: "border-amber-200 bg-amber-50",
          info: "border-cyan-200 bg-cyan-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
