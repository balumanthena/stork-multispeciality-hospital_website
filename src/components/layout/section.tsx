import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean
    className?: string
    children: React.ReactNode
}

import { Container } from "./container"

export function Section({
    container = true,
    className,
    children,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn("py-12 md:py-16 lg:py-24", className)}
            {...props}
        >
            {container ? (
                <Container>{children}</Container>
            ) : (
                children
            )}
        </section>
    )
}
