export type RoleType = "admin" | "content_manager" | "instructor" | "student";

export interface Role {
  id: number;
  name: string;
  type: RoleType;
  description?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  role: Role | RoleType | string;
  avatar?: string;
  createdAt?: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface LoginCredentials {
  identifier: string; // username or email
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
