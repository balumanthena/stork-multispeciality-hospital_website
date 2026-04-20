import React from "react"
import type { Metadata } from "next"
import ContactContent from "@/components/contact/contact-content"

export const metadata: Metadata = {
    title: "Visit Us | Stork Multispeciality Hospital",
    description: "Location and contact information for Stork Multispeciality Hospital in Kompally, Hyderabad.",
}

export default function ContactPage() {
    return <ContactContent />
}
