import React from "react";
import { getBlogPosts } from "@/services/blogService";
import BlogList from "@/components/blog/BlogList";
import { Newspaper, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog — EduForge LMS",
  description: "Read architectural insights, security deep dives, and web engineering best practices from EduForge engineers and instructors.",
};

export default async function BlogsPage() {
  const posts = await getBlogPosts(false);

  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/90 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Engineering & Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineering Blog & Insights
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Explore deep dives into modern web architectures, role-based security patterns, and scalable learning system designs.
          </p>
        </div>

        {/* Blog Posts Interactive List */}
        <BlogList initialPosts={posts} />

      </div>
    </div>
  );
}
