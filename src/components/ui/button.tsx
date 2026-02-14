import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90",
                destructive: "bg-red-500 text-white hover:bg-red-500/90",
                outline: "border border-[var(--color-primary)] bg-background text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",
                secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
                ghost: "hover:bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
                link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
                accent: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-lg px-3",
                lg: "h-12 rounded-xl px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
