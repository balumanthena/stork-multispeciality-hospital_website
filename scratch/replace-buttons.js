const fs = require('fs');
const path = require('path');

const dir = 'src/components/departments';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure Link is imported
    if (!content.includes('import Link from "next/link"')) {
        content = content.replace('import { Button } from "@/components/ui/button"', 'import Link from "next/link"\nimport { Button } from "@/components/ui/button"');
    }

    // Replace the specific hero button (outline)
    // The previous text could be "Consult Lung Specialist", "Consult Pain Specialist", etc.
    // Or "Get Directions" in emergency
    // We can replace the Button element if it's the second button.
    
    // Actually, doing this with regex might be tricky if they differ slightly. Let's do it manually or write a robust regex.
    // Let's first log what the outline buttons say.
}
