import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Get a Second Opinion | Stork Hospital",
    description: "Request a reliable second opinion from Stork Hospital's renowned multi-specialty experts for peace of mind regarding your diagnosis and treatment.",
}

export default function SecondOpinionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
