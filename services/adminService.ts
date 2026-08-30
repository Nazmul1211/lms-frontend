import { AdminStats, AdminUser, AvailableRole } from "@/types/admin";
import { getAuthToken } from "@/services/authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const availableRoles: AvailableRole[] = [
  { id: 1, name: "Admin", type: "admin", description: "Full platform oversight, role management, and system analytics." },
  { id: 2, name: "Content Manager", type: "content_manager", description: "Author blogs, control draft/publish states, and structure curriculum." },
  { id: 3, name: "Instructor", type: "instructor", description: "Manage assigned courses and inspect enrolled student rosters." },
  { id: 4, name: "Student", type: "student", description: "Enroll in courses, complete lessons, and take auto-graded quizzes." },
];

export const initialMockAdminUsers: AdminUser[] = [
  {
    id: 1,
    name: "System Admin",
    username: "admin_user",
    email: "admin@eduforge.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[0], // Admin
    enrolledCoursesCount: 0,
    joinedAt: "2026-08-01",
    status: "active",
  },
  {
    id: 2,
    name: "Elena Rostova",
    username: "elena_manager",
    email: "manager@eduforge.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[1], // Content Manager
    enrolledCoursesCount: 0,
    joinedAt: "2026-08-05",
    status: "active",
  },
  {
    id: 3,
    name: "Alex Rivera",
    username: "alex_dev",
    email: "alex@eduforge.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[2], // Instructor
    enrolledCoursesCount: 2,
    joinedAt: "2026-08-10",
    status: "active",
  },
  {
    id: 4,
    name: "Marcus Vance",
    username: "marcus_api",
    email: "marcus@eduforge.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[2], // Instructor
    enrolledCoursesCount: 1,
    joinedAt: "2026-08-12",
    status: "active",
  },
  {
    id: 5,
    name: "John Student",
    username: "john_student",
    email: "student@eduforge.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[3], // Student
    enrolledCoursesCount: 3,
    joinedAt: "2026-08-15",
    status: "active",
  },
  {
    id: 6,
    name: "Sarah Chen",
    username: "sarah_c",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[3], // Student
    enrolledCoursesCount: 2,
    joinedAt: "2026-08-18",
    status: "active",
  },
  {
    id: 7,
    name: "Liam O'Connor",
    username: "liam_dev",
    email: "liam@example.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[3], // Student
    enrolledCoursesCount: 1,
    joinedAt: "2026-08-20",
    status: "active",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    username: "sophia_m",
    email: "sophia@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    role: availableRoles[3], // Student
    enrolledCoursesCount: 2,
    joinedAt: "2026-08-22",
    status: "active",
  },
];

function getLocalUsers(): AdminUser[] {
  if (typeof window === "undefined") return initialMockAdminUsers;
  const stored = localStorage.getItem("lms_admin_users");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialMockAdminUsers;
    }
  }
  return initialMockAdminUsers;
}

function saveLocalUsers(users: AdminUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("lms_admin_users", JSON.stringify(users));
}

/**
 * Fetch high-level platform stats
 * Matches GET /api/admin-dashboard/stats
 */
export async function getAdminStats(token?: string): Promise<AdminStats> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin-dashboard/stats`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return data?.data || data;
    }
  } catch {
    // fallback
  }

  const users = getLocalUsers();
  const students = users.filter((u) => u.role.type === "student").length;
  const instructors = users.filter((u) => u.role.type === "instructor").length;
  const contentManagers = users.filter((u) => u.role.type === "content_manager").length;
  const admins = users.filter((u) => u.role.type === "admin").length;

  return {
    totalUsers: users.length,
    totalEnrollments: 24,
    totalCourses: 4,
    totalQuizzesPassed: 18,
    activeToday: 12,
    roleBreakdown: {
      students,
      instructors,
      contentManagers,
      admins,
    },
  };
}

/**
 * Fetch all users and available roles
 * Matches GET /api/admin-dashboard/users
 */
export async function getAdminUsers(token?: string): Promise<{ users: AdminUser[]; roles: AvailableRole[] }> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin-dashboard/users`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return {
        users: data.users || data.data?.users || getLocalUsers(),
        roles: data.roles || data.data?.roles || availableRoles,
      };
    }
  } catch {
    // fallback
  }

  return {
    users: getLocalUsers(),
    roles: availableRoles,
  };
}

/**
 * Change a user's role dynamically
 * Matches PUT /api/admin-dashboard/users/:id/role
 */
export async function changeUserRole(
  userId: number,
  roleId: number,
  token?: string
): Promise<{ success: boolean; user: AdminUser }> {
  const authToken = token || getAuthToken();

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin-dashboard/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({ roleId }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  const users = getLocalUsers();
  const targetRole = availableRoles.find((r) => r.id === roleId) || availableRoles[3];

  let updatedUser: AdminUser = users[0];
  const updatedUsers = users.map((u) => {
    if (u.id === userId) {
      updatedUser = { ...u, role: targetRole };
      return updatedUser;
    }
    return u;
  });

  saveLocalUsers(updatedUsers);
  return { success: true, user: updatedUser };
}
