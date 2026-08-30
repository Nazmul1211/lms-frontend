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
  getCurrentUserApi,
  getRoleType,
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

  // Rehydrate auth state on mount and sync fresh profile
  useEffect(() => {
    async function rehydrate() {
      try {
        const storedToken = getAuthToken();
        const storedUser = getStoredUser();

        if (storedToken) {
          setToken(storedToken);
          if (storedUser) {
            setUser(storedUser);
          }
          // Fetch latest profile from DB to guarantee role sync
          const freshUser = await getCurrentUserApi(storedToken);
          if (freshUser) {
            setUser(freshUser);
          }
        }
      } catch {
        // Ignore
      } finally {
        setIsLoading(false);
      }
    }
    rehydrate();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const data = await loginApi(credentials);
    setToken(data.jwt);
    let loggedUser = data.user;
    if (!loggedUser?.role) {
      const fresh = await getCurrentUserApi(data.jwt);
      if (fresh) loggedUser = fresh;
    }
    setUser(loggedUser);
    return { ...data, user: loggedUser };
  };

  const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const data = await registerApi(payload);
    setToken(data.jwt);
    let registeredUser = data.user;
    if (!registeredUser?.role) {
      const fresh = await getCurrentUserApi(data.jwt);
      if (fresh) registeredUser = fresh;
    }
    setUser(registeredUser);
    return { ...data, user: registeredUser };
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
    return getRoleType(user);
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
