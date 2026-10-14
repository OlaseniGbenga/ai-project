"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActionIcon, Badge, Divider, Text } from "@mantine/core";
import {
  Award,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronsLeft,
  X,
  CircleHelp,
  Grid2x2,
  LogOut,
  Settings,
  UserRoundPen,
} from "lucide-react";
import { cn } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getMe } from "@/features/auth/services/auth.service";

type SidebarItem = {
  label: string;
  href: string;
  icon: ReactNode;
  isActive?: (pathname: string) => boolean;
};

const mainMenuItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Grid2x2 size={20} strokeWidth={1.8} />,
    isActive: (pathname) =>
      pathname === "/" || pathname.startsWith("/dashboard"),
  },
  {
    label: "Courses",
    href: "/courses",
    icon: <BookOpen size={20} strokeWidth={1.8} />,
    isActive: (pathname) => pathname.startsWith("/courses"),
  },
  {
    label: "Certificates",
    href: "/certificate",
    icon: <Award size={20} strokeWidth={1.8} />,
    isActive: (pathname) => pathname.startsWith("/certificate"),
  },
  {
    label: "Help & Support",
    href: "/help-support",
    icon: <CircleHelp size={20} strokeWidth={1.8} />,
    isActive: (pathname) => pathname.startsWith("/help-support"),
  },
];

const accountItems: SidebarItem[] = [
  // {
  //   label: "Profile",
  //   href: "/profile",
  //   icon: <UserRoundPen size={20} strokeWidth={1.8} />,
  //   isActive: (pathname) =>
  //     pathname === "/profile" || pathname.startsWith("/profile"),
  // },
  // {
  //   label: "Notifications",
  //   href: "/notifications",
  //   icon: <Bell size={20} strokeWidth={1.8} />,
  //   isActive: (pathname) =>
  //     pathname === "/notifications" || pathname.startsWith("/notifications"),
  // },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings size={20} strokeWidth={1.8} />,
    isActive: (pathname) => pathname.startsWith("/settings"),
  },
  {
    label: "Log Out",
    href: "/login",
    icon: <LogOut size={20} strokeWidth={1.8} />,
    isActive: () => false,
  },
];

function SidebarSectionHeader({ children }: { children: ReactNode }) {
  return (
    <Text
      component="p"
      size="xs"
      fw={500}
      tt="uppercase"
      c="#595959"
      className="tracking-[0.12em]"
    >
      {children}
    </Text>
  );
}

function SidebarNavItem({
  item,
  active,
  onNavigate,
}: {
  item: SidebarItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const { logout } = useAuth();

  const content = (
    <>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center text-[#52666d] transition-colors duration-200",
          active && "text-[#082a35]",
        )}
      >
        {item.icon}
      </span>
      <Text
        component="span"
        size="sm"
        fw={active ? 500 : 400}
        className={cn(
          "leading-[1.4] whitespace-nowrap text-[16px]",
          active ? "text-[#082a35]" : "text-[#3f535a]",
        )}
      >
        {item.label}
      </Text>
    </>
  );

  if (item.label === "Log Out") {
    return (
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-[10px] rounded-[10px] p-[12px] text-left transition-colors duration-200 hover:bg-[#f3f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2",
          active && "bg-[#dfece8]",
        )}
        aria-label="Log out"
        onClick={() => {
          onNavigate?.();
          logout();
        }}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "flex w-full items-center gap-[10px] rounded-[10px] p-[12px] transition-colors duration-200 hover:bg-[#f3f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2",
        active && "bg-[#dfece8]",
      )}
    >
      {content}
    </Link>
  );
}

