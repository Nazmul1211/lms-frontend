"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { demoAccounts, getRoleType } from "@/services/authService";
import { Lock, Mail, ArrowRight, Eye, EyeOff, Shield, Sparkles, AlertCircle } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithSocial } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectByRole = (user: any) => {
    const roleType = getRoleType(user);
    let target = "/student/dashboard";
    if (roleType === "admin") {
      target = "/admin/dashboard";
    } else if (roleType === "content_manager") {
      target = "/manager/blogs";
    } else if (roleType === "instructor") {
      target = "/instructor/dashboard";
    }
    window.location.href = target;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in both identifier and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await login({ identifier, password });
      redirectByRole(res.user);
    } catch (err: any) {
      setError(err?.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginWithSocial(provider);
      redirectByRole(res.user);
    } catch {
      setError(`Failed to sign in with ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to autofill demo credentials
  const handleQuickDemo = (roleKey: keyof typeof demoAccounts) => {
    const acc = demoAccounts[roleKey];
    setIdentifier(acc.identifier);
    setPassword(acc.password);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-[#080c14] transition-colors">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-sm shadow-md shadow-indigo-600/20 mx-auto">
            EF
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your courses, quizzes, and learning dashboard.
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs font-medium text-rose-700 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaGoogle className="h-3.5 w-3.5 text-rose-500" />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaGithub className="h-3.5 w-3.5 text-slate-900 dark:text-white" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#0f172a] px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white py-3 text-sm font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In to Account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Role Demo Quick Switcher */}
          <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#131d33]/50 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-indigo-500" /> Demo Accounts
              </span>
              <span className="text-[10px] text-slate-400">Click to autofill</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("student")}
                className="px-2.5 py-1.5 text-left rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("instructor")}
                className="px-2.5 py-1.5 text-left rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                📹 Instructor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("content_manager")}
                className="px-2.5 py-1.5 text-left rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                ✍️ Content Mgr
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                className="px-2.5 py-1.5 text-left rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                🛡️ Super Admin
              </button>
            </div>
          </div>

          {/* Footer Register Link */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Create student account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
