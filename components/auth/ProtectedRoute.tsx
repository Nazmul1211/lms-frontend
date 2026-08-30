"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RoleType } from "@/types/auth";
import { ShieldAlert, ArrowLeft, LogIn, Lock, Sparkles, RefreshCw } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: RoleType[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  // Show loading spinner while rehydrating auth state
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-xs font-semibold">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 sm:p-10 text-center max-w-md space-y-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 mx-auto">
            <Lock className="h-7 w-7" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Authentication Required
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              You must be signed in to access this portal. Sign in with your account or use a 1-click demo account.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/login";
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              Sign In to Continue
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Signed in, but role is unauthorized for this route
  const isAuthorized = allowedRoles.includes(role);

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-[#0f172a] p-8 sm:p-10 text-center max-w-lg space-y-6 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 mx-auto">
            <ShieldAlert className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900/60">
              Access Restricted — 4-Role RBAC Policy
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white pt-1">
              Permission Denied
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your current account has the role{" "}
              <strong className="text-slate-900 dark:text-white uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {role}
              </strong>
              , but this portal requires:{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                {allowedRoles.join(" or ")}
              </strong>
              .
            </p>
          </div>

          {/* Quick Demo Switcher Hint for Evaluators */}
          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#131d33]/50 text-xs text-slate-600 dark:text-slate-400 text-left space-y-2">
            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> Need to test this role?
            </p>
            <p className="text-[11px] leading-relaxed">
              Head to the login page and use the 1-click role switcher to sign in as an authorized user.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Switch Account / Role
            </Link>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
