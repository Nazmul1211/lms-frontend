"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", durationMs = 3500) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, durationMs);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Toast Notification Stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4">
        {toasts.map((toast) => {
          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border text-xs font-semibold animate-in slide-in-from-bottom duration-200 transition-all",
                toast.type === "success" &&
                  "bg-emerald-50 dark:bg-[#0b1f16] border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200",
                toast.type === "error" &&
                  "bg-rose-50 dark:bg-[#1f0b0e] border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200",
                toast.type === "warning" &&
                  "bg-amber-50 dark:bg-[#1f160b] border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200",
                toast.type === "info" &&
                  "bg-indigo-50 dark:bg-[#0f1426] border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200"
              )}
            >
              <div className="flex items-center gap-2.5">
                {toast.type === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                {toast.type === "error" && <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />}
                {toast.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />}
                {toast.type === "info" && <Info className="h-4 w-4 text-indigo-600 shrink-0" />}
                <span>{toast.message}</span>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
