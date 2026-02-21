"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Camera, Loader2, UploadCloud } from "lucide-react"

interface AvatarUploadProps {
    uid: string
    url: string | null
    onUpload: (url: string) => void
    size?: number
}

export default function AvatarUpload({ uid, url, onUpload, size = 120 }: AvatarUploadProps) {
    const supabase = createClient()
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split(".").pop()
            const filePath = `${uid}/avatar-${Date.now()}.${fileExt}`

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, { upsert: true })

            if (uploadError) {
                throw uploadError
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath)

            setAvatarUrl(publicUrl)
            onUpload(publicUrl)

        } catch (error: any) {
            console.error("Error uploading avatar:", error.message)
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="relative rounded-full overflow-hidden border-4 border-white shadow-lg group bg-slate-100 flex items-center justify-center cursor-pointer transition-all hover:ring-4 hover:ring-orange-500/20"
                style={{ width: size, height: size }}
                onClick={() => fileInputRef.current?.click()}
            >
                {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <UserPlaceholder className="text-slate-300 w-1/2 h-1/2" />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    ) : (
                        <Camera className="w-8 h-8 text-white" />
                    )}
                </div>
            </div>

            <div className="text-center">
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                    ref={fileInputRef}
                />
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full font-medium"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                >
                    {uploading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <UploadCloud className="w-4 h-4 mr-2" />
                    )}
                    {uploading ? 'Uploading...' : 'Change Photo'}
                </Button>
                <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size 2MB.</p>
            </div>
        </div>
    )
}

function UserPlaceholder({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
    )
}
