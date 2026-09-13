"use client";
// import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/utils";
import { useState, type ReactNode } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { useQuery } from "@tanstack/react-query";
// import { getMe } from "@/features/auth/services/auth.service";
import ProtectedRoute from "@/components/auth/protected-route";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/layout/left-sidebar";
import DashboardTopBar from "@/components/layout/top-bar";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
  // const [opened, { toggle }] = useDisclosure();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [displayName, setDisplayName] = useState(getDisplayNameFromStorage);

  // Fetch fresh profile on every login session and sync to localStorage

  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppShell
          header={{ height: 0 }}
          navbar={{
            width: sidebarCollapsed ? 92 : 320,
            breakpoint: "",
          }}
          padding="md"
        >
          <AppShell.Navbar className="border-0 bg-[#fdfdfd]">
            <DashboardSidebar
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
            />
          </AppShell.Navbar>

          <AppShell.Main>
            <div>
              <DashboardTopBar className="mb-2" />
              {children}
            </div>
          </AppShell.Main>
        </AppShell>
      </ProtectedRoute>
    </AuthProvider>
  );
}
