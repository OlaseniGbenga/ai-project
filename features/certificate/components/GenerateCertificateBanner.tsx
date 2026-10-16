"use client";

import { Award, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
  generateCertificate,
  getMyCertificate,
} from "@/features/certificate/services/certificate.service";
import { getMe } from "@/features/auth/services/auth.service";

export default function GenerateCertificateBanner() {
  const router = useRouter();

  const { data: existing, isLoading: checking } = useQuery({
    queryKey: ["certificate-me"],
    queryFn: getMyCertificate,
    retry: false,
  });

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const { mutate: generate, isPending } = useMutation({
    mutationFn: generateCertificate,
    onSuccess: () => {
      notifications.show({
        title: "Certificate generated!",
        message: "Your certificate is ready to view.",
        color: "green",
      });
      router.push("/certificate");
    },
    onError: (err: Error) => {
      notifications.show({
        title: "Could not generate certificate",
        message:
          err.message ??
          "Ensure all lessons, quizzes and tasks are completed.",
        color: "red",
      });
    },
  });

  if (checking || loadingProfile) return null;

  const hasName = !!(profile?.data.firstName?.trim() && profile?.data.lastName?.trim());

  // Already has certificate 
  if (existing?.data) {
    return (
      <div className="flex items-center justify-between rounded-[12px] border border-primary-700 bg-primary-50 px-5 py-4 mb-2">
        <div className="flex items-center gap-3">
          <Award className="h-5 w-5 shrink-0 text-primary-700" />
          <p className="text-sm font-semibold text-primary-700">
            You already have a certificate for this course.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/certificate")}
          className="ml-4 shrink-0 rounded-[8px] cursor-pointer bg-primary-700 px-4 py-2 text-xs font-bold text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
        >
          View Certificate
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-primary-700 bg-primary-50 px-5 py-4">
      <div className="flex items-center gap-3">
        <Award className="h-5 w-5 shrink-0 text-primary-700" />
        <p className="text-sm font-semibold text-primary-700">
          Congratulations! You&apos;ve completed this course.
        </p>
      </div>

      {!hasName ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-primary-700">
            Your certificate requires your full name. Please update your profile first.
          </p>
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[8px] bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={isPending}
          onClick={() => generate()}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[8px] bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 disabled:opacity-50"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "Generating…" : "Generate Certificate"}
        </button>
      )}
    </div>
  );
}
