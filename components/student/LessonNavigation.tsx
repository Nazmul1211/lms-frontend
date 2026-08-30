"use client";

import React from "react";
import Link from "next/link";
import { Lesson } from "@/types/lesson";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Award } from "lucide-react";

interface LessonNavigationProps {
  courseId: number;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export default function LessonNavigation({
  courseId,
  prevLesson,
  nextLesson,
  isCompleted,
  onToggleComplete,
}: LessonNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm">
      
      {/* Previous Lesson Button */}
      {prevLesson ? (
        <Link
          href={`/student/courses/${courseId}/lessons/${prevLesson.id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous Lesson
        </Link>
      ) : (
        <div className="hidden sm:block w-28" />
      )}

      {/* Center: Mark Complete Toggle */}
      <button
        type="button"
        onClick={onToggleComplete}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
          isCompleted
            ? "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100"
            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
            <span>Completed (Click to Undo)</span>
          </>
        ) : (
          <>
            <Circle className="h-4 w-4" />
            <span>Mark as Complete</span>
          </>
        )}
      </button>

      {/* Next Lesson or Final Quiz CTA */}
      {nextLesson ? (
        <Link
          href={`/student/courses/${courseId}/lessons/${nextLesson.id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
        >
          Next Lesson
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link
          href={`/student/courses/${courseId}/quiz`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-all"
        >
          <Award className="h-4 w-4" />
          Take Certification Quiz
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

    </div>
  );
}
