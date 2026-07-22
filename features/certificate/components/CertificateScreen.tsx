import { Award, CalendarDays, CheckCircle2 } from "lucide-react";
import { CertificateHeader } from "./CertificateHeader";
import { CertificatePreview } from "./CertificatePreview";
import { CertificateStatCard } from "./CertificateStatCard";
import type {
  Certificate,
  CertificateStatCardProps,
} from "../../auth/types/certificate.types";

const certificate: Certificate = {
  recipientName: "Anne GBENGA",
  courseTitle: "AI-Powered Learning Path",
  issuedDate: "July 21, 2026",
  certificateId: "SEG-AI-2026-001",
};

const certificateStats: CertificateStatCardProps[] = [
  {
    icon: Award,
    label: "Certificate",
    value: "Completed",
  },
  {
    icon: CheckCircle2,
    label: "Verification",
    value: "Valid",
  },
  {
    icon: CalendarDays,
    label: "Issued",
    value: certificate.issuedDate,
  },
];

export function CertificateScreen() {
  return (
    <section className="min-h-[calc(100vh-92px)] bg-[#f3f2f2] px-0 py-8 sm:px-2">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <CertificateHeader />

        <div className="grid gap-4 md:grid-cols-3">
          {certificateStats.map((item) => (
            <CertificateStatCard key={item.label} {...item} />
          ))}
        </div>

        <CertificatePreview {...certificate} />
      </div>
    </section>
  );
}