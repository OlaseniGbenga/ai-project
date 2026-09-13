import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  forgotPassword,
  verifyOtpForgotPassword,
  resetPassword,
  updateUserProfile,
} from "@/features/auth/services/auth.service";
import {
  RegisterStepOneValues,
  LoginFormValues,
  VerifyOtpPayload,
  verifyOtpForgotPasswordPayload,
  resetPasswordPayload,
} from "@/features/auth/types/auth.types";
import { UpdateUserProfile } from "@/features/auth/types/user.types";
import { useAuth } from "@/contexts/AuthContext";

const TOKEN_MAX_AGE_SECONDS = 1800;
const ONBOARDING_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterStepOneValues) => registerUser(payload),
  });
};

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (payload: LoginFormValues) => loginUser(payload),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      login(data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=${TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
      document.cookie = `onboardingCompleted=${data.data.user.isOnboardingComplete}; path=/; max-age=${ONBOARDING_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: () => {
      document.cookie = `onboardingAccess=true; path=/; max-age=${TOKEN_MAX_AGE_SECONDS}; SameSite=Lax`;
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => resendOtp(payload),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => forgotPassword(payload),
  });
};

export const useVerifyForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: (payload: verifyOtpForgotPasswordPayload) =>
      verifyOtpForgotPassword(payload),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: resetPasswordPayload) => resetPassword(payload),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (payload: UpdateUserProfile) => updateUserProfile(payload),
    onSuccess: (_, variables) => {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...variables }),
        );
      }
    },
  });
};
