"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { ArrowLeft } from "lucide-react";
import { useForm } from "@mantine/form";
import { useResetPassword } from "@/features/auth/hooks/useAuth";
import AuthButton from "@/features/auth/components/AuthButton";
import AuthInput from "@/features/auth/components/AuthInput";

export default function ConfirmPasswordPage() {
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useResetPassword();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm({
    initialValues: { password: "", confirmPassword: "" },
    validate: {
      password: (v) =>
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
          ? null
          : "Min. 8 characters with letters, numbers & special characters",
      confirmPassword: (v, values) =>
        v === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    resetPassword(
      {
        resetToken: localStorage.getItem("resetToken") ?? "",
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => setShowSuccess(true),
        onError: (err: Error) => {
          notifications.show({ title: "Reset failed", message: err.message, color: "red" });
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
                Create new password
              </h1>
              <p className="text-[14px] leading-[1.55] text-[#777777] sm:text-[15px]">
                Your new password must be different from your previous one.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={form.onSubmit(handleSubmit)} className="w-full">
              <div className="mb-[12px]">
                <AuthInput
                  label=""
                  placeholder="New Password"
                  type="password"
                  value={form.values.password}
                  error={form.errors.password as string}
                  onChange={(e) => form.setFieldValue("password", e.currentTarget.value)}
                />
              </div>

              <div className="mb-[24px]">
                <AuthInput
                  label=""
                  placeholder="Confirm Password"
                  type="password"
                  value={form.values.confirmPassword}
                  error={form.errors.confirmPassword as string}
                  onChange={(e) => form.setFieldValue("confirmPassword", e.currentTarget.value)}
                />
              </div>

              <AuthButton label="Reset Password" type="submit" loading={isPending} />
            </form>

          </div>
        </section>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[480px] rounded-2xl bg-white px-10 py-12 text-center shadow-2xl">

            <h2 className="mb-3 font-serif text-[26px] font-medium leading-[1.2] tracking-[-0.3px] text-[#171717]">
              Password reset<br />successful.
            </h2>

            <p className="mb-10 text-[14px] leading-[1.6] text-[#888888] sm:text-[15px]">
              Your password has been updated successfully.<br />You can now sign in with your new password.
            </p>

            {/* Check circle */}
            <div className="mx-auto mb-10 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#f0f0f0]">
              <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] border-[#3caf4a]">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#3caf4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full rounded-full bg-[#3caf4a] py-[14px] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2ea040]"
            >
              Continue to Sign In
            </button>

          </div>
        </div>
      )}

    </main>
  );
}
