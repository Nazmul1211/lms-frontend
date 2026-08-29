export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export interface InstructorSummary {
  id: number;
  name: string;
  username: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

export interface LessonSummary {
  id: number;
  title: string;
  duration?: string;
  order?: number;
}

export interface Course {
  id: number;
  title: string;
  slug?: string;
  description: string;
  coverImage?: string;
  category: string;
  level: CourseLevel;
  duration: string;
  totalLessons: number;
  enrolledStudentsCount?: number;
  instructor: InstructorSummary;
  lessons?: LessonSummary[];
  createdAt?: string;
}
