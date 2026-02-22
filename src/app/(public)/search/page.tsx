import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ChevronRight, Search, Activity, User } from "lucide-react"

export default async function SearchResultsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const query = typeof params.q === "string" ? params.q : ""

    // Connect to Supabase
    const supabase = await createClient()

    // Initialize empty arrays
    let doctors: any[] = []
    let treatments: any[] = []
    let error: string | null = null

    if (query) {
        try {
            // Run queries concurrently
            const [doctorsResponse, treatmentsResponse] = await Promise.all([
                supabase
                    .from("doctors")
                    .select("id, name, department, slug")
                    .ilike("name", `%${query}%`)
                    .limit(10),
                supabase
                    .from("treatments")
                    .select("id, title, department, slug")
                    .ilike("title", `%${query}%`)
                    .limit(10),
            ])

            // Log detailed errors if they exist, but don't break the application
            if (doctorsResponse.error) {
                console.error("Doctors Error:", doctorsResponse.error?.message)
            }
            if (treatmentsResponse.error) {
                console.error("Treatments Error:", treatmentsResponse.error?.message)
            }

            // If both queries failed entirely, set a user-facing error state
            if (doctorsResponse.error && treatmentsResponse.error) {
                error = "There was a problem retrieving search results. Please try again."
            } else {
                // Gracefully assign whatever data succeeded
                doctors = doctorsResponse.data || []
                treatments = treatmentsResponse.data || []
            }

        } catch (err: any) {
            console.error("Unexpected Search Error:", err?.message || err)
            error = "There was a problem retrieving search results. Please try again."
        }
    }

    const hasResults = doctors.length > 0 || treatments.length > 0

    return (
        <div className="flex flex-col min-h-[60vh] py-16 lg:py-24 bg-slate-50">
            <div className="container max-w-5xl mx-auto px-6">

                <div className="mb-10 lg:mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <Search className="w-6 h-6 text-[#FF8202]" />
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Search Results
                        </h1>
                    </div>
                    <p className="text-lg text-slate-500 font-medium ml-9">
                        {query ? (
                            <>Showing matches for <span className="text-slate-900 font-semibold">"{query}"</span></>
                        ) : (
                            "Please enter a search term to find doctors and treatments."
                        )}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                {/* --- RESULTS SECTION --- */}
                {query && !error && hasResults ? (
                    <div className="space-y-12">

                        {/* Doctors Section */}
                        {doctors.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                                    <User className="w-5 h-5 text-slate-400" />
                                    <h2 className="text-xl font-bold text-slate-800">Doctors ({doctors.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {doctors.map((doc) => (
                                        <Link
                                            key={doc.id}
                                            href={`/doctors/${doc.slug}`}
                                            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col justify-between h-full"
                                        >
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{doc.name}</h3>
                                                <p className="text-[var(--color-accent)] font-medium text-sm bg-orange-50 px-3 py-1 rounded-full w-fit">
                                                    {doc.department}
                                                </p>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Treatments Section */}
                        {treatments.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                                    <Activity className="w-5 h-5 text-slate-400" />
                                    <h2 className="text-xl font-bold text-slate-800">Treatments ({treatments.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {treatments.map((treatment) => (
                                        <Link
                                            key={treatment.id}
                                            href={`/treatments/${treatment.slug}`}
                                            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col justify-between h-full"
                                        >
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">{treatment.title}</h3>
                                                <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">
                                                    {treatment.department}
                                                </p>
                                            </div>
                                            <div className="flex justify-end mt-4 text-sm font-semibold text-slate-500 group-hover:text-[var(--color-accent)] transition-colors flex-row items-center gap-1">
                                                View Details <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                ) : query && !error && !hasResults ? (

                    /* Empty State */
                    <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-slate-200">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No matches found</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            We couldn't find any doctors or treatments matching "{query}".
                            Please try checking your spelling or use more general terms.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex mt-8 items-center justify-center font-medium transition-colors bg-[var(--color-accent)] hover:bg-[#e67600] text-white h-11 px-8 rounded-full shadow-sm"
                        >
                            Back to Home
                        </Link>
                    </div>
                ) : null}

            </div>
        </div>
    )
}
