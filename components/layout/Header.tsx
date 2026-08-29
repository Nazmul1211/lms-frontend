"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Learning Paths", href: "/courses" },
    { name: "Engineering Blog", href: "/blogs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-sm tracking-tight shadow-sm">
              EF
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                EduForge
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                PLATFORM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 pl-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search Bar + Theme Toggle + Auth CTAs */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Quick Search trigger */}
          <Link
            href="/courses"
            className="flex items-center gap-3 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors w-48 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Search...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500">
              ⌘K
            </kbd>
          </Link>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Sign In Link */}
          <Link
            href="/login"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors"
          >
            Sign In
          </Link>

          {/* Start Learning Primary CTA */}
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex justify-center items-center py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex justify-center items-center py-2.5 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-600 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
