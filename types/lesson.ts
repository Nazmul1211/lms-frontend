export interface Lesson {
  id: number | string;
  courseId?: number | string;
  title: string;
  duration: string;
  order: number;
  videoUrl?: string;
  content: string;
  summary?: string;
  resources?: { name: string; url: string }[];
}

export interface CourseProgress {
  courseId: number | string;
  completedLessonIds: (number | string)[];
  progressPercentage: number;
  totalLessons: number;
}

export interface ToggleProgressPayload {
  lessonId: number | string;
  isCompleted: boolean;
}
