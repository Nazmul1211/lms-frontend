"use client";

import React, { useState } from "react";
import { InstructorCourse } from "@/types/instructor";
import { createQuizApi } from "@/services/quizService";
import { Plus, Trash2, CheckCircle2, AlertCircle, Award, X, Sparkles } from "lucide-react";

interface QuizCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: InstructorCourse[];
  onQuizCreated?: () => void;
}

interface QuestionDraft {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export default function QuizCreatorModal({
  isOpen,
  onClose,
  courses,
  onQuizCreated,
}: QuizCreatorModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | number>(
    courses[0]?.id || ""
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
      explanation: "",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
        explanation: "",
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index].questionText = text;
      return copy;
    });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].options[optIndex] = text;
      return copy;
    });
  };

  const handleCorrectAnswerChange = (qIndex: number, correctIdx: number) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].correctAnswerIndex = correctIdx;
      return copy;
    });
  };

  const handleExplanationChange = (qIndex: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].explanation = text;
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setErrorMessage("Quiz title is required");
      return;
    }

    if (!selectedCourseId) {
      setErrorMessage("Please select a course for this quiz");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        setErrorMessage(`Question #${i + 1} is empty`);
        return;
      }
      const filledOptions = q.options.filter((o) => o.trim().length > 0);
      if (filledOptions.length < 2) {
        setErrorMessage(`Question #${i + 1} must have at least 2 options`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await createQuizApi({
        title,
        description,
        passingScore: Number(passingScore) || 70,
        course: selectedCourseId,
        questions: questions.map((q) => ({
          questionText: q.questionText,
          options: q.options.filter((o) => o.trim().length > 0),
          correctAnswerIndex: q.correctAnswerIndex,
          explanation: q.explanation,
        })),
      });

      if (res.success) {
        setSuccessMessage("Quiz published successfully to the database!");
        setTimeout(() => {
          onClose();
          if (onQuizCreated) onQuizCreated();
        }, 1200);
      } else {
        setErrorMessage(res.error || "Failed to create quiz");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#131d33]/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Create Custom Course Quiz
              </h2>
              <p className="text-xs text-slate-500">
                Draft interactive MCQ assessments with auto-grading rules.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs font-medium text-rose-700 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* General Quiz Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target Course *
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quiz Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Next.js 16 Certification Exam"
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Description / Instructions
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief guidelines or what concepts are assessed..."
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Passing Score Percentage (%)
              </label>
              <input
                type="number"
                min={10}
                max={100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Questions Builder */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Questions List ({questions.length})
              </h3>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add Question
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#131d33]/40 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Question #{qIndex + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  placeholder="Enter the question text..."
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium"
                />

                {/* Multiple Choice Options */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-semibold text-slate-500">
                    Options & Correct Answer (Select the radio button for the correct key):
                  </p>
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct_q_${qIndex}`}
                        checked={q.correctAnswerIndex === optIndex}
                        onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                        className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                        title="Mark as correct answer"
                      />
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                        className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <input
                  type="text"
                  placeholder="Explanation shown after grading (optional)..."
                  value={q.explanation}
                  onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                  className="w-full py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs text-slate-600 dark:text-slate-300"
                />
              </div>
            ))}
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all hover:scale-105"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {isSubmitting ? "Publishing..." : "Publish Quiz to Course"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
