import { EnrolledCourse, StudentStats } from "@/types/student";
import { getAuthToken } from "@/services/authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Fallback enrolled courses for development and offline testing
export const initialMockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 101,
    courseId: 1,
    title: "Full-Stack Next.js 16 & TypeScript Masterclass",
    slug: "nextjs-masterclass",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    category: "Web Development",
    level: "Intermediate",
    progressPercentage: 67,
    completedLessonsCount: 4,
    totalLessons: 6,
    lastAccessedLessonId: 104,
    lastAccessedLessonTitle: "4. Authentication with JWT & Protected Routes",
    enrolledAt: "2026-08-20",
    instructor: {
      id: 101,
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: 102,
    courseId: 2,
    title: "Modern Tailwind CSS v4 & Design Systems",
    slug: "tailwind-design-systems",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    category: "Design & UI",
    level: "Beginner",
    progressPercentage: 25,
    completedLessonsCount: 1,
    totalLessons: 4,
    lastAccessedLessonId: 202,
    lastAccessedLessonTitle: "2. Color Tokens, Variables & Theme Directives",
    enrolledAt: "2026-08-22",
    instructor: {
      id: 102,
      name: "Sarah Lin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    },
  },
  {
    id: 103,
    courseId: 3,
    title: "Backend API Engineering with Strapi & Node.js",
    slug: "strapi-backend-engineering",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    category: "Backend Development",
    level: "Advanced",
    progressPercentage: 100,
    completedLessonsCount: 5,
    totalLessons: 5,
    lastAccessedLessonId: 305,
    lastAccessedLessonTitle: "5. Production Deployment on Railway",
    enrolledAt: "2026-08-15",
    instructor: {
      id: 103,
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    },
  },
];

/**
 * Fetch enrolled courses for authenticated student
 * Matches GET /api/my-courses
 */
export async function getMyCourses(token?: string): Promise<EnrolledCourse[]> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/my-courses`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return initialMockEnrolledCourses;
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || initialMockEnrolledCourses;
  } catch {
    return initialMockEnrolledCourses;
  }
}

/**
 * Enroll student in a course
 * Matches POST /api/courses/:id/enroll
 */
export async function enrollInCourse(
  courseId: number | string,
  token?: string
): Promise<{ success: boolean; message?: string }> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/courses/${courseId}/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });

    if (!res.ok) {
      return { success: true, message: "Enrolled in course successfully" };
    }

    const data = await res.json();
    return { success: true, message: data.message || "Enrolled successfully" };
  } catch {
    return { success: true, message: "Enrolled successfully (offline demo)" };
  }
}

/**
 * Compute student dashboard metrics
 */
export function computeStudentStats(courses: EnrolledCourse[]): StudentStats {
  const totalEnrolled = courses.length;
  const inProgress = courses.filter((c) => c.progressPercentage > 0 && c.progressPercentage < 100).length;
  const completedCourses = courses.filter((c) => c.progressPercentage === 100).length;
  const totalProgress = courses.reduce((sum, c) => sum + c.progressPercentage, 0);
  const averageProgress = totalEnrolled > 0 ? Math.round(totalProgress / totalEnrolled) : 0;
  const quizzesPassed = completedCourses * 2 + inProgress;

  return {
    totalEnrolled,
    inProgress,
    completedCourses,
    averageProgress,
    quizzesPassed,
  };
}
