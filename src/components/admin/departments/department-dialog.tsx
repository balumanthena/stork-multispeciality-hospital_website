"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, PenLine } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Department } from "@/types"
import { toast } from "sonner" // Assuming sonner is used, or use alert for now

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "Slug must be at least 2 characters.",
    }),
    description: z.string().optional(),
    icon: z.string().min(1, {
        message: "Please select an icon.",
    }),
    image_url: z.string().optional(),
    display_order: z.number().min(0),
    is_active: z.boolean(),
})

interface DepartmentDialogProps {
    department?: Department
    onSuccess: () => void
    children?: React.ReactNode
}

// Common medical/hospital icons to choose from
const ICON_OPTIONS = [
    "Activity", "Heart", "Stethoscope", "Brain", "Bone", "Eye", "Ear", "Wind",
    "Thermometer", "Pill", "Syringe", "User", "Users", "Baby", "Cross",
    "Shield", "Clock", "Calendar", "MapPin", "Phone", "Mail", "Search",
    "Menu", "X", "Check", "ChevronRight", "ChevronDown", "ArrowRight",
    "Facebook", "Twitter", "Instagram", "Linkedin", "Youtube"
]

export function DepartmentDialog({ department, onSuccess, children }: DepartmentDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            icon: "Activity",
            image_url: "",
            display_order: 0,
            is_active: true,
        },
    })

    useEffect(() => {
        if (department) {
            form.reset({
                name: department.name,
                slug: department.slug,
                description: department.description || "",
                icon: department.icon,
                image_url: department.image_url || "",
                display_order: department.display_order,
                is_active: department.is_active,
            })
        } else {
            form.reset({
                name: "",
                slug: "",
                description: "",
                icon: "Activity",
                image_url: "",
                display_order: 0,
                is_active: true,
            })
        }
    }, [department, form, open])

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        form.setValue("name", name)
        if (!department) {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
            form.setValue("slug", slug)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)

            if (department) {
                // Update
                const { error } = await supabase
                    .from("departments")
                    .update({
                        name: values.name,
                        slug: values.slug,
                        description: values.description,
                        icon: values.icon,
                        image_url: values.image_url,
                        display_order: values.display_order,
                        is_active: values.is_active,
                    })
                    .eq("id", department.id)

                if (error) throw error
                toast.success("Department updated successfully")
            } else {
                // Create
                const { error } = await supabase
                    .from("departments")
                    .insert({
                        name: values.name,
                        slug: values.slug,
                        description: values.description,
                        icon: values.icon,
                        image_url: values.image_url,
                        display_order: values.display_order,
                        is_active: values.is_active,
                    })

                if (error) throw error
                toast.success("Department created successfully")
            }

            setOpen(false)
            onSuccess()
            form.reset()
        } catch (error: any) {
            console.error("Error saving department:", error)
            toast.error("Failed to save department: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Helper to render icon preview
    const RenderIcon = ({ iconName }: { iconName: string }) => {
        const IconComponent = (LucideIcons as any)[iconName]
        if (!IconComponent) return <LucideIcons.HelpCircle className="h-4 w-4" />
        return <IconComponent className="h-4 w-4" />
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Add Department
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{department ? "Edit Department" : "Add New Department"}</DialogTitle>
                    <DialogDescription>
                        {department ? "Make changes to the department details here." : "Fill in the details to create a new department."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Cardiology" {...field} onChange={handleNameChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. cardiology" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief description of the department..." className="resize-none h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="display_order"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Display Order</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Lower numbers appear first.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Icon</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an icon" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[200px]">
                                                {ICON_OPTIONS.map((icon) => (
                                                    <SelectItem key={icon} value={icon}>
                                                        <div className="flex items-center gap-2">
                                                            <RenderIcon iconName={icon} />
                                                            <span>{icon}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="image_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Active Status</FormLabel>
                                        <FormDescription>
                                            Disabling this will hide the department from the public site.
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

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {department ? "Save Changes" : "Create Department"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
