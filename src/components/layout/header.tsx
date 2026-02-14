"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Home", href: "/" },
    { name: "Specialties", href: "#specialties" },
    { name: "Doctors", href: "#doctors" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
]

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm h-16"
                    : "bg-white border-b border-transparent h-20"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 h-full">
                <div className="flex h-full items-center justify-between">
                    <div className="flex-shrink-0 transition-transform duration-300 origin-left">
                        <Link href="/" className="flex items-center gap-2">
                            <span className={cn(
                                "font-bold text-[var(--color-primary)] transition-all duration-300",
                                isScrolled ? "text-xl" : "text-2xl"
                            )}>
                                Stork<span className="text-[var(--color-accent)]">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-slate-600 hover:text-[var(--color-primary)] transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="outline" className="hidden lg:flex gap-2">
                            <Phone className="h-4 w-4" />
                            <span>Emergency: 108</span>
                        </Button>
                        <Button variant="default">Book Appointment</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-slate-600"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-base font-medium text-slate-700 py-2 border-b border-slate-100 last:border-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-2">
                        <Button variant="outline" className="w-full justify-center gap-2">
                            <Phone className="h-4 w-4" />
                            Emergency: 108
                        </Button>
                        <Button variant="default" className="w-full">
                            Book Appointment
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
