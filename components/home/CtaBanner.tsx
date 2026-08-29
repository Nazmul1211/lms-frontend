import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-14 sm:py-20 bg-slate-100/70 dark:bg-[#070b14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-indigo-950/60 dark:border-indigo-900/60 bg-gradient-to-b from-[#0e1630] via-[#0b1124] to-[#070b18] text-white p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-indigo-200 border border-white/10 backdrop-blur-sm">
              Start Learning Today
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to accelerate your engineering career?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-normal">
              Join EduForge to master modern technologies with structured curriculum, real-time progress tracking, and instant certification quizzes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                Create Student Account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#0f172a]/90 hover:bg-slate-800 text-slate-200 px-6 py-3.5 text-sm font-semibold transition-colors"
              >
                <BookOpen className="h-4 w-4 text-slate-400" />
                Browse Course Catalog
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
