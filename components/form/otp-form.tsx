"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PinInput, Button, Anchor, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useResendOtp,
  useVerifyForgotPasswordOtp,
} from "@/features/auth/hooks/useAuth";
import { notifications } from "@mantine/notifications";
import {
  EMERALD,
  PRIMARY_BUTTON_STYLE,
} from "@/features/auth/utils/auth.theme";

function OTForm() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [resendReady, setResendReady] = useState(false);
  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("pendingPasswordResetEmail") ?? "")
      : "";
  const { mutate: resendOtp, isPending: resending } = useResendOtp();
  const { mutate: verifyOtp, isPending } = useVerifyForgotPasswordOtp();
  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) => (value.length === 6 ? null : "Invalid OTP"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    verifyOtp(
      { otp: values.otp },
      {
        onSuccess: (data) => {
          localStorage.setItem("resetToken", data.data.resetToken);
          notifications.show({
            title: "Otp Submited",
            message: "Your otp code has been submitted",
            color: "brand.5",
          });
          router.push("/forgot-password/confirm-password");
        },
        onError: (error: Error) => {
          notifications.show({
            title: "Request failed",
            message: error.message,
            color: "red",
          });
        },
      },
    );
  };

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
    if (!email) {
      notifications.show({
        title: "Email missing",
        message: "Please restart password reset from the email page.",
        color: "red",
      });
      router.push("/forgot-password");
      return;
    }

    resendOtp(
      { email },
      {
        onSuccess: () => {
          notifications.show({
            title: "OTP resent",
            message: "A new password reset code was sent to your email.",
            color: "brand.5",
          });
        },
        onError: (error: Error) => {
          notifications.show({
            title: "Request failed",
            message: error.message,
            color: "red",
          });
        },
      },
    );
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="space-y-5 w-full sm:w-101.5"
    >
      <p className="font-bold text-[16px]">Enter the code we sent you</p>
      <div className="flex flex-col items-center self-center gap-4 mb-4">
        <PinInput
          size="lg"
          name="pin"
          length={6}
          gap="md"
          oneTimeCode
          {...form.getInputProps("otp")}
          placeholder=""
          styles={{
            input: {
              borderColor: EMERALD[200],
              backgroundColor: "rgba(236, 253, 245, 0.6)",
              borderRadius: "12px",
              color: "#000000",
            },
          }}
        />

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
        <Text ta="center" fw={600} size="13px" c="#919191">
          0:{countdown < 10 ? `0${countdown}` : countdown}
        </Text>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={isPending}
        disabled={isPending}
        styles={PRIMARY_BUTTON_STYLE}
      >
        Continue
      </Button>
    </form>
  );
}

export default OTForm;
