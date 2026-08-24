"use client";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, NavLink, Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { useState, useEffect, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/services/auth.service";
import ProtectedRoute from "@/components/auth/protected-route";
import { AuthProvider } from "@/contexts/AuthContext";

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
  const [displayName, setDisplayName] = useState(getDisplayNameFromStorage);

  // Fetch fresh profile on every login session and sync to localStorage
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (!meData?.data) return;
    const { firstName, lastName, ...rest } = meData.data;
    // Merge into stored user so name persists across refreshes
    const stored = JSON.parse(localStorage.getItem("user") ?? "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...stored, ...rest, firstName, lastName }),
    );
    const full = [firstName, lastName].filter(Boolean).join(" ");
    setDisplayName(full || stored.email || "User");
  }, [meData]);

  const data = [
    { label: "My Courses", href: "/courses" },
    { label: "Certificate", href: "/certificate" },
    { label: "Settings", href: "/settings" },
    // { label: "Profile", href: "/settings" },
  ];

  const pathname = usePathname();

  const initials = getInitials(displayName) || "U";

  return (
    <AuthProvider>
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
                        backgroundColor: active
                          ? "var(--color-primary-700)"
                          : "",
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
    </AuthProvider>
  );
}
