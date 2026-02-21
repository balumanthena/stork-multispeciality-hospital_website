"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { extractYoutubeId } from "@/lib/youtube-utils"

export default function NewTreatmentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState<any[]>([])
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        content: "",
        department_id: "",
        videoId: ""
    })

    useEffect(() => {
        const fetchDepartments = async () => {
            const { data } = await supabase.from('service_categories').select('id, name')
            if (data?.length) {
                setDepartments(data)
                setFormData(prev => ({ ...prev, department_id: data[0].id }))
            }
        }
        fetchDepartments()
    }, [])

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const handleSave = async () => {
        if (!formData.title || !formData.summary) {
            toast.error("Missing Information", {
                description: "Please fill in Title and Summary."
            })
            return
        }

        if (!formData.department_id) {
            toast.error("Department Required", {
                description: "Please select a department."
            })
            return
        }

        setLoading(true)
        const slug = generateSlug(formData.title)

        // Construct YouTube URL if video ID is provided
        let youtubeUrl = null
        if (formData.videoId) {
            const extractedId = extractYoutubeId(formData.videoId);
            youtubeUrl = extractedId
                ? `https://www.youtube.com/watch?v=${extractedId}`
                : formData.videoId; // Fallback to raw string if parsing fails entirely
        }

        const { error } = await supabase.from('services').insert({
            title: formData.title,
            slug: slug,
            summary: formData.summary,
            content: formData.content || formData.summary,
            department_id: formData.department_id,
            youtube_url: youtubeUrl
        })

        if (error) {
            toast.error("Creation Failed", {
                description: "Error creating treatment: " + error.message
            })
            setLoading(false)
        } else {
            toast.success("Treatment Created", {
                description: "New treatment has been successfully added."
            })
            router.push('/admin/services')
            router.refresh()
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push('/admin/services')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-800">Add New Treatment</h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" disabled={loading} onClick={() => router.push('/admin/services')}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[var(--color-primary)] text-white"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Treatment
                    </Button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-2">
                    <Label>Treatment Title</Label>
                    <Input
                        placeholder="e.g. Total Knee Replacement"
                        className="text-lg font-medium"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Department</Label>
                        <select
                            className="w-full flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            value={formData.department_id}
                            onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                        >
                            {departments.length === 0 && <option>Loading departments...</option>}
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>YouTube Video ID or URL</Label>
                        <Input
                            placeholder="e.g. dQw4w9WgXcQ"
                            value={formData.videoId}
                            onChange={(e) => setFormData({ ...formData, videoId: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Summary (Displayed in cards)</Label>
                    <Textarea
                        className="h-24 resize-none"
                        placeholder="Brief description of the treatment..."
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Detailed Content</Label>
                    <Textarea
                        className="min-h-[200px]"
                        placeholder="Detailed explanation, symptoms, causes..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>
            </div>

        </div>
    )
}
