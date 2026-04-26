import { Suspense } from "react"
import AppointmentPageClient from "@/components/appointments/AppointmentPageClient"

/**
 * Server Component Version (Best Practice)
 * 
 * In Next.js App Router, any component using `useSearchParams()` must be wrapped 
 * in a <Suspense> boundary during prerendering. By converting this page to a 
 * Server Component and resolving `searchParams` as a Promise, we ensure 
 * production build stability on Vercel.
 * 
 * This approach follows the Next.js 15/16 best practices for handling 
 * dynamic search parameters in the App Router.
 */
export default async function Page(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // In Next.js 15+, searchParams is a Promise that must be awaited
    const searchParams = await props.searchParams

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Loading Appointment Details...</p>
                </div>
            </div>
        }>
            <AppointmentPageClient searchParams={searchParams} />
        </Suspense>
    )
}
