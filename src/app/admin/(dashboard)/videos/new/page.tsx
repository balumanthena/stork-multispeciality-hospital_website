'use client'

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, ArrowLeft, Youtube, Video, Check, ChevronsUpDown } from "lucide-react"
import Link from "next/link"
import { extractYoutubeId, generateEmbedUrl, generateThumbnailUrl } from "@/lib/youtube-utils"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Treatment {
    id: string
    title: string
    department_id: string | null
}

interface Department {
    id: string
    name: string
}

export default function NewVideoPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)

    // Data State
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [departments, setDepartments] = useState<Department[]>([])

    // Form State
    const [title, setTitle] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [departmentId, setDepartmentId] = useState("")
    const [treatmentId, setTreatmentId] = useState("")
    const [isActive, setIsActive] = useState(true)

    // UI State
    const [openDept, setOpenDept] = useState(false)
    const [openTreatment, setOpenTreatment] = useState(false)

    // Derived State
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null)

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setPageLoading(true)
            try {
                // Fetch Departments
                const { data: deptData, error: deptError } = await supabase
                    .from("departments")
                    .select("id, name")
                    .order("name")

                if (deptError) throw deptError
                if (deptData) setDepartments(deptData)

                // Fetch Treatments
                const { data: treatData, error: treatError } = await supabase
                    .from("treatments")
                    .select("id, title, department_id")
                    .order("title")

                if (treatError) throw treatError
                if (treatData) setTreatments(treatData)

            } catch (error: any) {
                console.error("Error loading data:", error)
                toast.error("Failed to load data")
            } finally {
                setPageLoading(false)
            }
        }
        fetchData()
    }, [])

    // Filter Treatments based on Department
    const filteredTreatments = useMemo(() => {
        if (!departmentId) return treatments
        return treatments.filter(t => t.department_id === departmentId)
    }, [treatments, departmentId])

    // Handle Youtube URL Change
    const handleUrlChange = (url: string) => {
        setYoutubeUrl(url)
        const videoId = extractYoutubeId(url)
        if (videoId) {
            setPreviewThumbnail(generateThumbnailUrl(videoId))
        } else {
            setPreviewThumbnail(null)
        }
    }

    // Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const videoId = extractYoutubeId(youtubeUrl)
        if (!videoId) {
            toast.error("Invalid YouTube URL")
            return
        }

        if (!title.trim()) {
            toast.error("Please enter a video title")
            return
        }

        if (!treatmentId) {
            toast.error("Please select a treatment")
            return
        }

        setLoading(true)

        try {
            const embedUrl = generateEmbedUrl(videoId)
            const thumbnailUrl = generateThumbnailUrl(videoId)

            const { error } = await supabase.from("treatment_videos").insert({
                title,
                youtube_url: youtubeUrl,
                youtube_embed_url: embedUrl,
                thumbnail_url: thumbnailUrl,
                treatment_id: treatmentId,
                is_active: isActive
            })

            if (error) throw error

            toast.success("Video added successfully")
            router.push("/admin/videos")
            router.refresh()
        } catch (err) {
            console.error(err)
            toast.error("Failed to add video")
        } finally {
            setLoading(false)
        }
    }

    if (pageLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto font-sans">
            <Link href="/admin/videos" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Videos
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                <Video className="w-6 h-6" />
                            </span>
                            Add New Video
                        </h1>
                        <p className="text-slate-500 mt-1 ml-14">Link a YouTube video to a medical treatment</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {/* Department & Treatment Selection Group */}
                    <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                        {/* Department Select */}
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm font-semibold text-slate-700">Filter by Department</Label>
                            <Popover open={openDept} onOpenChange={setOpenDept}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openDept}
                                        className="w-full justify-between h-12 px-4 text-base rounded-xl border-slate-200 bg-white hover:bg-slate-50 hover:border-orange-200 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            {departmentId
                                                ? departments.find((d) => d.id === departmentId)?.name
                                                : <span className="text-slate-400">All Departments</span>}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 bg-white shadow-xl border-slate-100 rounded-xl" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search department..." className="h-11" />
                                        <CommandList>
                                            <CommandEmpty>No department found.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem
                                                    value="all"
                                                    onSelect={() => {
                                                        setDepartmentId("")
                                                        setOpenDept(false)
                                                    }}
                                                    className="py-3 px-4 cursor-pointer"
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", !departmentId ? "opacity-100" : "opacity-0")} />
                                                    All Departments
                                                </CommandItem>
                                                {departments.map((d) => (
                                                    <CommandItem
                                                        key={d.id}
                                                        value={d.name}
                                                        onSelect={() => {
                                                            setDepartmentId(d.id)
                                                            setOpenDept(false)
                                                        }}
                                                        className="py-3 px-4 cursor-pointer data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", departmentId === d.id ? "opacity-100" : "opacity-0")} />
                                                        {d.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Treatment Select */}
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm font-semibold text-slate-700">Select Treatment</Label>
                            <Popover open={openTreatment} onOpenChange={setOpenTreatment}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openTreatment}
                                        className={cn(
                                            "w-full justify-between h-12 px-4 text-base rounded-xl border-slate-200 bg-white hover:bg-slate-50 hover:border-orange-200 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm",
                                            !treatmentId && "text-slate-400"
                                        )}
                                    >
                                        {treatmentId
                                            ? treatments.find((t) => t.id === treatmentId)?.title
                                            : "Search treatment..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0 bg-white shadow-xl border-slate-100 rounded-xl" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search treatment..." className="h-11" />
                                        <CommandList className="max-h-[300px]">
                                            <CommandEmpty>No treatment found.</CommandEmpty>
                                            <CommandGroup>
                                                {filteredTreatments.map((t) => (
                                                    <CommandItem
                                                        key={t.id}
                                                        value={t.title}
                                                        onSelect={() => {
                                                            setTreatmentId(t.id)
                                                            setOpenTreatment(false)
                                                        }}
                                                        className="py-3 px-4 cursor-pointer data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", treatmentId === t.id ? "opacity-100" : "opacity-0")} />
                                                        {t.title}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {departmentId && (
                                <p className="text-xs text-slate-500 px-1">
                                    Showing {filteredTreatments.length} treatments in {departments.find(d => d.id === departmentId)?.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* YouTube URL Input & Preview */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="url" className="text-sm font-semibold text-slate-700">YouTube URL</Label>
                            <div className="relative">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="url"
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="pl-12 h-12 rounded-xl text-base border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                    value={youtubeUrl}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Thumbnail Preview Card */}
                        {previewThumbnail ? (
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md animate-in fade-in zoom-in-95 duration-300 group">
                                <img
                                    src={previewThumbnail}
                                    alt="Video Preview"
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-video w-full rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:bg-slate-100/50 hover:border-slate-300 transition-all">
                                <Youtube className="w-12 h-12 mb-3 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all" />
                                <p className="text-sm font-medium">Paste a valid URL to see preview</p>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Video Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Understanding Robotic Knee Replacement"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="h-12 rounded-xl text-base border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <div className="space-y-1">
                            <Label className="text-base font-semibold text-slate-900 cursor-pointer" htmlFor="active-mode">Active Status</Label>
                            <p className="text-sm text-slate-500">Enable to show this video on the public website immediately</p>
                        </div>
                        <Switch
                            id="active-mode"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                            className="data-[state=checked]:bg-orange-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 text-white min-w-[200px] h-12 rounded-xl text-base font-medium shadow-orange-200 shadow-lg hover:shadow-xl transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Publishing...
                                </>
                            ) : "Publish Video"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
