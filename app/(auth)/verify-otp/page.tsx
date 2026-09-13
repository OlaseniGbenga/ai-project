"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import OtpInput from "@/features/auth/components/OtpInput";
import {
  useVerifyOtp,
  useResendOtp,
  useLogin,
} from "@/features/auth/hooks/useAuth";

const GREEN = "#3caf4a";
const RESEND_SECONDS = 60;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedStorage, setCheckedStorage] = useState(false);
  const resendReady = secondsLeft <= 0;
  const deadlineRef = useRef<number | null>(null);

  const maskedEmail = email.length > 2
    ? `${email.slice(0, 2)}***${email.slice(email.indexOf("@"))}`
    : email;

  const { mutate: verify, isPending: verifying } = useVerifyOtp();
  const { mutate: resend, isPending: resending } = useResendOtp();
  const { mutate: login } = useLogin();

  // Load pending signup data; bail out if it's missing.
  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingEmail") ?? "";
    const storedPassword = localStorage.getItem("pendingPassword") ?? "";
    if (!storedEmail || !storedPassword) {
      router.replace("/signup");
      return;
    }
    // Hydrate client-only signup state from localStorage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(storedEmail);
    setPassword(storedPassword);
    setCheckedStorage(true);

    if (localStorage.getItem("pendingResendOtp") === "true") {
      localStorage.removeItem("pendingResendOtp");
      resend(
        { email: storedEmail },
        {
          onSuccess: () =>
            notifications.show({
              title: "OTP sent",
              message: "A verification code has been sent to your email.",
              color: "brand.5",
            }),
          onError: (err: Error) =>
            notifications.show({
              title: "Failed to send OTP",
              message: err.message,
              color: "red",
            }),
        },
      );
    }
  }, [resend, router]);

  // Drift-free countdown based on a fixed deadline.
  useEffect(() => {
    deadlineRef.current ??= Date.now() + RESEND_SECONDS * 1000;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil((deadlineRef.current! - Date.now()) / 1000),
      );
      setSecondsLeft(remaining);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResend = () => {
    if (resending || !resendReady) return;
    resend(
      { email },
      {
        onSuccess: () => {
          deadlineRef.current = Date.now() + RESEND_SECONDS * 1000;
          setSecondsLeft(RESEND_SECONDS);
          notifications.show({
            title: "OTP sent",
            message: `Your OTP has been sent to ${maskedEmail}`,
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

  const submitOtp = (otpValue: string) => {
    if (otpValue.length < 6 || verifying) return;

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
                router.replace("/onboarding/about-work");
              },
              onError: () => {
                localStorage.removeItem("pendingPassword");
                notifications.show({
                  title: "Signed up, but login failed",
                  message: "Your email is verified — please log in to continue.",
                  color: "red",
                });
                router.replace("/login");
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

  // Auto-submit as soon as all 6 digits are present.
  useEffect(() => {
    const value = otp.join("");
    if (value.length === 6) submitOtp(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  if (!checkedStorage) return null; 

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <div className="relative hidden min-h-screen w-1/2 overflow-hidden lg:block">
          <Image
            src="/left_image.png"
            alt="Professional at work"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/[0.03]" />
          <div className="absolute bottom-8 left-8 max-w-[250px] text-white drop-shadow-md xl:left-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              Your AI journey starts here
            </p>
          </div>
        </div>

<section className="flex min-h-screen w-full items-start justify-center overflow-y-auto px-6 pt-16 pb-10 sm:px-10 lg:w-1/2 lg:px-14 lg:pt-24 xl:px-20">          <div className="w-full max-w-[430px]">
            <div className="mb-6 flex items-center justify-between">
              <div className="inline-flex rounded-full border border-[#dcefe0] bg-[#f3faf4] px-[14px] py-[7px]">
                <span className="text-[10px] font-medium leading-none text-[#3caf4a]">
                  Trusted by professionals across Nigeria
                </span>
              </div>
              <div
                className="relative flex h-10 w-10 items-center justify-center"
                aria-label="Step 1 of 2"
              >
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={GREEN} strokeWidth="2.5"
                    strokeDasharray="50 100" strokeLinecap="round"
                  />
                </svg>
                <span className="relative text-[11px] font-semibold text-[#171717]">1/2</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#e4e4e4] text-[#777] transition hover:border-[#3caf4a] hover:text-[#3caf4a]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <h1 className="mb-2 font-serif text-[31px] font-medium leading-[1.15] tracking-[-0.5px] text-[#171717] sm:text-[34px]">
                Verify your email
              </h1>
              <p className="text-[12px] leading-[1.55] text-[#777]">
                Enter the 6-digit code we sent to{" "}
                <span className="font-medium text-[#171717]">{maskedEmail}</span>.
              </p>
            </div>

            <div className="rounded-[14px] border border-[#edf0ed] bg-white p-2 shadow-[0_12px_36px_rgba(31,72,38,0.06)]">
              <div className="rounded-[10px] bg-[#fcfdfc] p-5 sm:p-6">
                <div className="mb-5 rounded-[8px] border border-[#e7f0e7] bg-[#f4faf4] px-4 py-3 text-center text-[11px] leading-[1.5] text-[#5c6b5e]">
                  Check your inbox and enter the verification code below.
                </div>

                <OtpInput value={otp} onChange={setOtp} />

                <div
                  className="mt-2 text-center text-[11px] text-[#777]"
                  aria-live="polite"
                >
                  Didn&apos;t receive a code?{" "}
                  {resendReady ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resending}
                      className="font-semibold text-[#3caf4a] hover:underline disabled:cursor-not-allowed disabled:text-[#a8d9ad]"
                    >
                      {resending ? "Sending..." : "Resend code"}
                    </button>
                  ) : (
                    <span className="font-semibold text-[#999]">
                      Resend in 0:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => submitOtp(otp.join(""))}
                  disabled={verifying || otp.join("").length < 6}
                  className="mt-6 h-[50px] w-full rounded-[8px] bg-[#3caf4a] px-5 text-[13px] font-semibold text-white transition hover:bg-[#329640] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/20 disabled:cursor-not-allowed disabled:bg-[#a8d9ad]"
                >
                  {verifying ? "Verifying..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}