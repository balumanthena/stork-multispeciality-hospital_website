"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ChevronRight, Youtube, MessageCircle } from "lucide-react"
import { useSettings } from "@/providers/SettingsProvider"

export function Footer() {
    const { settings } = useSettings()

    const address = settings?.address || "C-35, opp. Narayana School, near DMart, Petbasheerabad, Kompally, Hyderabad, Secunderabad"
    const emergencyNumber = settings?.emergency_number || "1066"
    const email = settings?.email || "contact@storkhospital.com"
    const hospitalName = settings?.hospital_name || "Stork Multispecialty Hospital"
    const tagline = settings?.tagline || "World-class healthcare with a compassionate touch."

    const socialLinks = [
        { url: settings?.facebook_url, icon: Facebook, label: "Facebook" },
        { url: settings?.instagram_url, icon: Instagram, label: "Instagram" },
        { url: settings?.twitter_url, icon: Twitter, label: "Twitter" },
        { url: settings?.linkedin_url, icon: Linkedin, label: "LinkedIn" },
        { url: settings?.youtube_url, icon: Youtube, label: "YouTube" },
        { url: settings?.whatsapp_url, icon: MessageCircle, label: "WhatsApp" },
    ].filter(link => link.url)

    return (
        <footer className="bg-white text-slate-600 py-16 md:py-20 border-t border-slate-100">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & About */}
                    <div>
                        <Link href="/" className="inline-block mb-6 group">
                            <Image
                                src="/images/c06d2292-c0f5-47ea-9456-7069e85be4bd_20260130_131840_0000.png"
                                alt={`${hospitalName} Logo`}
                                width={240}
                                height={72}
                                className="h-[72px] w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed mb-8 text-slate-500 font-light max-w-xs">
                            {hospitalName} is dedicated to providing {tagline.toLowerCase()}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map(({ url, icon: Icon, label }, i) => (
                                <Link
                                    key={i}
                                    href={url!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-500 hover:bg-[#3E7DCA]/10 hover:text-[#3E7DCA] hover:border-[#3E7DCA]/20 transition-all duration-200"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#0F172A] font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "About Hospital", href: "/about" },
                                { name: "Find a Doctor", href: "/doctors" },
                                { name: "Book Appointment", href: "/appointments" },
                                { name: "Second Opinion", href: "/second-opinion" },
                                { name: "Blogs", href: "/blog" },
                                { name: "Contact Us", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-500 hover:text-[#3E7DCA] transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#3E7DCA]" />
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specialties */}
                    <div>
                        <h3 className="text-[#0F172A] font-bold mb-6 text-sm uppercase tracking-wider">Centers of Excellence</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "General Medicine", href: "/services/general-medicine" },
                                { name: "Neurosurgery", href: "/services/neurosurgery" },
                                { name: "Orthopaedics", href: "/services/orthopaedics" },
                                { name: "Oncology", href: "/services/oncology" },
                                { name: "GI & Bariatric", href: "/services/bariatric" },
                                { name: "Urology", href: "/services/urology" },
                                { name: "Gynaecology", href: "/services/gynaecology" },
                                { name: "Emergency", href: "/services/emergency" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-500 hover:text-[#3E7DCA] transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#3E7DCA]" />
                                        <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[#0F172A] font-bold mb-6 text-sm uppercase tracking-wider">Get in Touch</h3>
                        <ul className="space-y-6 text-sm">
                            <li className="flex gap-4 items-start">
                                <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[#3E7DCA]">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span className="text-slate-600 leading-relaxed">{address}</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[#3E7DCA]">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span className="text-[#0F172A] font-bold tracking-wide">{emergencyNumber}</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-[#3E7DCA]">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span className="text-slate-600">{email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
                    <p>© {new Date().getFullYear()} Stork Multispecialty Hospital. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-[#3E7DCA] transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[#3E7DCA] transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-[#3E7DCA] transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
