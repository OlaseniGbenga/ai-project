"use client";

import React from "react";
import { Box, Anchor } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthPageWrapperProps {
  children: React.ReactNode;
  showBack?: boolean;
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
  children,
  showBack = true,
}) => {
  const router = useRouter();

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "clamp(28px, 8vw, 48px) clamp(16px, 4vw, 24px)",
      }}
    >
      {showBack && (
        <Anchor
          c="#066F33"
          onClick={() => router.back()}
          style={{ position: "fixed", left: 16, top: 16, zIndex: 10 }}
        >
          <ArrowLeft size={24} />
        </Anchor>
      )}
      {children}
    </Box>
  );
};

export default AuthPageWrapper;
