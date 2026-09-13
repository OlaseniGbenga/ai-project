"use client";

import { ActionIcon, Text, TextInput } from "@mantine/core";
import { Bell, Search } from "lucide-react";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";

interface DashboardTopBarProps {
  title?: string;
  searchPlaceholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onNotificationClick?: () => void;
}

export function DashboardTopBar({
  title = "Dashboard",
  searchPlaceholder = "Search by Name or company",
  className,
  value,
  onChange,
  onNotificationClick,
}: DashboardTopBarProps) {

  const pathname = usePathname();

  const segment = pathname.split("/").filter(Boolean)[0].charAt(0).toUpperCase() + pathname.split("/").filter(Boolean)[0].slice(1);



  return (
    <header
      className={cn(
        "flex w-full items-center justify-between border-b border-[#ececec] bg-white px-4 py-2 sm:px-6 lg:px-8",
        className,
      )}
      aria-label="Dashboard top bar"
    >
      <Text
        component="h1"
        size="lg"
        fw={400}
        c="#1a1a1a"
        className="tracking-[-0.32px]"
      >
        {segment}
      </Text>

      <div className="flex items-center gap-6">
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
            root: "w-[298px] max-w-full",
            input:
              "placeholder:text-[#757575] focus:border-[#066f33] focus:ring-2 focus:ring-[#066f33]/10",
          }}
        />

        <ActionIcon
          variant="subtle"
          aria-label="Open notifications"
          onClick={onNotificationClick}
          size={48}
          radius="10px"
          className="border border-[#f4f4f4] bg-white text-[#1a1a1a] transition-colors hover:bg-[#f6f6f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#066f33] focus-visible:ring-offset-2"
        >
          <Bell size={24} strokeWidth={1.8} />
        </ActionIcon>
      </div>
    </header>
  );
}

export default DashboardTopBar;
