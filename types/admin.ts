import { RoleType } from "@/types/auth";

export interface AvailableRole {
  id: number;
  name: string;
  type: RoleType;
  description?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: AvailableRole;
  enrolledCoursesCount?: number;
  joinedAt: string;
  status: "active" | "suspended";
}

export interface AdminStats {
  totalUsers: number;
  totalEnrollments: number;
  totalCourses: number;
  totalQuizzesPassed: number;
  activeToday: number;
  roleBreakdown: {
    students: number;
    instructors: number;
    contentManagers: number;
    admins: number;
  };
}

export interface ChangeUserRolePayload {
  roleId: number;
}
