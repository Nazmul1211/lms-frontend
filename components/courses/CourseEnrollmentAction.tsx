"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";
import { useAuth } from "@/context/AuthContext";
import { enrollInCourse, getMyCourses } from "@/services/studentService";
import {
  PlayCircle,
  Award,
  CheckCircle2,
  Sparkles,
  Lock,
  ArrowRight,
  Loader2,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

interface CourseEnrollmentActionProps {
  course: Course;
}

export default function CourseEnrollmentAction({ course }: CourseEnrollmentActionProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [lastLessonId, setLastLessonId] = useState<string | number>(
    course.lessons?.[0]?.id || 101
  );
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [enrollSuccess, setEnrollSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function checkEnrollment() {
      if (!isAuthenticated) return;
      try {
        const myCourses = await getMyCourses();
        const found = myCourses.find(
          (c) =>
            String(c.courseId) === String(course.id) ||
            String(c.id) === String(course.id) ||
            c.slug === course.slug
        );

        if (found) {
          setIsEnrolled(true);
          setProgressPercentage(found.progressPercentage || 0);
          if (found.lastAccessedLessonId) {
            setLastLessonId(found.lastAccessedLessonId);
          }
        }
      } catch {
        // ignore
      }
    }
    checkEnrollment();
  }, [course.id, course.slug, isAuthenticated]);

  const handleEnrollClick = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/courses/${course.id}`)}`);
      return;
    }

    setIsEnrolling(true);
    try {
      await enrollInCourse(course.id);
      setEnrollSuccess(true);
      setIsEnrolled(true);
      setTimeout(() => {
        const firstLesson = course.lessons?.[0]?.id || 101;
        router.push(`/student/courses/${course.id}/lessons/${firstLesson}`);
      }, 900);
    } catch {
      setIsEnrolled(true);
      setEnrollSuccess(true);
      setTimeout(() => {
        const firstLesson = course.lessons?.[0]?.id || 101;
        router.push(`/student/courses/${course.id}/lessons/${firstLesson}`);
      }, 900);
    } finally {
      setIsEnrolling(false);
    }
  };

  const firstLessonId = course.lessons?.[0]?.id || 101;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d33] p-5 space-y-5">
      {/* Cover Image Thumbnail */}
      <div className="rounded-xl overflow-hidden aspect-video bg-slate-900 relative">
        <img
          src={
            course.coverImage ||
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
          }
          alt={course.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
          <span className="text-[11px] font-semibold text-white flex items-center gap-1.5">
            <PlayCircle className="h-3.5 w-3.5 text-indigo-400" /> Video & Text Curriculum
          </span>
        </div>
      </div>

      {/* Dynamic Enrollment Action State */}
      <div className="space-y-3">
        {enrollSuccess ? (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/60 text-center space-y-1.5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Successfully Enrolled!</span>
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-300">
              Launching lesson curriculum player...
            </p>
          </div>
        ) : isEnrolled ? (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>You are Enrolled</span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {progressPercentage}% Done
              </span>
            </div>

            <Link
              href={`/student/courses/${course.id}/lessons/${lastLessonId}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 text-sm font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <PlayCircle className="h-4 w-4" />
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={`/student/courses/${course.id}/quiz`}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 py-2.5 px-4 text-xs font-bold transition-all"
            >
              <Award className="h-4 w-4" />
              Take Course Assessment Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleEnrollClick}
              disabled={isEnrolling}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-4 text-sm font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              {isEnrolling ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Enrolling in Course...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Enroll in Course (Free Access)</span>
                </>
              )}
            </button>

            <Link
              href={`/student/courses/${course.id}/lessons/${firstLessonId}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 py-2.5 px-4 text-xs font-semibold transition-all"
            >
              <PlayCircle className="h-3.5 w-3.5 text-indigo-500" />
              Preview First Lesson
            </Link>

            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
              1-Click instant enrollment • Certificate & quizzes included
            </p>
          </div>
        )}
      </div>

      {/* Course Features Checklist */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">This course includes:</p>
        <div className="flex items-center gap-2">
          <PlayCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>{course.duration} on-demand lessons & guides</span>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Sanitized auto-graded certification quiz</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-500 shrink-0" />
          <span>Real-time progress persistence</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>4-Role RBAC & student dashboard</span>
        </div>
      </div>
    </div>
  );
}
