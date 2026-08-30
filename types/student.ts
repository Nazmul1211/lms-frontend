export interface EnrolledCourse {
  id: number;
  courseId: number;
  title: string;
  slug?: string;
  coverImage?: string;
  category: string;
  level: string;
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessons: number;
  lastAccessedLessonId?: number;
  lastAccessedLessonTitle?: string;
  enrolledAt?: string;
  instructor: {
    id?: number;
    name: string;
    avatar?: string;
  };
}

export interface StudentStats {
  totalEnrolled: number;
  inProgress: number;
  completedCourses: number;
  averageProgress: number;
  quizzesPassed: number;
}
