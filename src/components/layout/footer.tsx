import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ChevronRight } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#0F172A] text-slate-300 py-16 md:py-20 border-t border-slate-800">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & About */}
                    <div>
                        <Link href="/" className="inline-block mb-6 group">
                            <span className="text-3xl font-bold text-white tracking-tight group-hover:text-slate-200 transition-colors">
                                Stork<span className="text-[var(--color-accent)]">.</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-8 text-slate-400 font-light max-w-xs">
                            Stork Multispecialty Hospital is a JCI accredited institution dedicated to providing world-class healthcare with a compassionate touch.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="h-10 w-10 full flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300">
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            {["About Us", "Find a Doctor", "Book Appointment", "Patient Portal", "Careers", "News & Media"].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-slate-400 hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent)]" />
                                        <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specialties */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Centers of Excellence</h3>
                        <ul className="space-y-3 text-sm">
                            {["Cardiology", "Neurology", "Orthopedics", "Oncology", "Gastroenterology", "Mother & Child", "Transplant Unit"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent)]" />
                                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Get in Touch</h3>
                        <ul className="space-y-6 text-sm">
                            <li className="flex gap-4 items-start">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-[var(--color-accent)]">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span className="text-slate-400 leading-relaxed">Medical Park Blvd, Fin. District,<br />Hyderabad, Telangana 500032</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-[var(--color-accent)]">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span className="text-white font-semibold tracking-wide">+91 40 1234 5678</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-[var(--color-accent)]">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span className="text-slate-400">care@storkhospital.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} Stork Multispecialty Hospital. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
