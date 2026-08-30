import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
        new Date(post.publishedAt)
      )
    : "Recently Published";

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5">
      
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={
            post.coverImage ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
          }
          alt={post.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            {post.category}
          </span>
          {post.readTime && (
            <span className="rounded-full bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm flex items-center gap-1">
              <Clock className="h-3 w-3 text-indigo-400" />
              {post.readTime}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Date & Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-2">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
          <Link href={`/blogs/${post.id}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-5 leading-relaxed font-normal">
          {post.excerpt || post.content.slice(0, 120) + "..."}
        </p>

        {/* Footer: Author & Read CTA */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3.5 mt-auto">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                  {post.author?.name?.[0] || "A"}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
              {post.author?.name}
            </span>
          </div>

          <Link
            href={`/blogs/${post.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-[1.02] active:scale-95"
          >
            <span>Read</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </article>
  );
}
