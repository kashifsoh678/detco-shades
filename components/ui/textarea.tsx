import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="space-y-1 w-full text-left">
                <textarea
                    className={cn(
                        "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground active:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="text-[12px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">{error}</p>}
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
