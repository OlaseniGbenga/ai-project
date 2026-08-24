import axiosInstance from "@/features/auth/services/axios.instance";
import type { CertificateResponse } from "@/features/auth/types/certificate.types";

export const getMyCertificate = async (): Promise<CertificateResponse> => {
  const response = await axiosInstance.get<CertificateResponse>("/certificates/me");
  return response.data;
};

export const generateCertificate = async (): Promise<CertificateResponse> => {
  const response = await axiosInstance.post<CertificateResponse>("/certificates");
  return response.data;
};

export const downloadCertificate = async (id: string): Promise<Blob> => {
  const response = await axiosInstance.get<Blob>(`/certificates/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
};
