"use client";

import { useState } from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { cn } from "@/utils";
import { useResetPassword } from "@/features/auth/hooks/useAuth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

function ConfirmPasswordForm() {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      password1: "",
      password2: "",
    },

    validate: {
      password1: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      password2: (value, values) => {
        if (value.length < 6) {
          return "Password must be at least 6 characters";
        }

        if (value !== values.password1) {
          return "Passwords do not match";
        }

        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    resetPassword(
      {
        resetToken: localStorage.getItem("resetToken") ?? "",
        newPassword: values.password1,
        confirmPassword: values.password2,
      },

      {
        onSuccess: () => {
          notifications.show({
            title: "Password Reset Successful",
            message: "Your password has been reset successfully",
            color: "brand.5",
          });
          router.push("/login");
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
      className="space-y-4 w-full  sm:w-101.5"
    >
      <p className="font-bold text-[15px]">Create new password</p>
      <PasswordInput
        label="New Password"
        type="password"
        placeholder="Enter new password"
        {...form.getInputProps("password1")}
        classNames={{
          input: cn("input"),
        }}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm new password"
        {...form.getInputProps("password2")}
        classNames={{
          input: cn("input"),
        }}
      />

      <Button
        className={cn("btn btn-primary")}
        type="submit"
        loading={isPending}
        disabled={isPending}
      >
        Create password
      </Button>
    </form>
  );
}

export default ConfirmPasswordForm;
