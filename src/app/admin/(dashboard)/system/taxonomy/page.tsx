import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole } from "@/lib/auth-helpers"
import { Shield, Plus, Microscope, Building2, Stethoscope } from "lucide-react"
import { redirect } from "next/navigation"
import { TaxonomyList } from "@/components/admin/system/TaxonomyList"

export default async function TaxonomyManagementPage() {
    const role = await getCurrentUserRole()

    // Server-side safety (even with middleware)
    if (role !== 'super_admin') {
        redirect("/admin")
    }

    const supabase = await createClient()

    // Fetch Departments and Treatments
    const { data: departments } = await supabase
        .from('departments')
        .select('*')
        .order('name', { ascending: true })

    const { data: treatments, error } = await supabase
        .from('treatments')
        .select('*')
        .order('title', { ascending: true })

    // Debug Log as requested
    console.log("Treatments:", treatments)
    if (error) console.error("Treatments Query Error:", error)

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded">
                            Super Admin Only
                        </span>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Taxonomy Management</h1>
                    </div>
                    <p className="text-slate-500">Manage the clinical hierarchy and organizational structure.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                        <Plus className="h-4 w-4" />
                        New Department
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 rounded-lg text-sm font-bold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                        <Plus className="h-4 w-4" />
                        New Treatment
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Departments Section */}
                <TaxonomyList
                    title="Departments"
                    items={departments}
                    type="department"
                    displayKey="name"
                    iconColor="text-orange-500"
                    hoverIconColor="text-orange-500"
                    hoverBgColor="bg-orange-100"
                />

                {/* Treatments Section */}
                <TaxonomyList
                    title="Treatments"
                    items={treatments}
                    type="treatment"
                    displayKey="title"
                    iconColor="text-blue-500"
                    hoverIconColor="text-blue-500"
                    hoverBgColor="bg-blue-100"
                />
            </div>

            {/* System Visualizer / Context */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-400">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Microscope className="h-40 w-40" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-orange-400" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">System Information</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tighter italic">Enterprise Clinical Data Graph</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        This taxonomy defines the core structural relationship between departments and treatments.
                        Changing high-level department names will affect navigation globally and how patients find specialized care.
                        Ensure all clinical terminology follows hospital standards before finalizing edits.
                    </p>
                </div>
            </div>
        </div>
    )
}
