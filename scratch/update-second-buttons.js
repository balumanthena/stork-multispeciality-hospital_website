const fs = require('fs');
const path = require('path');

const dir = 'src/components/departments';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const heroOutlineClass = "h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#ff8202] hover:text-[#ff8202] rounded-full";
const footerOutlineClass = "h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent";

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Ensure Link import
    if (!content.includes('import Link from "next/link"')) {
        content = content.replace(/import { Button } from ".*?"/, 'import Link from "next/link"\nimport { Button } from "@/components/ui/button"');
    }

    // 2. We'll identify the button blocks by `<div className="flex flex-col sm:flex-row gap-5">` (Hero) 
    // and `<div className="flex flex-col sm:flex-row justify-center gap-6">` (Footer)
    
    // HERO REPLACEMENT
    const heroRegex = /(<div className="flex flex-col sm:flex-row gap-5">)([\s\S]*?)(<\/div>)/;
    const heroMatch = content.match(heroRegex);
    if (heroMatch) {
        let buttonsHtml = heroMatch[2];
        const primaryButtonRegex = /(<Button[^v]*?>[\s\S]*?<\/Button>)/;
        const primaryMatch = buttonsHtml.match(primaryButtonRegex);
        
        if (primaryMatch) {
            let primaryBtn = primaryMatch[1];
            let newButtonsHtml = `\n                                ${primaryBtn}\n                                <Button asChild variant="outline" className="${heroOutlineClass}">\n                                    <Link href="/second-opinion">Get a Second Opinion</Link>\n                                </Button>\n                            `;
            content = content.replace(heroRegex, `$1${newButtonsHtml}$3`);
        }
    }

    // FOOTER REPLACEMENT
    const footerRegex = /(<div className="flex flex-col sm:flex-row justify-center gap-6">)([\s\S]*?)(<\/div>)/;
    const footerMatch = content.match(footerRegex);
    if (footerMatch) {
        let buttonsHtml = footerMatch[2];
        const primaryButtonRegex = /(<Button[^v]*?>[\s\S]*?<\/Button>)/;
        const primaryMatch = buttonsHtml.match(primaryButtonRegex);
        
        if (primaryMatch) {
            let primaryBtn = primaryMatch[1];
            let newButtonsHtml = `\n                        ${primaryBtn}\n                        <Button asChild size="lg" variant="outline" className="${footerOutlineClass}">\n                            <Link href="/second-opinion">Get a Second Opinion</Link>\n                        </Button>\n                    `;
            content = content.replace(footerRegex, `$1${newButtonsHtml}$3`);
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
}
