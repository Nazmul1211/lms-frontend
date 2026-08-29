import React from "react";
import Link from "next/link";
import { getCourseById } from "@/services/courseService";
import CourseHeader from "@/components/courses/CourseHeader";
import CurriculumAccordion from "@/components/courses/CurriculumAccordion";
import InstructorCard from "@/components/courses/InstructorCard";
import { Check, ArrowLeft, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);
  if (!course) {
    return { title: "Course Not Found — EduForge LMS" };
  }
  return {
    title: `${course.title} — EduForge LMS`,
    description: course.description,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  // If course does not exist, show friendly error state
  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 sm:p-12 text-center max-w-md space-y-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Course Not Found
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The course you are looking for does not exist or has been removed.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Course Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Course Header & Enrollment Sidebar */}
        <CourseHeader course={course} />

        {/* Content Breakdown Grid */}
        <div className="space-y-8">
          
          {/* What You'll Learn Section */}
          {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum / Syllabus Accordion */}
          {course.lessons && (
            <CurriculumAccordion
              lessons={course.lessons}
              courseTitle={course.title}
              totalDuration={course.duration}
            />
          )}

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Requirements & Prerequisites
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {course.prerequisites.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor Bio */}
          <InstructorCard instructor={course.instructor} />

        </div>

      </div>
    </div>
  );
}
