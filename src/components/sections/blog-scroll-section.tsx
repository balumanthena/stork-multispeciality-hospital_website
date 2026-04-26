import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";
import { Container } from "@/components/layout/container";
import { getLatestBlogs } from "@/lib/blogs";

export async function BlogScrollSection() {
    const blogs = await getLatestBlogs(6);

    if (!blogs || blogs.length === 0) return null;

    // Clone array to create a seamless infinite marquee effect
    const duplicatedBlogs = [...blogs, ...blogs];

    return (
        <section className="py-10 md:py-16 bg-slate-50 overflow-hidden border-t border-slate-100">
            <Container className="mb-8 text-right">
                <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-1">
                    Latest Articles
                </h2>
                <p className="text-slate-500 text-sm">
                    Read updates and research from our medical experts.
                </p>
            </Container>

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
                            href={`/insights/articles/${blog.slug}`}
                            className="group flex-shrink-0 w-[300px] sm:w-[360px] bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 block focus:outline-none relative border-b-0 hover:border-b-4 hover:border-b-[#ff8202]"
                        >
                            <div className="relative aspect-[16/11] w-full bg-slate-100 overflow-hidden">
                                <Image
                                    src={blog.image_url || "/images/placeholder-blog.png"}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-4 left-4 bg-[#ff8202] text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg tracking-wider">
                                    <BookOpen className="w-3 h-3" />
                                    ARTICLE
                                </div>
                            </div>
                            <div className="p-7 flex flex-col items-start text-left bg-white">
                                <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-3">
                                    <Calendar className="w-3.5 h-3.5 text-[#ff8202]" />
                                    <span>
                                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                                            month: "short", day: "numeric", year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <h3 className="font-bold text-[18px] text-slate-900 line-clamp-2 leading-[1.3] mb-4 group-hover:text-[#ff8202] transition-colors duration-300">
                                    {blog.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4 font-medium opacity-80">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center gap-1.5 text-[#ff8202] text-[13px] font-bold mt-auto group-hover:translate-x-2 transition-transform duration-300">
                                    Read Article <span className="text-lg">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
