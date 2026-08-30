import React from "react";
import { AdminStats } from "@/types/admin";
import { Users, BookOpen, CheckCircle2, ShieldCheck, Activity, Award } from "lucide-react";

export default function AdminStatsGrid({ stats }: { stats: AdminStats }) {
  return (
    <div className="space-y-4">
      {/* 4 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Users */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Platform Users
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalUsers}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Registered across 4 roles
            </p>
          </div>
        </div>

        {/* Card 2: Enrollments */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Course Enrollments
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalEnrollments}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Across {stats.totalCourses} published courses
            </p>
          </div>
        </div>

        {/* Card 3: Quizzes Passed */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Quizzes Auto-Graded
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalQuizzesPassed}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Instant server evaluations
            </p>
          </div>
        </div>

        {/* Card 4: Active Today */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Active Today
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.activeToday}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live sessions in last 24h
            </p>
          </div>
        </div>

      </div>

      {/* Role Breakdown Distribution Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-indigo-500" /> Platform Role Distribution
          </span>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {stats.roleBreakdown.students} Students
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {stats.roleBreakdown.instructors} Instructors
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {stats.roleBreakdown.contentManagers} Content Managers
            </span>
            <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              {stats.roleBreakdown.admins} Admins
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
