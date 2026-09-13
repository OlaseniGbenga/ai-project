"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import AuthInput from "@/features/auth/components/AuthInput";
import AuthButton from "@/features/auth/components/AuthButton";
import { RegisterStepOneValues } from "@/features/auth/types/auth.types";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/features/auth/utils/auth.validations";
import { useRegister } from "@/features/auth/hooks/useAuth";
import { notifications } from "@mantine/notifications";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterStepOneValues>({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validateInputOnChange: true,
    validate: {
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
    },
  });

  const handleSubmit = (values: RegisterStepOneValues) => {
    register(values, {
      onSuccess: () => {
        localStorage.setItem("pendingEmail", values.email);
        localStorage.setItem("pendingPassword", values.password);
        router.push("/verify-otp");
      },
      onError: (error: Error & { status?: number }) => {
        if (error.status === 409) {
          notifications.show({
            title: "Email already exists",
            message: "Please log in with this email address.",
            color: "orange",
          });
          router.replace("/login");
          return;
        }

        notifications.show({
          title: "Registration failed",
          message: error.message,
          color: "red",
        });
      },
    });
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* LEFT IMAGE PANEL */}
        <div className="relative hidden min-h-screen w-[50%] overflow-hidden lg:block">
          <Image
            src="/left_image.png"
            alt="Professional at work"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/[0.03]" />
        </div>

        {/* RIGHT PANEL */}
        <section className="flex min-h-screen w-full items-start justify-center overflow-y-auto px-6 pt-16 pb-10 sm:px-10 lg:w-[45%] lg:px-14 lg:pt-24 xl:px-20">
          <div className="w-full max-w-[430px]">

            {/* TRUST BADGE + STEP CIRCLE */}
            <div className="mb-[18px] flex items-center justify-between">
              <div className="inline-flex items-center rounded-full border border-[#dcefe0] bg-[#f3faf4] px-[14px] py-[7px]">
                <span className="text-[12px] font-medium leading-none text-[#3caf4a]">
                  Trusted by professionals across Nigeria
                </span>
              </div>
              {/* 1/2 circle */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3caf4a" strokeWidth="2.5" strokeDasharray="50 100" strokeLinecap="round" />
                </svg>
                <span className="relative text-[11px] font-semibold text-[#171717]">1/2</span>
              </div>
            </div>

            {/* HEADING */}
            <div className="mb-[26px]">
              <h1 className="mb-[7px] font-serif text-[30px] font-medium leading-[1.15] tracking-[-0.5px] text-[#171717] sm:text-[32px]">
                Create your Cuniv<br />account
              </h1>
              <p className="max-w-[410px] text-[14px] leading-[1.55] text-[#777777] sm:text-[15px]">
                Set up your account and start discovering practical ways to use AI in your business.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={form.onSubmit(handleSubmit)} className="w-full">

              <div className="mb-[12px]">
                <AuthInput
                  label=""
                  placeholder="Enter your email"
                  type="email"
                  value={form.values.email}
                  error={form.errors.email as string}
                  onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
                />
              </div>

              <div className="mb-[4px]">
                <AuthInput
                  label=""
                  placeholder="Create Password"
                  type="password"
                  value={form.values.password}
                  error={form.errors.password as string}
                  onChange={(e) => form.setFieldValue("password", e.currentTarget.value)}
                />
              </div>
              <p className="mb-[12px] text-[12px] leading-none text-[#aaaaaa]">Min. 8 characters</p>

              <div className="mb-[13px]">
                <AuthInput
                  label=""
                  placeholder="Confirm Password"
                  type="password"
                  value={form.values.confirmPassword}
                  error={form.errors.confirmPassword as string}
                  onChange={(e) => form.setFieldValue("confirmPassword", e.currentTarget.value)}
                />
              </div>

              {/* REMEMBER ME */}
              <div className="mb-[24px]">
                <label className="flex cursor-pointer items-center gap-[6px]">
                  <input
                    type="checkbox"
                    className="h-[13px] w-[13px] cursor-pointer rounded-[3px] border-[#d7d7d7] accent-[#3caf4a]"
                  />
                  <span className="text-[13px] leading-none text-[#777777]">Remember me</span>
                </label>
              </div>

              <AuthButton label="Next" type="submit" loading={isPending} />

              {/* FOOTER */}
              <div className="mt-[15px] flex items-center justify-between">
                <p className="text-[13px] leading-none text-[#777777]">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-[#3caf4a] transition-opacity duration-200 hover:opacity-75 hover:underline">
                    Sign In
                  </Link>
                </p>

                <div className="flex items-center gap-[15px]">
                  {/* APPLE */}
                  {/* <button type="button" aria-label="Continue with Apple" className="flex h-[22px] w-[22px] items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-black" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </button> */}

                  {/* GOOGLE */}
                  {/* <button type="button" aria-label="Continue with Google" className="flex h-[22px] w-[22px] items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[15px] w-[15px]" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </button> */}
                </div>
              </div>

            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
