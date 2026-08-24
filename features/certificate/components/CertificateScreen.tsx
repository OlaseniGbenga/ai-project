"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { FileX2, Loader2 } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { CertificateHeader } from "./CertificateHeader";
import { CertificatePreview } from "./CertificatePreview";
import {
  getMyCertificate,
  downloadCertificate,
} from "@/features/certificate/services/certificate.service";
import type { CertificateData } from "@/features/auth/types/certificate.types";
import Link from "next/link";

export function CertificateScreen() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["certificate-me"],
    queryFn: getMyCertificate,
    retry: false,
  });

  const certificate = data?.data ?? null;

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: () => downloadCertificate(certificate!.id),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${certificate!.certificateId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    },
    onError: () => {
      notifications.show({
        title: "Download failed",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    },
  });

  // isloading
  if (isLoading) {
    return (
      <section className="flex min-h-[calc(100vh-92px)] items-center justify-center bg-[#f3f2f2]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-700" />
      </section>
    );
  }

  // ── 404 / no certificate yet ─────────────────────────────────────────────
  const is404 =
    isError &&
    (error as { response?: { status?: number } })?.response?.status === 404;

  if (is404 || (!isLoading && !certificate)) {
    return (
      <section className="flex min-h-[calc(100vh-92px)] items-center justify-center bg-[#f3f2f2] px-4">
        <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-[16px] bg-white px-8 py-12 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
            <FileX2 className="h-8 w-8 text-primary-700" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-neutral-900">
              No Certificate Yet
            </h2>
            <p className="text-sm leading-6 text-neutral-500">
              Complete all your lessons, quizzes and practical tasks. A generate
              button will appear at the end of your course.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex h-10 w-full items-center justify-center rounded-[10px] bg-primary-700 px-6 text-sm font-bold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
          >
            Go to My Courses
          </Link>
        </div>
      </section>
    );
  }

  // Certificate exists
  return (
    <section className="min-h-[calc(100vh-92px)] bg-[#f3f2f2] px-0 py-8 sm:px-2">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <CertificateHeader
          onDownload={() => download()}
          isDownloading={isDownloading}
        />
        <CertificatePreview
          certificateId={certificate!.certificateId}
          holderName={certificate!.holderName}
          trade={certificate!.trade}
          completionDate={certificate!.completionDate}
          issuedAt={certificate!.issuedAt}
        />
      </div>
    </section>
  );
}
