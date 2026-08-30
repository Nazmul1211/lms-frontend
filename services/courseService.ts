import { Course } from "@/types/course";
import { API_BASE_URL } from "@/lib/apiConfig";

// Fallback sample courses for development and testing
export const initialMockCourses: Course[] = [
  {
    id: 1,
    title: "Full-Stack Next.js 16 & TypeScript Masterclass",
    slug: "nextjs-masterclass",
    description: "Master React Server Components, Server Actions, streaming SSR, App Router architecture, and production deployment on Vercel.",
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
      bio: "Senior Full-Stack Architect with 10+ years of experience in modern React ecosystems and scalable cloud architectures.",
      role: "Lead Instructor",
    },
    whatYouWillLearn: [
      "Master Next.js 16 App Router mental model and file conventions",
      "Confidently implement React Server Components and Client boundaries",
      "Execute safe data mutations using Next.js Server Actions with zero API boilerplate",
      "Enforce Role-Based Access Control (RBAC) across server middleware and client UI",
      "Track and persist student learning progress and auto-grade interactive quizzes",
      "Deploy production-ready applications to Vercel with optimized Core Web Vitals",
    ],
    prerequisites: [
      "Basic understanding of modern JavaScript (ES6+) and React fundamentals",
      "Familiarity with HTML, CSS, and basic TypeScript syntax",
    ],
    lessons: [
      { id: 101, title: "1. Next.js 16 Architecture & Mental Model", duration: "18 mins", order: 1, isPreview: true },
      { id: 102, title: "2. Server & Client Component Boundaries", duration: "24 mins", order: 2, isPreview: true },
      { id: 103, title: "3. Server Actions & Form Mutations", duration: "28 mins", order: 3, isPreview: false },
      { id: 104, title: "4. Authentication with JWT & Protected Routes", duration: "32 mins", order: 4, isPreview: false },
      { id: 105, title: "5. Real-time Progress Tracking & Persistence", duration: "22 mins", order: 5, isPreview: false },
      { id: 106, title: "6. Production Optimizations & Deployment", duration: "20 mins", order: 6, isPreview: false },
    ],
    createdAt: "2026-08-20",
    updatedAt: "2026-08-28",
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
      bio: "Staff UI/UX Engineer & Design Systems Specialist with expertise in accessible web standards.",
      role: "Design Systems Specialist",
    },
    whatYouWillLearn: [
      "Understand the CSS-first @theme directive in Tailwind CSS v4",
      "Build cohesive design tokens for Light and Dark mode interfaces",
      "Create complex responsive dashboard layouts with Grid and Container Queries",
      "Incorporate micro-interactions, focus rings, and accessible ARIA states",
    ],
    prerequisites: [
      "Basic understanding of HTML and standard CSS syntax",
    ],
    lessons: [
      { id: 201, title: "1. The Tailwind CSS v4 Philosophy", duration: "15 mins", order: 1, isPreview: true },
      { id: 202, title: "2. Color Tokens, Variables & Theme Directives", duration: "25 mins", order: 2, isPreview: false },
      { id: 203, title: "3. Modern Grid & Container Queries", duration: "30 mins", order: 3, isPreview: false },
      { id: 204, title: "4. Accessible Micro-interactions & State", duration: "20 mins", order: 4, isPreview: false },
    ],
    createdAt: "2026-08-22",
    updatedAt: "2026-08-28",
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
      bio: "Lead Backend Engineer specializing in Node.js, PostgreSQL, and scalable microservices.",
      role: "Backend Architect",
    },
    whatYouWillLearn: [
      "Model content schemas, relations, and components inside Strapi Headless CMS",
      "Write custom controllers, services, and policies in TypeScript",
      "Implement multi-role RBAC security and JWT token validation",
      "Engineer auto-grading quiz evaluation and student progress persistence APIs",
      "Deploy Strapi backends with PostgreSQL databases on Railway",
    ],
    prerequisites: [
      "Experience with JavaScript/TypeScript and RESTful APIs",
      "Basic familiarity with databases and SQL concepts",
    ],
    lessons: [
      { id: 301, title: "1. Content Modeling & Database Relations", duration: "25 mins", order: 1, isPreview: true },
      { id: 302, title: "2. Custom Controllers, Services & Sanitization", duration: "35 mins", order: 2, isPreview: false },
      { id: 303, title: "3. Multi-Role RBAC & Policy Verification", duration: "30 mins", order: 3, isPreview: false },
      { id: 304, title: "4. Auto-Grading Quiz Logic & Evaluation", duration: "40 mins", order: 4, isPreview: false },
      { id: 305, title: "5. Production Deployment on Railway", duration: "25 mins", order: 5, isPreview: false },
    ],
    createdAt: "2026-08-24",
    updatedAt: "2026-08-28",
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
      bio: "Senior Full-Stack Architect with 10+ years of experience in modern React ecosystems and scalable cloud architectures.",
      role: "Lead Instructor",
    },
    whatYouWillLearn: [
      "Understand JWT token anatomy, claims, expiration, and storage vectors",
      "Build server-side middleware and policy interceptors in Next.js and Strapi",
      "Sanitize inputs and defend against privilege escalation attacks",
      "Implement a full 4-role access matrix: Admin, Content Manager, Instructor, Student",
    ],
    prerequisites: [
      "Working knowledge of Web Development and Authentication concepts",
    ],
    lessons: [
      { id: 401, title: "1. JWT Token Anatomy & Storage Vulnerabilities", duration: "20 mins", order: 1, isPreview: true },
      { id: 402, title: "2. Backend Policy Guards & Route Interceptors", duration: "30 mins", order: 2, isPreview: false },
      { id: 403, title: "3. Input Sanitization & Anti-Tamper Mechanisms", duration: "25 mins", order: 3, isPreview: false },
      { id: 404, title: "4. Building a 4-Tier RBAC Architecture", duration: "35 mins", order: 4, isPreview: false },
    ],
    createdAt: "2026-08-25",
    updatedAt: "2026-08-28",
  },
];

