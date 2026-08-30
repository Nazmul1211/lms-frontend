"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log client error to logging service
    console.error("Unhandled client runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="max-w-md w-full rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-[#0f172a] p-8 sm:p-12 text-center space-y-6 shadow-sm">
        
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 mx-auto shadow-sm">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900/60">
            Runtime Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-1">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {error.message || "An unexpected application error occurred. You can retry the action or return to the main dashboard."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}
