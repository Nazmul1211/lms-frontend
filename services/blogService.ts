import { BlogPost } from "@/types/blog";
import { API_BASE_URL } from "@/lib/apiConfig";

// Sample mock blog articles for development and fallback
export const initialMockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Full-Stack Learning Platforms with Next.js 16 & Strapi",
    slug: "building-modern-lms-nextjs-strapi",
    excerpt: "Architectural insights on building role-protected LMS platforms with automated quiz grading and live progress synchronization.",
    content: `
### Architectural Mental Model

Building an enterprise Learning Management System requires striking a balance between content authoring velocity, strict role-based access control (RBAC), and low-latency student learning flows.

### Why Next.js 16 + Strapi?
Combining Next.js on the frontend with Strapi Headless CMS on the backend provides several major architectural advantages:
1. **Clear Separation of Concerns:** Content managers and instructors use Strapi's admin studio to curate lessons, while students experience a high-performance, responsive React interface.
2. **Server-Side Security:** JWT authentication and RBAC policies are enforced at the backend API layer. Client UI hiding is simply an aesthetic layer on top of strict server guards.
3. **Automated Server-Side Grading:** Quizzes are delivered to students in a sanitized format with answers stripped out, and graded on the server upon submission to prevent tampering.

### The 4-Role Permission Matrix
In modern LMS architecture, permissions must be strictly scoped:
- **Admin:** Full control of user roles and platform moderation.
- **Content Manager:** Creates courses, lessons, and publishes engineering blogs.
- **Instructor:** Manages assigned course lessons and monitors student progress rosters.
- **Student:** Enrolls in courses, marks lessons complete, and takes auto-graded quizzes.
    `,
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    category: "Architecture",
    status: "published",
    author: {
      id: 101,
      name: "Elena Rostova",
      username: "elena_content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      role: "Lead Content Architect",
    },
    readTime: "5 min read",
    publishedAt: "2026-08-26",
    createdAt: "2026-08-25",
  },
  {
    id: 2,
    title: "Mastering Role-Based Access Control (RBAC) in Modern Web Apps",
    slug: "mastering-role-based-access-control",
    excerpt: "Why hiding UI buttons is never enough: A deep dive into multi-tier backend security policies and token validation.",
    content: `
### The Illusion of Client-Only Route Protection

A classic security mistake in web development is relying solely on hiding buttons or redirecting in React useEffect hooks. A determined user can easily inspect network traffic or craft raw API requests.

### Three Layers of RBAC Defense
1. **API Token Verification:** Every incoming request carries a verified JWT header checked by server middleware.
2. **Controller Policy Middleware:** The backend checks the user's role against the target resource before executing queries.
3. **Optimistic Client Guards:** While the server remains the authoritative source of truth, client-side guards provide instant visual feedback without unnecessary network roundtrips.

### Permission Boundaries in Practice
- Students should never be able to mutate course content or change user roles.
- Content Managers should not have permission to alter user roles or elevate permissions.
- Instructors should only be allowed to modify courses and quizzes they are explicitly assigned to.
    `,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    category: "Security",
    status: "published",
    author: {
      id: 1,
      name: "System Administrator",
      username: "admin_user",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      role: "Security Architect",
    },
    readTime: "6 min read",
    publishedAt: "2026-08-27",
    createdAt: "2026-08-26",
  },
  {
    id: 3,
    title: "Sanitized Quiz Delivery & Automated Server-Side Scoring",
    slug: "sanitized-quiz-delivery-auto-grading",
    excerpt: "Delivering tamper-proof interactive quizzes with server sanitization and instant scoring algorithms.",
    content: `
### Preventing Client-Side Answer Leakage

Online assessments require strict data isolation. If correct answer indices are bundled into the initial JSON payload sent to the student's browser, any user can inspect the React state or DevTools network tab to find the answers.

### The Sanitization Pipeline
1. **Student View Endpoint:** The endpoint \`/api/quizzes/:id/student-view\` queries the database and strips out all correct answer fields before serializing the JSON response.
2. **Submission & Auto-Grading:** The student submits their chosen answer indices to \`/api/quizzes/:id/submit\`.
3. **Server Evaluation:** The server matches the submission against the database answer keys, calculates the percentage score, records the result in the database, and returns the score report.
    `,
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    category: "Engineering",
    status: "published",
    author: {
      id: 103,
      name: "Marcus Vance",
      username: "marcus_api",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      role: "Lead Backend Engineer",
    },
    readTime: "4 min read",
    publishedAt: "2026-08-28",
    createdAt: "2026-08-27",
  },
  {
    id: 4,
    title: "Upcoming Features: Collaborative Learning & Peer Reviews",
    slug: "upcoming-features-collaborative-learning",
    excerpt: "A preview of the collaborative features coming in the next release of EduForge LMS.",
    content: `
### Draft Preview (Internal Review Only)

This draft article explores upcoming collaborative learning features including student discussion forums, peer code reviews, and automated certificate generation upon course completion.
    `,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60",
    category: "Product",
    status: "draft",
    author: {
      id: 101,
      name: "Elena Rostova",
      username: "elena_content",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      role: "Lead Content Architect",
    },
    readTime: "3 min read",
    publishedAt: undefined,
    createdAt: "2026-08-29",
  },
];

/**
 * Fetch blog posts
 * Matches GET /api/blog-posts
 * When includeDrafts is false, returns only published blogs for public/students
 */
export async function getBlogPosts(includeDrafts = false): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts${includeDrafts ? "?all=true" : ""}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (includeDrafts) return initialMockBlogs;
      return initialMockBlogs.filter((b) => b.status === "published");
    }

    const data = await res.json();
    const list: BlogPost[] = Array.isArray(data) ? data : data.data || initialMockBlogs;
    if (includeDrafts) return list;
    return list.filter((b) => b.status === "published");
  } catch {
    if (includeDrafts) return initialMockBlogs;
    return initialMockBlogs.filter((b) => b.status === "published");
  }
}

/**
 * Fetch single blog post by ID
 * Matches GET /api/blog-posts/:id
 */
export async function getBlogPostById(id: number | string): Promise<BlogPost | null> {
  const numericId = Number(id);
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts/${numericId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return initialMockBlogs.find((b) => b.id === numericId) || null;
    }

    const data = await res.json();
    return data?.data || data || initialMockBlogs.find((b) => b.id === numericId) || null;
  } catch {
    return initialMockBlogs.find((b) => b.id === numericId) || null;
  }
}
