"use client";

import { Stack, Text, Anchor, Group, Box, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { Info } from "lucide-react";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthProgress from "@/features/auth/components/AuthProgress";
import AuthInput from "@/features/auth/components/AuthInput";
import AuthButton from "@/features/auth/components/AuthButton";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";
import { RegisterFormValues } from "@/features/auth/types/auth.types";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  AUTH_FORM_MAX_WIDTH,
} from "@/features/auth/utils/auth.validations";
import { EMERALD, ONBOARDING_CARD_STYLE } from "@/features/auth/utils/auth.theme";
import { useRegister } from "@/features/auth/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
    },
  });

  const handleSubmit = (values: RegisterFormValues) => {
    register(values, {
      onSuccess: () => {
        localStorage.setItem("pendingEmail", values.email);
        notifications.show({
          title: "Account created",
          message: "Please verify your email address.",
          color: "green",
        });
        router.push("/verify-otp");
      },
      onError: (err: Error) => {
        if (err.message.toLowerCase().includes("exist")) {
          form.setErrors({
            email: "Email is already registered, try another",
          });
        } else {
          notifications.show({
            title: "Registration failed",
            message: err.message,
            color: "red",
          });
        }
      },
    });
  };

  return (
    <AuthPageWrapper>
      <Stack
        w="100%"
        px="md"
        gap={0}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Box mb="sm" maw={AUTH_FORM_MAX_WIDTH} mx="auto" w="100%">
          <AuthHeader />
          <AuthProgress currentStep={1} totalSteps={6} />
        </Box>
        <Paper
          radius={24}
          p={{ base: "md", sm: "xl" }}
          bg="white"
          maw={AUTH_FORM_MAX_WIDTH}
          mx="auto"
          w="100%"
          style={ONBOARDING_CARD_STYLE}
        >
          <Text fw={700} size="20px" c="#000000" mb={4}>
            Create your account
          </Text>
          <Text size="13px" c={EMERALD[700]} mb="lg">
            Start learning AI in a way that works for you.
          </Text>
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
              <Group gap={6} align="center">
                <Info size={14} color={EMERALD[700]} />
                <Text size="xs" c={EMERALD[700]}>
                  Code will be sent to your email for verification!
                </Text>
              </Group>
              <AuthInput
                label="Create Password"
                placeholder="$Password123"
                type="password"
                value={form.values.password}
                error={form.errors.password as string}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
              />
              <AuthInput
                label="Confirm New Password"
                placeholder="$Password123"
                type="password"
                value={form.values.confirmPassword}
                error={form.errors.confirmPassword as string}
                onChange={(event) =>
                  form.setFieldValue("confirmPassword", event.currentTarget.value)
                }
              />
              <AuthButton label="Continue" type="submit" loading={isPending} />
              <Text size="13px" ta="center" c="#000000">
                Already have an account?{" "}
                <Anchor href="/login" c={EMERALD[700]} size="14px" fw={600}>
                  Log in
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </AuthPageWrapper>
  );
}