"use strict";
"use client";

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus, Search, Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import * as Icons from "lucide-react"

export default function AdminDepartmentsPage() {
    const [departments, setDepartments] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchDepartments()
    }, [])

    async function fetchDepartments() {
        try {
            setIsLoading(true)
            const { data, error } = await supabase
                .from("departments")
                .select("*")
                .order("name", { ascending: true })

            if (error) throw error
            setDepartments(data || [])
        } catch (error) {
            console.error("Error fetching departments:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredDepartments = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Helper to render dynamic Lucide icon
    const RenderIcon = ({ iconName }: { iconName: string }) => {
        const IconComponent = (Icons as any)[iconName]
        if (!IconComponent) return <Icons.HelpCircle className="h-5 w-5 text-slate-400" />
        return <IconComponent className="h-5 w-5 text-blue-600" />
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Departments</h1>
                    <p className="text-sm text-slate-500">Manage hospital departments and their details.</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Department
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search departments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-slate-200">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : filteredDepartments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200 border-dashed">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <Icons.FolderOpen className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No departments found</h3>
                    <p className="text-sm text-slate-500 max-w-sm text-center mt-1">
                        Get started by creating a new department or running the seed script.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4 w-16">Icon</th>
                                    <th className="px-6 py-4">Department Name</th>
                                    <th className="px-6 py-4 hidden md:table-cell">Description</th>
                                    <th className="px-6 py-4 w-24">Status</th>
                                    <th className="px-6 py-4 w-20"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredDepartments.map((dept) => (
                                    <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                                                <RenderIcon iconName={dept.icon} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{dept.name}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">{dept.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <p className="text-slate-500 line-clamp-2 max-w-md">{dept.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dept.is_active
                                                    ? "bg-green-50 text-green-700 border border-green-100"
                                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                                }`}>
                                                {dept.is_active ? "Active" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 text-slate-500">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 text-slate-400 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
