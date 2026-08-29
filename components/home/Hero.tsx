import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Check, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 dark:border-indigo-900/80 bg-indigo-50/90 dark:bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              <span>Full-Stack Learning & Certification Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Advance your career with{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                structured courses
              </span>{" "}
              & verified skills.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              An enterprise learning management system built for developers. Explore interactive video curriculum, test your knowledge with auto-graded quizzes, and track your progress across four role-based portals.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all hover:scale-[1.02]"
              >
                <BookOpen className="h-4 w-4" />
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f172a] px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                Create Student Account
              </Link>
            </div>

            {/* Value checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>Instant Auto-Graded Quizzes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>Real-Time Progress Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                <span>Multi-Role Access Control</span>
              </div>
            </div>
          </div>

          {/* Right Column: Platform Card Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/30 space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Full-Stack Next.js 16</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Course Syllabus & Progress</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-900/60">
                  Enrolled
                </span>
              </div>

              {/* Progress Bar */}
              <div className="rounded-xl bg-slate-50 dark:bg-[#131d33] p-3.5 border border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Completion Status</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">4 of 6 Lessons (67%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full w-[67%]" />
                </div>
              </div>

              {/* Lesson Items */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#131d33]/50 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">1. App Router & Server Components</span>
                  </div>
                  <span className="text-[11px] text-slate-400">18 mins</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-[#131d33]/50 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">2. Authentication & Protected Routes</span>
                  </div>
                  <span className="text-[11px] text-slate-400">24 mins</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                      3
                    </div>
                    <span className="text-indigo-900 dark:text-indigo-200 font-semibold">3. Server Actions & Mutations</span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">In Progress</span>
                </div>
              </div>

              {/* Card Footer Banner */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <span>Includes Final Assessment</span>
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Passing score: 70%</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
