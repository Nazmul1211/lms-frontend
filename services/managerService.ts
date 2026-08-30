import { BlogPost } from "@/types/blog";
import { CreateBlogPostPayload, ManagerMetrics } from "@/types/manager";
import { initialMockBlogs } from "@/services/blogService";
import { getAuthToken, getStoredUser } from "@/services/authService";
import { API_BASE_URL } from "@/lib/apiConfig";

function getLocalBlogs(): BlogPost[] {
  if (typeof window === "undefined") return initialMockBlogs;
  const stored = localStorage.getItem("lms_manager_blogs");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialMockBlogs;
    }
  }
  return initialMockBlogs;
}

function saveLocalBlogs(blogs: BlogPost[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("lms_manager_blogs", JSON.stringify(blogs));
}

/**
 * Fetch all blogs including drafts for Manager/Admin
 * Matches GET /api/blog-posts
 */
export async function getAllManagerBlogs(token?: string): Promise<BlogPost[]> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts?all=true`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const list: BlogPost[] = Array.isArray(data) ? data : data.data || getLocalBlogs();
      return list;
    }
  } catch {
    // fallback
  }

  return getLocalBlogs();
}

/**
 * Create a new blog post (draft or published)
 * Matches POST /api/blog-posts
 */
export async function createBlogPost(
  payload: CreateBlogPostPayload,
  token?: string
): Promise<BlogPost> {
  const authToken = token || getAuthToken();
  const currentUser = getStoredUser();

  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data?.data || data;
    }
  } catch {
    // fallback
  }

  const blogs = getLocalBlogs();
  const newPost: BlogPost = {
    id: Math.floor(Math.random() * 1000) + 10,
    title: payload.title,
    slug: payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    excerpt: payload.excerpt,
    content: payload.content,
    category: payload.category,
    status: payload.status,
    coverImage:
      payload.coverImage ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    readTime: payload.readTime || "4 min read",
    author: {
      id: currentUser?.id || 101,
      name: currentUser?.name || "Elena Content",
      username: currentUser?.username || "elena_manager",
      role: "Content Manager",
      avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    publishedAt: payload.status === "published" ? new Date().toISOString() : undefined,
    createdAt: new Date().toISOString(),
  };

  const updated = [newPost, ...blogs];
  saveLocalBlogs(updated);
  return newPost;
}

/**
 * Update existing blog post or toggle status
 * Matches PUT /api/blog-posts/:id
 */
export async function updateBlogPost(
  id: number,
  updates: Partial<BlogPost>,
  token?: string
): Promise<BlogPost> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/blog-posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      const data = await res.json();
      return data?.data || data;
    }
  } catch {
    // fallback
  }

  const blogs = getLocalBlogs();
  const updated = blogs.map((b) => {
    if (b.id === id) {
      const nextStatus = updates.status || b.status;
      return {
        ...b,
        ...updates,
        publishedAt: nextStatus === "published" && !b.publishedAt ? new Date().toISOString() : b.publishedAt,
        updatedAt: new Date().toISOString(),
      };
    }
    return b;
  });

  saveLocalBlogs(updated);
  return updated.find((b) => b.id === id)!;
}

/**
 * Delete a blog post
 * Matches DELETE /api/blog-posts/:id
 */
export async function deleteBlogPost(id: number, token?: string): Promise<boolean> {
  const authToken = token || getAuthToken();

  try {
    await fetch(`${API_BASE_URL}/api/blog-posts/${id}`, {
      method: "DELETE",
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    });
  } catch {
    // fallback
  }

  const blogs = getLocalBlogs();
  const updated = blogs.filter((b) => b.id !== id);
  saveLocalBlogs(updated);
  return true;
}

/**
 * Compute manager metrics
 */
export function computeManagerMetrics(blogs: BlogPost[], totalCoursesCount = 4): ManagerMetrics {
  const totalArticles = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;

  return {
    totalArticles,
    publishedCount,
    draftCount,
    totalCourses: totalCoursesCount,
  };
}
