"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const LeadPopup = dynamic(() => import("@/components/lead-popup").then(mod => mod.LeadPopup), { ssr: false })
const FloatingWhatsappButton = dynamic(() => import("@/components/shared/floating-whatsapp-button").then(mod => mod.FloatingWhatsappButton), { ssr: false })

export function ClientSideInteractions() {
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        // Defer mounting of heavy dynamic overlays until initial viewport load has fully settled.
        // Hydration runs only when the user scrolls, touches the screen, or after a 2.5s idle fallback.
        // This ensures the initial CPU thread on iPhone Safari remains completely cold.
        let hasMounted = false

        const triggerMount = () => {
            if (hasMounted) return
            hasMounted = true
            
            // Safe iOS Safari client-side detection to apply global GPU compositor guardrails
            if (typeof window !== "undefined") {
                const ua = window.navigator.userAgent.toLowerCase()
                const isIPhoneSafari = ua.includes("iphone") && ua.includes("safari") && !ua.includes("crios") && !ua.includes("fxios")
                if (isIPhoneSafari) {
                    document.documentElement.classList.add("is-iphone-safari")
                }
            }

            setShouldRender(true)
            cleanupListeners()
        }

        // Expose a deterministic global hook for automated E2E test suites to force instant hydration mount
        if (typeof window !== "undefined") {
            (window as any).__mountOverlays = () => {
                triggerMount()
            }
        }

        const handleScroll = () => {
            triggerMount()
        }

        const handleTouch = () => {
            triggerMount()
        }

        const handleMouseMove = () => {
            triggerMount()
        }

        const cleanupListeners = () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("touchstart", handleTouch)
            window.removeEventListener("mousemove", handleMouseMove)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("touchstart", handleTouch, { passive: true })
        window.addEventListener("mousemove", handleMouseMove, { passive: true })

        const timeoutId = setTimeout(triggerMount, 2500)

        return () => {
            cleanupListeners()
            clearTimeout(timeoutId)
        }
    }, [])

    if (!shouldRender) return null

    return (
        <>
            <LeadPopup />
            <FloatingWhatsappButton />
        </>
    )
}
