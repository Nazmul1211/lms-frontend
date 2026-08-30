"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAdminStats, getAdminUsers, changeUserRole } from "@/services/adminService";
import { AdminStats, AdminUser, AvailableRole } from "@/types/admin";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";
import UserRoleManagementTable from "@/components/admin/UserRoleManagementTable";
import RolePermissionsMatrix from "@/components/admin/RolePermissionsMatrix";
import { Shield, ShieldAlert, Users, Layers, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalEnrollments: 0,
    totalCourses: 0,
    totalQuizzesPassed: 0,
    activeToday: 0,
    roleBreakdown: {
      students: 0,
      instructors: 0,
      contentManagers: 0,
      admins: 0,
    },
  });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<AvailableRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const [statsData, userData] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
      ]);
      setStats(statsData);
      setUsers(userData.users);
      setRoles(userData.roles);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeRole = async (userId: number, roleId: number) => {
    await changeUserRole(userId, roleId);
    await loadData();
  };

  return (
    <div className="min-h-screen py-10 lg:py-14 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-900/60">
              <Shield className="h-3.5 w-3.5" />
              <span>Super Admin Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Admin Control Center — {user?.name || "System Admin"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Full platform oversight, system-wide analytics, user directory, and dynamic role assignment matrix.
            </p>
          </div>
        </div>

        {/* High-level Platform Metrics */}
        <AdminStatsGrid stats={stats} />

        {/* User Directory & Dynamic Role Assignment Matrix */}
        <UserRoleManagementTable
          users={users}
          roles={roles}
          onChangeRole={handleChangeRole}
        />

        {/* RBAC Permission Specification Matrix */}
        <RolePermissionsMatrix />

      </div>
    </div>
  );
}
