import React from "react";
import { getCourses } from "@/services/courseService";
import CourseCatalog from "@/components/courses/CourseCatalog";
import { BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Catalog — EduForge LMS",
  description: "Browse hands-on engineering courses covering Next.js, Tailwind CSS, Strapi, and Role-Based Access Control.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/90 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Curated Curriculum</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore Courses & Learning Paths
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Choose from comprehensive courses designed to take you from foundational concepts to production-grade architectures.
          </p>
        </div>

        {/* Interactive Course Catalog */}
        <CourseCatalog initialCourses={courses} />

      </div>
    </div>
  );
}
