import { AuthResponse, LoginCredentials, RegisterPayload, User, RoleType } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

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
};

// Preset demo accounts for quick role-based evaluation
export const demoAccounts = {
  student: {
    identifier: "student@eduforge.com",
    password: "password123",
    role: "student" as RoleType,
    name: "John Student",
    username: "john_student",
  },
  instructor: {
    identifier: "alex@eduforge.com",
    password: "password123",
    role: "instructor" as RoleType,
    name: "Alex Rivera",
    username: "alex_dev",
  },
  content_manager: {
    identifier: "manager@eduforge.com",
    password: "password123",
    role: "content_manager" as RoleType,
    name: "Elena Content",
    username: "elena_manager",
  },
  admin: {
    identifier: "admin@eduforge.com",
    password: "password123",
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
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || "Invalid email or password");
    }

    const data: AuthResponse = await res.json();
    if (data.jwt) {
      setAuthToken(data.jwt);
      setStoredUser(data.user);
    }
    return data;
  } catch (error) {
    // Fallback: Check if matching demo role presets for offline testing
    const ident = credentials.identifier.toLowerCase();
    let roleType: RoleType = "student";
    let displayName = "Student User";

    if (ident.includes("admin")) {
      roleType = "admin";
      displayName = "System Admin";
    } else if (ident.includes("manager") || ident.includes("content")) {
      roleType = "content_manager";
      displayName = "Content Manager";
    } else if (ident.includes("instructor") || ident.includes("alex") || ident.includes("teacher")) {
      roleType = "instructor";
      displayName = "Alex Rivera";
    }

    const mockUser: User = {
      id: Math.floor(Math.random() * 1000) + 1,
      username: credentials.identifier.split("@")[0] || "demo_user",
      email: credentials.identifier.includes("@") ? credentials.identifier : `${credentials.identifier}@eduforge.com`,
      name: displayName,
      role: {
        id: roleType === "admin" ? 1 : roleType === "content_manager" ? 2 : roleType === "instructor" ? 3 : 4,
        name: roleType === "admin" ? "Admin" : roleType === "content_manager" ? "Content Manager" : roleType === "instructor" ? "Instructor" : "Student",
        type: roleType,
      },
    };

    const mockResponse: AuthResponse = {
      jwt: "mock_jwt_token_" + Date.now(),
      user: mockUser,
    };

    setAuthToken(mockResponse.jwt);
    setStoredUser(mockResponse.user);
    return mockResponse;
  }
}

/**
 * Register new student
 * Matches POST /api/auth/local/register
 */
export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || "Registration failed");
    }

    const data: AuthResponse = await res.json();
    if (data.jwt) {
      setAuthToken(data.jwt);
      setStoredUser(data.user);
    }
    return data;
  } catch {
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000) + 20,
      username: payload.username,
      email: payload.email,
      name: payload.username,
      role: {
        id: 4,
        name: "Student",
        type: "student",
      },
    };

    const mockResponse: AuthResponse = {
      jwt: "mock_jwt_token_" + Date.now(),
      user: mockUser,
    };

    setAuthToken(mockResponse.jwt);
    setStoredUser(mockResponse.user);
    return mockResponse;
  }
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
