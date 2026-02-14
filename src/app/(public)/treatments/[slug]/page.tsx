import { notFound } from "next/navigation"
import TreatmentView from "@/components/treatments/treatment-view"

// Mock Data for Treatments (Simulating DB Fetch)
const treatmentsData: Record<string, any> = {
    "knee-replacement": {
        id: "1", // Added ID for subscription
        title: "Total Knee Replacement",
        summary: "A surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.",
        videoId: "dQw4w9WgXcQ",
        content: "Total knee replacement (TKR) is a surgical procedure in which the diseased knee joint is replaced with artificial material...",
        symptoms: [
            "Severe knee pain or stiffness that limits everyday activities",
        ],
        causes: [
            "Osteoarthritis: Age-related wear and tear type of arthritis.",
        ],
        related: [
            { title: "Hip Replacement", slug: "hip-replacement" },
        ]
    },
    "angioplasty": {
        id: "2",
        title: "Coronary Angioplasty",
        summary: "A minimally invasive procedure used to open clogged heart arteries and restore blood flow.",
        videoId: "",
        content: "Angioplasty is a procedure to restore blood flow through the artery...",
        related: []
    },
}

export default async function TreatmentPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const treatment = treatmentsData[slug.toLowerCase()]

    if (!treatment) {
        return notFound()
    }

    return <TreatmentView initialData={treatment} />
}
