const fs = require('fs');
const { execSync } = require('child_process');

const departments = [
    'bariatric', 'emergency', 'ent', 'general-surgery', 'gynaecology', 
    'neurosurgery', 'oncology', 'orthopaedics', 'pain-management', 
    'proctology', 'pulmonology', 'urology', 'vascular'
];

const blogSection = `
            {/* RELATED BLOGS SECTION */}
            {blogs && blogs.length > 0 && (
                <Section className="py-24 bg-white border-t border-slate-200">
                    <div className="container max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-[#FF8202] font-bold tracking-wider uppercase text-sm mb-3 block">Expert Insights</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Related Articles</h2>
                            </div>
                            <Link href="/blog">
                                <Button variant="ghost" className="hidden sm:flex items-center text-[#3E7DCA] hover:text-[#2d62a3] hover:bg-blue-50">
                                    View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <Link href={\`/blog/\${blog.slug}\`} key={blog.id} className="group flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-200">
                                        {blog.image_url ? (
                                            <Image src={blog.image_url} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                <span>No image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3E7DCA] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#3E7DCA] transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                            {blog.excerpt}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <span className="text-sm font-semibold text-[#FF8202] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read Article <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Section>
            )}
`;

for (const dept of departments) {
    console.log(`Recovering ${dept}...`);
    try {
        let content = execSync(`git show HEAD:"src/app/(public)/departments/${dept}/page.tsx"`, { encoding: 'utf8' });
        
        // Find the export default function name
        const match = content.match(/export default function ([a-zA-Z]+)Page\(\)/);
        if (!match) {
            console.log(`Could not find function name for ${dept}`);
            continue;
        }
        
        const componentName = match[1] + "Content";
        
        // Replace export default function with const
        content = content.replace(/export default function [a-zA-Z]+Page\(\)/, `export const ${componentName} = ({ blogs }: { blogs: any[] }) =>`);

        // Inject ArrowRight, Link, Image into imports if missing
        if (!content.includes('ArrowRight')) {
            content = content.replace(/from "lucide-react"/, ', ArrowRight } from "lucide-react"');
        }
        if (!content.includes('import Link')) {
            content = 'import Link from "next/link"\n' + content;
        }
        if (!content.includes('import Image')) {
            content = 'import Image from "next/image"\n' + content;
        }

        // Try to inject blogs section before FAQ or FOOTER CTA
        if (content.includes('{/* SECTION 6: FAQ */}')) {
            content = content.replace('{/* SECTION 6: FAQ */}', blogSection + '\n            {/* SECTION 6: FAQ */}');
        } else if (content.includes('{/* SECTION 5: FAQ */}')) {
            content = content.replace('{/* SECTION 5: FAQ */}', blogSection + '\n            {/* SECTION 5: FAQ */}');
        } else if (content.includes('{/* FOOTER CTA */}')) {
            content = content.replace('{/* FOOTER CTA */}', blogSection + '\n            {/* FOOTER CTA */}');
        } else {
            // just put it before the last </div>
            const lastDiv = content.lastIndexOf('</div>');
            content = content.substring(0, lastDiv) + blogSection + content.substring(lastDiv);
        }

        fs.writeFileSync(`src/components/departments/${dept}.tsx`, content);
        console.log(`Saved src/components/departments/${dept}.tsx`);
    } catch (e) {
        console.error(`Failed to process ${dept}:`, e.message);
    }
}
