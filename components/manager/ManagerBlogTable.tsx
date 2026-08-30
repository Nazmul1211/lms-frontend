"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import {
  Search,
  X,
  FileEdit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  FileClock,
  Eye,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ManagerBlogTableProps {
  blogs: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onToggleStatus: (post: BlogPost) => void;
  onDelete: (id: number) => void;
  onCreateNew: () => void;
}

export default function ManagerBlogTable({
  blogs,
  onEdit,
  onToggleStatus,
  onDelete,
  onCreateNew,
}: ManagerBlogTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.author.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [blogs, statusFilter, searchQuery]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden p-5 sm:p-6 space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Engineering Blog Articles
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage drafts and publish engineering articles visible to students and the public.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Articles ({blogs.length})</option>
            <option value="published">Published ({blogs.filter((b) => b.status === "published").length})</option>
            <option value="draft">Drafts ({blogs.filter((b) => b.status === "draft").length})</option>
          </select>

          {/* Create New Button */}
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            New Article
          </button>

        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="py-3 px-3">Article Title</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Status (Click to toggle)</th>
              <th className="py-3 px-3">Author</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredBlogs.map((post) => {
              const isPublished = post.status === "published";
              return (
                <tr
                  key={post.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#131d33]/50 transition-colors"
                >
                  {/* Title & Excerpt */}
                  <td className="py-3.5 px-3 max-w-[220px]">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {post.excerpt || post.content.slice(0, 60)}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px] border border-slate-200/60 dark:border-slate-700/60">
                      {post.category}
                    </span>
                  </td>

                  {/* Status Toggle Button */}
                  <td className="py-3.5 px-3">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(post)}
                      title="Click to toggle publish status"
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-105",
                        isPublished
                          ? "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                          : "bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                      )}
                    >
                      {isPublished ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Published
                        </>
                      ) : (
                        <>
                          <FileClock className="h-3 w-3 text-amber-600" /> Draft
                        </>
                      )}
                    </button>
                  </td>

                  {/* Author */}
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {post.author?.name || "Content Manager"}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                    {post.publishedAt
                      ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.publishedAt))
                      : "Draft"}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isPublished && (
                        <Link
                          href={`/blogs/${post.id}`}
                          title="View Public Article"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => onEdit(post)}
                        title="Edit Article"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <FileEdit className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(post.id)}
                        title="Delete Article"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredBlogs.length === 0 && (
          <div className="py-10 text-center text-xs text-slate-400">
            No articles found matching the current filter.
          </div>
        )}
      </div>

    </div>
  );
}
