"use client"

import dynamic from "next/dynamic"

const LeadPopup = dynamic(() => import("@/components/lead-popup").then(mod => mod.LeadPopup), { ssr: false })
const ExitIntentPopup = dynamic(() => import("@/components/shared/exit-intent-popup").then(mod => mod.ExitIntentPopup), { ssr: false })
const FloatingWhatsappButton = dynamic(() => import("@/components/shared/floating-whatsapp-button").then(mod => mod.FloatingWhatsappButton), { ssr: false })

export function ClientSideInteractions() {
    return (
        <>
            <LeadPopup />
            <ExitIntentPopup />
            <FloatingWhatsappButton />
        </>
    )
}
