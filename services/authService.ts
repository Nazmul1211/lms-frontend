import { AuthResponse, LoginCredentials, RegisterPayload, User, RoleType } from "@/types/auth";
import { API_BASE_URL } from "@/lib/apiConfig";

// Helper to normalize and resolve role string cleanly
export const getRoleType = (user: User | null): RoleType => {
  if (!user || !user.role) return "student";
  if (typeof user.role === "string") {
    const r = user.role.toLowerCase();
    if (r.includes("admin")) return "admin";
    if (r.includes("manager") || r.includes("content")) return "content_manager";
    if (r.includes("instructor") || r.includes("alex") || r.includes("teacher")) return "instructor";
    return "student";
  }
  const type = (user.role.type || "").toLowerCase();
  const name = (user.role.name || "").toLowerCase();
  if (type.includes("admin") || name.includes("admin")) return "admin";
  if (type.includes("manager") || type.includes("content") || name.includes("manager") || name.includes("content")) return "content_manager";
  if (type.includes("instructor") || name.includes("instructor")) return "instructor";
  return "student";
};

// Helper to access token in browser
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("lms_auth_token");
};

export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("lms_auth_token", token);
  document.cookie = `lms_token=${token}; path=/; max-age=604800; SameSite=Lax`;
};

export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("lms_auth_token");
  localStorage.removeItem("lms_user");
  document.cookie = "lms_token=; path=/; max-age=0; SameSite=Lax";
  document.cookie = "lms_role=; path=/; max-age=0; SameSite=Lax";
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userJson = localStorage.getItem("lms_user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

export const setStoredUser = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("lms_user", JSON.stringify(user));
  const roleType = getRoleType(user);
  document.cookie = `lms_role=${roleType}; path=/; max-age=604800; SameSite=Lax`;
};

/**
 * Fetch current user from /api/users/me
 */
export async function getCurrentUserApi(token?: string): Promise<User | null> {
  const authToken = token || getAuthToken();
  if (!authToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const user: User = await res.json();
    setStoredUser(user);
    return user;
  } catch {
    return null;
  }
}

// Preset demo accounts matching seeded backend users
export const demoAccounts = {
  student: {
    identifier: "student@lms.com",
    password: "Password123!",
    role: "student" as RoleType,
    name: "Sarah Student",
    username: "student_sarah",
  },
  instructor: {
    identifier: "instructor@lms.com",
    password: "Password123!",
    role: "instructor" as RoleType,
    name: "Alex Rivera",
    username: "instructor_alex",
  },
  content_manager: {
    identifier: "manager@lms.com",
    password: "Password123!",
    role: "content_manager" as RoleType,
    name: "Elena Content",
    username: "content_manager",
  },
  admin: {
    identifier: "admin@lms.com",
    password: "Password123!",
    role: "admin" as RoleType,
    name: "System Admin",
    username: "admin_user",
  },
};

/**
 * Login user
 * Matches POST /api/auth/local
 */
export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || "Invalid identifier or password. Please check your credentials.");
  }

  const data: AuthResponse = await res.json();
  if (data.jwt) {
    setAuthToken(data.jwt);
    setStoredUser(data.user);
  }
  return data;
}

/**
 * Register new student
 * Matches POST /api/auth/local/register
 */
export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || "Registration failed. Email or username might already be in use.");
  }

  const data: AuthResponse = await res.json();
  if (data.jwt) {
    setAuthToken(data.jwt);
    setStoredUser(data.user);
  }
  return data;
}

/**
 * Social Login (Google / GitHub)
 */
export async function socialLoginApi(provider: "google" | "github"): Promise<AuthResponse> {
  // Simulate OAuth redirect / response
  const mockUser: User = {
    id: Math.floor(Math.random() * 1000) + 50,
    username: `${provider}_student`,
    email: `learner@${provider}.com`,
    name: provider === "google" ? "Google Student" : "GitHub Developer",
    role: {
      id: 4,
      name: "Student",
      type: "student",
    },
    avatar: provider === "google"
      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
  };

  const mockResponse: AuthResponse = {
    jwt: `mock_${provider}_token_` + Date.now(),
    user: mockUser,
  };

  setAuthToken(mockResponse.jwt);
  setStoredUser(mockResponse.user);
  return mockResponse;
}
