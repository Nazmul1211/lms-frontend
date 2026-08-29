"use client";

import React, { useState } from "react";
import { LessonSummary } from "@/types/course";
import { PlayCircle, Lock, ChevronDown, CheckCircle, Clock } from "lucide-react";

interface CurriculumProps {
  lessons: LessonSummary[];
  courseTitle: string;
  totalDuration: string;
}

export default function CurriculumAccordion({
  lessons,
  courseTitle,
  totalDuration,
}: CurriculumProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header with Title and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Course Curriculum
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {lessons.length} lessons • {totalDuration} total length • Structured learning path
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <span>{isOpen ? "Collapse Syllabus" : "Expand Syllabus"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Lessons List */}
      {isOpen && (
        <div className="space-y-2.5">
          {lessons.map((lesson, idx) => (
            <div
              key={lesson.id || idx}
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#131d33]/40 hover:bg-slate-100/80 dark:hover:bg-[#131d33] transition-colors"
            >
              {/* Left: Icon, Number and Title */}
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 shrink-0 font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="truncate">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {lesson.title}
                  </p>
                </div>
              </div>

              {/* Right: Preview badge & Duration */}
              <div className="flex items-center gap-3 shrink-0 text-xs">
                {lesson.isPreview ? (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] border border-emerald-200/60 dark:border-emerald-900/60">
                    <PlayCircle className="h-3 w-3" /> Preview
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px]">
                    <Lock className="h-3 w-3" /> Enrolled only
                  </span>
                )}
                <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  {lesson.duration || "20 mins"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
