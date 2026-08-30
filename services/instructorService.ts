import { InstructorCourse, InstructorMetrics, EnrolledStudent } from "@/types/instructor";
import { getAuthToken } from "@/services/authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Sample mock courses with enrolled student rosters for offline testing
export const initialMockInstructorCourses: InstructorCourse[] = [
  {
    id: 1,
    title: "Full-Stack Next.js 16 & TypeScript Masterclass",
    slug: "nextjs-masterclass",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    category: "Web Development",
    level: "Intermediate",
    totalLessons: 6,
    totalStudents: 4,
    averageProgress: 68,
    createdAt: "2026-08-20",
    enrolledStudents: [
      {
        id: 101,
        name: "John Student",
        username: "john_student",
        email: "student@eduforge.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-21",
        progressPercentage: 67,
        completedLessonsCount: 4,
        totalLessons: 6,
        lastActiveAt: "2 hours ago",
        quizScore: 80,
      },
      {
        id: 102,
        name: "Sarah Chen",
        username: "sarah_c",
        email: "sarah@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-22",
        progressPercentage: 100,
        completedLessonsCount: 6,
        totalLessons: 6,
        lastActiveAt: "Yesterday",
        quizScore: 100,
      },
      {
        id: 103,
        name: "David Kim",
        username: "david_kim",
        email: "david.k@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-23",
        progressPercentage: 33,
        completedLessonsCount: 2,
        totalLessons: 6,
        lastActiveAt: "3 days ago",
        quizScore: undefined,
      },
      {
        id: 104,
        name: "Emma Watson",
        username: "emma_w",
        email: "emma@example.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-24",
        progressPercentage: 83,
        completedLessonsCount: 5,
        totalLessons: 6,
        lastActiveAt: "Today",
        quizScore: 90,
      },
    ],
  },
  {
    id: 4,
    title: "Full-Stack Security & Role-Based Access Control",
    slug: "security-rbac-mastery",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    category: "Security",
    level: "Advanced",
    totalLessons: 4,
    totalStudents: 3,
    averageProgress: 55,
    createdAt: "2026-08-25",
    enrolledStudents: [
      {
        id: 101,
        name: "John Student",
        username: "john_student",
        email: "student@eduforge.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-26",
        progressPercentage: 50,
        completedLessonsCount: 2,
        totalLessons: 4,
        lastActiveAt: "1 day ago",
      },
      {
        id: 105,
        name: "Liam O'Connor",
        username: "liam_dev",
        email: "liam@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-26",
        progressPercentage: 75,
        completedLessonsCount: 3,
        totalLessons: 4,
        lastActiveAt: "Today",
        quizScore: 85,
      },
      {
        id: 106,
        name: "Sophia Martinez",
        username: "sophia_m",
        email: "sophia@example.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        enrolledAt: "2026-08-27",
        progressPercentage: 25,
        completedLessonsCount: 1,
        totalLessons: 4,
        lastActiveAt: "4 days ago",
      },
    ],
  },
];

/**
 * Fetch instructor courses with enrolled students & progress
 * Matches GET /api/instructor/courses
 */
export async function getInstructorCourses(token?: string): Promise<InstructorCourse[]> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/instructor/courses`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : data.data || initialMockInstructorCourses;
    }
  } catch {
    // fallback
  }

  return initialMockInstructorCourses;
}

/**
 * Compute overall instructor metrics
 */
export function computeInstructorMetrics(courses: InstructorCourse[]): InstructorMetrics {
  const totalCourses = courses.length;
  const allStudents = courses.flatMap((c) => c.enrolledStudents);
  const totalStudents = allStudents.length;

  const totalProgress = allStudents.reduce((sum, s) => sum + s.progressPercentage, 0);
  const averageCompletionRate = totalStudents > 0 ? Math.round(totalProgress / totalStudents) : 0;
  const activeThisWeek = allStudents.filter((s) => s.lastActiveAt?.includes("Today") || s.lastActiveAt?.includes("ago") || s.lastActiveAt?.includes("Yesterday")).length;

  return {
    totalCourses,
    totalStudents,
    averageCompletionRate,
    activeThisWeek,
  };
}
