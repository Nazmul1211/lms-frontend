"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  BookOpen,
  Compass,
  FileText,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Learning Paths", href: "/courses#tracks", icon: Compass },
  { name: "Engineering Blog", href: "/blogs", icon: FileText },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 border-b",
        scrolled
          ? "border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-xs shadow-slate-900/5"
          : "border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            {/* Minimalist Geometric Emblem */}
            <div className="relative flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono font-bold text-sm tracking-tighter shadow-sm transition-transform duration-200 group-hover:scale-105">
              <span className="relative z-10 flex items-center justify-center">
                <span className="text-indigo-400 dark:text-indigo-600 font-black mr-0.5">E</span>F
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                EduForge
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150",
                    isActive
                      ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/80 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search trigger, Theme switch, Auth CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Trigger */}
          <Link
            href="/courses"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-md transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            <span className="pr-4">Search curriculum...</span>
            <kbd className="hidden lg:inline-flex items-center font-mono text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Actions */}
          <Link
            href="/login"
            className="px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-md shadow-xs transition-colors"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4">
          {/* Mobile Search */}
          <Link
            href="/courses"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md"
          >
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>Search courses & topics...</span>
          </Link>

          {/* Mobile Links */}
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Role Portals Shortcut for Mobile */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Portals
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <Link
                href="/student/dashboard"
                className="px-3 py-1.5 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Student Portal
              </Link>
              <Link
                href="/instructor/dashboard"
                className="px-3 py-1.5 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Instructor Studio
              </Link>
              <Link
                href="/manager/blogs"
                className="px-3 py-1.5 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Content Hub
              </Link>
              <Link
                href="/admin/dashboard"
                className="px-3 py-1.5 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Admin Center
              </Link>
            </div>
          </div>

          {/* Mobile Auth CTAs */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
            <Link
              href="/login"
              className="flex justify-center items-center py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex justify-center items-center py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-md transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
