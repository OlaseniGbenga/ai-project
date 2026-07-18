import axiosInstance from "./axios.instance";
import {
  RegisterFormValues,
  LoginFormValues,
  VerifyOtpPayload,
  RegisterResponse,
  LoginResponse,
  MessageResponse,
  verifyOtpForgotPasswordPayload,
  verifyOtpForgotPasswordResponse,
  resetPasswordPayload,
} from "@/features/auth/types/auth.types";

export const registerUser = async (
  payload: RegisterFormValues,
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    payload,
  );
  return response.data;
};

export const loginUser = async (
  payload: LoginFormValues,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    payload,
  );
  return response.data;
};

export const verifyOtp = async (
  payload: VerifyOtpPayload,
): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(
    "/auth/verify-otp",
    payload,
  );
  return response.data;
};

export const forgotPassword = async (payload: {
  email: string;
}): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(
    "/auth/forgot-password",
    payload,
  );
  return response.data;
};

export const resendOtp = async (payload: {
  email: string;
}): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(
    "/auth/resend-otp",
    payload,
  );
  return response.data;
};

export const verifyOtpForgotPassword = async (
  payload: verifyOtpForgotPasswordPayload,
): Promise<verifyOtpForgotPasswordResponse> => {
  const response = await axiosInstance.post<verifyOtpForgotPasswordResponse>(
    "/auth/validate-otp",
    payload,
  );
  return response.data;
};

export const resetPassword = async (
  payload: resetPasswordPayload,
): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(
    "/auth/reset-password",
    payload,
  );
  return response.data;
};
