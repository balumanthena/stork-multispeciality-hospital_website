const fs = require('fs');
const path = require('path');

const dir = 'src/components/departments';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const heroOutlineClass = "h-14 px-10 text-base font-bold border-slate-300 text-slate-700 hover:border-[#ff8202] hover:text-[#ff8202] rounded-full";
const footerOutlineClass = "h-16 px-12 text-lg font-bold border-white/40 text-white hover:bg-white/10 hover:border-white rounded-full bg-transparent";

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Ensure Link import
    if (!content.includes('import Link from "next/link"')) {
        content = content.replace(/import { Button } from ".*?"/, 'import Link from "next/link"\nimport { Button } from "@/components/ui/button"');
    }

    // Hero Section
    const heroStart = content.indexOf('<div className="flex flex-col sm:flex-row gap-5">');
    if (heroStart !== -1) {
        const heroEnd = content.indexOf('</div>', heroStart);
        let block = content.substring(heroStart, heroEnd + 6);
        
        const primaryStart = block.indexOf('<Button');
        let primaryEnd = block.indexOf('</Button>', primaryStart);
        if (primaryStart !== -1 && primaryEnd !== -1) {
            let primaryBtn = block.substring(primaryStart, primaryEnd + 9);
            
            let newBlock = `<div className="flex flex-col sm:flex-row gap-5">
                                ${primaryBtn}
                                <Button asChild variant="outline" className="${heroOutlineClass}">
                                    <Link href="/second-opinion">Get a Second Opinion</Link>
                                </Button>
                            </div>`;
            content = content.replace(block, newBlock);
        }
    }

    // Footer Section
    const footerStart = content.indexOf('<div className="flex flex-col sm:flex-row justify-center gap-6">');
    if (footerStart !== -1) {
        const footerEnd = content.indexOf('</div>', footerStart);
        let block = content.substring(footerStart, footerEnd + 6);
        
        const primaryStart = block.indexOf('<Button');
        let primaryEnd = block.indexOf('</Button>', primaryStart);
        if (primaryStart !== -1 && primaryEnd !== -1) {
            let primaryBtn = block.substring(primaryStart, primaryEnd + 9);
            
            let newBlock = `<div className="flex flex-col sm:flex-row justify-center gap-6">
                        ${primaryBtn}
                        <Button asChild size="lg" variant="outline" className="${footerOutlineClass}">
                            <Link href="/second-opinion">Get a Second Opinion</Link>
                        </Button>
                    </div>`;
            content = content.replace(block, newBlock);
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
}
