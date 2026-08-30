import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-72 sm:w-96 rounded-xl" />
          <Skeleton className="h-4 w-full max-w-lg rounded-lg" />
        </div>

        {/* Filters Bar Skeleton */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <Skeleton className="h-10 w-full sm:max-w-md rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
          <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
            <Skeleton className="h-7 w-20 rounded-lg" />
          </div>
        </div>

        {/* 6 Course Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] overflow-hidden p-0 shadow-sm space-y-4"
            >
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-5 pt-0 space-y-4">
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-full rounded-md" />
                  <Skeleton className="h-3.5 w-5/6 rounded-md" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
