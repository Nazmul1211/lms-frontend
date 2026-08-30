"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getMyCourses, computeStudentStats } from "@/services/studentService";
import { EnrolledCourse, StudentStats } from "@/types/student";
import StudentStatsBanner from "@/components/student/StudentStatsBanner";
import EnrolledCourseCard from "@/components/student/EnrolledCourseCard";
import { BookOpen, PlayCircle, ArrowRight, Sparkles, Plus, GraduationCap } from "lucide-react";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [stats, setStats] = useState<StudentStats>({
    totalEnrolled: 0,
    inProgress: 0,
    completedCourses: 0,
    averageProgress: 0,
    quizzesPassed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const data = await getMyCourses();
        setCourses(data);
        setStats(computeStudentStats(data));
      } finally {
        setIsLoading(false);
      }
    }
    loadStudentData();
  }, []);

  // Most active course in progress to feature
  const continueCourse = courses.find((c) => c.progressPercentage > 0 && c.progressPercentage < 100) || courses[0];

  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-900/60">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user?.name || user?.username || "Student"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Here is an overview of your current progress and active learning paths.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] self-start sm:self-center shrink-0"
          >
            <Plus className="h-4 w-4" />
            Explore More Courses
          </Link>
        </div>

        {/* Stats Metrics Banner */}
        <StudentStatsBanner stats={stats} />

        {/* Continue Learning Spotlight Banner */}
        {continueCourse && (
          <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  <PlayCircle className="h-3.5 w-3.5" /> Quick Resume
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {continueCourse.title}
                </h2>
                <p className="text-xs text-slate-300">
                  {continueCourse.lastAccessedLessonTitle
                    ? `Current topic: ${continueCourse.lastAccessedLessonTitle}`
                    : "Pick up right where you left off in your curriculum."}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-2 w-48 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${continueCourse.progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-emerald-300">
                    {continueCourse.progressPercentage}% complete
                  </span>
                </div>
              </div>

              <Link
                href={`/student/courses/${continueCourse.courseId}/lessons/${continueCourse.lastAccessedLessonId || 101}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-indigo-950 hover:bg-slate-100 px-6 py-3 text-sm font-bold shadow-md transition-transform hover:scale-105 shrink-0"
              >
                Resume Lesson
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Enrolled Courses Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                My Enrolled Courses
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All curriculum currently active in your account.
              </p>
            </div>
            <Link
              href="/student/my-courses"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <EnrolledCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-12 text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No courses enrolled yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Explore our curriculum catalog to start learning Next.js, Tailwind CSS, and Backend Engineering today.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
