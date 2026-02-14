import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand & About */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold text-white">
                                Stork<span className="text-[var(--color-accent)]">.</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 text-slate-400">
                            Providing world-class healthcare with a compassionate touch.
                            Our multispecialty hospital is dedicated to your well-being with
                            state-of-the-art facilities and expert medical professionals.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Find a Doctor</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Book Appointment</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Patient Portal</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Specialties */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Specialties</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Cardiology</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Neurology</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Orthopedics</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Pediatrics</Link></li>
                            <li><Link href="#" className="hover:text-[var(--color-accent)] transition-colors">Gynecology</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3 items-start">
                                <MapPin className="h-5 w-5 text-[var(--color-accent)] shrink-0" />
                                <span>123 Medical Park Blvd,<br />Health City, HC 500081</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="h-5 w-5 text-[var(--color-accent)] shrink-0" />
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="h-5 w-5 text-[var(--color-accent)] shrink-0" />
                                <span>info@storkhospital.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Stork Multispecialty Hospital. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
