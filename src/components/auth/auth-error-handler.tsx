"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

function AuthErrorLogger() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const error = searchParams.get("error")
        const errorCode = searchParams.get("error_code")
        const errorDescription = searchParams.get("error_description")

        if (error || errorCode || errorDescription) {
            let message = "An authentication error occurred."

            // Map common error codes to friendly messages
            if (errorCode === "otp_expired") {
                message = "The authentication link has expired. Please request a new one."
            } else if (error === "access_denied") {
                message = "Access denied. You may not have permission to view this page."
            } else if (errorDescription) {
                message = decodeURIComponent(errorDescription).replace(/\+/g, " ")
            }

            toast.error(message, {
                duration: 6000,
                id: "auth-error-toast" // Prevent duplicate toasts
            })

            // Clean up URL parameters after a short delay
            const timer = setTimeout(() => {
                const params = new URLSearchParams(searchParams.toString())
                params.delete("error")
                params.delete("error_code")
                params.delete("error_description")
                params.delete("sb") // Also remove Supabase's sb parameter if present

                const newQuery = params.toString()
                const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}${window.location.hash}`

                router.replace(newUrl, { scroll: false })
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [searchParams, router])

    return null
}

export function AuthErrorHandler() {
    return (
        <Suspense fallback={null}>
            <AuthErrorLogger />
        </Suspense>
    )
}
