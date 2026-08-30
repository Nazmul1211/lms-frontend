import React from "react";
import Link from "next/link";
import { InstructorCourse } from "@/types/instructor";
import { Users, BookOpen, BarChart3, ArrowRight, Video } from "lucide-react";

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
      className={`group flex flex-col rounded-2xl border bg-white dark:bg-[#0f172a] overflow-hidden shadow-sm transition-all duration-200 ${
        isSelected
          ? "border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      {/* Cover Image */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={
            course.coverImage ||
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
          }
          alt={course.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 shadow-sm">
            {course.category}
          </span>
          <span className="rounded-full bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
          {course.title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
            <span>{course.totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-blue-500" />
            <span>{course.totalStudents} Enrolled</span>
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
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
              style={{ width: `${course.averageProgress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelectCourse && onSelectCourse(course.id)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Inspect Roster <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <Link
            href={`/courses/${course.id}`}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Public View
          </Link>
        </div>
      </div>
    </div>
  );
}
