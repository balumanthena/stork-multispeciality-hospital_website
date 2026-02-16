"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"

const treatmentSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
    department_id: z.string().min(1, "Department is required"),
    short_description: z.string().optional(),
    content: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    is_active: z.boolean().default(true),
    display_order: z.coerce.number().default(0),
})

type TreatmentFormValues = z.infer<typeof treatmentSchema>
import { Department } from "@/types"

export function TreatmentForm({ id }: { id?: string }) {
    const router = useRouter()
    // supabase is imported directly
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [departments, setDepartments] = useState<Department[]>([])

    // Default values
    const form = useForm<TreatmentFormValues>({
        resolver: zodResolver(treatmentSchema) as any,
        defaultValues: {
            title: "",
            slug: "",
            department_id: "",
            short_description: "",
            content: "",
            meta_title: "",
            meta_description: "",
            is_active: true,
            display_order: 0,
        }
    })

    // Fetch existing data if editing
    // Fetch data (treatments + departments)
    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Fetch Departments
                const { data: deptData, error: deptError } = await supabase
                    .from('departments')
                    .select('*')
                    .eq('is_active', true)
                    .order('name')

                if (deptError) throw deptError
                setDepartments(deptData)

                // 2. Fetch Treatment if ID exists
                if (id) {
                    const { data, error } = await supabase
                        .from("treatments")
                        .select("*")
                        .eq("id", id)
                        .single()

                    if (error) throw error

                    form.reset({
                        title: data.title,
                        slug: data.slug,
                        department_id: data.department_id || "",
                        short_description: data.short_description || "",
                        content: data.content || "",
                        meta_title: data.meta_title || "",
                        meta_description: data.meta_description || "",
                        is_active: data.is_active,
                        display_order: data.display_order || 0,
                    })
                }
            } catch (error: any) {
                console.error(error)
                toast.error("Error loading data")
                if (id) router.push("/admin/treatments")
            } finally {
                setFetching(false)
            }
        }

        loadData()
    }, [id, router, form])

    // Auto-generate slug from name if creating new
    // Auto-generate slug from title if creating new
    const watchTitle = form.watch("title")
    useEffect(() => {
        if (!id && watchTitle) {
            const slug = watchTitle
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // remove special chars
                .trim()
                .replace(/\s+/g, '-') // replace spaces with hyphens

            form.setValue("slug", slug, { shouldValidate: true })
        }
    }, [watchTitle, id, form])

    const onSubmit = async (values: TreatmentFormValues) => {
        setLoading(true)

        try {
            if (id) {
                const { error } = await supabase
                    .from("treatments")
                    .update({
                        ...values,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", id)

                if (error) throw error
                toast.success("Treatment updated successfully")
            } else {
                const { error } = await supabase
                    .from("treatments")
                    .insert([{
                        ...values,
                    }])

                if (error) throw error
                toast.success("Treatment created successfully")
            }
            router.push("/admin/treatments")
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return <div className="flex items-center justify-center p-8 text-slate-500">Loading treatment data...</div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    {id ? "Edit Treatment" : "Create New Treatment"}
                </h1>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <div className="grid md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Treatment Title <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Total Knee Replacement" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="department_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department <span className="text-red-500">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {departments.map(dept => (
                                                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL Slug <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="total-knee-replacement" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The URL-friendly version of the name. Must be unique.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="display_order"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Lower numbers appear first. Default is 0.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="short_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief overview for cards and headers..."
                                            className="h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Displayed in list views and the hero section.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Detailed Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Full treatment details (HTML or Markdown supported in future)..."
                                            className="h-64 font-mono text-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-4">
                            <h3 className="font-semibold text-slate-900 mb-2">SEO Settings</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="meta_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meta Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Custom SEO Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="meta_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meta Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Custom SEO Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Active Status</FormLabel>
                                        <FormDescription>
                                            Visible to the public. Disable to hide this treatment.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/treatments")}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 min-w-[120px]">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {id ? "Update Treatment" : "Create Treatment"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
