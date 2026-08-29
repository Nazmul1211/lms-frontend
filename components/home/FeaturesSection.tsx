import React from "react";
import {
  GraduationCap,
  Video,
  FileEdit,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Lock,
} from "lucide-react";

export default function FeaturesSection() {
  const roles = [
    {
      title: "Student Portal",
      desc: "Enroll in courses, watch video lessons, mark completed topics, and take auto-graded quizzes.",
      icon: GraduationCap,
      badge: "Learner",
    },
    {
      title: "Instructor Studio",
      desc: "Manage assigned course lessons, view enrolled students, and inspect individual completion rates.",
      icon: Video,
      badge: "Teaching",
    },
    {
      title: "Content Manager Hub",
      desc: "Author comprehensive course curriculum and draft/publish engineering blog articles.",
      icon: FileEdit,
      badge: "Authoring",
    },
    {
      title: "Admin Control Center",
      desc: "Full platform oversight, system-wide analytics, user directory, and dynamic role assignment.",
      icon: ShieldCheck,
      badge: "Governance",
    },
  ];

  const highlights = [
    {
      title: "Instant Auto-Graded Quizzes",
      desc: "Sanitized question delivery with server-side auto evaluation. Students receive immediate score cards without exposed answers.",
      icon: CheckCircle2,
    },
    {
      title: "Persistent Progress Tracking",
      desc: "Lesson completion percentages are computed and synchronized in real time, persisting across all devices and sessions.",
      icon: BarChart3,
    },
    {
      title: "Strict 4-Role Permission Matrix",
      desc: "Role-based access is validated at the backend API layer with secure JWT policies to ensure complete data integrity.",
      icon: Lock,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-100/70 dark:bg-[#070b14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 4 Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-[#131d33] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    {role.badge}
                  </span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {role.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Platform Capabilities Container */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Core Platform Capabilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Engineered with reliability, data persistence, and rigorous role-based access security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="space-y-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-900/40">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
