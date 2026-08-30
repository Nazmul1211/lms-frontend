"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Quiz } from "@/types/quiz";
import { getStudentAvailableQuizzes } from "@/services/quizService";
import {
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Hourglass,
  HelpCircle,
} from "lucide-react";

interface StudentQuizzesListProps {
  enrolledCourseIds: (number | string)[];
}

export default function StudentQuizzesList({ enrolledCourseIds }: StudentQuizzesListProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const list = await getStudentAvailableQuizzes(enrolledCourseIds);
        setQuizzes(list);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuizzes();
  }, [enrolledCourseIds]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <span>Loading course quizzes & timeframes...</span>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
              <Award className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Course Quizzes & Assessments
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Auto-graded certification tests assigned to your enrolled courses with active timeframes.
          </p>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizzes.map((quiz) => {
          // Calculate remaining time
          const now = Date.now();
          const deadlineTime = quiz.deadline ? new Date(quiz.deadline).getTime() : now + 48 * 3600 * 1000;
          const isClosed = quiz.isClosed || now > deadlineTime;
          const remainingHours = Math.max(0, Math.round((deadlineTime - now) / (1000 * 3600)));

          return (
            <div
              key={quiz.id}
              className={`rounded-2xl border bg-white dark:bg-[#0f172a] p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all hover:border-indigo-300 dark:hover:border-indigo-800 ${
                isClosed
                  ? "border-slate-200 dark:border-slate-800 opacity-80"
                  : "border-indigo-100 dark:border-indigo-900/60 shadow-indigo-500/5"
              }`}
            >
              {/* Top Row: Course badge & Timeframe badge */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold truncate max-w-[220px]">
                    🎓 {quiz.courseTitle || "Enrolled Course"}
                  </span>

                  {/* Timeframe Status Pill */}
                  {isClosed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 text-[10px] font-bold uppercase tracking-wider">
                      <Lock className="h-3 w-3" /> Closed / Expired
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 text-[10px] font-bold tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      ⏳ Closes in {remainingHours}h
                    </span>
                  )}
                </div>

                {/* Quiz Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>
              </div>

              {/* Middle Metrics: Duration, Questions, Pass threshold */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>{quiz.timeLimitMinutes || 20} Mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>{quiz.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>{quiz.passingScorePercentage}% Pass</span>
                </div>
              </div>

              {/* Bottom Row: Submission Result or Action CTA */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {quiz.score !== undefined ? (
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-1.5">
                      {quiz.passed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/60 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Passed ({quiz.score}%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-900/60 text-xs font-bold text-amber-700 dark:text-amber-400">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Score: {quiz.score}%
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/student/courses/${quiz.courseId}/quiz`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {quiz.passed ? "Review Quiz" : "Retake Quiz"}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ) : isClosed ? (
                  <div className="flex items-center justify-between w-full text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-rose-500 font-medium">
                      <Lock className="h-3.5 w-3.5" /> Timeframe ended
                    </span>
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium cursor-not-allowed"
                    >
                      Closed
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Open for Submission
                    </span>

                    <Link
                      href={`/student/courses/${quiz.courseId}/quiz`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm shadow-indigo-600/20 transition-all hover:scale-105"
                    >
                      Take Assessment
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
