import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-slate-50">
            <div className="bg-white p-8 rounded-full shadow-sm mb-6">
                <FileQuestion className="w-16 h-16 text-slate-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
            <Link href="/">
                <Button className="bg-[#FF8202] hover:bg-[#e67600] text-white px-8 h-12 text-base font-semibold rounded-full">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
