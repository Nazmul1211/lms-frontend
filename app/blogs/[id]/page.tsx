import React from "react";
import Link from "next/link";
import { getBlogPostById } from "@/services/blogService";
import { ChevronRight, Clock, Calendar, ArrowLeft, Share2, HelpCircle, User, Award } from "lucide-react";
import RichContentRenderer from "@/components/common/RichContentRenderer";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) {
    return { title: "Article Not Found — EduForge LMS" };
  }
  return {
    title: `${post.title} — EduForge Engineering Blog`,
    description: post.excerpt || post.content.slice(0, 150),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 sm:p-12 text-center max-w-md space-y-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Article Not Found
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The blog article you requested does not exist or has been unpublished.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Engineering Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(
        new Date(post.publishedAt)
      )
    : "Recently Published";

  return (
    <article className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/blogs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Article Header Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900/60">
              {post.category}
            </span>
            {post.readTime && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                {post.readTime}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          {/* Author info row */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                {post.author?.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 font-bold text-xs">
                    {post.author?.name?.[0] || "A"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{post.author.role || "Author"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/blogs"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Articles
            </Link>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-900 shadow-sm">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Formatted Article Content */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <RichContentRenderer content={post.content} />
          </div>

          {/* Author Footer Bio */}
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#131d33] p-5 flex items-start gap-4 mt-8">
            <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
              {post.author?.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 font-bold text-sm">
                  {post.author?.name?.[0] || "A"}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Written by {post.author.name}
                <Award className="h-3.5 w-3.5 text-indigo-500" />
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Contributing engineering insights on system architecture, role security, and scalable software design at EduForge.
              </p>
            </div>
          </div>

        </div>

      </div>
    </article>
  );
}
