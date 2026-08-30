export interface AuthorSummary {
  id?: number;
  name: string;
  username: string;
  avatar?: string;
  role?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  status: "draft" | "published";
  author: AuthorSummary;
  readTime?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
