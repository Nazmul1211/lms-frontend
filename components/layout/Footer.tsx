import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 mt-auto transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-xs tracking-tight">
                EF
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                EduForge
              </span>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Empowering students and aspiring developers to master programming, software development, and modern technologies through interactive courses and hands-on practice.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-900/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Right Column: 3 Link Groups */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Col 1: Curriculum */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Curriculum
              </h3>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Explore Courses
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Learning Tracks
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Interactive Quizzes
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Skill Assessments
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Portals */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Portals
              </h3>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/student/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="/instructor/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Instructor Studio
                  </Link>
                </li>
                <li>
                  <Link href="/manager/blogs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link href="/admin/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Admin Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Resources
              </h3>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <Link href="/blogs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Engineering Blog
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
