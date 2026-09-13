"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { ArrowLeft } from "lucide-react";
import { PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResendOtp, useVerifyForgotPasswordOtp } from "@/features/auth/hooks/useAuth";
import AuthButton from "@/features/auth/components/AuthButton";

export default function ForgotPasswordOtpPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [email, setEmail] = useState("");

  const { mutate: resendOtp, isPending: resending } = useResendOtp();
  const { mutate: verifyOtp, isPending } = useVerifyForgotPasswordOtp();

  const form = useForm({
    initialValues: { otp: "" },
    validate: { otp: (v) => (v.length === 6 ? null : "Enter the 6-digit code") },
  });

  useEffect(() => {
    const timer = setTimeout(
      () => setEmail(localStorage.getItem("pendingPasswordResetEmail") ?? ""),
      0,
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) { return; }
    const t = setTimeout(() => setCountdown((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSubmit = (values: typeof form.values) => {
    verifyOtp(
      { otp: values.otp },
      {
        onSuccess: (data) => {
          localStorage.setItem("resetToken", data.data.resetToken);
          router.push("/forgot-password/confirm-password");
        },
        onError: (err: Error) => {
          notifications.show({ title: "Invalid code", message: err.message, color: "red" });
        },
      },
    );
  };

  const handleResend = () => {
    if (!email) {
      notifications.show({
        title: "Email missing",
        message: "Please restart the password reset process.",
        color: "red",
      });
      router.push("/forgot-password");
      return;
    }

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setCountdown(60);
          notifications.show({ title: "Code resent", message: "A new code was sent to your email.", color: "green" });
        },
        onError: (err: Error) => {
          notifications.show({ title: "Failed", message: err.message, color: "red" });
        },
      },
    );
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* LEFT IMAGE */}
        <div className="relative hidden min-h-screen w-1/2 overflow-hidden lg:block">
          <Image src="/left_image.png" alt="Professional at work" fill priority sizes="50vw" className="object-cover object-[center_center]" />
          <div className="absolute inset-0 bg-black/[0.03]" />
        </div>

        {/* RIGHT PANEL */}
        <section className="flex min-h-screen w-full items-center justify-center bg-white px-6 py-12 sm:px-10 lg:w-1/2 lg:px-12 xl:px-16">
          <div className="w-full max-w-[430px]">

            {/* BACK */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-[32px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#e8e8e8] text-[#777777] transition-colors duration-200 hover:border-[#3caf4a] hover:text-[#3caf4a]"
            >
              <ArrowLeft className="h-[15px] w-[15px]" />
            </button>

            {/* HEADING */}
            <div className="mb-[26px]">
              <h1 className="mb-[7px] font-serif text-[30px] font-medium leading-[1.15] tracking-[-0.5px] text-[#171717] sm:text-[32px]">
                Check your email
              </h1>
              <p className="text-[14px] leading-[1.55] text-[#777777] sm:text-[15px]">
                We sent a 6-digit code to <span className="font-medium text-[#171717]">{email}</span>
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={form.onSubmit(handleSubmit)} className="w-full">
              <div className="mb-[24px] flex flex-col items-center gap-4">
                <PinInput
                  size="lg"
                  length={6}
                  gap="sm"
                  oneTimeCode
                  {...form.getInputProps("otp")}
                  placeholder=""
                  styles={{
                    input: {
                      borderColor: "#e8e8e8",
                      backgroundColor: "#fafafa",
                      borderRadius: "12px",
                      color: "#171717",
                      fontSize: "18px",
                    },
                  }}
                />
                {form.errors.otp && (
                  <p className="text-[12px] text-red-500">{form.errors.otp}</p>
                )}

                <p className="text-[13px] text-[#777777]">
                  Didn&apos;t receive a code?{" "}
                  {countdown === 0 ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-medium text-[#3caf4a] hover:underline disabled:opacity-50"
                      disabled={resending}
                    >
                      {resending ? "Sending…" : "Resend code"}
                    </button>
                  ) : (
                    <span className="text-[#aaaaaa]">
                      Resend in 0:{countdown < 10 ? `0${countdown}` : countdown}
                    </span>
                  )}
                </p>
              </div>

              <AuthButton label="Continue" type="submit" loading={isPending} />
            </form>

          </div>
        </section>
      </div>
    </main>
  );
}
