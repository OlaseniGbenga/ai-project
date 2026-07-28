"use client";

import { useRouter } from "next/navigation";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useForgotPassword } from "@/features/auth/hooks/useAuth";
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

function ResetPasswordForm() {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    forgotPassword(
      { email: values.email },
      {
        onSuccess: () => {
          localStorage.setItem("pendingPasswordResetEmail", values.email);
          notifications.show({
            title: "Reset email sent",
            message: "A password reset code has been sent to your email.",
            color: "brand.5",
          });
          router.push("/forgot-password/otp");
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
      <p className="font-bold text-[16px]">Input Email To Reset Password</p>
      <TextInput
        size="lg"
        label="Email"
        placeholder="example@email.com"
        {...form.getInputProps("email")}
        styles={inputStyles}
      />
      <Button
        type="submit"
        fullWidth
        loading={isPending}
        disabled={isPending}
        styles={PRIMARY_BUTTON_STYLE}
      >
        Send Code
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
