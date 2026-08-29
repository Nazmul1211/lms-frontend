import React from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import { Clock, BookOpen, Users, ArrowRight } from "lucide-react";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5">
      
      {/* Thumbnail with Category & Difficulty Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
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
          <span className="rounded-full bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
          <Link href={`/courses/${course.id}`}>{course.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed font-normal">
          {course.description}
        </p>

        {/* Metadata info */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-5 mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-3.5">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{course.totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{course.duration}</span>
          </div>
          {course.enrolledStudentsCount && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span>{course.enrolledStudentsCount}</span>
            </div>
          )}
        </div>

        {/* Footer: Instructor & CTA Button */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3.5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
              {course.instructor?.avatar ? (
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 text-xs font-bold">
                  {course.instructor?.name?.[0] || "I"}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[100px]">
              {course.instructor?.name}
            </span>
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
          >
            Explore Syllabus
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
