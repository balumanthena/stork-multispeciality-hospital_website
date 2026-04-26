"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link as LinkIcon, Search, Loader2 } from "lucide-react"

interface InternalLinkSelectorProps {
    onSelectLink: (url: string) => void
    children: React.ReactNode
}

export function InternalLinkSelector({ onSelectLink, children }: InternalLinkSelectorProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open) {
            fetchPosts()
        }
    }, [open, search])

    const fetchPosts = async () => {
        setLoading(true)
        try {
            let query = supabase
                .from('blogs')
                .select('id, title, slug, status')
                .eq('status', 'published')
                .order('created_at', { ascending: false })
                .limit(10)
            
            if (search) {
                query = query.ilike('title', `%${search}%`)
            }

            const { data, error } = await query
            if (!error && data) {
                setPosts(data)
            }
        } catch (err) {
            console.error("Error fetching internal links:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleSelect = (slug: string) => {
        onSelectLink(`/insights/articles/${slug}`)
        setOpen(false)
        setSearch("")
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
                <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                        placeholder="Search articles..."
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                    {loading ? (
                        <div className="flex items-center justify-center p-4 text-sm text-slate-500">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading...
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-500">
                            No articles found.
                        </div>
                    ) : (
                        posts.map((post) => (
                            <button
                                key={post.id}
                                onClick={() => handleSelect(post.slug)}
                                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-100 transition-colors flex items-center gap-2"
                            >
                                <LinkIcon className="h-3 w-3 text-slate-400" />
                                <span className="truncate flex-1">{post.title}</span>
                            </button>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
