import React from "react";
import Link from "next/link";
import { InstructorCourse } from "@/types/instructor";
import { Users, BookOpen, ExternalLink, CheckCircle2, Award, ChevronRight } from "lucide-react";

interface InstructorCourseCardProps {
  course: InstructorCourse;
  onSelectCourse?: (courseId: number) => void;
  isSelected?: boolean;
}

export default function InstructorCourseCard({
  course,
  onSelectCourse,
  isSelected,
}: InstructorCourseCardProps) {
  return (
    <div
      className={`group flex flex-col rounded-2xl border bg-white dark:bg-[#0f172a] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
        isSelected
          ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-indigo-500/10 shadow-lg"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      {/* Cover Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={
            course.coverImage ||
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
          }
          alt={course.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            {course.category}
          </span>
          <span className="rounded-full bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            {course.level}
          </span>
        </div>

        {/* Active Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-md animate-pulse">
              <CheckCircle2 className="h-3 w-3" /> Selected Roster
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
          {course.title}
        </h3>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#131d33]/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
            <span className="font-semibold">{course.totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Users className="h-3.5 w-3.5 text-blue-500" />
            <span className="font-semibold">{course.totalStudents} Enrolled</span>
          </div>
        </div>

        {/* Average Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Cohort Avg Progress</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{course.averageProgress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${course.averageProgress}%` }}
            />
          </div>
        </div>

        {/* Actions Button Group */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-auto flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => onSelectCourse && onSelectCourse(course.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95 ${
              isSelected
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>{isSelected ? "Filtering Roster" : "Inspect Roster"}</span>
          </button>

          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <span>Public View</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
