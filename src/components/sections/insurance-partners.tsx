"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";

const INSURANCE_PARTNERS = [
    "ManipalCigna Health Insurance",
    "IFFCO-TOKIO General Insurance",
    "Reliance Health Insurance",
    "Digit Insurance",
    "Medi Assist TPA",
    "Link-K Insurance TPA",
    "MAHE Health Care",
    "Niva Bupa Health Insurance",
    "Chola MS Health Insurance",
    "Aditya Birla Health Insurance",
    "Star Health Insurance",
    "FHPL Insurance TPA",
    "HealthIndia Insurance TPA Services Pvt Ltd",
    "GIPSA, PPA and Empanelment",
    "Tata AIG Insurance",
    "Raksha TPA",
    "MD India",
    "MedSave India",
    "Care Health Insurance",
    "Universal Sompo General Insurance",
    "Galaxy Health Insurance",
    "Paramount Health Services",
    "SBI General Insurance",
    "Kotak General Insurance",
    "ACKO General Insurance",
    "ICICI Lombard",
    "Safeway Insurance TPA Pvt Ltd",
    "Volo",
    "Vidal Health",
    "Ericson Insurance TPA Pvt Ltd",
    "Heritage Health",
    "eExpedise",
    "Good Health TPA",
];

// Map exact names to specific file names if they differ due to casing or typos
const LOGO_FILENAME_OVERRIDES: Record<string, string> = {
    "MAHE Health Care": "Mahe health care.png",
    "Chola MS Health Insurance": "Chola MS Health Insurance.webp",
    "GIPSA, PPA and Empanelment": "GIPSA, PPA and Empanelment.webp",
};

function PartnerLogo({ name }: { name: string }) {
    const [imageError, setImageError] = useState(false);

    // Use the mapped filename if it exists in the overrides, otherwise default to the exact name + .png
    const fileName = LOGO_FILENAME_OVERRIDES[name] || `${name}.png`;
    const logoUrl = `/images/${fileName}`;

    return (
        <div className="relative group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center h-28 sm:h-32 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-blue-100 hover:-translate-y-1 transition-all duration-300">
            {!imageError ? (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logoUrl}
                        alt={`${name} Logo`}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain p-2"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                // Fallback UI if the image isn't available locally
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-1">
                    <span className="text-[13px] sm:text-[14px] font-semibold text-slate-700 leading-tight group-hover:text-[var(--color-accent)] transition-colors line-clamp-3">
                        {name}
                    </span>
                </div>
            )}
        </div>
    );
}

export function InsurancePartners() {
    return (
        <Section className="py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-[#f0f6fc]">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50/80 text-blue-700 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm mb-6">
                        <span className="font-semibold tracking-wide uppercase text-xs">Healthcare Financing</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 mb-6 leading-tight">
                        Cashless Insurance Partners
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We provide cashless hospitalization with leading insurance providers and TPAs, ensuring a seamless and stress-free healing experience for our patients.
                    </p>
                </div>

                {/* Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
                    {INSURANCE_PARTNERS.map((partner, index) => (
                        <PartnerLogo key={index} name={partner} />
                    ))}
                </div>

                {/* Footer/Disclaimer */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500">
                        Don't see your insurance provider? Contact our billing desk at <span className="font-medium text-slate-700">1066</span> for assistance.
                    </p>
                </div>

            </div>
        </Section>
    );
}
