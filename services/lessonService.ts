import { Lesson, CourseProgress, ToggleProgressPayload } from "@/types/lesson";
import { getAuthToken } from "@/services/authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Detailed sample lessons with educational content and videos
export const mockLessonsDatabase: Record<number, Lesson[]> = {
  // Course 1: Full-Stack Next.js 16 & TypeScript Masterclass
  1: [
    {
      id: 101,
      courseId: 1,
      title: "1. Next.js 16 Architecture & Mental Model",
      duration: "18 mins",
      order: 1,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      summary: "Understand the core mental model shift from traditional client-rendered single page apps to React Server Components (RSC) and streaming SSR.",
      content: `
### Welcome to Next.js 16

In this lesson, we break down the fundamental paradigm shift introduced in Next.js 16 and React 19.

### Key Architectural Concepts:
1. **Server-First by Default:** All components inside the \`app/\` directory are React Server Components by default unless marked with the \`'use client'\` directive.
2. **Zero Bundle Overhead:** Server Components execute entirely on the Node.js server. Their JavaScript dependencies are never shipped to the client's browser, reducing initial bundle size to near zero.
3. **Streaming SSR:** With React Suspense, the server streams HTML chunks incrementally to the client as asynchronous data resolves, eliminating blank white screens.

### Code Example: Server Component Data Fetching
\`\`\`tsx
// app/courses/page.tsx
export default async function CoursesPage() {
  // Direct async fetch on the server without useEffect!
  const res = await fetch("https://api.eduforge.com/courses", { cache: "no-store" });
  const courses = await res.json();

  return (
    <div>
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}
\`\`\`
      `,
      resources: [
        { name: "Next.js 16 Official Documentation", url: "https://nextjs.org/docs" },
        { name: "React 19 Server Components Specification", url: "https://react.dev" },
      ],
    },
    {
      id: 102,
      courseId: 1,
      title: "2. Server & Client Component Boundaries",
      duration: "24 mins",
      order: 2,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      summary: "Learn where and when to place the 'use client' boundary to balance interactivity with server-rendered speed.",
      content: `
### Placing the Client Boundary Strategically

A common pitfall in Next.js is placing the \`'use client'\` directive at the top of an entire page layout. This turns the whole page into a client bundle!

### Best Practices:
- Keep the page as a **Server Component** for fast SEO and data fetching.
- Push interactive elements (buttons, search inputs, modal dialogs) down into small, leaf-node client components.
- Pass server-rendered JSX as \`children\` into client layout wrappers.
      `,
      resources: [
        { name: "Client Boundaries Guide", url: "https://nextjs.org/docs/app/building-your-application/rendering/client-components" },
      ],
    },
    {
      id: 103,
      courseId: 1,
      title: "3. Server Actions & Form Mutations",
      duration: "28 mins",
      order: 3,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      summary: "Execute mutations, validate form inputs with Zod, and revalidate cache tags using Next.js Server Actions.",
      content: `
### What are Server Actions?

Server Actions are asynchronous functions executed on the server that can be called directly from client forms or event handlers without creating explicit REST API routes.

### Example:
\`\`\`ts
// app/actions/enroll.ts
'use server'

import { revalidatePath } from 'next/cache';

export async function enrollStudentAction(courseId: number) {
  await db.enrollment.create({ data: { courseId } });
  revalidatePath('/student/dashboard');
  return { success: true };
}
\`\`\`
      `,
    },
    {
      id: 104,
      courseId: 1,
      title: "4. Authentication with JWT & Protected Routes",
      duration: "32 mins",
      order: 4,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      summary: "Secure routes using Next.js middleware, cookie-based token validation, and multi-tier role verification.",
      content: `
### Multi-Tier Authentication Architecture

Learn how to inspect cookies in middleware to guard protected routes like \`/student\`, \`/instructor\`, \`/manager\`, and \`/admin\`.
      `,
    },
    {
      id: 105,
      courseId: 1,
      title: "5. Real-time Progress Tracking & Persistence",
      duration: "22 mins",
      order: 5,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      summary: "Build an optimistic completion toggle that syncs with backend database records.",
      content: `
### Optimistic UI Updates

When a student clicks 'Mark Complete', immediately update the checkbox and progress bar in the client state while dispatching the background API mutation.
      `,
    },
    {
      id: 106,
      courseId: 1,
      title: "6. Production Optimizations & Deployment",
      duration: "20 mins",
      order: 6,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      summary: "Fine-tune Core Web Vitals, optimize image delivery, and deploy your full-stack application to Vercel.",
      content: `
### Preparing for Production

Configure caching headers, optimize static assets, and audit lighthouse scores.
      `,
    },
  ],
};

