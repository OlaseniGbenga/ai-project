"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import ProtectedRoute from "@/components/auth/protected-route";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/layout/left-sidebar";
import DashboardTopBar from "@/components/layout/top-bar";

export default function Layout({ children }: { children: ReactNode }) {
  // const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const navigation = document.getElementById("dashboard-navigation");
    const getFocusableElements = () =>
      Array.from(
        navigation?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);

    getFocusableElements()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileSidebarOpen(false);
        document.getElementById("dashboard-menu-toggle")?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileSidebarOpen]);

  // Fetch fresh profile on every login session and sync to localStorage

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex min-h-screen bg-white">
          {/* Backdrop for mobile */}
          {mobileSidebarOpen && (
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 lg:hidden"
            />
          )}

          {/* Sidebar */}
          <aside
            id="dashboard-navigation"
            role={mobileSidebarOpen ? "dialog" : undefined}
            aria-modal={mobileSidebarOpen ? true : undefined}
            aria-label="Dashboard navigation"
            className={cn(
              "fixed inset-y-0 left-0 z-[110] flex flex-col border-r border-[#ececec] bg-[#fdfdfd] shadow-sm transition-transform duration-300",
              sidebarCollapsed ? "w-[92px]" : "w-[272px]",
              // Mobile: hidden by default, slide in when open
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
              // Desktop: always visible
              "lg:translate-x-0",
            )}
          >
            <DashboardSidebar
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </aside>

          {/* Main area */}
          <div
            className={cn(
              "flex min-h-screen w-full flex-col transition-all duration-300",
              sidebarCollapsed ? "lg:pl-[92px]" : "lg:pl-[272px]",
            )}
          >
            <DashboardTopBar
              mobileSidebarOpen={mobileSidebarOpen}
              sidebarCollapsed={sidebarCollapsed}
              onMenuClick={() => setMobileSidebarOpen((v) => !v)}
            />
            <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
