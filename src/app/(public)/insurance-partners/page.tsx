"use client";

import { useState } from "react";
import { Search, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INSURANCE_PARTNERS: { name: string; type: "Insurance Company" | "TPA" }[] = [
    { name: "ManipalCigna Health Insurance", type: "Insurance Company" },
    { name: "IFFCO-TOKIO General Insurance", type: "Insurance Company" },
    { name: "Reliance Health Insurance", type: "Insurance Company" },
    { name: "Digit Insurance", type: "Insurance Company" },
    { name: "Medi Assist TPA", type: "TPA" },
    { name: "Link-K Insurance TPA", type: "TPA" },
    { name: "MAHE Health Care", type: "TPA" },
    { name: "Niva Bupa Health Insurance", type: "Insurance Company" },
    { name: "Chola MS Health Insurance", type: "Insurance Company" },
    { name: "Aditya Birla Health Insurance", type: "Insurance Company" },
    { name: "Star Health Insurance", type: "Insurance Company" },
    { name: "FHPL Insurance TPA", type: "TPA" },
    { name: "HealthIndia Insurance TPA Services Pvt Ltd", type: "TPA" },
    { name: "GIPSA, PPA and Empanelment", type: "TPA" },
    { name: "Tata AIG Insurance", type: "Insurance Company" },
    { name: "Raksha TPA", type: "TPA" },
    { name: "MD India", type: "TPA" },
    { name: "MedSave India", type: "TPA" },
    { name: "Care Health Insurance", type: "Insurance Company" },
    { name: "Universal Sompo General Insurance", type: "Insurance Company" },
    { name: "Galaxy Health Insurance", type: "Insurance Company" },
    { name: "Paramount Health Services", type: "TPA" },
    { name: "SBI General Insurance", type: "Insurance Company" },
    { name: "Kotak General Insurance", type: "Insurance Company" },
    { name: "ACKO General Insurance", type: "Insurance Company" },
    { name: "ICICI Lombard", type: "Insurance Company" },
    { name: "Safeway Insurance TPA Pvt Ltd", type: "TPA" },
    { name: "Volo", type: "TPA" },
    { name: "Vidal Health", type: "TPA" },
    { name: "Ericson Insurance TPA Pvt Ltd", type: "TPA" },
    { name: "Heritage Health", type: "TPA" },
    { name: "eExpedise", type: "TPA" },
    { name: "Good Health TPA", type: "TPA" },
];

const LOGO_FILENAME_OVERRIDES: Record<string, string> = {
    "MAHE Health Care": "Mahe health care.png",
    "Chola MS Health Insurance": "Chola MS Health Insurance.webp",
    "GIPSA, PPA and Empanelment": "GIPSA, PPA and Empanelment.webp",
};

function PartnerLogo({ name }: { name: string }) {
    const [imageError, setImageError] = useState(false);

    const fileName = LOGO_FILENAME_OVERRIDES[name] || `${name}.png`;
    const logoUrl = `/images/${fileName}`;

    return (
        <div className="bg-white rounded-[12px] border border-[#eeeeee] flex flex-col items-center justify-center p-[24px] h-[110px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
            {!imageError ? (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logoUrl}
                        alt={`${name} Logo`}
                        loading="lazy"
                        className="max-h-[60px] max-w-[140px] object-contain transition-transform duration-300"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-1">
                    <span className="text-[12px] sm:text-[13px] font-semibold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
                        {name}
                    </span>
                </div>
            )}
        </div>
    );
}

export default function InsurancePartnersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"All" | "Insurance Company" | "TPA">("All");

    const filteredPartners = INSURANCE_PARTNERS.filter((partner) => {
        const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "All" || partner.type === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* Premium Hero Section */}
            <section
                className="text-white py-[80px] relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a)" }}
            >
                <div className="absolute inset-0 bg-[#ffffff03] bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-100 text-sm font-semibold tracking-wide mb-8 shadow-sm">
                        Seamless Healthcare Financing
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
                        Cashless Insurance Partners
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed font-light max-w-3xl mx-auto">
                        We are proud to be empaneled with over 30 leading insurance companies and TPAs across India, ensuring a hassle-free and cashless hospitalization experience for our patients.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">

                {/* Search & Filter Section */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Find Your Insurance Provider</h2>

                    <div className="relative group max-w-[600px] mx-auto mb-8">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search for your insurance provider or TPA..."
                            className="pl-14 pr-6 py-7 text-base md:text-lg bg-white shadow-sm border border-slate-200 rounded-full focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        {(["All", "Insurance Company", "TPA"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${activeTab === tab
                                        ? "bg-blue-600 text-white shadow-md transform scale-105"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                                    }`}
                            >
                                {tab === "Insurance Company" ? "Insurance Companies" : tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="max-w-4xl mx-auto mb-12 pb-12 border-b border-slate-200">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-[15px] font-semibold text-slate-700">
                        <span className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            30+ Insurance Partners
                        </span>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            Cashless Treatment Facility
                        </span>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            Dedicated Insurance Help Desk
                        </span>
                    </div>
                </div>

                {/* Status indicator aligned left above grid */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-sm font-semibold text-slate-500">
                        Showing <span className="text-slate-900 font-bold">{filteredPartners.length}</span> Insurance Partners
                    </p>
                </div>

                {/* Dynamic Logos Grid */}
                {filteredPartners.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6">
                        {filteredPartners.map((partner, index) => (
                            <PartnerLogo key={index} name={partner.name} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm max-w-3xl mx-auto">
                        <Search className="h-16 w-16 text-slate-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">No providers found</h3>
                        <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">
                            We couldn't find any match for "{searchQuery}" in our {activeTab === "All" ? "network" : activeTab.toLowerCase() + "s"}.
                        </p>
                        <Button
                            size="lg"
                            className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                            onClick={() => {
                                setSearchQuery("");
                                setActiveTab("All");
                            }}
                        >
                            Reset Search & Filters
                        </Button>
                    </div>
                )}

            </section>

            {/* Support Section */}
            <section className="bg-white border-t border-slate-200">
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
                    <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                        <Phone className="h-10 w-10 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Don't see your insurance provider?</h2>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Our insurance help desk team will assist you with verification and coverage support. Our empanelment list is also constantly growing.
                    </p>
                    <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 text-white px-10 h-16 text-lg font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.2)]">
                        Contact Insurance Desk
                    </Button>
                </div>
            </section>
        </div>
    );
}