/**
 * Helper to get local completed lessons list
 */
function getLocalCompletedLessons(courseId: number): number[] {
  if (typeof window === "undefined") return [101, 102, 103, 104];
  const stored = localStorage.getItem(`lms_progress_${courseId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [101, 102, 103, 104];
    }
  }
  return [101, 102, 103, 104];
}

function saveLocalCompletedLessons(courseId: number, lessonIds: number[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`lms_progress_${courseId}`, JSON.stringify(lessonIds));
}

/**
 * Fetch course progress (completed lesson IDs & percentage)
 * Matches GET /api/courses/:id/progress
 */
export async function getCourseProgress(
  courseId: number | string,
  token?: string
): Promise<CourseProgress> {
  const numericCourseId = Number(courseId);
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/courses/${numericCourseId}/progress`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  const completed = getLocalCompletedLessons(numericCourseId);
  const total = mockLessonsDatabase[numericCourseId]?.length || 6;
  const progressPercentage = Math.round((completed.length / total) * 100);

  return {
    courseId: numericCourseId,
    completedLessonIds: completed,
    progressPercentage,
    totalLessons: total,
  };
}

/**
 * Toggle lesson completion
 * Matches POST /api/courses/:id/progress
 */
export async function toggleLessonProgress(
  courseId: number | string,
  payload: ToggleProgressPayload,
  token?: string
): Promise<CourseProgress> {
  const numericCourseId = Number(courseId);
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/courses/${numericCourseId}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  let completed = getLocalCompletedLessons(numericCourseId);
  if (payload.isCompleted) {
    if (!completed.includes(payload.lessonId)) {
      completed.push(payload.lessonId);
    }
  } else {
    completed = completed.filter((id) => id !== payload.lessonId);
  }

  saveLocalCompletedLessons(numericCourseId, completed);
  const total = mockLessonsDatabase[numericCourseId]?.length || 6;
  const progressPercentage = Math.round((completed.length / total) * 100);

  return {
    courseId: numericCourseId,
    completedLessonIds: completed,
    progressPercentage,
    totalLessons: total,
  };
}

/**
 * Fetch all lessons of a course
 */
export function getCourseLessons(courseId: number | string): Lesson[] {
  const numericCourseId = Number(courseId);
  return (
    mockLessonsDatabase[numericCourseId] || [
      {
        id: numericCourseId * 100 + 1,
        courseId: numericCourseId,
        title: "1. Foundational Architecture & Setup",
        duration: "20 mins",
        order: 1,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        summary: "Introduction and core requirements.",
        content: "### Foundation\n\nIn this lesson we cover the basics of this curriculum.",
      },
      {
        id: numericCourseId * 100 + 2,
        courseId: numericCourseId,
        title: "2. Intermediate Core Concepts",
        duration: "25 mins",
        order: 2,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        summary: "Deeper look into implementations.",
        content: "### Core Concepts\n\nExploring deep architectural patterns.",
      },
    ]
  );
}

/**
 * Fetch single lesson by course and lesson ID
 */
export async function getLessonById(
  courseId: number | string,
  lessonId: number | string
): Promise<Lesson | null> {
  const numericCourseId = Number(courseId);
  const numericLessonId = Number(lessonId);

  const lessons = getCourseLessons(numericCourseId);
  return lessons.find((l) => l.id === numericLessonId) || lessons[0] || null;
}
