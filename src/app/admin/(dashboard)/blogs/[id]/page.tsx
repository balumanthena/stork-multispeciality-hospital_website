"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Image as ImageIcon, Loader2, Check, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
        target_type: "main", // "main" | "department" | "treatment"
        department_id: "",
        treatment_id: ""
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
                        .select('*')
                        .eq('id', id)
                        .single()

                    if (blogError) throw blogError
                    if (blog) {
                        let initialTarget = "main"
                        if (blog.department_id) initialTarget = "department"
                        else if (blog.treatment_id) initialTarget = "treatment"

                        setFormData({
                            title: blog.title || "",
                            content: blog.content || "",
                            excerpt: blog.excerpt || "",
                            category: blog.category || "Cardiology",
                            image: blog.image_url || "/images/blog-heart.png",
                            youtube_url: blog.youtube_url || "",
                            target_type: initialTarget,
                            department_id: blog.department_id || "",
                            treatment_id: blog.treatment_id || ""
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

    // Filter Treatments based on Department (if a department is selected, otherwise show all)
    const filteredTreatments = useMemo(() => {
        if (!formData.department_id) return treatments
        return treatments.filter(t => t.department_id === formData.department_id)
    }, [treatments, formData.department_id])

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
        // We generally don't update slug to preserve SEO, unless explicitly requested. 
        // For now, let's keep the slug as is, or regenerate if they desire? 
        // Usually better NOT to change slug on edit. 

        const { error } = await supabase.from('blogs').update({
            title: formData.title,
            // slug: slug, // Keep original slug
            content: formData.content,
            excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
            category: formData.category,
            // author_id: user.id, // Keep original author
            image_url: formData.image,
            youtube_url: formData.youtube_url || null,
            department_id: formData.target_type === 'department' ? formData.department_id : null,
            treatment_id: formData.target_type === 'treatment' ? formData.treatment_id : null,
            updated_at: new Date().toISOString()
        }).eq('id', id)

        if (error) {
            toast.error("Update Failed", {
                description: error.message
            })
            setLoading(false)
        } else {
            toast.success("Blog Post Updated", {
                description: "Your post has been successfully updated."
            })
            router.push('/admin/blogs')
            router.refresh()
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
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push('/admin/blogs')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-800">Edit Blog Post</h1>
                </div>
                <div className="flex gap-3">
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
                                <h4 className="text-sm font-bold text-slate-800 mb-1">Target Placement</h4>
                                <p className="text-xs text-slate-500 mb-4">Choose exactly where this blog should be published.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {/* Main Blog */}
                                <div className={cn("flex flex-col p-4 rounded-xl border transition-all duration-200", formData.target_type === 'main' ? "bg-blue-50/50 border-blue-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="radio" name="target_type" value="main" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer" checked={formData.target_type === 'main'} onChange={() => setFormData({ ...formData, target_type: 'main', department_id: "", treatment_id: "" })} />
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-semibold", formData.target_type === 'main' ? "text-blue-900" : "text-slate-700")}>Main Blog Page</span>
                                            <span className="text-xs text-slate-500 mt-0.5">Appears in the general blog section</span>
                                        </div>
                                    </label>
                                </div>

                                {/* Department */}
                                <div className={cn("flex flex-col p-4 rounded-xl border transition-all duration-200", formData.target_type === 'department' ? "bg-blue-50/50 border-blue-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="radio" name="target_type" value="department" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer" checked={formData.target_type === 'department'} onChange={() => setFormData({ ...formData, target_type: 'department', department_id: "", treatment_id: "" })} />
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-semibold", formData.target_type === 'department' ? "text-blue-900" : "text-slate-700")}>Specific Department</span>
                                            <span className="text-xs text-slate-500 mt-0.5">Links this post to a specific center of excellence</span>
                                        </div>
                                    </label>

                                    {formData.target_type === "department" && (
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
                                                            {formData.department_id
                                                                ? departments.find((d) => d.id === formData.department_id)?.name
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
                                                                            setFormData({ ...formData, target_type: 'department', department_id: d.id, treatment_id: "" })
                                                                            setOpenDept(false)
                                                                        }}
                                                                        className="py-2.5 px-3 mb-0.5 rounded-md cursor-pointer data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900 transition-colors"
                                                                    >
                                                                        <Check className={cn("mr-2 h-4 w-4", formData.department_id === d.id ? "text-slate-700 opacity-100" : "opacity-0")} />
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
                                <div className={cn("flex flex-col p-4 rounded-xl border transition-all duration-200", formData.target_type === 'treatment' ? "bg-blue-50/50 border-blue-500 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="radio" name="target_type" value="treatment" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer" checked={formData.target_type === 'treatment'} onChange={() => setFormData({ ...formData, target_type: 'treatment', department_id: "", treatment_id: "" })} />
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-semibold", formData.target_type === 'treatment' ? "text-blue-900" : "text-slate-700")}>Specific Treatment</span>
                                            <span className="text-xs text-slate-500 mt-0.5">Links this post to a specific procedure</span>
                                        </div>
                                    </label>

                                    {formData.target_type === "treatment" && (
                                        <div className="mt-4 pt-4 border-t border-blue-100/50">
                                            <Popover open={openTreatment} onOpenChange={setOpenTreatment}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openTreatment}
                                                        className={cn(
                                                            "w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 focus:ring-1 focus:ring-slate-300 transition-all shadow-sm",
                                                            !formData.treatment_id && "text-slate-400 font-normal"
                                                        )}
                                                    >
                                                        <div className="truncate text-slate-700 font-medium">
                                                            {formData.treatment_id
                                                                ? treatments.find((t) => t.id === formData.treatment_id)?.title
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
                                                                            setFormData({ ...formData, target_type: 'treatment', treatment_id: t.id, department_id: t.department_id || "" })
                                                                            setOpenTreatment(false)
                                                                        }}
                                                                        className="py-2.5 px-3 mb-0.5 rounded-md cursor-pointer data-[selected=true]:bg-slate-100 data-[selected=true]:text-slate-900 transition-colors"
                                                                    >
                                                                        <Check className={cn("mr-2 h-4 w-4", formData.treatment_id === t.id ? "text-slate-700 opacity-100" : "opacity-0")} />
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

                        <div className="space-y-2 pt-4 border-t border-slate-100 mt-4">
                            <Label>YouTube Video URL (Optional)</Label>
                            <Input
                                value={formData.youtube_url}
                                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                                placeholder="https://youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-slate-400">Adds a video player to the blog post.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
