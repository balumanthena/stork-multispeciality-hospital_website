import { AdminSidebar } from "@/components/admin/sidebar"

import { Bell } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto h-screen bg-[#F8FAFC]">
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between shadow-sm">
                    <h2 className="font-semibold text-slate-800 text-lg">Hospital CMS</h2>
                    <div className="flex items-center gap-6">
                        {/* Notification Bell */}
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-slate-700">Admin User</span>
                                <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full tracking-wider">Super Admin</span>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shadow-sm">
                                AD
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-8 max-w-[1280px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
