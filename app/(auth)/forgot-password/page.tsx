"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { ArrowLeft } from "lucide-react";
import { useForgotPassword } from "@/features/auth/hooks/useAuth";
import AuthButton from "@/features/auth/components/AuthButton";
import AuthInput from "@/features/auth/components/AuthInput";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Invalid email address"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    forgotPassword(
      { email: values.email },
      {
        onSuccess: () => {
          localStorage.setItem("pendingPasswordResetEmail", values.email);
          router.push("/forgot-password/otp");
        },
        onError: (err: Error) => {
          notifications.show({ title: "Request failed", message: err.message, color: "red" });
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
                Forgot Password?
              </h1>
              <p className="text-[14px] leading-[1.55] text-[#777777] sm:text-[15px]">
                Enter your email and we&apos;ll send you a reset code.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={form.onSubmit(handleSubmit)} className="w-full">
              <div className="mb-[24px]">
                <AuthInput
                  label=""
                  placeholder="Email"
                  type="email"
                  value={form.values.email}
                  error={form.errors.email as string}
                  onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
                />
              </div>

              <AuthButton label="Send Code" type="submit" loading={isPending} />

              <div className="mt-[15px] text-center">
                <p className="text-[13px] text-[#777777]">
                  Remember your password?{" "}
                  <Link href="/login" className="font-medium text-[#3caf4a] hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>

          </div>
        </section>
      </div>
    </main>
  );
}
