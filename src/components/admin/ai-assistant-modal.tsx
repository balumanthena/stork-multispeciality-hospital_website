"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, PenTool } from "lucide-react"
import { toast } from "sonner"

interface AIAssistantModalProps {
    onInsert: (html: string) => void
}

export function AIAssistantModal({ onInsert }: AIAssistantModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [topic, setTopic] = useState("")
    const [keywords, setKeywords] = useState("")

    const handleGenerate = async () => {
        if (!topic) {
            toast.error("Please enter a topic")
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'generate', topic, keywords })
            })

            const data = await response.json()
            if (data.success) {
                onInsert(data.data)
                setOpen(false)
                toast.success("Content generated successfully!")
            } else {
                toast.error("Failed to generate content.")
            }
        } catch (error) {
            toast.error("An error occurred during generation.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 transition-all font-semibold">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    AI Assistant
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <PenTool className="w-5 h-5 text-indigo-600" />
                        Generate Blog Content
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="topic">What is this post about?</Label>
                        <Input
                            id="topic"
                            placeholder="e.g. Benefits of Robotic Knee Surgery"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="keywords">Target Keywords (optional)</Label>
                        <Input
                            id="keywords"
                            placeholder="e.g. orthopedic, knee pain, fast recovery"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>
                </div>
                <Button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {loading ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                    ) : (
                        <><Sparkles className="w-4 h-4 mr-2" /> Generate Post</>
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
