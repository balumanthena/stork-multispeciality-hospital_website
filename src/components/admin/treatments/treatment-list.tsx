"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Treatment } from "@/lib/data/treatments-server"

export function TreatmentList() {
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [departmentFilter, setDepartmentFilter] = useState("all")
    // supabase is imported directly
    const router = useRouter()

    const fetchTreatments = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from("treatments")
            .select("*")
            .order("updated_at", { ascending: false })

        if (error) {
            toast.error("Failed to fetch treatments")
            console.error(error)
        } else {
            setTreatments(data as Treatment[])
        }
        setLoading(false)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTreatments()

        const channel = supabase
            .channel('realtime-treatments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'treatments' }, (payload) => {
                fetchTreatments() // Refresh on any change
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const filteredTreatments = treatments.filter(treatment => {
        const matchesSearch = (treatment.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            treatment.slug.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDept = departmentFilter === "all" || (treatment.department && treatment.department === departmentFilter)
        return matchesSearch && matchesDept
    })

    const departments = Array.from(new Set(treatments.map(t => t.department).filter(Boolean) as string[])).sort()

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this treatment?")) return

        const { error } = await supabase
            .from("treatments")
            .delete()
            .eq("id", id)

        if (error) {
            toast.error("Failed to delete treatment")
        } else {
            toast.success("Treatment deleted")
        }
    }

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from("treatments")
            .update({ is_active: !currentStatus })
            .eq("id", id)

        if (error) {
            toast.error("Failed to update status")
        } else {
            toast.success(`Treatment ${!currentStatus ? 'activated' : 'deactivated'}`)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search treatments..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="w-4 h-4 mr-2 text-slate-500" />
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map(dept => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={() => router.push("/admin/treatments/new")} className="gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                        <Plus className="w-4 h-4" /> Add New
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="w-[300px]">Name</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                    Loading treatments...
                                </TableCell>
                            </TableRow>
                        ) : filteredTreatments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                    No treatments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTreatments.map((treatment) => (
                                <TableRow key={treatment.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-slate-900">{treatment.name || "Untitled"}</span>
                                            <span className="text-xs text-slate-500">{treatment.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal">
                                            {treatment.department || "Uncategorized"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={treatment.is_active ? "default" : "secondary"}
                                            className={treatment.is_active ? "bg-green-500 hover:bg-green-600 border-transparent" : "bg-slate-200 text-slate-600 hover:bg-slate-300 border-transparent"}
                                        >
                                            {treatment.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {new Date(treatment.updated_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => router.push(`/admin/treatments/${treatment.id}`)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.open(`/treatments/${treatment.slug}`, '_blank')}>
                                                    <Eye className="mr-2 h-4 w-4" /> View Live
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleStatus(treatment.id, treatment.is_active)}>
                                                    {treatment.is_active ? (
                                                        <>
                                                            <div className="mr-2 h-4 w-4 rounded-full border-2 border-slate-500" /> Deactivate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="mr-2 h-4 w-4 rounded-full border-2 border-green-500 bg-green-500" /> Activate
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(treatment.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
