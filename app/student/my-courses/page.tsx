"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getMyCourses } from "@/services/studentService";
import { EnrolledCourse } from "@/types/student";
import EnrolledCourseCard from "@/components/student/EnrolledCourseCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { BookOpen, Search, X, ChevronRight, Plus } from "lucide-react";

type FilterTab = "all" | "in_progress" | "completed";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMyCourses();
        setCourses(data);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Tab filter
      if (activeTab === "in_progress" && (c.progressPercentage === 0 || c.progressPercentage === 100)) {
        return false;
      }
      if (activeTab === "completed" && c.progressPercentage < 100) {
        return false;
      }

      // Search query
      if (
        searchQuery &&
        !c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [courses, activeTab, searchQuery]);

  return (
    <ProtectedRoute allowedRoles={["student", "admin"]}>
      <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/student/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Student Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium">My Courses</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Learning Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage and track your enrolled courses and completion milestones.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            Browse New Courses
          </Link>
        </div>

        {/* Search & Tabs Filter Toolbar */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter my courses by title or topic..."
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                All ({courses.length})
              </button>
              <button
                onClick={() => setActiveTab("in_progress")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "in_progress"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                In Progress ({courses.filter((c) => c.progressPercentage > 0 && c.progressPercentage < 100).length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "completed"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Completed ({courses.filter((c) => c.progressPercentage === 100).length})
              </button>
            </div>

          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <EnrolledCourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-12 text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto">
              <Search className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No courses match this filter
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try switching between tabs or searching for a different course keyword.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
      </div>
    </ProtectedRoute>
  );
}
