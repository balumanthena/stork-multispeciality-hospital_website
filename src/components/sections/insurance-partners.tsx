"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/layout/section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimationControls } from "framer-motion";

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
        <div className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] bg-white rounded-[12px] border border-[#eeeeee] flex items-center justify-center p-[20px] h-[100px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.08)] group cursor-default mx-3">
            {!imageError ? (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logoUrl}
                        alt={`${name} Logo`}
                        loading="lazy"
                        className="max-h-[60px] max-w-[140px] object-contain transition-all duration-300"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                // Fallback UI if the image isn't available locally
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-1">
                    <span className="text-[12px] sm:text-[13px] font-semibold text-slate-600 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {name}
                    </span>
                </div>
            )}
        </div>
    );
}

export function InsurancePartners() {
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll animation configuration
    useEffect(() => {
        if (!isHovered) {
            controls.start({
                x: "-50%",
                transition: {
                    ease: "linear",
                    duration: 40, // 40 seconds per loop for a slow, premium feel
                    repeat: Infinity,
                },
            });
        } else {
            controls.stop();
        }
    }, [controls, isHovered]);

    return (
        <Section className="py-[80px] bg-[#f7f9fc] overflow-hidden">
            <div className="container max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-[48px]">
                    <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight">
                        Cashless Insurance Partners
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        We provide cashless hospitalization with leading insurance providers and TPAs, ensuring a seamless and stress-free experience for patients.
                    </p>
                </div>
            </div>

            {/* Infinite Carousel Slider */}
            <div
                className="relative w-full overflow-hidden pb-8 pt-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
            >
                {/* Gradient Overlays for smooth entry/exit effect */}
                <div className="absolute top-0 left-0 h-full w-[10%] bg-gradient-to-r from-[#f7f9fc] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-[10%] bg-gradient-to-l from-[#f7f9fc] to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex w-max"
                    animate={controls}
                    initial={{ x: 0 }}
                >
                    {/* Render the array twice to create the infinite seamless loop effect */}
                    {[...INSURANCE_PARTNERS, ...INSURANCE_PARTNERS].map((partner, index) => (
                        <PartnerLogo key={`${partner}-${index}`} name={partner} />
                    ))}
                </motion.div>
            </div>

            <div className="container max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Trust Indicators & Navigation Action */}
                <div className="mt-12 pt-8 max-w-4xl mx-auto text-center">

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[14px] font-semibold text-slate-700 mb-10">
                        <span className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold pt-0.5">✔</span>
                            30+ Insurance Partners
                        </span>
                        <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold pt-0.5">✔</span>
                            Cashless Treatment Facility
                        </span>
                        <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold pt-0.5">✔</span>
                            Dedicated Insurance Help Desk
                        </span>
                    </div>

                    <Link href="/insurance-partners">
                        <Button
                            variant="outline"
                            className="rounded-full border-2 border-blue-600 text-orange-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm px-8 h-12 font-semibold"
                        >
                            View All Insurance Partners &rarr;
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
