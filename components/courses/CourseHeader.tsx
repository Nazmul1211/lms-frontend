import React from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import CourseEnrollmentAction from "@/components/courses/CourseEnrollmentAction";
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

        {/* Right Column: Interactive Enrollment Action Box */}
        <div className="lg:col-span-4">
          <CourseEnrollmentAction course={course} />
        </div>

      </div>

    </div>
  );
}
