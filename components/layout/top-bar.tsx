"use client";

import { ActionIcon, Text, TextInput } from "@mantine/core";
import { Bell, Menu, Search, X } from "lucide-react";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface DashboardTopBarProps {
  title?: string;
  searchPlaceholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onNotificationClick?: () => void;
  mobileSidebarOpen?: boolean;
  onMenuClick?: () => void;
  sidebarCollapsed?: boolean;
}

export function DashboardTopBar({
  title = "Dashboard",
  searchPlaceholder = "",
  className,
  value,
  onChange,
  onNotificationClick,
  mobileSidebarOpen = false,
  onMenuClick,
  sidebarCollapsed = false,
}: DashboardTopBarProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const routeSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const heading = routeSegment
    ? routeSegment.charAt(0).toUpperCase() + routeSegment.slice(1)
    : title;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-50 flex min-h-16 w-full items-center justify-between gap-3 border-b border-[#ececec] bg-white px-3 py-2 sm:px-6 lg:px-8",
        sidebarCollapsed ? "lg:left-[92px]" : "lg:left-[272px]",
        className,
      )}
      aria-label="Dashboard top bar"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="shrink-0 lg:hidden">
          <ActionIcon
            variant="subtle"
            aria-label={mobileSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileSidebarOpen}
            id="dashboard-menu-toggle"
            aria-controls="dashboard-navigation"
            ref={menuButtonRef}
            onClick={onMenuClick}
            size={44}
            radius="10px"
            className="border border-[#e5e7eb] bg-white text-[#1a1a1a] hover:bg-[#f3f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2"
          >
            {mobileSidebarOpen ? (
              <X size={22} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={2} aria-hidden="true" />
            )}
          </ActionIcon>
        </div>
        <Text
          component="h1"
          size="lg"
          fw={600}
          c="#1a1a1a"
          className="truncate tracking-[-0.32px]"
        >
          {heading}
        </Text>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <TextInput
          value={value}
          onChange={(event) => onChange?.(event.currentTarget.value)}
          placeholder={searchPlaceholder}
          aria-label="Search dashboard"
          leftSection={
            <Search size={20} strokeWidth={1.8} className="text-[#757575]" />
          }
          radius="10px"
          size="md"
          styles={{
            root: {
              width: "298px",
              maxWidth: "100%",
            },
            input: {
              border: "1px solid #f4f4f4",
              backgroundColor: "#ffffff",
              color: "#757575",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "-0.2px",
              minHeight: "48px",
              paddingLeft: "42px",
              paddingRight: "12px",
              borderRadius: "10px",
              boxShadow: "none",
            },
            section: {
              left: "14px",
              width: "20px",
              pointerEvents: "none",
            },
          }}
          classNames={{
            root: "hidden w-[298px] max-w-full min-[48em]:block",
            input:
              "placeholder:text-[#595959] focus:border-[#066f33] focus:ring-2 focus:ring-[#066f33]/20 focus-visible:outline-none",
          }}
        />

        <ActionIcon
          variant="subtle"
          aria-label="Open notifications"
          onClick={onNotificationClick}
          size={48}
          radius="10px"
          className="border border-[#e5e7eb] bg-white text-[#1a1a1a] transition-colors hover:bg-[#f6f6f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2"
        >
          <Bell size={24} strokeWidth={1.8} />
        </ActionIcon>
      </div>
    </header>
  );
}

export default DashboardTopBar;
