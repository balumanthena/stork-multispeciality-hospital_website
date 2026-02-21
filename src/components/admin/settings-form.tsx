"use client"

import { useState } from "react"
import { SiteSettings, Profile } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateSiteSettings } from "@/app/admin/(dashboard)/settings/actions"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import UsersRolesTab from "./users-roles-tab"

export default function SettingsForm({ initialData, initialUsers }: { initialData: SiteSettings, initialUsers: Profile[] }) {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await updateSiteSettings(formData)
        setLoading(false)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Settings updated successfully")
        }
    }

    return (
        <form action={handleSubmit}>
            <input type="hidden" name="id" value={initialData.id} />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Global Settings</h1>
                    <p className="text-muted-foreground">Manage core hospital details and configuration.</p>
                </div>
                <Button type="submit" disabled={loading} className="bg-[var(--color-primary)]">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="contact">Contact & Location</TabsTrigger>
                    <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics & Scripts</TabsTrigger>
                    <TabsTrigger value="users">Users & Roles</TabsTrigger>
                </TabsList>

                {/* USERS & ROLES */}
                <TabsContent value="users">
                    <UsersRolesTab initialUsers={initialUsers} />
                </TabsContent>

                {/* GENERAL SETTINGS */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Basic details about the hospital.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hospital_name">Hospital Name</Label>
                                    <Input id="hospital_name" name="hospital_name" defaultValue={initialData.hospital_name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tagline">Tagline</Label>
                                    <Input id="tagline" name="tagline" defaultValue={initialData.tagline || ""} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo_url">Logo URL</Label>
                                <Input id="logo_url" name="logo_url" defaultValue={initialData.logo_url || ""} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="favicon_url">Favicon URL</Label>
                                <Input id="favicon_url" name="favicon_url" defaultValue={initialData.favicon_url || ""} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer_description">Footer Description</Label>
                                <Textarea id="footer_description" name="footer_description" defaultValue={initialData.footer_description || ""} rows={3} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CONTACT INFO */}
                <TabsContent value="contact">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                            <CardDescription>How patients can reach you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="emergency_number">Emergency Number</Label>
                                    <Input id="emergency_number" name="emergency_number" defaultValue={initialData.emergency_number || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                                    <Input id="whatsapp_number" name="whatsapp_number" defaultValue={initialData.whatsapp_number || ""} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" name="email" type="email" defaultValue={initialData.email || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="working_hours">Working Hours</Label>
                                <Input id="working_hours" name="working_hours" defaultValue={initialData.working_hours || "24/7 Emergency Services"} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Full Address</Label>
                                <Textarea id="address" name="address" defaultValue={initialData.address || ""} rows={2} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="google_maps_embed">Google Maps Embed URL</Label>
                                <Input id="google_maps_embed" name="google_maps_embed" defaultValue={initialData.google_maps_embed || ""} placeholder="https://www.google.com/maps/embed?..." />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SEO */}
                <TabsContent value="seo">
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Configuration</CardTitle>
                            <CardDescription>Default meta tags for the website.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="default_meta_title">Default Meta Title</Label>
                                <Input id="default_meta_title" name="default_meta_title" defaultValue={initialData.default_meta_title || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="default_meta_description">Default Meta Description</Label>
                                <Textarea id="default_meta_description" name="default_meta_description" defaultValue={initialData.default_meta_description || ""} rows={3} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="og_image">OG Image URL (Social Share)</Label>
                                <Input id="og_image" name="og_image" defaultValue={initialData.og_image || ""} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ANALYTICS */}
                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics & Tracking</CardTitle>
                            <CardDescription>Third-party tracking IDs.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="google_analytics_id">Google Analytics ID (G-XXXXXXXXXX)</Label>
                                <Input id="google_analytics_id" name="google_analytics_id" defaultValue={initialData.google_analytics_id || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="google_tag_manager_id">Google Tag Manager ID (GTM-XXXXXX)</Label>
                                <Input id="google_tag_manager_id" name="google_tag_manager_id" defaultValue={initialData.google_tag_manager_id || ""} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                                <Input id="facebook_pixel_id" name="facebook_pixel_id" defaultValue={initialData.facebook_pixel_id || ""} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    )
}
