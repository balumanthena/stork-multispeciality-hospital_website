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
    const [targetType, setTargetType] = useState<"main" | "department" | "treatment">("main")
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

        if (targetType === "department" && !departmentId) {
            toast.error("Please select a department")
            return
        }

        if (targetType === "treatment" && !treatmentId) {
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
                department_id: targetType === 'department' ? departmentId : null,
                treatment_id: targetType === 'treatment' ? treatmentId : null,
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
        <div className="max-w-4xl mx-auto space-y-8 font-sans">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push('/admin/videos')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-800">Add New Video</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" disabled={loading} onClick={() => router.push('/admin/videos')}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[var(--color-primary)] text-white"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Video className="h-4 w-4 mr-2" />}
                        Publish Video
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Main Content Form */}
                <div className="col-span-2 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Video Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g., Understanding Robotic Knee Replacement"
                            className="text-lg font-medium"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* YouTube URL Input & Preview */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url">YouTube URL</Label>
                            <div className="relative">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="url"
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="pl-12 h-10 text-sm focus:ring-2"
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

                </div>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-semibold text-slate-800 mb-2">Publishing</h3>

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4 bg-slate-50/50">
                        <div className="space-y-1">
                            <Label className="text-sm font-semibold text-slate-900 cursor-pointer" htmlFor="active-mode">Active Status</Label>
                            <p className="text-xs text-slate-500">Enable to show publicly</p>
                        </div>
                        <Switch
                            id="active-mode"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                            className="data-[state=checked]:bg-[var(--color-primary)]"
                        />
                    </div>

                    {/* Target Placement */}
                    <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Target Placement</h4>
                            <p className="text-xs text-slate-500 mb-4">Choose exactly where this video should be published.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Main Video */}
                            <div className={cn("flex flex-col p-4 rounded-xl border transition-all duration-200", targetType === 'main' ? "bg-blue-50/50 border-blue-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="radio" name="target_type" value="main" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer" checked={targetType === 'main'} onChange={() => { setTargetType('main'); setDepartmentId(""); setTreatmentId(""); }} />
                                    <div className="flex flex-col">
                                        <span className={cn("text-sm font-semibold", targetType === 'main' ? "text-blue-900" : "text-slate-700")}>Main Video Gallery</span>
                                        <span className="text-xs text-slate-500 mt-0.5">Appears in the general video section</span>
                                    </div>
                                </label>
                            </div>

                            {/* Department */}
                            <div className={cn("flex flex-col p-4 rounded-xl border transition-all duration-200", targetType === 'department' ? "bg-blue-50/50 border-blue-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="radio" name="target_type" value="department" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer" checked={targetType === 'department'} onChange={() => { setTargetType('department'); setDepartmentId(""); setTreatmentId(""); }} />
                                    <div className="flex flex-col">
                                        <span className={cn("text-sm font-semibold", targetType === 'department' ? "text-blue-900" : "text-slate-700")}>Specific Department</span>
                                        <span className="text-xs text-slate-500 mt-0.5">Links this video to a specific center of excellence</span>
                                    </div>
                                </label>

                                {targetType === "department" && (
                                    <div className="mt-4 pt-4 border-t border-blue-100/50">
                                        <Popover open={openDept} onOpenChange={setOpenDept}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openDept}
                                                    className="w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 focus:ring-1 focus:ring-slate-300 transition-all shadow-sm"
                                                >
                                                    <div className="flex items-center gap-2 truncate text-slate-700 font-medium">
                                                        {departmentId
                                                            ? departments.find((d) => d.id === departmentId)?.name
                                                            : <span className="text-slate-400 font-normal">Select a department...</span>}
                                                    </div>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0 bg-white shadow-lg border-slate-200 rounded-lg z-[100]" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Search department..." className="h-10 border-none focus:ring-0 text-sm" />
                                                    <CommandList className="max-h-[200px] overflow-y-auto">
                                                        <CommandEmpty className="py-3 text-center text-sm text-slate-500">No results found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {departments.map((d) => (
                                                                <CommandItem
                                                                    key={d.id}
                                                                    value={d.name}
                                                                    onSelect={() => {
                                                                        setDepartmentId(d.id)
                                                                        setTreatmentId("")
                                                                        setOpenDept(false)
                                                                    }}
                                                                    className="py-2.5 px-3 mb-0.5 rounded-md cursor-pointer data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900 transition-colors"
                                                                >
                                                                    <Check className={cn("mr-2 h-4 w-4", departmentId === d.id ? "text-slate-700 opacity-100" : "opacity-0")} />
                                                                    <span className="font-medium text-sm">{d.name}</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
                            </div>

                            {/* Treatment */}
                            <div className={cn("flex flex-col p-4 rounded-xl border transition-all duration-200", targetType === 'treatment' ? "bg-blue-50/50 border-blue-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="radio" name="target_type" value="treatment" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer" checked={targetType === 'treatment'} onChange={() => { setTargetType('treatment'); setDepartmentId(""); setTreatmentId(""); }} />
                                    <div className="flex flex-col">
                                        <span className={cn("text-sm font-semibold", targetType === 'treatment' ? "text-blue-900" : "text-slate-700")}>Specific Treatment</span>
                                        <span className="text-xs text-slate-500 mt-0.5">Links this video to a specific procedure</span>
                                    </div>
                                </label>

                                {targetType === "treatment" && (
                                    <div className="mt-4 pt-4 border-t border-blue-100/50">
                                        <Popover open={openTreatment} onOpenChange={setOpenTreatment}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openTreatment}
                                                    className={cn(
                                                        "w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 focus:ring-1 focus:ring-slate-300 transition-all shadow-sm",
                                                        !treatmentId && "text-slate-400 font-normal"
                                                    )}
                                                >
                                                    <div className="truncate text-slate-700 font-medium">
                                                        {treatmentId
                                                            ? treatments.find((t) => t.id === treatmentId)?.title
                                                            : "Search treatment..."}
                                                    </div>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[300px] p-0 bg-white shadow-lg border-slate-200 rounded-lg z-[100]" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Search treatment..." className="h-10 border-none focus:ring-0 text-sm" />
                                                    <CommandList className="max-h-[200px] overflow-y-auto">
                                                        <CommandEmpty className="py-3 text-center text-sm text-slate-500">No results found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {filteredTreatments.map((t) => (
                                                                <CommandItem
                                                                    key={t.id}
                                                                    value={t.title}
                                                                    onSelect={() => {
                                                                        setTreatmentId(t.id)
                                                                        setDepartmentId(t.department_id || "")
                                                                        setOpenTreatment(false)
                                                                    }}
                                                                    className="py-2.5 px-3 mb-0.5 rounded-md cursor-pointer data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900 transition-colors"
                                                                >
                                                                    <Check className={cn("mr-2 h-4 w-4", treatmentId === t.id ? "text-slate-700 opacity-100" : "opacity-0")} />
                                                                    <span className="font-medium text-sm">{t.title}</span>
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
