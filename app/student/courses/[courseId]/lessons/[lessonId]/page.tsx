"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getCourseLessons,
  getLessonById,
  getCourseProgress,
  toggleLessonProgress,
} from "@/services/lessonService";
import { getCourseById } from "@/services/courseService";
import { Lesson, CourseProgress } from "@/types/lesson";
import { Course } from "@/types/course";
import VideoPlayer from "@/components/student/VideoPlayer";
import LessonSidebar from "@/components/student/LessonSidebar";
import LessonNavigation from "@/components/student/LessonNavigation";
import {
  Clock,
  BookOpen,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function LessonPlayerPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const resolvedParams = use(params);
  const courseIdStr = resolvedParams.courseId;
  const lessonIdStr = resolvedParams.lessonId;
  const courseId = Number(courseIdStr) || courseIdStr;
  const lessonId = Number(lessonIdStr) || lessonIdStr;
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<CourseProgress>({
    courseId: Number(courseId) || 1,
    completedLessonIds: [],
    progressPercentage: 0,
    totalLessons: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [courseData, progressData] = await Promise.all([
          getCourseById(courseId),
          getCourseProgress(courseId),
        ]);

        const rawLessons = (courseData?.lessons && courseData.lessons.length > 0)
          ? courseData.lessons
          : getCourseLessons(courseId);

        const allLessons: Lesson[] = rawLessons.map((l: any, idx: number) => ({
          id: l.id || idx + 1,
          courseId: courseId,
          title: l.title || `Lesson ${idx + 1}`,
          duration: l.duration || "15 mins",
          order: l.order || idx + 1,
          videoUrl: l.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          summary: l.summary || "Core concepts and architectural overview.",
          content: l.content || "### Lesson Overview\n\nWelcome to this curriculum topic.",
          resources: l.resources || [],
        }));

        const foundLesson = allLessons.find(
          (l) => String(l.id) === String(lessonId) || l.id === Number(lessonId)
        ) || allLessons[0] || null;

        setCourse(courseData);
        setLessons(allLessons);
        setCurrentLesson(foundLesson);
        setProgress(progressData);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [courseId, lessonId]);

  const handleToggleComplete = async (targetLessonId: number | string, isCompleted: boolean) => {
    // Optimistically update progress
    const updated = await toggleLessonProgress(courseId, {
      lessonId: targetLessonId,
      isCompleted,
    });
    setProgress(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-xs font-semibold">Loading lesson curriculum...</p>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 text-center max-w-md space-y-4">
          <HelpCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Lesson Not Found</h1>
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Find previous and next lessons
  const currentIndex = lessons.findIndex((l) => String(l.id) === String(currentLesson.id));
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const completedIds = progress?.completedLessonIds || [];
  const isLessonCompleted = Boolean(completedIds.includes(currentLesson.id));

  return (
    <div className="min-h-screen py-6 sm:py-10 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb row */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/student/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Student Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={`/courses/${courseId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 truncate max-w-[150px] sm:max-w-xs">
            {course?.title || "Course"}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[180px]">
            {currentLesson.title}
          </span>
        </nav>

        {/* 2-Column Player Layout: Main Content Area + Sidebar Checklist */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left / Main Player & Notes Column */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Video Player */}
            <VideoPlayer
              videoUrl={currentLesson.videoUrl}
              title={currentLesson.title}
              onEnded={() => handleToggleComplete(currentLesson.id, true)}
            />

            {/* Lesson Title & Header Details */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Lesson {currentLesson.order} of {lessons.length}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {currentLesson.title}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    <Clock className="h-3.5 w-3.5 text-indigo-500" />
                    {currentLesson.duration}
                  </span>

                  {isLessonCompleted && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/60 px-3 py-1 rounded-full font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Lesson Summary */}
              {currentLesson.summary && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {currentLesson.summary}
                </p>
              )}

              {/* Formatted Lesson Guide & Notes */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 space-y-4 text-xs sm:text-sm leading-relaxed">
                {currentLesson.content.split("\n\n").map((chunk, idx) => {
                  const trimmed = chunk.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-2">
                        {trimmed.replace("### ", "")}
                      </h3>
                    );
                  }

                  if (trimmed.startsWith("```")) {
                    const code = trimmed.replace(/```[a-z]*\n?/g, "");
                    return (
                      <pre key={idx} className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                        <code>{code}</code>
                      </pre>
                    );
                  }

                  if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
                    const items = trimmed.split("\n");
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace(/^(-\s*|\d+\.\s*)/, "")}</li>
                        ))}
                      </ul>
                    );
                  }

                  return <p key={idx}>{trimmed}</p>;
                })}
              </div>

              {/* Lesson Resources List */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="rounded-xl bg-slate-50 dark:bg-[#131d33]/60 p-4 border border-slate-100 dark:border-slate-800/80 space-y-2 mt-6">
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-indigo-500" /> Lesson Resources & Docs
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {currentLesson.resources.map((res, i) => (
                      <li key={i}>
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
                        >
                          {res.name} <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Bottom Navigation Toolbar */}
            <LessonNavigation
              courseId={courseId}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              isCompleted={isLessonCompleted}
              onToggleComplete={() => handleToggleComplete(currentLesson.id, !isLessonCompleted)}
            />

          </div>

          {/* Right Column: Sticky Lesson Sidebar Checklist */}
          <LessonSidebar
            courseId={courseId}
            courseTitle={course?.title || "Course Curriculum"}
            lessons={lessons}
            currentLessonId={currentLesson.id}
            progress={progress}
            onToggleComplete={handleToggleComplete}
          />

        </div>

      </div>
    </div>
  );
}
