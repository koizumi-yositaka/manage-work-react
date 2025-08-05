// src/auth.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginApi, verifyTokenApi, type User } from "./utils/login";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Validate token with your API
      verifyTokenApi(token)
        .then((userData) => {
          if (userData) {
            console.log("userData", userData);
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("auth-token");
          }
        })
        .catch(() => {
          localStorage.removeItem("auth-token");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  const hasRole = (role: string) => {
    return user?.roles.includes(role) ?? false;
  };

  const hasAnyRole = (roles: string[]) => {
    return roles.some((role) => user?.roles.includes(role)) ?? false;
  };

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions: string[]) => {
    return (
      permissions.some((permission) =>
        user?.permissions.includes(permission)
      ) ?? false
    );
  };

  const login = async (username: string, password: string) => {
    // Replace with your authentication logic
    const response = await loginApi({ username, password });

    if (response) {
      setUser(response.user);
      setIsAuthenticated(true);
      // Store token for persistence
      localStorage.setItem("auth-token", response.token);
    } else {
      throw new Error("Authentication failed");
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
