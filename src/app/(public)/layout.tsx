import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar"
import { getActiveDepartments } from "@/lib/data/departments-server"


export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const departments = await getActiveDepartments()

    return (
        <div className="flex flex-col min-h-screen">
            <Header departments={departments} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <MobileBottomBar />
        </div>
    )
}
