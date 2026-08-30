import React from "react";
import Link from "next/link";
import { QuizResult } from "@/types/quiz";
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizScoreReportProps {
  result: QuizResult;
  onRetakeQuiz: () => void;
}

export default function QuizScoreReport({ result, onRetakeQuiz }: QuizScoreReportProps) {
  const optionLetters = ["A", "B", "C", "D", "E"];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Pass / Fail Status */}
      <div
        className={cn(
          "rounded-3xl border p-8 sm:p-12 text-center relative overflow-hidden shadow-xl",
          result.passed
            ? "border-emerald-500/40 bg-gradient-to-b from-emerald-950/80 via-[#0a1f18] to-[#07130f] text-white"
            : "border-amber-500/40 bg-gradient-to-b from-amber-950/80 via-[#1f150a] to-[#120c06] text-white"
        )}
      >
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          
          {/* Trophy / Status Icon */}
          <div
            className={cn(
              "h-16 w-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg",
              result.passed
                ? "bg-emerald-500 text-white shadow-emerald-500/30"
                : "bg-amber-500 text-white shadow-amber-500/30"
            )}
          >
            {result.passed ? <Award className="h-9 w-9" /> : <RotateCcw className="h-9 w-9" />}
          </div>

          <div className="space-y-1">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                result.passed
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              )}
            >
              {result.passed ? "Assessment Passed 🎉" : "Assessment Incomplete"}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white pt-1">
              Your Score: {result.scorePercentage}%
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              {result.passed
                ? `Outstanding! You answered ${result.correctCount} of ${result.totalQuestions} questions correctly and met the ${result.passingScorePercentage}% threshold.`
                : `You scored ${result.correctCount} of ${result.totalQuestions} correct. You need at least ${result.passingScorePercentage}% to earn your course certificate.`}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={onRetakeQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-105"
            >
              <RotateCcw className="h-4 w-4" /> Retake Quiz
            </button>
            <Link
              href={`/student/courses/${result.courseId}/lessons/101`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <BookOpen className="h-4 w-4" /> Review Course Lessons
            </Link>
          </div>

        </div>
      </div>

      {/* Detailed Question-by-Question Review */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Detailed Answers & Explanations
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review server-verified explanations for each question.
          </p>
        </div>

        <div className="space-y-6 pt-2">
          {result.results.map((item, idx) => {
            return (
              <div
                key={item.questionId}
                className={cn(
                  "p-5 rounded-2xl border space-y-4",
                  item.isCorrect
                    ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20"
                )}
              >
                {/* Question header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5",
                        item.isCorrect
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                      )}
                    >
                      {idx + 1}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {item.question}
                    </h3>
                  </div>

                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0",
                      item.isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300"
                    )}
                  >
                    {item.isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" /> Incorrect
                      </>
                    )}
                  </span>
                </div>

                {/* Options summary */}
                <div className="space-y-1.5 pl-8 text-xs">
                  {item.options.map((opt, optIdx) => {
                    const isUserChoice = item.selectedOption === optIdx;
                    const isCorrectChoice = item.correctOption === optIdx;
                    const letter = optionLetters[optIdx] || `${optIdx + 1}`;

                    return (
                      <div
                        key={optIdx}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg",
                          isCorrectChoice
                            ? "bg-emerald-100/70 dark:bg-emerald-900/50 text-emerald-950 dark:text-emerald-200 font-semibold border border-emerald-300/80 dark:border-emerald-800"
                            : isUserChoice && !item.isCorrect
                            ? "bg-rose-100/70 dark:bg-rose-900/50 text-rose-950 dark:text-rose-200 font-medium border border-rose-300/80 dark:border-rose-800"
                            : "text-slate-600 dark:text-slate-400"
                        )}
                      >
                        <span className="font-bold">{letter}.</span>
                        <span>{opt}</span>
                        {isCorrectChoice && (
                          <span className="ml-auto text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                            ✓ Correct Answer
                          </span>
                        )}
                        {isUserChoice && !item.isCorrect && (
                          <span className="ml-auto text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300">
                            ✗ Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Server Explanation */}
                {item.explanation && (
                  <div className="ml-8 p-3 rounded-xl bg-white dark:bg-[#131d33] border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <p className="font-bold text-slate-900 dark:text-white mb-0.5">Explanation:</p>
                    <p>{item.explanation}</p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
