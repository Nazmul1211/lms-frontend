"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { getQuizStudentView, submitQuiz } from "@/services/quizService";
import { getCourseById } from "@/services/courseService";
import { Quiz, QuizResult } from "@/types/quiz";
import { Course } from "@/types/course";
import QuizQuestionCard from "@/components/quiz/QuizQuestionCard";
import QuizScoreReport from "@/components/quiz/QuizScoreReport";
import {
  Award,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Send,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function CourseQuizPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params);
  const courseId = Number(resolvedParams.courseId);

  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [stage, setStage] = useState<"intro" | "taking" | "evaluating" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [courseData, quizData] = await Promise.all([
          getCourseById(courseId),
          getQuizStudentView(courseId),
        ]);
        setCourse(courseData);
        setQuiz(quizData);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [courseId]);

  const handleSelectOption = (optionIndex: number) => {
    if (!quiz) return;
    const currentQ = quiz.questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setStage("evaluating");

    try {
      const evaluation = await submitQuiz(quiz.id, courseId, { answers });
      setResult(evaluation);
      setStage("result");
    } catch {
      setStage("taking");
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setStage("intro");
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-xs font-semibold">Loading certification quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 text-center max-w-md space-y-4 shadow-sm">
          <HelpCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Quiz Not Found</h1>
          <p className="text-xs text-slate-500">This course does not have an active quiz yet.</p>
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isAllAnswered = answeredCount === quiz.questions.length;

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/student/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Student Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={`/courses/${courseId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-[150px] sm:max-w-xs">
            {course?.title || "Course"}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium">Certification Quiz</span>
        </nav>

        {/* Stage 1: Intro Screen */}
        {stage === "intro" && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 sm:p-12 shadow-sm space-y-8 text-center">
            
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 mx-auto shadow-sm">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Course Assessment
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {quiz.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {quiz.description}
              </p>
            </div>

            {/* Assessment Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2 text-left">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#131d33]/50 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Total Questions</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">{quiz.totalQuestions} Questions</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#131d33]/50 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Passing Threshold</span>
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{quiz.passingScorePercentage}% Required</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#131d33]/50 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Auto-Grading</span>
                <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">Instant Score Report</p>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 max-w-sm mx-auto">
              <button
                onClick={() => setStage("taking")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-6 text-sm font-bold shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                Begin Assessment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        )}

        {/* Stage 2: Taking Quiz Screen */}
        {stage === "taking" && (
          <div className="space-y-6">
            
            {/* Header progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {answeredCount} of {quiz.questions.length} Answered
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Current Question */}
            <QuizQuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quiz.questions.length}
              selectedOptionIndex={answers[currentQuestion.id]}
              onSelectOption={handleSelectOption}
            />

            {/* Navigation & Submit Bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>

              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1))
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  Submit Assessment
                </button>
              )}
            </div>

          </div>
        )}

        {/* Stage 3: Evaluating Screen */}
        {stage === "evaluating" && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Evaluating Your Assessment...
              </h2>
              <p className="text-xs text-slate-500">
                Server-side scoring algorithm is verifying your answers.
              </p>
            </div>
          </div>
        )}

        {/* Stage 4: Results & Score Report Screen */}
        {stage === "result" && result && (
          <QuizScoreReport result={result} onRetakeQuiz={handleRetake} />
        )}

      </div>
    </div>
  );
}
