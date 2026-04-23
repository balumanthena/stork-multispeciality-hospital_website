import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div 
            className={cn(
                "w-full max-w-7xl mx-auto px-6", 
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
