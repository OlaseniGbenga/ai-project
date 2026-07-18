"use client";

import { useRouter } from "next/navigation";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useForgotPassword } from "@/features/auth/hooks/useAuth";
import { cn } from "@/utils";

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
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4 w-full  sm:w-101.5 ">
      <p className="font-bold text-[15px]">Input Email To Reset Password</p>
      <TextInput
        size="md"
        label="Email"
        placeholder="example@email.com"
        {...form.getInputProps("email")}
        classNames={{
          input: cn("input"),
        }}
      />

      <Button
        className={cn("btn btn-primary ")}
        type="submit"
        loading={isPending}
        disabled={isPending}
      >
        Send Code
      </Button>
      
    </form>
  );
}

export default ResetPasswordForm;
