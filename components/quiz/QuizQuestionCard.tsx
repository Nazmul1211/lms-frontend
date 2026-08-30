import React from "react";
import { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionIndex?: number;
  onSelectOption: (optionIndex: number) => void;
}

export default function QuizQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
}: QuizQuestionCardProps) {
  const optionLetters = ["A", "B", "C", "D", "E"];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header index */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-xs text-slate-400">Multiple Choice</span>
      </div>

      {/* Question Prompt */}
      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const letter = optionLetters[idx] || `${idx + 1}`;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectOption(idx)}
              className={cn(
                "w-full flex items-start gap-3.5 p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all",
                isSelected
                  ? "bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 dark:border-indigo-500/80 text-indigo-950 dark:text-white shadow-sm ring-1 ring-indigo-500/50"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#131d33]/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-[#131d33] hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              {/* Option Letter Indicator */}
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-lg font-bold text-xs shrink-0 transition-colors",
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                )}
              >
                {letter}
              </div>

              {/* Option Text */}
              <span className="leading-relaxed pt-0.5">{option}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
