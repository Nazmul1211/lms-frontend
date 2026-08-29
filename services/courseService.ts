import { Course } from "@/types/course";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Fallback sample courses for development and testing
export const initialMockCourses: Course[] = [
  {
    id: 1,
    title: "Full-Stack Next.js 16 & TypeScript Masterclass",
    slug: "nextjs-masterclass",
    description: "Master React Server Components, Server Actions, streaming SSR, App Router architecture, and production deployment.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    category: "Web Development",
    level: "Intermediate",
    duration: "6 hours",
    totalLessons: 6,
    enrolledStudentsCount: 1420,
    instructor: {
      id: 101,
      name: "Alex Rivera",
      username: "alex_dev",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      bio: "Senior Full-Stack Architect & Open Source Contributor",
    },
    lessons: [
      { id: 101, title: "1. Next.js 16 Architecture & Mental Model", duration: "18 mins", order: 1 },
      { id: 102, title: "2. Server & Client Component Boundaries", duration: "24 mins", order: 2 },
      { id: 103, title: "3. Server Actions & Form Mutations", duration: "28 mins", order: 3 },
      { id: 104, title: "4. Authentication with JWT & Protected Routes", duration: "32 mins", order: 4 },
      { id: 105, title: "5. Real-time Progress Tracking & Persistence", duration: "22 mins", order: 5 },
      { id: 106, title: "6. Production Optimizations & Deployment", duration: "20 mins", order: 6 },
    ],
  },
  {
    id: 2,
    title: "Modern Tailwind CSS v4 & Design Systems",
    slug: "tailwind-design-systems",
    description: "Build accessible, responsive UI component libraries with CSS-first configuration and dark mode tokens.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    category: "Design & UI",
    level: "Beginner",
    duration: "4.5 hours",
    totalLessons: 4,
    enrolledStudentsCount: 890,
    instructor: {
      id: 102,
      name: "Sarah Lin",
      username: "sarah_design",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      bio: "Staff UI/UX Engineer & Design Systems Specialist",
    },
    lessons: [
      { id: 201, title: "1. The Tailwind CSS v4 Philosophy", duration: "15 mins", order: 1 },
      { id: 202, title: "2. Color Tokens, Variables & Theme Directives", duration: "25 mins", order: 2 },
      { id: 203, title: "3. Modern Grid & Container Queries", duration: "30 mins", order: 3 },
      { id: 204, title: "4. Accessible Micro-interactions & State", duration: "20 mins", order: 4 },
    ],
  },
  {
    id: 3,
    title: "Backend API Engineering with Strapi & Node.js",
    slug: "strapi-backend-engineering",
    description: "Build headless CMS architectures, custom controllers, JWT auth policies, and PostgreSQL database models.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    category: "Backend Development",
    level: "Advanced",
    duration: "8 hours",
    totalLessons: 5,
    enrolledStudentsCount: 650,
    instructor: {
      id: 103,
      name: "Marcus Vance",
      username: "marcus_api",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      bio: "Lead Backend Engineer & Headless CMS Expert",
    },
    lessons: [
      { id: 301, title: "1. Content Modeling & Database Relations", duration: "25 mins", order: 1 },
      { id: 302, title: "2. Custom Controllers, Services & Sanitization", duration: "35 mins", order: 2 },
      { id: 303, title: "3. Multi-Role RBAC & Policy Verification", duration: "30 mins", order: 3 },
      { id: 304, title: "4. Auto-Grading Quiz Logic & Evaluation", duration: "40 mins", order: 4 },
      { id: 305, title: "5. Production Deployment on Railway", duration: "25 mins", order: 5 },
    ],
  },
  {
    id: 4,
    title: "Full-Stack Security & Role-Based Access Control",
    slug: "security-rbac-mastery",
    description: "Implement defense-in-depth security with token validation, route guards, API middleware, and audit logs.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    category: "Security",
    level: "Advanced",
    duration: "5 hours",
    totalLessons: 4,
    enrolledStudentsCount: 510,
    instructor: {
      id: 101,
      name: "Alex Rivera",
      username: "alex_dev",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      bio: "Senior Full-Stack Architect & Open Source Contributor",
    },
    lessons: [
      { id: 401, title: "1. JWT Token Anatomy & Storage Vulnerabilities", duration: "20 mins", order: 1 },
      { id: 402, title: "2. Backend Policy Guards & Route Interceptors", duration: "30 mins", order: 2 },
      { id: 403, title: "3. Input Sanitization & Anti-Tamper Mechanisms", duration: "25 mins", order: 3 },
      { id: 404, title: "4. Building a 4-Tier RBAC Architecture", duration: "35 mins", order: 4 },
    ],
  },
];

/**
 * Fetch all available published courses
 * Matches GET /api/courses
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/courses`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return initialMockCourses;
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || initialMockCourses;
  } catch {
    // If backend server is not running yet, gracefully return initial mock courses
    return initialMockCourses;
  }
}
