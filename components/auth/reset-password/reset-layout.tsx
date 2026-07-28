"use client";

import AuthHeader from "@/features/auth/components/AuthHeader";
import { AUTH_FORM_MAX_WIDTH } from "@/features/auth/utils/auth.validations";

type ResetLayoutProps = {
  children: React.ReactNode;
};

export default function ResetLayout({ children }: ResetLayoutProps) {
  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        padding: "clamp(28px, 8vw, 48px) clamp(16px, 4vw, 24px)",
      }}
    >
      <AuthHeader />
      <div className="w-full" style={{ maxWidth: AUTH_FORM_MAX_WIDTH }}>
        {children}
      </div>
    </div>
  );
}
