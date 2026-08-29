import React from "react";
import { InstructorSummary } from "@/types/course";
import { Award, BookOpen, CheckCircle, Users } from "lucide-react";

export default function InstructorCard({ instructor }: { instructor: InstructorSummary }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-5">
      
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        About the Instructor
      </h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Avatar */}
        <div className="h-16 w-16 rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
          {instructor.avatar ? (
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 font-bold text-xl">
              {instructor.name[0]}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {instructor.name}
          </h3>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            {instructor.role || "Senior Technical Instructor"}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Verified Instructor
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Industry Expert
            </span>
          </div>
        </div>
      </div>

      {/* Bio text */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
        {instructor.bio ||
          "Passionate software engineer and educator dedicated to helping developers build production-grade applications with modern web architectures."}
      </p>

    </div>
  );
}
