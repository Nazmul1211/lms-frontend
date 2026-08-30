"use client";

import React from "react";
import Link from "next/link";
import { Lesson, CourseProgress } from "@/types/lesson";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  Award,
  ChevronLeft,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonSidebarProps {
  courseId: number;
  courseTitle: string;
  lessons: Lesson[];
  currentLessonId: number;
  progress: CourseProgress;
  onToggleComplete: (lessonId: number, isCompleted: boolean) => void;
}

export default function LessonSidebar({
  courseId,
  courseTitle,
  lessons,
  currentLessonId,
  progress,
  onToggleComplete,
}: LessonSidebarProps) {
  const isQuizUnlocked = progress.progressPercentage >= 60;

  return (
    <aside className="w-full lg:w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-6 shrink-0 flex flex-col h-full">
      
      {/* Top Header: Back to Dashboard & Course Title */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <Link
          href="/student/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h2 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
          {courseTitle}
        </h2>
      </div>

      {/* Progress Metric */}
      <div className="space-y-2 rounded-xl bg-slate-50 dark:bg-[#131d33]/70 p-3.5 border border-slate-100 dark:border-slate-800/80">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Course Progress</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {progress.progressPercentage}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progress.progressPercentage}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-right">
          {progress.completedLessonIds.length} of {lessons.length} completed
        </p>
      </div>

      {/* Lessons Checklist */}
      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[50vh] lg:max-h-none pr-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Curriculum Lessons
        </p>

        {lessons.map((lesson, idx) => {
          const isCurrent = lesson.id === currentLessonId;
          const isCompleted = progress.completedLessonIds.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              className={cn(
                "group flex items-center justify-between p-2.5 rounded-xl text-xs transition-all border",
                isCurrent
                  ? "bg-indigo-50/90 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/80 font-semibold text-indigo-950 dark:text-white shadow-sm"
                  : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
              )}
            >
              {/* Left: Complete toggle button & link to lesson */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(lesson.id, !isCompleted);
                  }}
                  title={isCompleted ? "Mark incomplete" : "Mark complete"}
                  className="shrink-0 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600 hover:text-indigo-500" />
                  )}
                </button>

                <Link
                  href={`/student/courses/${courseId}/lessons/${lesson.id}`}
                  className="truncate hover:underline"
                >
                  {lesson.title}
                </Link>
              </div>

              <span className="text-[10px] text-slate-400 shrink-0 font-normal">
                {lesson.duration}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quiz Section at Bottom */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
        <Link
          href={`/student/courses/${courseId}/quiz`}
          className="flex items-center justify-between p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/50 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <Award className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Certification Quiz
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Auto-graded assessment</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            Take Quiz →
          </span>
        </Link>
      </div>

    </aside>
  );
}
