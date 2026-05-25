"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function RouteProgressBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout

        const startProgress = () => {
            setIsVisible(true)
            setProgress(10)
            
            // Gradually increment towards 90%
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return prev
                    const jump = Math.max(1, Math.floor((100 - prev) * 0.15))
                    return prev + jump
                })
            }, 150)
        }

        const completeProgress = () => {
            setProgress(100)
            clearInterval(interval)
            
            // Fade out after completing
            setTimeout(() => {
                setIsVisible(false)
                setProgress(0)
            }, 300)
        }

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const anchor = target.closest("a")
            
            if (anchor && anchor.href) {
                try {
                    const targetUrl = new URL(anchor.href, window.location.href)
                    const currentUrl = new URL(window.location.href)

                    // Skip external links, hashes, target="_blank", or command/meta clicks
                    if (
                        targetUrl.origin === currentUrl.origin &&
                        targetUrl.pathname + targetUrl.search !== currentUrl.pathname + currentUrl.search &&
                        anchor.target !== "_blank" &&
                        !e.ctrlKey &&
                        !e.metaKey &&
                        !e.shiftKey
                    ) {
                        startProgress()
                    }
                } catch (err) {
                    // Ignore malformed URIs
                }
            }
        }

        document.addEventListener("click", handleAnchorClick, { capture: true })

        // Complete the bar when navigation lands on the new route
        completeProgress()

        return () => {
            document.removeEventListener("click", handleAnchorClick, { capture: true })
            clearInterval(interval)
        }
    }, [pathname, searchParams])

    if (!isVisible) return null

    return (
        <div
            id="route-progress-bar"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "2.5px",
                width: `${progress}%`,
                backgroundColor: "#FF8202", // Stork primary brand orange
                zIndex: 99999,
                transition: "width 0.25s ease-out, opacity 0.25s ease-in-out",
                opacity: progress === 100 ? 0 : 1,
                pointerEvents: "none"
            }}
            aria-hidden="true"
        />
    )
}
