"use client";

import React, { useState, useMemo } from "react";
import { InstructorCourse, EnrolledStudent } from "@/types/instructor";
import { Search, X, Filter, Award, CheckCircle2, User, Clock } from "lucide-react";

interface StudentRosterTableProps {
  courses: InstructorCourse[];
  selectedCourseId?: number;
  onSelectCourse?: (courseId: number) => void;
}

export default function StudentRosterTable({
  courses,
  selectedCourseId,
  onSelectCourse,
}: StudentRosterTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<number | "all">(
    selectedCourseId || "all"
  );

  // Sync internal filter if prop changes
  React.useEffect(() => {
    if (selectedCourseId !== undefined) {
      setCourseFilter(selectedCourseId);
    }
  }, [selectedCourseId]);

  // Flatten students with course context
  const allRoster = useMemo(() => {
    return (courses || []).flatMap((course) =>
      (course.enrolledStudents || []).map((student: any) => {
        const studentName = student.name || student.studentName || student.username || "Enrolled Student";
        const studentEmail = student.email || student.studentEmail || "student@lms.com";
        const studentUsername = student.username || studentName.toLowerCase().replace(/\s+/g, "_");

        return {
          ...student,
          id: student.id || student.studentId || 1,
          name: studentName,
          email: studentEmail,
          username: studentUsername,
          courseId: course.id,
          courseTitle: course.title,
          progressPercentage: student.progressPercentage ?? 0,
          completedLessonsCount: student.completedLessonsCount ?? 0,
          totalLessons: student.totalLessons ?? course.totalLessons ?? 1,
        };
      })
    );
  }, [courses]);

  // Filter students
  const filteredRoster = useMemo(() => {
    return allRoster.filter((item) => {
      // Course filter
      if (courseFilter !== "all" && item.courseId !== courseFilter) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          (item.name || "").toLowerCase().includes(q) ||
          (item.email || "").toLowerCase().includes(q) ||
          (item.username || "").toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [allRoster, courseFilter, searchQuery]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Enrolled Students Roster
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Inspect individual progress and assessment scores across all assigned courses.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or email..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Course Selector Dropdown */}
          <select
            value={courseFilter}
            onChange={(e) => {
              const val = e.target.value === "all" ? "all" : Number(e.target.value);
              setCourseFilter(val);
              if (onSelectCourse && typeof val === "number") onSelectCourse(val);
            }}
            className="w-full sm:w-auto px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Courses ({allRoster.length} students)</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title.length > 25 ? c.title.slice(0, 25) + "..." : c.title} ({c.enrolledStudents.length})
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="py-3 px-3">Student</th>
              <th className="py-3 px-3">Course</th>
              <th className="py-3 px-3">Progress</th>
              <th className="py-3 px-3">Quiz Score</th>
              <th className="py-3 px-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredRoster.map((student, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50/80 dark:hover:bg-[#131d33]/50 transition-colors"
              >
                {/* Student Info */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                      {student.avatar ? (
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 text-xs font-bold">
                          {student.name?.[0] || student.username?.[0] || "S"}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-[11px] text-slate-400">{student.email}</p>
                    </div>
                  </div>
                </td>

                {/* Course Title */}
                <td className="py-3.5 px-3 max-w-[180px]">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                    {student.courseTitle}
                  </p>
                  <p className="text-[10px] text-slate-400">Enrolled: {student.enrolledAt}</p>
                </td>

                {/* Progress Bar */}
                <td className="py-3.5 px-3 min-w-[160px]">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {student.progressPercentage}%
                      </span>
                      <span className="text-slate-400">
                        {student.completedLessonsCount} / {student.totalLessons} lessons
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          student.progressPercentage === 100
                            ? "bg-emerald-500"
                            : "bg-indigo-600 dark:bg-indigo-500"
                        }`}
                        style={{ width: `${student.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Quiz Score Badge */}
                <td className="py-3.5 px-3">
                  {student.quizScore !== undefined ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                      <Award className="h-3 w-3 text-emerald-600" /> {student.quizScore}% Passed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Pending
                    </span>
                  )}
                </td>

                {/* Last Active */}
                <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400 font-medium">
                  {student.lastActiveAt || "Active recently"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRoster.length === 0 && (
          <div className="py-10 text-center text-xs text-slate-400">
            No students found matching your search query.
          </div>
        )}
      </div>

    </div>
  );
}
