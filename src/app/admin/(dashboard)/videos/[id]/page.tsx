'use client'

import { useState, useEffect, useMemo, use } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, ArrowLeft, Youtube, Video, Check, ChevronsUpDown, Minus, X, Save } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

interface Treatment {
    id: string
    title: string
    department_id: string | null
}

interface Department {
    id: string
    name: string
}

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const videoId = resolvedParams.id
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
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
    const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
    const [showGlobal, setShowGlobal] = useState(true)
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
                // 1. Fetch Departments
                const { data: deptData, error: deptError } = await supabase
                    .from("departments")
                    .select("id, name")
                    .order("name")

                if (deptError) throw deptError
                if (deptData) setDepartments(deptData)

                // 2. Fetch Treatments
                const { data: treatData, error: treatError } = await supabase
                    .from("treatments")
                    .select("id, title, department_id")
                    .order("title")

                if (treatError) throw treatError
                if (treatData) setTreatments(treatData)

                // 3. Fetch Video Details
                const { data: video, error: videoError } = await supabase
                    .from("treatment_videos")
                    .select("*")
                    .eq("id", videoId)
                    .single()

                if (videoError) throw videoError
                if (video) {
                    setTitle(video.title)
                    setYoutubeUrl(video.youtube_url)
                    setShowGlobal(video.show_global ?? true)
                    setIsActive(video.is_active)
                    const vidId = extractYoutubeId(video.youtube_url)
                    if (vidId) setPreviewThumbnail(generateThumbnailUrl(vidId))
                }

                // 4. Fetch Mappings
                const { data: deptMaps } = await supabase
                    .from("video_departments")
                    .select("department_id")
                    .eq("video_id", videoId)

                if (deptMaps) setSelectedDepartments(deptMaps.map(m => m.department_id))

                const { data: treatMaps } = await supabase
                    .from("video_treatments")
                    .select("treatment_id")
                    .eq("video_id", videoId)

                if (treatMaps) setSelectedTreatments(treatMaps.map(m => m.treatment_id))

            } catch (error: any) {
                console.error("Error loading data:", error)
                toast.error("Failed to load video details")
                router.push("/admin/videos")
            } finally {
                setPageLoading(false)
            }
        }
        fetchData()
    }, [videoId, supabase, router])

    // Multi-select Helpers
    const toggleDepartment = (id: string) => {
        setSelectedDepartments(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const toggleTreatment = (id: string) => {
        setSelectedTreatments(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    // Select All Logic
    const isAllDeptsSelected = selectedDepartments.length === departments.length && departments.length > 0
    const isPartialDeptsSelected = selectedDepartments.length > 0 && !isAllDeptsSelected

    const isAllTreatmentsSelected = selectedTreatments.length === treatments.length && treatments.length > 0
    const isPartialTreatmentsSelected = selectedTreatments.length > 0 && !isAllTreatmentsSelected

    const toggleAllDepartments = () => {
        if (isAllDeptsSelected) {
            setSelectedDepartments([])
        } else {
            setSelectedDepartments(departments.map(d => d.id))
        }
    }

    const toggleAllTreatments = () => {
        if (isAllTreatmentsSelected) {
            setSelectedTreatments([])
        } else {
            setSelectedTreatments(treatments.map(t => t.id))
        }
    }

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

        const youtubeId = extractYoutubeId(youtubeUrl)
        if (!youtubeId) {
            toast.error("Invalid YouTube URL")
            return
        }

        if (!title.trim()) {
            toast.error("Please enter a video title")
            return
        }

        setLoading(true)

        try {
            const embedUrl = generateEmbedUrl(youtubeId)
            const thumbnailUrl = generateThumbnailUrl(youtubeId)

            // 1. Update the video
            const { error: videoError } = await supabase
                .from("treatment_videos")
                .update({
                    title,
                    youtube_url: youtubeUrl,
                    youtube_embed_url: embedUrl,
                    thumbnail_url: thumbnailUrl,
                    is_active: isActive,
                    show_global: showGlobal,
                    updated_at: new Date().toISOString()
                })
                .eq("id", videoId)

            if (videoError) throw videoError

            // 2. Sync department mappings
            // First delete old
            const { error: delDeptError } = await supabase
                .from("video_departments")
                .delete()
                .eq("video_id", videoId)
            if (delDeptError) throw delDeptError

            // Then insert new
            if (selectedDepartments.length > 0) {
                const deptMappings = selectedDepartments.map(deptId => ({
                    video_id: videoId,
                    department_id: deptId
                }))
                const { error: deptMapError } = await supabase
                    .from("video_departments")
                    .insert(deptMappings)
                if (deptMapError) throw deptMapError
            }

            // 3. Sync treatment mappings
            // First delete old
            const { error: delTreatError } = await supabase
                .from("video_treatments")
                .delete()
                .eq("video_id", videoId)
            if (delTreatError) throw delTreatError

            // Then insert new
            if (selectedTreatments.length > 0) {
                const treatMappings = selectedTreatments.map(treatId => ({
                    video_id: videoId,
                    treatment_id: treatId
                }))
                const { error: treatMapError } = await supabase
                    .from("video_treatments")
                    .insert(treatMappings)
                if (treatMapError) throw treatMapError
            }

            toast.success("Video updated successfully")
            router.push("/admin/videos")
            router.refresh()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Failed to update video")
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
        <div className="max-w-4xl mx-auto space-y-8 font-sans pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push('/admin/videos')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-800">Edit Video</h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" disabled={loading} onClick={() => router.push('/admin/videos')}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[var(--color-primary)] text-white"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content Form */}
                <div className="md:col-span-2 space-y-6">
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

                        {/* Real-time Iframe Preview Card */}
                        {youtubeUrl ? (
                            extractYoutubeId(youtubeUrl) ? (
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md animate-in fade-in zoom-in-95 duration-300">
                                    <iframe
                                        src={generateEmbedUrl(extractYoutubeId(youtubeUrl)!)}
                                        title="YouTube video preview"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium flex items-center justify-center">
                                    Invalid YouTube URL format
                                </div>
                            )
                        ) : (
                            <div className="aspect-video w-full rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:bg-slate-100/50 hover:border-slate-300 transition-all">
                                <Youtube className="w-12 h-12 mb-4 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all" />
                                <p className="text-sm font-medium">Paste a valid URL to see preview</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                        <h3 className="font-semibold text-slate-800 border-b pb-2 mb-2">Publishing</h3>

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

                        {/* Content Distribution Section */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-1">Content Distribution</h4>
                                <p className="text-xs text-slate-500 mb-4">Select where this video should appear on the website.</p>
                            </div>

                            {/* Show on Global Page */}
                            <div className={cn("p-3 rounded-lg border transition-colors", showGlobal ? "bg-orange-50 border-orange-200" : "bg-white border-slate-200")}>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="show_global"
                                        checked={showGlobal}
                                        onCheckedChange={setShowGlobal}
                                        className="data-[state=checked]:bg-orange-600"
                                    />
                                    <div className="flex flex-col">
                                        <span className={cn("text-sm font-medium", showGlobal ? "text-orange-900" : "text-slate-700")}>Show on Video Gallery</span>
                                        <p className="text-[10px] text-slate-500">Appears on main videos page</p>
                                    </div>
                                </div>
                            </div>

                            {/* Departments Multi-select */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-semibold text-slate-700">Departments</Label>
                                    {selectedDepartments.length > 0 && (
                                        <button onClick={() => setSelectedDepartments([])} className="text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider">
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                <Popover open={openDept} onOpenChange={setOpenDept}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openDept}
                                            className="w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 focus:ring-1 focus:ring-slate-300 transition-all shadow-sm"
                                        >
                                            <span className="text-slate-500 font-normal">
                                                {isAllDeptsSelected
                                                    ? "All Selected"
                                                    : selectedDepartments.length > 0
                                                        ? `${selectedDepartments.length} selected`
                                                        : "Add departments..."}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 bg-white shadow-xl border-slate-200 rounded-lg z-[100]" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search departments..." className="h-10 border-none focus:ring-0 text-sm" />
                                            <CommandList className="max-h-[300px] overflow-y-auto">
                                                <CommandEmpty className="py-3 text-center text-sm text-slate-500">No results found.</CommandEmpty>
                                                <CommandGroup className="p-1">
                                                    <CommandItem
                                                        onSelect={toggleAllDepartments}
                                                        className="py-2 px-3 mb-1 rounded-md cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 rounded-b-none"
                                                    >
                                                        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-300 bg-white">
                                                            {isAllDeptsSelected && <Check className="h-3 w-3 text-orange-600" />}
                                                            {isPartialDeptsSelected && <Minus className="h-3 w-3 text-orange-600" />}
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-700">Select All</span>
                                                    </CommandItem>

                                                    {departments.map((d) => (
                                                        <CommandItem
                                                            key={d.id}
                                                            value={d.name}
                                                            onSelect={() => toggleDepartment(d.id)}
                                                            className={cn(
                                                                "py-2 px-3 mb-0.5 rounded-md cursor-pointer transition-colors",
                                                                selectedDepartments.includes(d.id)
                                                                    ? "bg-orange-50 text-orange-900 font-medium"
                                                                    : "hover:bg-slate-100 text-slate-700"
                                                            )}
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4 text-orange-600", selectedDepartments.includes(d.id) ? "opacity-100" : "opacity-0")} />
                                                            <span className="text-sm">{d.name}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                {/* Selected Dept Chips Area */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {isAllDeptsSelected ? (
                                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 px-2 py-0.5 text-[10px] font-bold">
                                            ALL DEPARTMENTS SELECTED
                                        </Badge>
                                    ) : (
                                        <>
                                            {selectedDepartments.slice(0, 5).map(id => {
                                                const dept = departments.find(d => d.id === id)
                                                return dept && (
                                                    <Badge key={id} variant="secondary" className="pl-2 pr-1 py-0.5 bg-slate-100 text-slate-700 border-slate-200 text-[10px] flex items-center gap-1 animate-in fade-in zoom-in-95">
                                                        {dept.name}
                                                        <button onClick={() => toggleDepartment(id)} className="hover:bg-slate-200 rounded-full p-0.5">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </Badge>
                                                )
                                            })}
                                            {selectedDepartments.length > 5 && (
                                                <Badge variant="outline" className="text-[10px] font-bold text-slate-500 border-slate-200">
                                                    +{selectedDepartments.length - 5} more
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Treatments Multi-select */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-semibold text-slate-700">Treatments</Label>
                                    {selectedTreatments.length > 0 && (
                                        <button onClick={() => setSelectedTreatments([])} className="text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider">
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                <Popover open={openTreatment} onOpenChange={setOpenTreatment}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openTreatment}
                                            className="w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 focus:ring-1 focus:ring-slate-300 transition-all shadow-sm"
                                        >
                                            <span className="text-slate-500 font-normal">
                                                {isAllTreatmentsSelected
                                                    ? "All Selected"
                                                    : selectedTreatments.length > 0
                                                        ? `${selectedTreatments.length} selected`
                                                        : "Add treatments..."}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-400" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 bg-white shadow-xl border-slate-200 rounded-lg z-[100]" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search treatments..." className="h-10 border-none focus:ring-0 text-sm" />
                                            <CommandList className="max-h-[300px] overflow-y-auto">
                                                <CommandEmpty className="py-3 text-center text-sm text-slate-500">No results found.</CommandEmpty>
                                                <CommandGroup className="p-1">
                                                    <CommandItem
                                                        onSelect={toggleAllTreatments}
                                                        className="py-2 px-3 mb-1 rounded-md cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 rounded-b-none"
                                                    >
                                                        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-300 bg-white">
                                                            {isAllTreatmentsSelected && <Check className="h-3 w-3 text-orange-600" />}
                                                            {isPartialTreatmentsSelected && <Minus className="h-3 w-3 text-orange-600" />}
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-700">Select All</span>
                                                    </CommandItem>

                                                    {treatments.map((t) => (
                                                        <CommandItem
                                                            key={t.id}
                                                            value={t.title}
                                                            onSelect={() => toggleTreatment(t.id)}
                                                            className={cn(
                                                                "py-2 px-3 mb-0.5 rounded-md cursor-pointer transition-colors",
                                                                selectedTreatments.includes(t.id)
                                                                    ? "bg-orange-50 text-orange-900 font-medium"
                                                                    : "hover:bg-slate-100 text-slate-700"
                                                            )}
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4 text-orange-600", selectedTreatments.includes(t.id) ? "opacity-100" : "opacity-0")} />
                                                            <span className="text-sm">{t.title}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                {/* Selected Treatment Chips Area */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {isAllTreatmentsSelected ? (
                                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 px-2 py-0.5 text-[10px] font-bold">
                                            ALL TREATMENTS SELECTED
                                        </Badge>
                                    ) : (
                                        <>
                                            {selectedTreatments.slice(0, 5).map(id => {
                                                const treat = treatments.find(t => t.id === id)
                                                return treat && (
                                                    <Badge key={id} variant="secondary" className="pl-2 pr-1 py-0.5 bg-slate-100 text-slate-700 border-slate-200 text-[10px] flex items-center gap-1 animate-in fade-in zoom-in-95">
                                                        {treat.title}
                                                        <button onClick={() => toggleTreatment(id)} className="hover:bg-slate-200 rounded-full p-0.5">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </Badge>
                                                )
                                            })}
                                            {selectedTreatments.length > 5 && (
                                                <Badge variant="outline" className="text-[10px] font-bold text-slate-500 border-slate-200">
                                                    +{selectedTreatments.length - 5} more
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
