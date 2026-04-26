"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Image as ImageIcon, Loader2, Check, ChevronsUpDown, X, Minus, Eye, Settings, List, HelpCircle, MousePointerClick, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { SEOAnalyzerPanel } from "@/components/admin/seo-analyzer-panel"
import BlogView from "@/components/blog/blog-view"
import { cn } from "@/lib/utils"
import { extractYoutubeId, generateEmbedUrl } from "@/lib/youtube-utils"
import { getDepartmentIcon } from "@/lib/data/department-icons"
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
    slug: string
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
        category: "",
        image: "/images/blog-heart.png", // Default placeholder
        youtube_url: "",
        show_on_main: true,
        selected_departments: [] as string[],
        selected_treatments: [] as string[],
        slug: "",
        meta_title: "",
        meta_description: "",
        status: "Published",
        focus_keyword: "",
        enable_toc: false,
        enable_faq: false,
        faq_data: [] as { question: string, answer: string }[],
        enable_sticky_cta: false,
        sticky_cta_text: "",
        sticky_cta_link: ""
    })

    // UI State
    const [openDept, setOpenDept] = useState(false)
    const [openTreatment, setOpenTreatment] = useState(false)

    const uploadImage = async (file: File) => {
        // Client-side validation
        const MAX_SIZE = 500 * 1024; // 500KB
        if (file.size > MAX_SIZE) {
            toast.error('Image too large', {
                description: `Max size allowed is 500KB. Your image is ${(file.size / 1024).toFixed(2)}KB.`
            });
            return null;
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
        const filePath = `blog-images/${fileName}`

        try {
            const { error: uploadError } = await supabase.storage
                .from('blog-media')
                .upload(filePath, file, { upsert: false })

            if (uploadError) {
                if (uploadError.message.includes('maximum allowed size')) {
                    toast.error('Upload Failed', {
                        description: 'The image exceeds the server\'s storage limit. Please try a smaller image.'
                    });
                } else {
                    toast.error('Failed to upload image.', {
                        description: uploadError.message
                    });
                }
                return null;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('blog-media')
                .getPublicUrl(filePath)

            return publicUrl
        } catch (error: any) {
            console.error('Upload Error:', error)
            toast.error('Upload Error', {
                description: 'An unexpected error occurred while uploading.'
            })
            return null
        }
    }

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
                            category: blog.category || "",
                            image: blog.image_url || "/images/blog-heart.png",
                            youtube_url: blog.youtube_url || "",
                            show_on_main: blog.show_on_main ?? true,
                            selected_departments: blog.blog_departments?.map((d: any) => d.department_id) || [],
                            selected_treatments: blog.blog_treatments?.map((t: any) => t.treatment_id) || [],
                            slug: blog.slug || "",
                            meta_title: blog.meta_title || "",
                            meta_description: blog.meta_description || "",
                            status: blog.status || "Published",
                            focus_keyword: blog.focus_keyword || "",
                            enable_toc: blog.enable_toc ?? false,
                            enable_faq: blog.enable_faq ?? false,
                            faq_data: blog.faq_data || [],
                            enable_sticky_cta: blog.enable_sticky_cta ?? false,
                            sticky_cta_text: blog.sticky_cta_text || "",
                            sticky_cta_link: blog.sticky_cta_link || ""
                        })
                    }
                }

                // Fetch Departments
                const { data: deptData, error: deptError } = await supabase
                    .from("departments")
                    .select("id, name, slug")
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

    // Auto-generate slug from title
    useEffect(() => {
        if (!formData.slug && formData.title) {
            setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
        }
    }, [formData.title])

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
            slug: formData.slug || generateSlug(formData.title),
            content: formData.content,
            excerpt: formData.excerpt || formData.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
            category: formData.category,
            image_url: formData.image,
            youtube_url: formData.youtube_url || null,
            show_on_main: formData.show_on_main,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || null,
            focus_keyword: formData.focus_keyword || null,
            enable_toc: formData.enable_toc,
            enable_faq: formData.enable_faq,
            faq_data: formData.faq_data,
            enable_sticky_cta: formData.enable_sticky_cta,
            sticky_cta_text: formData.sticky_cta_text || null,
            sticky_cta_link: formData.sticky_cta_link || null,
            status: formData.status,
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

    // Debounced Preview State
    const [debouncedFormData, setDebouncedFormData] = useState(formData);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedFormData(formData), 300);
        return () => clearTimeout(timer);
    }, [formData]);

    if (pageLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen -m-6 bg-slate-50 flex flex-col">

            {/* ─── Top Header Bar ─── */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 shrink-0">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={() => router.push('/admin/blogs')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-5 bg-slate-200" />
                        <h1 className="text-sm font-semibold text-slate-800">Edit Blog Post</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-600 h-8" disabled={loading} onClick={() => router.push('/admin/blogs')}>
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="bg-orange-600 hover:bg-orange-700 text-white h-8 px-4 font-semibold"
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
                            Update Post
                        </Button>
                    </div>
                </div>
            </div>

            {/* ─── Main Content Area (3-Column Layout) ─── */}
            <div className="flex flex-1 overflow-hidden h-[calc(100vh-56px)]">
                {/* ─── 1. Editor Column (40%) ─── */}
                <div className="w-[45%] flex-shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
                    {/* Title & Excerpt */}
                    <div className="border-b border-slate-100 py-10 px-8 bg-slate-50/50">
                        <div className="max-w-[720px] mx-auto space-y-6">
                            <input
                                type="text"
                                placeholder="Post Title"
                                className="w-full text-4xl font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-0 placeholder:text-slate-300 tracking-tight"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Write a short summary..."
                                className="w-full text-lg text-slate-600 bg-transparent border-none outline-none focus:ring-0 placeholder:text-slate-300 resize-none leading-relaxed"
                                rows={2}
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-white">
                        <TiptapEditor
                            value={formData.content}
                            onChange={(value) => setFormData({ ...formData, content: value })}
                        />
                    </div>
                </div>

                {/* ─── 2. Live Preview Column (flex-1) ─── */}
                <div className="flex-1 bg-slate-200/50 overflow-y-auto relative p-6">
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white rounded-full text-[10px] font-black tracking-widest uppercase z-10 shadow-sm backdrop-blur-md">
                        LIVE PREVIEW
                    </div>
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden min-h-full border border-slate-200 pointer-events-none transform origin-top w-full">
                        <BlogView initialData={{
                            id: id || "preview",
                            created_at: new Date().toISOString(),
                            slug: debouncedFormData.slug || "preview",
                            title: debouncedFormData.title || "Preview Title",
                            content: debouncedFormData.content || "<p>Start writing your article...</p>",
                            excerpt: debouncedFormData.excerpt || "Preview excerpt",
                            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                            published: debouncedFormData.status === "Published",
                            published_at: new Date().toISOString(),
                            author: user?.email || "Author",
                            category: debouncedFormData.category || "General",
                            image_url: debouncedFormData.image,
                            image: debouncedFormData.image,
                            youtube_url: debouncedFormData.youtube_url,
                            show_on_main: debouncedFormData.show_on_main,
                            selected_departments: debouncedFormData.selected_departments,
                            selected_treatments: debouncedFormData.selected_treatments,
                            enable_toc: debouncedFormData.enable_toc,
                            enable_faq: debouncedFormData.enable_faq,
                            faq_data: debouncedFormData.faq_data,
                            enable_sticky_cta: debouncedFormData.enable_sticky_cta,
                            sticky_cta_text: debouncedFormData.sticky_cta_text,
                            sticky_cta_link: debouncedFormData.sticky_cta_link
                        } as any} />
                    </div>
                </div>

                {/* ─── 3. Right Panel (fixed 340px) ─── */}
                <div className="w-[340px] flex-shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
                    <div className="p-5 space-y-6">
                        {/* Publishing Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Publishing</h3>
                            <div className="space-y-3">
                            <Label>Category</Label>
                            <select
                                className="w-full flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                                value={formData.category}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const selectedDept = departments.find(d => d.name === val);
                                    let imagePath = "/images/blog-heart.png";
                                    if (selectedDept && selectedDept.slug) {
                                        imagePath = getDepartmentIcon(selectedDept.slug) || `/images/${selectedDept.slug}.png`;
                                    }
                                    setFormData({ ...formData, category: val, image: imagePath });
                                }}
                            >
                                <option value="" disabled>Select a department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select
                                className="w-full flex h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Scheduled">Scheduled</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Author</Label>
                            <div className="h-10 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-500 cursor-not-allowed">
                                {user ? (user.email || 'Current User') : 'Loading...'}
                            </div>
                            <p className="text-xs text-slate-400">Posts are attributed to the logged-in user.</p>
                        </div>
                        </div>

                        {/* Featured Image Section */}
                        <div className="border-t border-slate-200 pt-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Featured Image</h3>
                                {formData.image && (
                                    <button 
                                        onClick={() => setFormData({ ...formData, image: '' })}
                                        className="text-[10px] text-red-500 font-bold uppercase hover:underline"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            
                            {formData.image ? (
                                <div className="relative group aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                                    <img src={formData.image} alt="Featured" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 transition-all">
                                            Change Image
                                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const url = await uploadImage(file);
                                                    if (url) setFormData({ ...formData, image: url });
                                                }
                                                e.target.value = ''; // Allow re-uploading same file to trigger warning
                                            }} />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-slate-400 mb-2 transition-colors" />
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Upload Featured Image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const url = await uploadImage(file);
                                            if (url) setFormData({ ...formData, image: url });
                                        }
                                        e.target.value = ''; // Allow re-uploading same file to trigger warning
                                    }} />
                                </label>
                            )}
                            <p className="text-[10px] text-slate-400 leading-tight">Recommended size: 1200x630px. Max limit: 500KB.</p>
                        </div>

                        <div className="border-t border-slate-200 pt-5 space-y-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Distribution</h3>

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
                                                            className="inline-flex items-center gap-1.5 bg-orange-50 border border-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium group transition-all hover:border-orange-200"
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

                        <div className="border-t border-slate-200 pt-5 space-y-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Video Media</h3>
                            <div className="space-y-4">
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

                        {/* SEO Settings Section */}
                        <div className="border-t border-slate-200 pt-5 space-y-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SEO Settings</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>Title Tag</Label>
                                    <span className={cn("text-xs", formData.meta_title.length > 60 ? "text-red-500 font-bold" : "text-slate-400")}>
                                        {formData.meta_title.length} / 60
                                    </span>
                                </div>
                                <Input
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    placeholder="SEO Title (Max 60 chars)"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>Meta Description</Label>
                                    <span className={cn("text-xs", formData.meta_description.length > 155 ? "text-red-500 font-bold" : "text-slate-400")}>
                                        {formData.meta_description.length} / 155
                                    </span>
                                </div>
                                <Textarea
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="SEO Description (Max 155 chars)"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Focus Keyword</Label>
                                <Input
                                    value={formData.focus_keyword}
                                    onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })}
                                    placeholder="e.g. knee replacement surgery"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>URL Slug</Label>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="Auto-generated if left empty"
                                />
                                <p className="text-xs text-slate-400">Leave empty to auto-generate from title.</p>
                            </div>
                        </div>

                        <SEOAnalyzerPanel
                            title={formData.meta_title}
                            description={formData.meta_description}
                            content={formData.content}
                            keyword={formData.focus_keyword}
                        />

                        {/* Advanced Content Features Section */}
                        <div className="border-t border-slate-200 pt-5 space-y-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Advanced</h3>
                            <div className="space-y-6 divide-y divide-slate-100">
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <Label className="text-sm font-bold text-slate-800">Table of Contents</Label>
                                        <p className="text-xs text-slate-500 mt-0.5">Auto-generate a clickable TOC from H2/H3 tags.</p>
                                    </div>
                                    <Button variant={formData.enable_toc ? "default" : "outline"} onClick={() => setFormData({ ...formData, enable_toc: !formData.enable_toc })} className={cn("w-14", formData.enable_toc && "bg-green-600 hover:bg-green-700 text-white")}>{formData.enable_toc ? "ON" : "OFF"}</Button>
                                </div>
                                <div className="pt-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MousePointerClick className="w-4 h-4 text-slate-400" />
                                            <div>
                                                <Label className="text-sm font-bold text-slate-800">Sticky CTA Button</Label>
                                                <p className="text-xs text-slate-500 mt-0.5">Show a floating button at the bottom.</p>
                                            </div>
                                        </div>
                                        <Button variant={formData.enable_sticky_cta ? "default" : "outline"} onClick={() => setFormData({ ...formData, enable_sticky_cta: !formData.enable_sticky_cta })} className={cn("w-14", formData.enable_sticky_cta && "bg-green-600 hover:bg-green-700 text-white")}>{formData.enable_sticky_cta ? "ON" : "OFF"}</Button>
                                    </div>
                                    {formData.enable_sticky_cta && (
                                        <div className="pl-6 space-y-3 border-l-2 border-slate-100">
                                            <div className="space-y-1"><Label className="text-xs">Button Text</Label><Input value={formData.sticky_cta_text} onChange={(e) => setFormData({ ...formData, sticky_cta_text: e.target.value })} placeholder="e.g. Book Consultation" className="h-8 text-sm" /></div>
                                            <div className="space-y-1"><Label className="text-xs">Button Link URL</Label><Input value={formData.sticky_cta_link} onChange={(e) => setFormData({ ...formData, sticky_cta_link: e.target.value })} placeholder="/contact" className="h-8 text-sm" /></div>
                                        </div>
                                    )}
                                </div>
                                <div className="pt-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4 text-slate-400" />
                                            <div>
                                                <Label className="text-sm font-bold text-slate-800">FAQ Schema & Section</Label>
                                                <p className="text-xs text-slate-500 mt-0.5">Add SEO-optimized FAQs.</p>
                                            </div>
                                        </div>
                                        <Button variant={formData.enable_faq ? "default" : "outline"} onClick={() => setFormData({ ...formData, enable_faq: !formData.enable_faq })} className={cn("w-14", formData.enable_faq && "bg-green-600 hover:bg-green-700 text-white")}>{formData.enable_faq ? "ON" : "OFF"}</Button>
                                    </div>
                                    {formData.enable_faq && (
                                        <div className="pl-6 space-y-3 border-l-2 border-slate-100">
                                            {formData.faq_data.map((faq, index) => (
                                                <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-100 relative group">
                                                    <button onClick={() => { const newFaqs = [...formData.faq_data]; newFaqs.splice(index, 1); setFormData({ ...formData, faq_data: newFaqs }) }} className="absolute -right-2 -top-2 bg-white text-red-500 border border-slate-200 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 shadow-sm"><Trash2 className="w-3 h-3" /></button>
                                                    <Input value={faq.question} onChange={(e) => { const newFaqs = [...formData.faq_data]; newFaqs[index].question = e.target.value; setFormData({ ...formData, faq_data: newFaqs }) }} placeholder="Question..." className="h-8 text-sm font-bold mb-2 bg-white" />
                                                    <Textarea value={faq.answer} onChange={(e) => { const newFaqs = [...formData.faq_data]; newFaqs[index].answer = e.target.value; setFormData({ ...formData, faq_data: newFaqs }) }} placeholder="Answer..." className="text-sm min-h-[60px] bg-white" />
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, faq_data: [...formData.faq_data, { question: "", answer: "" }] })} className="w-full text-xs font-bold border-dashed border-2 hover:bg-slate-50"><Plus className="w-3 h-3 mr-1" /> Add FAQ</Button>
                                        </div>
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
