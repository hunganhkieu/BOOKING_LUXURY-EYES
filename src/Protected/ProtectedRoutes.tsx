import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export interface User {
  role?: "admin" | "user";
}

export interface AuthRouteProps {
  children: ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const token = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user");

  const user: User | null = userStr ? JSON.parse(userStr) : null;

  if (token && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
