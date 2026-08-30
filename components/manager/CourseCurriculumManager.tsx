"use client";

import React, { useState } from "react";
import { Course, LessonSummary } from "@/types/course";
import { initialMockCourses } from "@/services/courseService";
import { BookOpen, Plus, PlayCircle, Lock, CheckCircle2, FileEdit } from "lucide-react";

export default function CourseCurriculumManager() {
  const [courses, setCourses] = useState<Course[]>(initialMockCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("20 mins");
  const [isPreview, setIsPreview] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle) return;

    const newLesson: LessonSummary = {
      id: Math.floor(Math.random() * 1000) + 100,
      title: `${(selectedCourse.lessons?.length || 0) + 1}. ${newLessonTitle}`,
      duration: newLessonDuration,
      order: (selectedCourse.lessons?.length || 0) + 1,
      isPreview,
    };

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === selectedCourseId) {
          const updatedLessons = [...(c.lessons || []), newLesson];
          return {
            ...c,
            lessons: updatedLessons,
            totalLessons: updatedLessons.length,
          };
        }
        return c;
      })
    );

    setNewLessonTitle("");
    setNewLessonDuration("20 mins");
    setIsPreview(false);
    setIsAdding(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm p-5 sm:p-6 space-y-6">
      
      {/* Header & Course Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Course Curriculum & Lessons Editor
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Structure course curriculum, manage lesson ordering, and set free preview permissions.
          </p>
        </div>

        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.totalLessons} lessons)
            </option>
          ))}
        </select>
      </div>

      {/* Selected Course Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50/80 dark:bg-[#131d33]/50 border border-slate-100 dark:border-slate-800/80">
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedCourse.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {selectedCourse.category} • {selectedCourse.level} • {selectedCourse.duration} total
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="h-3.5 w-3.5" /> Add New Lesson
        </button>
      </div>

      {/* Add New Lesson Form */}
      {isAdding && (
        <form onSubmit={handleAddLesson} className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/80 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4 animate-in fade-in duration-200">
          <p className="text-xs font-bold text-indigo-950 dark:text-indigo-300">
            Add New Lesson to Curriculum
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <input
                type="text"
                required
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="Lesson title (e.g. Advanced State Management)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="sm:col-span-3">
              <input
                type="text"
                value={newLessonDuration}
                onChange={(e) => setNewLessonDuration(e.target.value)}
                placeholder="Duration (e.g. 25 mins)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="sm:col-span-3 flex items-center gap-2 pt-1">
              <label className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPreview}
                  onChange={(e) => setIsPreview(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Free Preview</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 text-white shadow-sm"
            >
              Save Lesson
            </button>
          </div>
        </form>
      )}

      {/* Lessons List */}
      <div className="space-y-2">
        {selectedCourse.lessons?.map((lesson, idx) => (
          <div
            key={lesson.id || idx}
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#131d33]/40 text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 text-[11px]">
                {idx + 1}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {lesson.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {lesson.isPreview ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-900/60">
                  <PlayCircle className="h-3 w-3" /> Free Preview
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-slate-400 text-[10px]">
                  <Lock className="h-3 w-3" /> Enrolled
                </span>
              )}
              <span className="text-slate-400 text-[11px]">{lesson.duration || "20 mins"}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
