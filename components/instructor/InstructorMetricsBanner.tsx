import React from "react";
import { InstructorMetrics } from "@/types/instructor";
import { BookOpen, Users, BarChart3, Activity, Award } from "lucide-react";

export default function InstructorMetricsBanner({ metrics }: { metrics: InstructorMetrics }) {
  const statCards = [
    {
      label: "Assigned Courses",
      value: metrics.totalCourses,
      desc: "Active curriculum tracks",
      icon: BookOpen,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/60",
    },
    {
      label: "Enrolled Students",
      value: metrics.totalStudents,
      desc: "Learners across all cohorts",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/60",
    },
    {
      label: "Avg Completion Rate",
      value: `${metrics.averageCompletionRate}%`,
      desc: "Overall class progress",
      icon: BarChart3,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
    },
    {
      label: "Active This Week",
      value: metrics.activeThisWeek,
      desc: "Recent lesson interactions",
      icon: Activity,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                {stat.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
