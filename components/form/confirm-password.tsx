"use client";

import { PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useResetPassword } from "@/features/auth/hooks/useAuth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
  EMERALD,
  PRIMARY_BUTTON_STYLE,
} from "@/features/auth/utils/auth.theme";

const inputStyles = {
  label: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "8px",
    color: EMERALD[900],
  },
  input: {
    backgroundColor: "rgba(236, 253, 245, 0.6)",
    borderColor: EMERALD[200],
    borderRadius: "12px",
    height: "52px",
    fontSize: "16px",
    color: "#000000",
  },
};

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
      className="space-y-5 w-full sm:w-101.5"
    >
      <p className="font-bold text-[16px]">Create new password</p>
      <PasswordInput
        label="New Password"
        placeholder="Enter new password"
        {...form.getInputProps("password1")}
        styles={inputStyles}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm new password"
        {...form.getInputProps("password2")}
        styles={inputStyles}
      />
      <Button
        type="submit"
        fullWidth
        loading={isPending}
        disabled={isPending}
        styles={PRIMARY_BUTTON_STYLE}
      >
        Create password
      </Button>
    </form>
  );
}

export default ConfirmPasswordForm;
