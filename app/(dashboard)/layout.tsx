"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink,
  Avatar,
  Button,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

import ProtectedRoute from "@/components/auth/protected-route";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();

  const data = [
    { label: "My Courses", href: "/courses" },
    { label: "Certificate", href: "/certificate" },
    { label: "Settings", href: "/settings" },
    { label: "Profile", href: "/settings" },
  ];

  const pathname = usePathname();
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
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <div className="flex flex-col gap-4">
            {data.map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <NavLink
                  key={item.href}
                  component={Link}
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
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