/**
 * Helper to normalize Strapi course data to Course type
 */
function normalizeCourse(raw: any): Course {
  const defaultInstructor = {
    id: 101,
    name: "Alex Rivera",
    username: "instructor_alex",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "Senior Full-Stack Architect with 10+ years of experience in modern React ecosystems and scalable cloud architectures.",
    role: "Lead Instructor",
  };

  const rawInstructor = raw.instructor;
  const instructor = rawInstructor
    ? {
        id: rawInstructor.id || 101,
        name: rawInstructor.name || rawInstructor.username || "Alex Rivera",
        username: rawInstructor.username || "instructor_alex",
        avatar: rawInstructor.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        bio: rawInstructor.bio || "Senior Full-Stack Instructor & Software Architect.",
        role: rawInstructor.role?.name || "Lead Instructor",
      }
    : defaultInstructor;

  const rawLessons = raw.lessons || [];
  const lessons = rawLessons.map((l: any, idx: number) => ({
    id: l.documentId || l.id || idx + 1,
    title: l.title || `Lesson ${idx + 1}`,
    duration: l.durationMinutes ? `${l.durationMinutes} mins` : l.duration || "15 mins",
    order: l.order || idx + 1,
    isPreview: l.order === 1,
    content: l.content,
    videoUrl: l.videoUrl,
  }));

  return {
    id: raw.documentId || raw.id,
    title: raw.title || "Untitled Course",
    slug: raw.slug || "course",
    description: raw.description || "Master industry-standard web engineering practices with interactive modules.",
    coverImage: raw.coverImageUrl || raw.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    category: raw.category || "Web Development",
    level: raw.level ? (raw.level.charAt(0).toUpperCase() + raw.level.slice(1)) : "Intermediate",
    duration: raw.duration || `${lessons.length * 15 || 45} mins`,
    totalLessons: lessons.length || 4,
    enrolledStudentsCount: raw.enrollments?.length ?? raw.enrolledStudentsCount ?? 120,
    instructor,
    whatYouWillLearn: raw.whatYouWillLearn || [
      "Architect full-stack applications with production-grade reliability",
      "Implement role-based access control and security safeguards",
      "Deploy scalable systems to cloud platforms like Vercel and Railway",
    ],
    prerequisites: raw.prerequisites || [
      "Basic understanding of JavaScript / TypeScript and modern web concepts",
    ],
    lessons: lessons.length > 0 ? lessons : [
      { id: 101, title: "1. Architecture & Mental Model Overview", duration: "15 mins", order: 1, isPreview: true },
      { id: 102, title: "2. Core Implementation & Deep Dive", duration: "25 mins", order: 2, isPreview: false },
      { id: 103, title: "3. Best Practices & Production Deployment", duration: "20 mins", order: 3, isPreview: false },
    ],
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

/**
 * Fetch all available published courses
 * Matches GET /api/courses
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/courses?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return initialMockCourses;
    }

    const json = await res.json();
    const rawList: any[] = Array.isArray(json) ? json : json.data || [];
    if (rawList.length > 0) {
      return rawList.map(normalizeCourse);
    }
    return initialMockCourses;
  } catch {
    return initialMockCourses;
  }
}

/**
 * Fetch single course by ID or slug
 * Matches GET /api/courses/:id or /api/courses?filters[slug][$eq]=...
 */
export async function getCourseById(id: number | string): Promise<Course | null> {
  const strId = String(id);

  try {
    // 1. Try direct ID / documentId lookup
    const res = await fetch(`${API_BASE_URL}/api/courses/${strId}?populate=*`, {
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      const raw = json.data || json;
      if (raw && (raw.id || raw.documentId || raw.title)) {
        return normalizeCourse(raw);
      }
    }

    // 2. Try slug filter lookup
    const slugRes = await fetch(
      `${API_BASE_URL}/api/courses?filters[slug][$eq]=${encodeURIComponent(strId)}&populate=*`,
      { cache: "no-store" }
    );

    if (slugRes.ok) {
      const slugJson = await slugRes.json();
      const rawList: any[] = Array.isArray(slugJson) ? slugJson : slugJson.data || [];
      if (rawList.length > 0) {
        return normalizeCourse(rawList[0]);
      }
    }
  } catch {
    // Fallback to local
  }

  // 3. Fallback search against initialMockCourses
  const found = initialMockCourses.find(
    (c) => String(c.id) === strId || c.slug === strId || (Number(id) && c.id === Number(id))
  );

  return found || null;
}