export function DashboardSidebar({
  className,
  collapsed = false,
  onToggleCollapse,
  onClose,
}: {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    getMe()
      .then(({ data }) => {
        const first = data.firstName ?? "";
        const last = data.lastName ?? "";
        setDisplayName(`${first} ${last}`.trim());
        setInitials(`${first.charAt(0)}${last.charAt(0)}`.toUpperCase());
      })
      .catch(() => {});
  }, [isAuthenticated]);

  if (collapsed) {
    return (
      <aside
        className={cn(
          " flex h-full w-full max-w-[92px] flex-col items-center bg-[#fdfdfd] px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#d9d9d9] scrollbar-thumb-rounded-lg",
          className,
        )}
        aria-label="Collapsed dashboard navigation sidebar"
      >
        <ActionIcon
          variant="subtle"
          color="gray"
          radius="sm"
          size={32}
          aria-label="Expand sidebar"
          onClick={onToggleCollapse}
          className="bg-[#f4f4f4] text-[#1a1a1a] hover:bg-[#ececec]"
        >
          <ChevronsLeft size={20} strokeWidth={1.8} className="rotate-180" />
        </ActionIcon>

        <Divider my={"30px"} color="#e7e7e7" w={60} />

        <div className="mt-6 flex w-full flex-col items-center gap-5">
          <p className="tracking-[0.12em] text-[8px] uppercase text-[#52666d]">
            Main menu
          </p>

          <div className="flex w-full flex-col items-center gap-3">
            {mainMenuItems.map((item) => {
              const active = item.isActive ? item.isActive(pathname) : false;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-[10px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2",
                    active
                      ? "bg-[#dfece8] text-[#082a35]"
                      : "text-[#52666d] hover:bg-[#f3f4f5]",
                  )}
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-5">
          <p className="tracking-[0.12em] text-[8px] uppercase text-[#52666d]">
            Accounts
          </p>

          <div className="flex w-full flex-col items-center gap-3">
            {accountItems.map((item) => {
              const active = item.isActive ? item.isActive(pathname) : false;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-[10px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2",
                    active
                      ? "bg-[#dfece8] text-[#082a35]"
                      : "text-[#52666d] hover:bg-[#f3f4f5]",
                  )}
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex w-full flex-col items-center gap-3 pb-2">
          <Divider my="md" color="#e7e7e7" w={60} />
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f96eae] text-[12.98px] font-semibold text-[#f9fafb]">
            {initials}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full w-full max-w-[272px] flex-col bg-[#fdfdfd] pl-6 pt-6 pb-3 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#d9d9d9] scrollbar-thumb-rounded-lg",
        className,
      )}
      aria-label="Dashboard navigation sidebar"
    >
      {/* Mobile header: logo + close button */}
      <div className="flex w-full items-center justify-between pr-4 lg:hidden">
        <span className="pl-1 text-[15px] font-bold tracking-tight text-[#082a35]">
          CUNIV-AI
        </span>
        <ActionIcon
          variant="subtle"
          radius="sm"
          size={36}
          aria-label="Close navigation menu"
          onClick={onClose}
          className="text-[#52666d] hover:bg-[#f3f4f5] hover:text-[#1a1a1a]"
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </ActionIcon>
      </div>

      {/* Desktop header: logo + collapse button */}
      <div className="hidden w-full items-center justify-between pr-4 lg:flex">
        <span className="pl-1 text-[15px] font-bold tracking-tight text-[#082a35]">
          CUNIV-AI
        </span>
        <button
          type="button"
          aria-label="Collapse sidebar"
          onClick={onToggleCollapse}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#52666d] transition-colors hover:bg-[#f3f4f5] hover:text-[#082a35]"
        >
          <ChevronsLeft size={16} strokeWidth={2} />
        </button>
      </div>

      <Divider my={"20px"} color="#e7e7e7" />

      <nav className="flex flex-col gap-3" aria-label="Main menu">
        <SidebarSectionHeader>Main menu</SidebarSectionHeader>
        <div className="flex flex-col gap-1">
          {mainMenuItems.map((item) => {
            const active = item.isActive ? item.isActive(pathname) : false;
            return (
              <SidebarNavItem
                key={item.label}
                item={item}
                active={active}
                onNavigate={onClose}
              />
            );
          })}
        </div>
      </nav>

      <nav className="mt-8 flex flex-col gap-3" aria-label="Account menu">
        <SidebarSectionHeader>Accounts</SidebarSectionHeader>
        <div className="flex flex-col gap-1">
          {accountItems.map((item) => {
            const active = item.isActive ? item.isActive(pathname) : false;
            return (
              <SidebarNavItem
                key={item.label}
                item={item}
                active={active}
                onNavigate={onClose}
              />
            );
          })}
        </div>
      </nav>

      <Divider my="sm" color="#e7e7e7" />

      <div className="flex w-full items-center justify-between rounded-[10px] bg-[#fdfdfd] px-1 py-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f96eae] text-[12.98px] font-semibold text-[#f9fafb]">
            {initials}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Text
                component="span"
                size="sm"
                fw={500}
                c="#1a1a1a"
                className="tracking-[-0.2px]"
              >
                {displayName}
              </Text>

              <Badge
                variant="light"
                color="green"
                radius="sm"
                size="sm"
                className="border-0 bg-[#dfece8] px-2 py-0.5 text-[10px] font-semibold text-[#43ac47]"
              >
                Basic
              </Badge>
            </div>
            <Link
              href="/settings"
              onClick={onClose}
              className="text-[13px] text-[#595959] transition-colors hover:text-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2"
            >
              Upgrade
            </Link>
          </div>
        </div>

        <ActionIcon
          variant="subtle"
          size={24}
          aria-label="Account menu"
          className="text-[#1a1a1a] hover:bg-[#f4f4f4]"
        >
          <ChevronDown size={18} strokeWidth={2} />
        </ActionIcon>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
