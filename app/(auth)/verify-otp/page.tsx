"use client";

import { useState, useEffect } from "react";
import { Stack, Text, Anchor, Box, Paper } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthProgress from "@/features/auth/components/AuthProgress";
import OtpInput from "@/features/auth/components/OtpInput";
import AuthButton from "@/features/auth/components/AuthButton";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";
import { AUTH_FORM_MAX_WIDTH } from "@/features/auth/utils/auth.validations";
import { EMERALD, ONBOARDING_CARD_STYLE } from "@/features/auth/utils/auth.theme";
import { useVerifyOtp, useResendOtp } from "@/features/auth/hooks/useAuth";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [resendReady, setResendReady] = useState(false);

  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("pendingEmail") ?? "")
      : "";

  const { mutate: verify, isPending: verifying } = useVerifyOtp();
  const { mutate: resend, isPending: resending } = useResendOtp();

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
            color: "green",
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
    if (otpValue.length < 6) return;

    verify(
      { email, otp: otpValue },
      {
        onSuccess: () => {
          notifications.show({
            title: "Email verified",
            message: "Email verified successfully",
            color: "green",
          });
          localStorage.removeItem("pendingEmail");
          setTimeout(() => {
            router.push("/onboarding/about-work");
          }, 100);
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
        w="100%"
        px="md"
        gap={0}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Box mb="sm" maw={AUTH_FORM_MAX_WIDTH} mx="auto" w="100%">
          <AuthHeader />
          <AuthProgress currentStep={2} totalSteps={6} />
        </Box>
        <Paper
          radius={24}
          p={{ base: "md", sm: "xl" }}
          bg="white"
          maw={AUTH_FORM_MAX_WIDTH}
          mx="auto"
          w="100%"
          style={ONBOARDING_CARD_STYLE}
        >
          <Text fw={700} size="20px" c="#000000" mb={4}>
            OTP Verification
          </Text>
          <Text size="13px" c={EMERALD[700]} mb="lg">
            Enter the 6-digit code sent to your email.
          </Text>
          <Stack gap="xs">
            <OtpInput value={otp} onChange={setOtp} />
            <Text size="13px" ta="center" c="#000000">
              Didn&apos;t receive any code?{" "}
              {resendReady ? (
                <Anchor
                  component="span"
                  c={EMERALD[700]}
                  fw={600}
                  size="14px"
                  onClick={handleResend}
                >
                  {resending ? "Sending..." : "Resend code"}
                </Anchor>
              ) : (
                <Text span size="14px" fw={600} c="#919191">
                  Resend code
                </Text>
              )}
            </Text>
            <Text ta="center" fw={600} c="#000000" pt={8}>
              0:{countdown < 10 ? `0${countdown}` : countdown}
            </Text>
            <AuthButton
              label="Continue"
              onClick={handleSubmit}
              loading={verifying}
            />
          </Stack>
        </Paper>
      </Stack>
    </AuthPageWrapper>
  );
}