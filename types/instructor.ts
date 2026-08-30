export interface EnrolledStudent {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  enrolledAt: string;
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessons: number;
  lastActiveAt?: string;
  quizScore?: number;
}

export interface InstructorCourse {
  id: number;
  title: string;
  slug?: string;
  coverImage?: string;
  category: string;
  level: string;
  totalLessons: number;
  totalStudents: number;
  averageProgress: number;
  enrolledStudents: EnrolledStudent[];
  createdAt?: string;
}

export interface InstructorMetrics {
  totalCourses: number;
  totalStudents: number;
  averageCompletionRate: number;
  activeThisWeek: number;
}
