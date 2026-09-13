import React from "react";

interface BaseEmailValues {
  email: string;
}

interface BasePasswordValues {
  password: string;
  confirmPassword: string;
}

export type RegisterStepOneValues = BaseEmailValues & BasePasswordValues;

export type RegisterFormValues = RegisterStepOneValues;

export interface LoginFormValues extends BaseEmailValues {
  password: string;
}

export type ForgotPasswordFormValues = BaseEmailValues;

export type ResetPasswordFormValues = BasePasswordValues;

export interface VerifyOtpPayload extends BaseEmailValues {
  otp: string;
}

export interface verifyOtpForgotPasswordPayload {
  otp: string;
}

export interface resetPasswordPayload {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthInputProps {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthButtonProps {
  label: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export interface AuthProgressProps {
  currentStep: number;
  totalSteps: number;
  mx?: string | number;
}

export interface AuthPageWrapperProps {
  children: React.ReactNode;
  showBack?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  isEmailVerified: boolean;
  isOnboardingComplete: boolean;
}

export interface RegisterResponse {
  data: {
    user: AuthUser & {
      createdAt: string;
      updatedAt: string;
    };
    message: string;
  };
  timestamp: string;
}

export interface LoginResponse {
  data: {
    message: string;
    accessToken: string;
    tokenType: string;
    expiresIn: string;
    user: AuthUser;
  };
  timestamp: string;
}

export interface MessageResponse {
  data: {
    message: string;
  };
  timestamp: string;
}

export interface verifyOtpForgotPasswordResponse {
  data: {
    resetToken: string;
  };
  timestamp: string;
}
