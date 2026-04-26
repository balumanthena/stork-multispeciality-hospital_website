"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
    question: string
    answer: string
}

interface BlogFAQProps {
    faqs: FAQItem[]
}

export function BlogFAQ({ faqs }: BlogFAQProps) {
    if (!faqs || faqs.length === 0) return null

    return (
        <div className="my-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-slate-200 rounded-xl px-6 data-[state=open]:shadow-md transition-all">
                        <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-orange-600 hover:no-underline py-5 text-[17px]">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed text-[16px] pb-5">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
