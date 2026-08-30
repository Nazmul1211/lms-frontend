import { BlogPost } from "@/types/blog";

export interface CreateBlogPostPayload {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage?: string;
  status: "draft" | "published";
  readTime?: string;
}

export interface ManagerMetrics {
  totalArticles: number;
  publishedCount: number;
  draftCount: number;
  totalCourses: number;
}
