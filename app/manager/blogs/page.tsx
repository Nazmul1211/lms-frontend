"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getAllManagerBlogs,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  computeManagerMetrics,
} from "@/services/managerService";
import { BlogPost } from "@/types/blog";
import { CreateBlogPostPayload, ManagerMetrics } from "@/types/manager";
import ManagerBlogTable from "@/components/manager/ManagerBlogTable";
import BlogAuthorModal from "@/components/manager/BlogAuthorModal";
import CourseCurriculumManager from "@/components/manager/CourseCurriculumManager";
import {
  FileEdit,
  Newspaper,
  BookOpen,
  CheckCircle2,
  FileClock,
  Plus,
  Layers,
} from "lucide-react";

export default function ContentManagerPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [metrics, setMetrics] = useState<ManagerMetrics>({
    totalArticles: 0,
    publishedCount: 0,
    draftCount: 0,
    totalCourses: 4,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<"blogs" | "courses">("blogs");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await getAllManagerBlogs();
      setBlogs(data);
      setMetrics(computeManagerMetrics(data));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveArticle = async (payload: CreateBlogPostPayload) => {
    if (editingPost) {
      await updateBlogPost(editingPost.id, payload);
    } else {
      await createBlogPost(payload);
    }
    await loadData();
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    await updateBlogPost(post.id, { status: nextStatus });
    await loadData();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      await deleteBlogPost(id);
      await loadData();
    }
  };

  const handleOpenCreate = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-900/60">
              <FileEdit className="h-3.5 w-3.5" />
              <span>Content Authoring Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Content Studio — {user?.name || "Elena Content"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Author technical blog posts, manage draft/publish visibility, and structure course lessons.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            Create New Article
          </button>
        </div>

        {/* Manager Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Articles</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Newspaper className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {metrics.totalArticles}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Authoring library</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Published (Public)</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {metrics.publishedCount}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Live on engineering blog</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Drafts (Internal)</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <FileClock className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {metrics.draftCount}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Hidden from public view</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Platform Courses</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {metrics.totalCourses}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Active curriculum modules</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "blogs"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Newspaper className="h-4 w-4" />
            Engineering Blog Articles
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "courses"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Layers className="h-4 w-4" />
            Curriculum & Lessons Editor
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === "blogs" ? (
          <ManagerBlogTable
            blogs={blogs}
            onEdit={handleOpenEdit}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onCreateNew={handleOpenCreate}
          />
        ) : (
          <CourseCurriculumManager />
        )}

        {/* Create / Edit Modal */}
        <BlogAuthorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveArticle}
          editingPost={editingPost}
        />

      </div>
    </div>
  );
}
