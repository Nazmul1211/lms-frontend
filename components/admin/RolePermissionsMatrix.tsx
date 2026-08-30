import React from "react";
import { ShieldCheck, Check, X } from "lucide-react";

export default function RolePermissionsMatrix() {
  const permissions = [
    {
      capability: "Browse Public Courses & Published Blogs",
      student: true,
      instructor: true,
      manager: true,
      admin: true,
    },
    {
      capability: "Course Enrollment & Real-Time Progress Tracking",
      student: true,
      instructor: false,
      manager: false,
      admin: true,
    },
    {
      capability: "Take Auto-Graded Certification Quizzes",
      student: true,
      instructor: false,
      manager: false,
      admin: true,
    },
    {
      capability: "Inspect Enrolled Student Rosters & Progress %",
      student: false,
      instructor: true,
      manager: false,
      admin: true,
    },
    {
      capability: "Author Courses, Lessons & Curriculum Structure",
      student: false,
      instructor: true,
      manager: true,
      admin: true,
    },
    {
      capability: "Author & Publish Engineering Blog Posts",
      student: false,
      instructor: false,
      manager: true,
      admin: true,
    },
    {
      capability: "Manage Draft vs. Published Content States",
      student: false,
      instructor: false,
      manager: true,
      admin: true,
    },
    {
      capability: "Assign & Change User Roles Dynamically",
      student: false,
      instructor: false,
      manager: false,
      admin: true,
    },
    {
      capability: "Full System Analytics & Platform Governance",
      student: false,
      instructor: false,
      manager: false,
      admin: true,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-500" />
          Role-Based Access Control (RBAC) Permission Matrix
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Backend API endpoints strictly enforce these permission boundaries via verified JWT token policies.
        </p>
      </div>

      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-2.5 px-3">System Capability</th>
              <th className="py-2.5 px-3 text-center text-blue-600 dark:text-blue-400">Student</th>
              <th className="py-2.5 px-3 text-center text-emerald-600 dark:text-emerald-400">Instructor</th>
              <th className="py-2.5 px-3 text-center text-amber-600 dark:text-amber-400">Content Mgr</th>
              <th className="py-2.5 px-3 text-center text-purple-600 dark:text-purple-400">Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {permissions.map((perm, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-[#131d33]/40">
                <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                  {perm.capability}
                </td>
                <td className="py-3 px-3 text-center">
                  {perm.student ? (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto stroke-[3]" />
                  ) : (
                    <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  {perm.instructor ? (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto stroke-[3]" />
                  ) : (
                    <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  {perm.manager ? (
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto stroke-[3]" />
                  ) : (
                    <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  {perm.admin ? (
                    <Check className="h-4 w-4 text-purple-600 dark:text-purple-400 mx-auto stroke-[3]" />
                  ) : (
                    <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
