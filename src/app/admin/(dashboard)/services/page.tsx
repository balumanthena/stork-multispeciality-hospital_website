import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import AdminTreatmentsTable from "@/components/admin/services-table"
import { getCurrentUserRole, hasPermission } from "@/lib/auth-helpers"

export const revalidate = 0

export default async function TreatmentsPage() {
    const supabase = await createClient()
    const role = await getCurrentUserRole()

    // In a real app, you might want to join departments for the name
    // Assuming `treatments` has a `department_id` we map on client or via view
    const { data: treatments } = await supabase.from('services').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Treatments</h1>
                {hasPermission(role, 'manage_treatments') && (
                    <Link href="/admin/services/new">
                        <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white">
                            <Plus className="h-4 w-4 mr-2" /> Add Treatment
                        </Button>
                    </Link>
                )}
            </div>

            <AdminTreatmentsTable initialData={treatments || []} currentUserRole={role} />
        </div>
    )
}
