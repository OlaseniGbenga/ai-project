import React from "react";
import { Stack, Text } from "@mantine/core";

type ResetLayoutProps = {
  children: React.ReactNode;
};

export default function ResetLayout({ children }: ResetLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full px-4">
      <Text fw={800} size="32px" c="#066F33">
        CUNIV AI
      </Text>
      <Text size="16px" py={2} c="#8E8E8E">
        Learn, apply, grow
      </Text>
      {children}
    </div>
    // </div>
  );
}
