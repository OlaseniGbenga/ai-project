"use client";

import { Stack, Text, Anchor, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthInput from "@/features/auth/components/AuthInput";
import AuthButton from "@/features/auth/components/AuthButton";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";
import { LoginFormValues } from "@/features/auth/types/auth.types";
import {
  AUTH_FORM_WIDTH,
  AUTH_FORM_MAX_WIDTH,
  validateEmail,
  validateLoginPassword,
} from "@/features/auth/utils/auth.validations";
import { useLogin } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: validateEmail,
      password: validateLoginPassword,
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        notifications.show({
          title: "Welcome back",
          message: "Login successful",
          color: "brand.5",
        });
        router.push("/courses");
      },
      onError: (err: Error) => {
        notifications.show({
          title: "Login failed",
          message: err.message,
          color: "red",
        });
      },
    });
  };

  return (
    <AuthPageWrapper>
      <Stack
        w={AUTH_FORM_WIDTH}
        maw={AUTH_FORM_MAX_WIDTH}
        px="md"
        gap={0}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack gap="xs">
          <AuthHeader />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xs">
              <AuthInput
                label="Email"
                placeholder="example@gmail.com"
                type="email"
                value={form.values.email}
                error={form.errors.email as string}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
              />
              <AuthInput
                label="Password"
                placeholder="$Password123"
                type="password"
                value={form.values.password}
                error={form.errors.password as string}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
              />
              <Anchor
                href="/forgot-password"
                c="brand.5"
                size="16px"
                fw={600}
              >
                Forgotten Password
              </Anchor>
              <AuthButton label="Log In" type="submit" loading={isPending} />
              <Text size="13px" ta="center" c="#000000">
                You don't have an account?{" "}
                <Anchor href="/register" c="brand.5" size="16px" fw={600}>
                  Sign up
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Stack>
        <Box pb="md" />
      </Stack>
    </AuthPageWrapper>
  );
}
