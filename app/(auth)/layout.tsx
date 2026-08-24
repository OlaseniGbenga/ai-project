import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthProvider>
      <main className="auth-layout">{children}</main>
    </AuthProvider>
  );
}
