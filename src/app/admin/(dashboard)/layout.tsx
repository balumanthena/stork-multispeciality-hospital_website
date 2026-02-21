import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeaderProfile } from "@/components/admin/admin-header-profile"
import { UserProvider } from "@/context/UserContext"

import { Bell } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <UserProvider>
            <div className="flex min-h-screen bg-slate-50">
                <AdminSidebar />
                <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
                    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between shadow-sm">
                        <h2 className="font-semibold text-slate-800 text-lg">Hospital CMS</h2>
                        <div className="flex items-center gap-6">
                            {/* Notification Bell */}
                            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* User Profile Dropdown */}
                            <AdminHeaderProfile />
                        </div>
                    </header>
                    <main className="flex-1 bg-[#F8FAFC] p-8">
                        <div className="max-w-[1280px] mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </UserProvider>
    )
}

