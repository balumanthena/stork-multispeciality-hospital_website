"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { BodyRegion } from "@/lib/data/grouped-treatments"

interface BodySelectorProps {
    selectedRegion: BodyRegion | null
    onSelect: (region: BodyRegion) => void
    className?: string
}

export function BodySelector({ selectedRegion, onSelect, className }: BodySelectorProps) {

    // Helper to render interactive paths
    const RegionPath = ({ region, d, isActive, label }: { region: BodyRegion, d: string, isActive: boolean, label: string }) => (
        <g
            onClick={() => onSelect(region)}
            className="group cursor-pointer transition-all duration-300"
        >
            <path
                d={d}
                className={cn(
                    "transition-all duration-300 stroke-[#3e7dca] stroke-[1.5] fill-white",
                    isActive
                        ? "fill-[#3e7dca] stroke-[#3e7dca] filter drop-shadow-md"
                        : "group-hover:fill-[#3e7dca]/10 group-hover:filter group-hover:drop-shadow-sm"
                )}
            />
            {/* Label Tooltip on Hover */}
            {/* <text x="100" y="50" className="opacity-0 group-hover:opacity-100">{label}</text> */}
        </g>
    )

    return (
        <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
            <svg
                viewBox="0 0 400 650"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-h-[600px]"
            >
                {/* HEAD & BRAIN */}
                <RegionPath
                    region="head"
                    label="Head & Brain"
                    isActive={selectedRegion === "head"}
                    d="M200 20C170 20 150 40 150 70C150 100 160 115 170 120V135H230V120C240 115 250 100 250 70C250 40 230 20 200 20Z"
                />

                {/* ENT (Neck) */}
                <RegionPath
                    region="ent"
                    label="ENT"
                    isActive={selectedRegion === "ent"}
                    d="M170 120V140C170 140 160 150 150 160H250C240 150 230 140 230 140V120H170Z"
                />

                {/* ARMS (Shoulders + Arms) */}
                <RegionPath
                    region="arms"
                    label="Arms & Shoulders"
                    isActive={selectedRegion === "arms"}
                    d="M150 160L100 170L80 300L100 350L130 300L145 190L150 160ZM250 160L300 170L320 300L300 350L270 300L255 190L250 160Z"
                />

                {/* CHEST (Heart & Lungs) */}
                <RegionPath
                    region="chest"
                    label="Chest & Lungs"
                    isActive={selectedRegion === "chest" || selectedRegion === "heart"} // Merge Heart into Chest visually? Or separate? 
                    // Let's separate nicely if possible or keep simple block.
                    // User asked for "Heart & Vascular" AND "Chest & Lungs". 
                    // I'll make the Chest area interactive for "chest", and maybe a heart icon or center for "heart"?
                    // Actually, let's keep it simple: Chest area usually covers both. 
                    // I will split chest into Left/Right for Lungs and Center for Heart?
                    // Or just one big chest block that triggers 'chest' and I handle multi-select?
                    // Re-reading user request: "Divide into clickable zones... Chest & Lungs, Heart & Vascular".
                    // I will start with standard blocks.
                    d="M150 160H250L240 240H160L150 160Z"
                />

                {/* HEART (Overlay on Chest) */}
                <RegionPath
                    region="heart"
                    label="Heart & Vascular"
                    isActive={selectedRegion === "heart"}
                    d="M190 180H210V210H190Z" // Small heart area
                />


                {/* ABDOMEN */}
                <RegionPath
                    region="abdomen"
                    label="Abdomen"
                    isActive={selectedRegion === "abdomen"}
                    d="M160 240H240L235 300H165L160 240Z"
                />

                {/* PELVIS & UROLOGY */}
                <RegionPath
                    region="pelvis"
                    label="Pelvis"
                    isActive={selectedRegion === "pelvis"}
                    d="M165 300H235L220 340H180L165 300Z"
                />

                {/* LEGS */}
                <RegionPath
                    region="legs"
                    label="Legs"
                    isActive={selectedRegion === "legs"}
                    d="M180 340H220L210 500L230 600H190L180 600L190 500L180 340Z"
                />

                {/* EXTRA REGIONS (Floating Pills/Icons?) 
                    Women's Health, Mental Health, Skin/Onco, Spine are hard to put on front view SVG perfectly.
                    Spine is back view. Mental Health is Head.
                    I will create a sidebar for these non-locational ones in the main component.
                 */}

            </svg>

            {/* Overlay Labels (Optional) */}
        </div>
    )
}
