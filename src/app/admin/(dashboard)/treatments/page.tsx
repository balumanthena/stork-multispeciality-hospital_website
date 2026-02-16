import { TreatmentList } from "@/components/admin/treatments/treatment-list"

export default function AdminTreatmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Treatments</h1>
                <p className="text-slate-500">
                    Manage and organize all medical treatments available at the hospital.
                </p>
            </div>

            <TreatmentList />
        </div>
    )
}
