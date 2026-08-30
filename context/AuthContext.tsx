"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, RoleType, LoginCredentials, RegisterPayload, AuthResponse } from "@/types/auth";
import {
  getAuthToken,
  getStoredUser,
  loginApi,
  registerApi,
  socialLoginApi,
  removeAuthToken,
} from "@/services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: RoleType;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  loginWithSocial: (provider: "google" | "github") => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate auth state on mount
  useEffect(() => {
    try {
      const storedToken = getAuthToken();
      const storedUser = getStoredUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch {
      // Ignore SSR storage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const data = await loginApi(credentials);
    setToken(data.jwt);
    setUser(data.user);
    return data;
  };

  const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const data = await registerApi(payload);
    setToken(data.jwt);
    setUser(data.user);
    return data;
  };

  const loginWithSocial = async (provider: "google" | "github"): Promise<AuthResponse> => {
    const data = await socialLoginApi(provider);
    setToken(data.jwt);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    removeAuthToken();
    setToken(null);
    setUser(null);
  };

  // Helper to resolve role type cleanly
  const getRole = (): RoleType => {
    if (!user || !user.role) return "student";
    if (typeof user.role === "string") return user.role.toLowerCase() as RoleType;
    if (user.role.type) return user.role.type;
    const name = user.role.name?.toLowerCase() || "";
    if (name.includes("admin")) return "admin";
    if (name.includes("manager") || name.includes("content")) return "content_manager";
    if (name.includes("instructor")) return "instructor";
    return "student";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        role: getRole(),
        login,
        register,
        loginWithSocial,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
