"use client";

import React, { useState, useMemo } from "react";
import { Course } from "@/types/course";
import CourseCard from "./CourseCard";
import CourseFilters from "./CourseFilters";
import { BookOpen, Search } from "lucide-react";

export default function CourseCatalog({ initialCourses }: { initialCourses: Course[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialCourses.map((c) => c.category)));
    return ["All", ...unique];
  }, [initialCourses]);

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  // Filter courses based on user selections
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      // Search query filter (matches title, description, or instructor name)
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      // Level filter
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [initialCourses, searchQuery, selectedCategory, selectedLevel]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
  };

  return (
    <div className="space-y-8">
      {/* Interactive Filters Bar */}
      <CourseFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        categories={categories}
        levels={levels}
        totalResults={filteredCourses.length}
        onResetFilters={handleResetFilters}
      />

      {/* Courses Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-12 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching courses found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn't find any courses matching your current filters. Try searching for different keywords or reset your filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
