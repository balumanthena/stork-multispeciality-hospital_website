"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Image as ImageIcon, Loader2, Check, ChevronsUpDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

export default function NewBlogPage() {
    const router = useRouter()
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
            } finally {
                setPageLoading(false)
            }
        }
        fetchData()
    }, [])

    // Filter Treatments based on Department
    const filteredTreatments = useMemo(() => {
        if (!formData.department_id) return treatments
        return treatments.filter(t => t.department_id === formData.department_id)
    }, [treatments, formData.department_id])

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    const handlePublish = async () => {
        if (!formData.title || !formData.content) {
            alert("Please fill in at least the Title and Content.")
            return
        }

        if (!user) {
            alert("You must be logged in to publish.")
            return
        }

        setLoading(true)
        const slug = generateSlug(formData.title)

        const { error } = await supabase.from('blogs').insert({
            title: formData.title,
            slug: slug,
            content: formData.content,
            excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
            category: formData.category,
            author_id: user.id, // Linked to profiles
            image_url: formData.image, // Correct column name
            youtube_url: formData.youtube_url || null, // Optional video
            department_id: formData.department_id || null,
            treatment_id: formData.treatment_id || null,
            published_at: new Date().toISOString(), // Timestamptz format
            status: 'Published'
        })

        if (error) {
            alert("Error creating post: " + error.message)
            setLoading(false)
        } else {
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
                    <Link href="/admin/blogs">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800">New Blog Post</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" disabled={loading}>Save Draft</Button>
                    <Button
                        className="bg-[var(--color-primary)] text-white"
                        onClick={handlePublish}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Publish
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Main Content Form */}
                <div className="col-span-2 space-y-6">

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
                                        className="w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 hover:border-orange-200 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            {formData.department_id
                                                ? departments.find((d) => d.id === formData.department_id)?.name
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
                                                        setFormData({ ...formData, department_id: "" })
                                                        setOpenDept(false)
                                                    }}
                                                    className="py-2 px-3 cursor-pointer"
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", !formData.department_id ? "opacity-100" : "opacity-0")} />
                                                    All Departments
                                                </CommandItem>
                                                {departments.map((d) => (
                                                    <CommandItem
                                                        key={d.id}
                                                        value={d.name}
                                                        onSelect={() => {
                                                            setFormData({ ...formData, department_id: d.id })
                                                            setOpenDept(false)
                                                        }}
                                                        className="py-2 px-3 cursor-pointer data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", formData.department_id === d.id ? "opacity-100" : "opacity-0")} />
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
                                            "w-full justify-between h-10 px-3 text-sm rounded-md border-slate-200 bg-white hover:bg-slate-50 hover:border-orange-200 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm",
                                            !formData.treatment_id && "text-slate-400"
                                        )}
                                    >
                                        {formData.treatment_id
                                            ? treatments.find((t) => t.id === formData.treatment_id)?.title
                                            : "Search treatment..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0 bg-white shadow-xl border-slate-100 rounded-xl" align="start">
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
                                                            setFormData({ ...formData, treatment_id: t.id })
                                                            setOpenTreatment(false)
                                                        }}
                                                        className="py-2 px-3 cursor-pointer data-[selected=true]:bg-orange-50 data-[selected=true]:text-orange-700"
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", formData.treatment_id === t.id ? "opacity-100" : "opacity-0")} />
                                                        {t.title}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {formData.department_id && (
                                <p className="text-xs text-slate-500 px-1">
                                    Showing {filteredTreatments.length} treatments
                                </p>
                            )}
                        </div>
                    </div>


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
                            <ImageIcon className="h-8 w-8 mb-2" />
                            <span className="text-xs">Image Preview</span>
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
