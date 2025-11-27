import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-blue-electric selection:text-white w-full min-w-0 rounded-2xl border border-transparent bg-white/80 px-4 py-3 text-base shadow-sm transition-all outline-none focus-ring file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 md:text-sm",
        "focus:ring-2 focus:ring-blue-electric focus:bg-white",
        "aria-invalid:border-terracotta aria-invalid:focus:border-terracotta",
        className
      )}
      {...props}
    />
  )
}

export { Input }
