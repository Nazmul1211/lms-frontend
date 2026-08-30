export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  duration: string;
  order: number;
  videoUrl?: string;
  content: string;
  summary?: string;
  resources?: { name: string; url: string }[];
}

export interface CourseProgress {
  courseId: number;
  completedLessonIds: number[];
  progressPercentage: number;
  totalLessons: number;
}

export interface ToggleProgressPayload {
  lessonId: number;
  isCompleted: boolean;
}
