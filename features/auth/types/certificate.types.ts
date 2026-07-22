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