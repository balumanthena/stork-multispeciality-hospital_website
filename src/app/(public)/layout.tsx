import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getActiveDepartments } from "@/lib/data/departments-server"
import { getGroupedTreatments } from "@/lib/data/grouped-treatments"
import { ClientSideInteractions } from "@/components/shared/client-side-interactions"


export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const departments = await getActiveDepartments()
    const groupedTreatments = await getGroupedTreatments()

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <Header departments={departments} groupedTreatments={groupedTreatments} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <ClientSideInteractions />
        </div>
    )
}
