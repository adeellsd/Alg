import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-blue-electric selection:text-white flex field-sizing-content min-h-16 w-full rounded-2xl border border-transparent bg-white/80 px-3 py-2 text-base shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 md:text-sm",
        "focus:ring-2 focus:ring-blue-electric focus:bg-white",
        "aria-invalid:border-terracotta aria-invalid:focus:border-terracotta",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
