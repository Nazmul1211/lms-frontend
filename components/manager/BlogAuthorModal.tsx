"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";
import { CreateBlogPostPayload } from "@/types/manager";
import { X, FileEdit, Sparkles, Image, Clock, Eye, AlertCircle } from "lucide-react";

interface BlogAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: CreateBlogPostPayload) => Promise<void>;
  editingPost?: BlogPost | null;
}

export default function BlogAuthorModal({
  isOpen,
  onClose,
  onSave,
  editingPost,
}: BlogAuthorModalProps) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Architecture");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setExcerpt(editingPost.excerpt || "");
      setCategory(editingPost.category);
      setContent(editingPost.content);
      setCoverImage(editingPost.coverImage || "");
      setReadTime(editingPost.readTime || "5 min read");
      setStatus(editingPost.status);
    } else {
      setTitle("");
      setExcerpt("");
      setCategory("Architecture");
      setContent("### Introduction\n\nWrite your technical article content here...\n\n### Key Concepts\n- Point 1\n- Point 2\n\n### Summary\nConclusion.");
      setCoverImage("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60");
      setReadTime("4 min read");
      setStatus("published");
    }
    setError(null);
  }, [editingPost, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Please provide a title and article content.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSave({
        title,
        excerpt: excerpt || content.slice(0, 120) + "...",
        content,
        category,
        coverImage,
        readTime,
        status,
      });
      onClose();
    } catch {
      setError("Failed to save article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Architecture", "Security", "Engineering", "Frontend", "DevOps"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
              <FileEdit className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingPost ? "Edit Blog Article" : "Create Engineering Article"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Author technical articles with draft or published visibility controls.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Architecting Resilient Full-Stack Systems with Next.js 16"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Category & Status Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Publication Status *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    status === "draft"
                      ? "bg-amber-50 dark:bg-amber-950/70 border-amber-500 text-amber-800 dark:text-amber-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
                  }`}
                >
                  📝 Draft (Internal)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    status === "published"
                      ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500"
                  }`}
                >
                  🚀 Published (Public)
                </button>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Short Summary / Excerpt
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief overview displayed on article cards..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Markdown Content */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Article Body (Markdown Supported) *
              </label>
              <span className="text-[11px] text-slate-400">Use ### for headings, - for lists</span>
            </div>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : status === "published"
                ? "Save & Publish Article"
                : "Save as Draft"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
