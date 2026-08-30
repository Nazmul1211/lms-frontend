import React from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import {
  Clock,
  BookOpen,
  Users,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  PlayCircle,
  FileCheck,
} from "lucide-react";

export default function CourseHeader({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-5">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Courses
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-md">
          {course.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Course Main Info */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900/60">
              {course.category}
            </span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {course.level}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              {course.duration}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {course.description}
          </p>

          {/* Instructor & Metadata row */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
            
            {/* Instructor */}
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                {course.instructor.avatar ? (
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {course.instructor.name[0]}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Instructor</p>
                <p className="font-semibold text-slate-900 dark:text-white">{course.instructor.name}</p>
              </div>
            </div>

            {/* Total Lessons */}
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>{course.totalLessons} Structured Lessons</span>
            </div>

            {/* Students enrolled */}
            {course.enrolledStudentsCount && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>{course.enrolledStudentsCount.toLocaleString()} Students Enrolled</span>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Enrollment Action Box */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d33] p-5 space-y-5">
            
            {/* Cover Image Thumbnail */}
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-900 relative">
              <img
                src={course.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"}
                alt={course.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                  <PlayCircle className="h-3.5 w-3.5 text-indigo-400" /> Video & Text Curriculum
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                href={`/student/courses/${course.id}/lessons/${course.lessons?.[0]?.id || 101}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 text-sm font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
              >
                Start Learning Now
              </Link>
              <Link
                href={`/student/courses/${course.id}/quiz`}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 py-2.5 px-4 text-xs font-bold transition-all"
              >
                <Award className="h-4 w-4" />
                Take Course Quiz
              </Link>
              <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
                Instant access • Auto-graded quizzes included
              </p>
            </div>

            {/* Course Features List */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">This course includes:</p>
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{course.duration} on-demand video & tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Sanitized auto-graded certification quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Real-time progress persistence</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>4-Role access & student dashboard</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
