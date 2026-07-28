"use client";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, NavLink, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

import ProtectedRoute from "@/components/auth/protected-route";

interface AuthLayoutProps {
  children: ReactNode;
}

function getDisplayNameFromStorage() {
  if (typeof window === "undefined") {
    return "User";
  }

  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return "User";
  }

  try {
    const user = JSON.parse(storedUser) as Partial<{
      name: string;
      fullName: string;
      firstName: string;
      lastName: string;
      email: string;
    }>;

    const fullName =
      user.name ||
      user.fullName ||
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.email;

    return fullName?.trim() || "User";
  } catch {
    return storedUser.trim() || "User";
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Layout({ children }: AuthLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const [displayName] = useState(getDisplayNameFromStorage);

  const data = [
    { label: "My Courses", href: "/courses" },
    { label: "Certificate", href: "/certificate" },
    { label: "Settings", href: "/settings" },
    // { label: "Profile", href: "/settings" },
  ];

  const pathname = usePathname();

  const initials = getInitials(displayName) || "U";

  return (
    <ProtectedRoute>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
        // withBorder={false}
        // bg="var(--color-secondary-gray)"
        // bg="blue"
      >
        <AppShell.Header>
          <Group
            h="100%"
            px="md"
            justify="space-between"
            className="flex justify-between"
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />

            <Link
              href="/settings"
              aria-label={`Open profile settings for ${displayName}`}
              title={displayName}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
            >
              {initials}
            </Link>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <div className="flex flex-col gap-4">
            {data.map((item) => {
              const active =
                item.href === "/courses"
                  ? ["/courses", "/quiz", "/practical-task"].some((path) =>
                      pathname.startsWith(path),
                    )
                  : pathname === item.href;

              return (
                <NavLink
                  key={item.href}
                  component={Link}
                  href={item.href}
                  label={item.label}
                  active={active}
                  styles={{
                    root: {
                      backgroundColor: active ? "var(--color-primary-700)" : "",
                      color: active ? "var(--color-white)" : "",
                      borderRadius: "10px",
                      fontWeight: active ? "bold" : "normal",
                    },
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-col  gap-4 mt-auto">
            <Button
              className={cn("btn btn-primary ")}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ProtectedRoute>
  );
}
