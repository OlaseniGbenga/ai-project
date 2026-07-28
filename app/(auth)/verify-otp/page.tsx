"use client";

import { useState, useEffect } from "react";
import { Stack, Text, Anchor, Box } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import AuthHeader from "@/features/auth/components/AuthHeader";
import OtpInput from "@/features/auth/components/OtpInput";
import AuthButton from "@/features/auth/components/AuthButton";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";
import {
  AUTH_FORM_WIDTH,
  AUTH_FORM_MAX_WIDTH,
} from "@/features/auth/utils/auth.validations";
import { EMERALD } from "@/features/auth/utils/auth.theme";
import {
  useVerifyOtp,
  useResendOtp,
  useLogin,
} from "@/features/auth/hooks/useAuth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [resendReady, setResendReady] = useState(false);

  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("pendingEmail") ?? "")
      : "";

  const password =
    typeof window !== "undefined"
      ? (localStorage.getItem("pendingPassword") ?? "")
      : "";

  const { mutate: verify, isPending: verifying } = useVerifyOtp();
  const { mutate: resend, isPending: resending } = useResendOtp();
  const { mutate: login } = useLogin();

  useEffect(() => {
    if (countdown === 0) {
      setResendReady(true);
      return;
    }
    const timer = setTimeout(
      () => setCountdown((previous) => previous - 1),
      1000,
    );
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    resend(
      { email },
      {
        onSuccess: () => {
          setCountdown(60);
          setResendReady(false);
          notifications.show({
            title: "OTP sent",
            message: `Your OTP has been sent to ${email.replace(/(.{2}).*(@.*)/, "$1***$2")}`,
            color: "brand.5",
          });
        },
        onError: (err: Error) => {
          notifications.show({
            title: "Failed to resend OTP",
            message: err.message,
            color: "red",
          });
        },
      },
    );
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      notifications.show({
        title: "Incomplete OTP",
        message: "Please enter all 6 digits.",
        color: "red",
      });
      return;
    }

    verify(
      { email, otp: otpValue },
      {
        onSuccess: () => {
          notifications.show({
            title: "Email verified",
            message: "Email verified successfully",
            color: "brand.5",
          });
          localStorage.removeItem("pendingEmail");

          login(
            { email, password },
            {
              onSuccess: () => {
                localStorage.removeItem("pendingPassword");
                setTimeout(() => {
                  router.replace("/onboarding/about-work");
                }, 100);
              },
              onError: () => {
                localStorage.removeItem("pendingPassword");
                setTimeout(() => {
                  router.replace("/onboarding/about-work");
                }, 100);
              },
            },
          );
        },
        onError: () => {
          notifications.show({
            title: "Verification failed",
            message: "Email verification failed, resend OTP and try again.",
            color: "red",
          });
        },
      },
    );
  };

  return (
    <AuthPageWrapper>
      <Stack
        w={AUTH_FORM_WIDTH}
        maw={AUTH_FORM_MAX_WIDTH}
        px="md"
        gap={0}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack gap="sm">
          <AuthHeader />
          <Stack gap={2} align="center">
            <Text fw={800} size="20px" c="#000000" ta="center">
              Verify your email
            </Text>
            <Text size="13px" c="#8E8E8E" ta="center">
              Enter the 6-digit code we sent to your inbox
            </Text>
          </Stack>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <OtpInput value={otp} onChange={setOtp} />
          </Box>
          <Stack gap={6} align="center">
            <Text size="13px" ta="center" c="#000000">
              Didn&apos;t receive any code?{" "}
              {resendReady ? (
                <Anchor
                  component="span"
                  fw={700}
                  size="13px"
                  onClick={handleResend}
                  style={{ color: EMERALD[700] }}
                >
                  {resending ? "Sending..." : "Resend code"}
                </Anchor>
              ) : (
                <Text span size="13px" fw={600} c="#919191">
                  Resend code
                </Text>
              )}
            </Text>
            <Text fw={600} size="13px" c="#919191" ta="center">
              0:{countdown < 10 ? `0${countdown}` : countdown}
            </Text>
          </Stack>
        </Stack>
        <Box pt="lg" pb="md">
          <AuthButton
            label="Continue"
            onClick={handleSubmit}
            loading={verifying}
          />
        </Box>
      </Stack>
    </AuthPageWrapper>
  );
}
