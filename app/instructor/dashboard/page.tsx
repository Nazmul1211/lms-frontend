"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInstructorCourses, computeInstructorMetrics } from "@/services/instructorService";
import { InstructorCourse, InstructorMetrics } from "@/types/instructor";
import InstructorMetricsBanner from "@/components/instructor/InstructorMetricsBanner";
import InstructorCourseCard from "@/components/instructor/InstructorCourseCard";
import StudentRosterTable from "@/components/instructor/StudentRosterTable";
import QuizCreatorModal from "@/components/instructor/QuizCreatorModal";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Video, BookOpen, Users, Plus, Sparkles, Award } from "lucide-react";

export default function InstructorDashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<InstructorCourse[]>([]);
  const [metrics, setMetrics] = useState<InstructorMetrics>({
    totalCourses: 0,
    totalStudents: 0,
    averageCompletionRate: 0,
    activeThisWeek: 0,
  });
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await getInstructorCourses();
      setCourses(data);
      setMetrics(computeInstructorMetrics(data));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["instructor", "admin"]}>
      <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-900/60">
              <Video className="h-3.5 w-3.5" />
              <span>Teaching Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Instructor Studio — {user?.name || "Alex Rivera"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Monitor student engagement, enrolled cohorts, and create custom quizzes.
            </p>
          </div>

          <button
            onClick={() => setIsQuizModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-105 shrink-0"
          >
            <Award className="h-4 w-4" />
            <span>+ Create Course Quiz</span>
          </button>
        </div>

        {/* Custom Quiz Creator Modal */}
        <QuizCreatorModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          courses={courses}
          onQuizCreated={loadData}
        />

        {/* High-level Platform Metrics */}
        <InstructorMetricsBanner metrics={metrics} />

        {/* Assigned Courses Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Assigned Courses & Cohorts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click a course card to filter the student roster below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <InstructorCourseCard
                key={course.id}
                course={course}
                isSelected={selectedCourseId === course.id}
                onSelectCourse={(id) =>
                  setSelectedCourseId(selectedCourseId === id ? undefined : id)
                }
              />
            ))}
          </div>
        </div>

        {/* Enrolled Students Roster Table */}
        <StudentRosterTable
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={setSelectedCourseId}
        />

      </div>
    </div>
    </ProtectedRoute>
  );
}
