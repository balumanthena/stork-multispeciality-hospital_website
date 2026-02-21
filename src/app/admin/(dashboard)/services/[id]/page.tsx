import { TreatmentForm } from "@/components/admin/services/treatment-form"

// params is a Promise in Next.js 15
type PageProps = {
    params: Promise<{ id?: string }>
}

export default async function AdminTreatmentEditPage(props: PageProps) {
    const params = await props.params;

    // "new" is not an ID, but this route captures [id] 
    // Actually, create might be at /admin/services/new, which matches [id] = "new"
    // The form handles "new" vs uuid check or we can pass undefined.

    // Better strategy for /admin/services/new vs /admin/services/[uuid]:
    // Since we are in [id]/page.tsx, if id is "new", we treat it as create.
    const isNew = params.id === 'new'

    return (
        <TreatmentForm id={isNew ? undefined : params.id} />
    )
}
