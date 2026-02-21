"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Image as ImageIcon, Loader2, Check, ChevronsUpDown, X, Minus } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { extractYoutubeId, generateEmbedUrl } from "@/lib/youtube-utils"
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

export default function EditBlogPage() {
    const router = useRouter()
    const params = useParams()
    const id = params?.id as string

    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    // Data State
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [departments, setDepartments] = useState<Department[]>([])

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: "",
        category: "Cardiology",
        image: "/images/blog-heart.png", // Default placeholder
        youtube_url: "",
        show_on_main: true,
        selected_departments: [] as string[],
        selected_treatments: [] as string[]
    })

    // UI State
    const [openDept, setOpenDept] = useState(false)
    const [openTreatment, setOpenTreatment] = useState(false)

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setPageLoading(true)
            try {
                // Fetch User
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)

                // Fetch Existing Blog Post
                if (id) {
                    const { data: blog, error: blogError } = await supabase
                        .from('blogs')
                        .select('*, blog_departments(department_id), blog_treatments(treatment_id)')
                        .eq('id', id)
                        .single()

                    if (blogError) throw blogError
                    if (blog) {
                        setFormData({
                            title: blog.title || "",
                            content: blog.content || "",
                            excerpt: blog.excerpt || "",
                            category: blog.category || "Cardiology",
                            image: blog.image_url || "/images/blog-heart.png",
                            youtube_url: blog.youtube_url || "",
                            show_on_main: blog.show_on_main ?? true,
                            selected_departments: (blog.blog_departments || []).map((d: any) => d.department_id),
                            selected_treatments: (blog.blog_treatments || []).map((t: any) => t.treatment_id)
                        })
                    }
                }

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
                toast.error("Error loading data", { description: error.message })
            } finally {
                setPageLoading(false)
            }
        }
        fetchData()
    }, [id])

    // Multi-select Helpers
    const isAllDeptsSelected = useMemo(() =>
        departments.length > 0 && formData.selected_departments.length === departments.length
        , [departments, formData.selected_departments])

    const isPartialDeptsSelected = useMemo(() =>
        formData.selected_departments.length > 0 && formData.selected_departments.length < departments.length
        , [departments, formData.selected_departments])

    const isAllTreatmentsSelected = useMemo(() =>
        treatments.length > 0 && formData.selected_treatments.length === treatments.length
        , [treatments, formData.selected_treatments])

    const isPartialTreatmentsSelected = useMemo(() =>
        formData.selected_treatments.length > 0 && formData.selected_treatments.length < treatments.length
        , [treatments, formData.selected_treatments])

    const toggleAllDepartments = () => {
        if (isAllDeptsSelected) {
            setFormData(prev => ({ ...prev, selected_departments: [] }))
        } else {
            setFormData(prev => ({ ...prev, selected_departments: departments.map(d => d.id) }))
        }
    }

    const toggleAllTreatments = () => {
        if (isAllTreatmentsSelected) {
            setFormData(prev => ({ ...prev, selected_treatments: [] }))
        } else {
            setFormData(prev => ({ ...prev, selected_treatments: treatments.map(t => t.id) }))
        }
    }

    const toggleDepartment = (id: string) => {
        setFormData(prev => ({
            ...prev,
            selected_departments: prev.selected_departments.includes(id)
                ? prev.selected_departments.filter(d => d !== id)
                : [...prev.selected_departments, id]
        }))
    }

    const toggleTreatment = (id: string) => {
        setFormData(prev => ({
            ...prev,
            selected_treatments: prev.selected_treatments.includes(id)
                ? prev.selected_treatments.filter(t => t !== id)
                : [...prev.selected_treatments, id]
        }))
    }

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const handleUpdate = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Missing Fields", {
                description: "Please fill in at least the Title and Content."
            })
            return
        }

        if (!user) {
            toast.error("Authentication Error", {
                description: "You must be logged in to update."
            })
            return
        }

        setLoading(true)

        // 1. Update Blog Base Data
        const { error: blogError } = await supabase.from('blogs').update({
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
            category: formData.category,
            image_url: formData.image,
            youtube_url: formData.youtube_url || null,
            show_on_main: formData.show_on_main,
            updated_at: new Date().toISOString()
        }).eq('id', id)

        if (blogError) {
            toast.error("Update Failed", {
                description: blogError.message
            })
            setLoading(false)
            return
        }

        // 2. Sync Department Mappings
        // Delete all then insert new (Simple approach)
        await supabase.from('blog_departments').delete().eq('blog_id', id)
        if (formData.selected_departments.length > 0) {
            const { error: deptMapError } = await supabase
                .from('blog_departments')
                .insert(formData.selected_departments.map(deptId => ({
                    blog_id: id,
                    department_id: deptId
                })))
            if (deptMapError) console.error("Dept map error:", deptMapError)
        }

        // 3. Sync Treatment Mappings
        await supabase.from('blog_treatments').delete().eq('blog_id', id)
        if (formData.selected_treatments.length > 0) {
            const { error: treatMapError } = await supabase
                .from('blog_treatments')
                .insert(formData.selected_treatments.map(treatId => ({
                    blog_id: id,
                    treatment_id: treatId
                })))
            if (treatMapError) console.error("Treat map error:", treatMapError)
        }

        toast.success("Blog Post Updated", {
            description: "Your post has been successfully updated."
        })
        router.push('/admin/blogs')
        router.refresh()
    }

    if (pageLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push('/admin/blogs')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-800">Edit Blog Post</h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" disabled={loading} onClick={() => router.push('/admin/blogs')}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[var(--color-primary)] text-white"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Update Post
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Main Content Form */}
                <div className="col-span-2 space-y-6">

                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            placeholder="Enter post title"
                            className="text-lg font-medium"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Excerpt (Short Summary)</Label>
                        <Textarea
                            className="h-20 resize-none"
                            placeholder="Brief summary for the card view..."
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Content (Markdown Supported)</Label>
                        <div className="min-h-[400px] w-full rounded-md border border-slate-300 bg-white p-4">
                            {/* Toolbar placeholder */}
                            <div className="border-b border-slate-200 pb-2 mb-4 flex gap-2 text-slate-400">
                                <Button variant="ghost" size="sm" className="h-8">B</Button>
                                <Button variant="ghost" size="sm" className="h-8 italic">I</Button>
                                <div className="w-px h-6 bg-slate-200 my-auto" />
                                <Button variant="ghost" size="sm" className="h-8">H1</Button>
                                <Button variant="ghost" size="sm" className="h-8">H2</Button>
                            </div>
                            <Textarea
                                className="min-h-[300px] border-0 focus-visible:ring-0 p-0 resize-none font-mono text-sm"
                                placeholder="Start writing your amazing article..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-semibold text-slate-800 mb-2">Publishing</h3>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select
                                className="w-full flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Wellness</option>
                                <option>Technology</option>
                                <option>Orthopedics</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Author</Label>
                            <div className="h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-500 cursor-not-allowed">
                                {user ? (user.email || 'Current User') : 'Loading...'}
                            </div>
                            <p className="text-xs text-slate-400">Posts are attributed to the logged-in user.</p>
                        </div>

                        <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-1">Content Distribution</h4>
                                <p className="text-xs text-slate-500 mb-4">Choose exactly where this blog should be published.</p>
                            </div>

                            <div className="space-y-4">
                                {/* Main Blog Checkbox */}
                                <div className={cn("p-3 rounded-lg border transition-colors", formData.show_on_main ? "bg-orange-50 border-orange-200" : "bg-white border-slate-200")}>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                            checked={formData.show_on_main}
                                            onChange={(e) => setFormData({ ...formData, show_on_main: e.target.checked })}
                                        />
                                        <span className={cn("text-sm font-medium", formData.show_on_main ? "text-orange-900" : "text-slate-700")}>Show on Global Blog Page</span>
                                    </label>
                                </div>

                                {/* Departments Multi-select */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Departments</Label>
                                        {formData.selected_departments.length > 0 && (
                                            <button
                                                onClick={() => setFormData({ ...formData, selected_departments: [] })}
                                                className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tight"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    {/* Selected Chips Area */}
                                    {formData.selected_departments.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2 animate-in fade-in slide-in-from-top-1 duration-300">
                                            {isAllDeptsSelected ? (
                                                <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                                                    All Departments Selected
                                                    <button onClick={() => setFormData(p => ({ ...p, selected_departments: [] }))} className="hover:bg-blue-700 rounded-full p-0.5 transition-colors">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {formData.selected_departments.slice(0, 5).map(id => (
                                                        <div
                                                            key={id}
                                                            className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium group transition-all hover:border-blue-200"
                                                        >
                                                            {departments.find(d => d.id === id)?.name}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleDepartment(id);
                                                                }}
                                                                className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {formData.selected_departments.length > 5 && (
                                                        <div className="inline-flex items-center bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">
                                                            +{formData.selected_departments.length - 5} more
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}

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
                                                        : formData.selected_departments.length > 0
                                                            ? `${formData.selected_departments.length} selected`
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
                                                                    formData.selected_departments.includes(d.id)
                                                                        ? "bg-orange-50 text-orange-900 font-medium"
                                                                        : "hover:bg-slate-100 text-slate-700"
                                                                )}
                                                            >
                                                                <Check className={cn("mr-2 h-4 w-4 text-orange-600", formData.selected_departments.includes(d.id) ? "opacity-100" : "opacity-0")} />
                                                                <span className="text-sm">{d.name}</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Treatments Multi-select */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Treatments</Label>
                                        {formData.selected_treatments.length > 0 && (
                                            <button
                                                onClick={() => setFormData({ ...formData, selected_treatments: [] })}
                                                className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tight"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    {/* Selected Chips Area */}
                                    {formData.selected_treatments.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2 animate-in fade-in slide-in-from-top-1 duration-300">
                                            {isAllTreatmentsSelected ? (
                                                <div className="inline-flex items-center gap-1.5 bg-green-600 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                                                    All Treatments Selected
                                                    <button onClick={() => setFormData(p => ({ ...p, selected_treatments: [] }))} className="hover:bg-green-700 rounded-full p-0.5 transition-colors">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {formData.selected_treatments.slice(0, 5).map(id => (
                                                        <div
                                                            key={id}
                                                            className="inline-flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium group transition-all hover:border-green-200"
                                                        >
                                                            {treatments.find(t => t.id === id)?.title}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleTreatment(id);
                                                                }}
                                                                className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {formData.selected_treatments.length > 5 && (
                                                        <div className="inline-flex items-center bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">
                                                            +{formData.selected_treatments.length - 5} more
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )}

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
                                                        : formData.selected_treatments.length > 0
                                                            ? `${formData.selected_treatments.length} selected`
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
                                                                    formData.selected_treatments.includes(t.id)
                                                                        ? "bg-orange-50 text-orange-900 font-medium"
                                                                        : "hover:bg-slate-100 text-slate-700"
                                                                )}
                                                            >
                                                                <Check className={cn("mr-2 h-4 w-4 text-orange-600", formData.selected_treatments.includes(t.id) ? "opacity-100" : "opacity-0")} />
                                                                <span className="text-sm">{t.title}</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-semibold text-slate-800 mb-2">Media</h3>
                        <div className="space-y-2">
                            <Label>Featured Image URL</Label>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="/images/..."
                            />
                        </div>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-center text-slate-400 bg-slate-50">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="max-h-32 object-contain" />
                            ) : (
                                <>
                                    <ImageIcon className="h-8 w-8 mb-2" />
                                    <span className="text-xs">Image Preview</span>
                                </>
                            )}
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-100 mt-4">
                            <div className="space-y-2">
                                <Label>YouTube Video URL (Optional)</Label>
                                <Input
                                    value={formData.youtube_url}
                                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                                <p className="text-xs text-slate-400">Adds a video player to the blog post.</p>
                            </div>

                            {/* Real-time Iframe Preview */}
                            {formData.youtube_url && (
                                extractYoutubeId(formData.youtube_url) ? (
                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm mt-3 animate-in fade-in zoom-in-95 duration-300">
                                        <iframe
                                            src={generateEmbedUrl(extractYoutubeId(formData.youtube_url)!)}
                                            title="YouTube video preview"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-xs font-medium flex items-center justify-center mt-3">
                                        Invalid YouTube URL format
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
