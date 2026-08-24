import type { LucideIcon } from "lucide-react";

export interface Certificate {
  recipientName: string;
  courseTitle: string;
  issuedDate: string;
  certificateId: string;
}

export interface CertificateMetaProps {
  label: string;
  value: string;
}

export type CertificatePreviewProps = Certificate;

export interface CertificateStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

// API shapes
export interface CertificateData {
  id: string;
  certificateId: string;
  holderName: string;
  trade: string;
  learningLevel: string;
  completionDate: string;
  issuedAt: string;
  verificationUrl: string;
  downloadUrl: string;
}

export interface CertificateResponse {
  data: CertificateData;
  timestamp: string;
}