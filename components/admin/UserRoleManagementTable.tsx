"use client";

import React, { useState, useMemo } from "react";
import { AdminUser, AvailableRole } from "@/types/admin";
import { Search, X, Shield, CheckCircle2, User, Filter, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserRoleManagementTableProps {
  users: AdminUser[];
  roles: AvailableRole[];
  onChangeRole: (userId: number, roleId: number) => Promise<void>;
}

export default function UserRoleManagementTable({
  users,
  roles,
  onChangeRole,
}: UserRoleManagementTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== "all" && u.role.type !== roleFilter) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [users, roleFilter, searchQuery]);

  const handleRoleChange = async (userId: number, newRoleId: number, userName: string) => {
    setUpdatingUserId(userId);
    try {
      await onChangeRole(userId, newRoleId);
      const roleObj = roles.find((r) => r.id === newRoleId);
      setToastMessage(`Updated role for ${userName} to ${roleObj?.name || "New Role"}`);
      setTimeout(() => setToastMessage(null), 4000);
    } catch {
      alert("Failed to update role. Please try again.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const getRoleStyle = (type: string) => {
    switch (type) {
      case "admin":
        return "bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "content_manager":
        return "bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "instructor":
        return "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "student":
      default:
        return "bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden p-5 sm:p-6 space-y-4">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            User Directory & Dynamic Role Assignment Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Modify any user's role in real time. Changes take effect across API policies immediately.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, name, email..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Roles ({users.length})</option>
            <option value="student">Students</option>
            <option value="instructor">Instructors</option>
            <option value="content_manager">Content Managers</option>
            <option value="admin">Admins</option>
          </select>

        </div>
      </div>

      {/* Responsive Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="py-3 px-3">User</th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Current Role</th>
              <th className="py-3 px-3">Assign New Role</th>
              <th className="py-3 px-3">Joined Date</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/80 dark:hover:bg-[#131d33]/50 transition-colors"
              >
                {/* User Info */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-700 text-xs font-bold">
                          {user.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400">@{user.username}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                  {user.email}
                </td>

                {/* Current Role Badge */}
                <td className="py-3.5 px-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                      getRoleStyle(user.role.type)
                    )}
                  >
                    <Shield className="h-3 w-3" />
                    {user.role.name}
                  </span>
                </td>

                {/* Dynamic Role Change Dropdown */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={user.role.id}
                      disabled={updatingUserId === user.id}
                      onChange={(e) =>
                        handleRoleChange(user.id, Number(e.target.value), user.name)
                      }
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                    {updatingUserId === user.id && (
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
                    )}
                  </div>
                </td>

                {/* Joined Date */}
                <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                  {user.joinedAt}
                </td>

                {/* Status */}
                <td className="py-3.5 px-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/60">
                    <CheckCircle2 className="h-3 w-3" /> Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-10 text-center text-xs text-slate-400">
            No users found matching your search or role filter.
          </div>
        )}
      </div>

    </div>
  );
}
