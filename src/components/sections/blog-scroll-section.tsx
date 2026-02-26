import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";
import { getLatestBlogs } from "@/lib/blogs";

export async function BlogScrollSection() {
    const blogs = await getLatestBlogs(6);

    if (!blogs || blogs.length === 0) return null;

    // Clone array to create a seamless infinite marquee effect
    const duplicatedBlogs = [...blogs, ...blogs];

    return (
        <section className="py-16 bg-slate-50 overflow-hidden border-t border-slate-100">
            <div className="container max-w-7xl mx-auto px-6 mb-8 text-right">
                <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-1">
                    Latest Articles
                </h2>
                <p className="text-slate-500 text-sm">
                    Read updates and research from our medical experts.
                </p>
            </div>

            {/* Marquee Scroll Container (Right to Left) */}
            <div className="w-full relative py-4">
                {/* Gradient Fades for Smooth Illusion */}
                <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                {/* Animated Track */}
                <div className="flex gap-6 w-max animate-marquee hover:paused group">
                    {duplicatedBlogs.map((blog, idx) => (
                        <Link
                            key={`${blog.id}-${idx}`}
                            href={`/blogs/${blog.slug}`}
                            className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 block focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                                <Image
                                    src={blog.image_url || "/images/placeholder-blog.png"}
                                    alt={blog.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-700 text-[10px] uppercase font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                                    <BookOpen className="w-3 h-3 text-[var(--color-primary)]" />
                                    ARTICLE
                                </div>
                            </div>
                            <div className="p-5 flex flex-col items-start text-left">
                                <h3 className="font-semibold text-[15px] text-slate-900 line-clamp-2 leading-[1.3] mb-2 hover:text-[var(--color-primary)] transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-slate-500 text-xs line-clamp-1 mb-3">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mt-auto">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>
                                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                                            month: "short", day: "numeric", year: "numeric"
                                        })}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
