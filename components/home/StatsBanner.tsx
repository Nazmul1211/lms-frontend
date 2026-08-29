import React from "react";
import { Users, BookOpen, CheckCircle, ShieldCheck } from "lucide-react";

export default function StatsBanner() {
  const stats = [
    {
      value: "1,200+",
      label: "Enrolled Students",
      desc: "Active learners worldwide",
      icon: Users,
    },
    {
      value: "24+",
      label: "Production Courses",
      desc: "Curated tech curriculum",
      icon: BookOpen,
    },
    {
      value: "95%",
      label: "Quiz Pass Rate",
      desc: "Auto-graded assessments",
      icon: CheckCircle,
    },
    {
      value: "4 Roles",
      label: "Access Control Matrix",
      desc: "Student, Instructor, Manager, Admin",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="border-y border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0b101c] py-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#131d33] border border-slate-200/80 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
