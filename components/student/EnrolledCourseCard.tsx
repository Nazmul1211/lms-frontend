import React from "react";
import Link from "next/link";
import { EnrolledCourse } from "@/types/student";
import { PlayCircle, CheckCircle2, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  const isCompleted = course.progressPercentage === 100;
  const targetLessonId = course.lastAccessedLessonId || 101;

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5">
      
      {/* Cover Image Thumbnail & Status Badge */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={
            course.coverImage ||
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
          }
          alt={course.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
            {course.category}
          </span>
          <span className="rounded-full bg-slate-900/80 dark:bg-slate-800/80 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm">
            {course.level}
          </span>
        </div>

        {/* Completion status pill */}
        <div className="absolute top-3 right-3">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 text-white backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold shadow-sm">
              <CheckCircle2 className="h-3 w-3" /> Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600/90 text-white backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold shadow-sm">
              <PlayCircle className="h-3 w-3" /> In Progress
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        
        {/* Course Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          <Link href={`/student/courses/${course.courseId}/lessons/${targetLessonId}`}>
            {course.title}
          </Link>
        </h3>

        {/* Progress Bar and Indicator */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Progress</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {course.progressPercentage}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-500 dark:to-emerald-400"
              }`}
              style={{ width: `${course.progressPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-right">
            {course.completedLessonsCount} of {course.totalLessons} lessons completed
          </p>
        </div>

        {/* Next Lesson Indicator */}
        {course.lastAccessedLessonTitle && (
          <div className="rounded-xl bg-slate-50 dark:bg-[#131d33]/60 p-2.5 border border-slate-100 dark:border-slate-800/80 text-xs">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              {isCompleted ? "Course Finished" : "Next Topic:"}
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5">
              {course.lastAccessedLessonTitle}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
              {course.instructor?.avatar ? (
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                  {course.instructor?.name?.[0] || "I"}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[110px]">
              {course.instructor?.name}
            </span>
          </div>

          <Link
            href={`/student/courses/${course.courseId}/lessons/${targetLessonId}`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95 ${
              isCompleted
                ? "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
            }`}
          >
            <span>{isCompleted ? "Review Lessons" : "Continue"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
