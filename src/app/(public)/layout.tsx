import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LeadPopup } from "@/components/lead-popup"
import { ExitIntentPopup } from "@/components/shared/exit-intent-popup"
import { FloatingWhatsappButton } from "@/components/shared/floating-whatsapp-button"
import { getActiveDepartments } from "@/lib/data/departments-server"
import { getGroupedTreatments } from "@/lib/data/grouped-treatments"


export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const departments = await getActiveDepartments()
    const groupedTreatments = await getGroupedTreatments()

    return (
        <div className="flex flex-col min-h-screen">
            <Header departments={departments} groupedTreatments={groupedTreatments} />
            <main className="flex-1 pt-[124px]">
                {children}
            </main>
            <Footer />
            <LeadPopup />
            <ExitIntentPopup />
            <FloatingWhatsappButton />
        </div>
    )
}
