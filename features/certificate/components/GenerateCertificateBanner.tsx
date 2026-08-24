"use client";

import { useState } from "react";
import { Award, Loader2, UserPen } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
  generateCertificate,
  getMyCertificate,
} from "@/features/certificate/services/certificate.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function hasName(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    return !!(user.firstName?.trim() && user.lastName?.trim());
  } catch {
    return false;
  }
}

export default function GenerateCertificateBanner() {
  const router = useRouter();
  const nameReady = hasName();

  // Check if certificate already exists
  const { data: existing, isLoading: checking } = useQuery({
    queryKey: ["certificate-me"],
    queryFn: getMyCertificate,
    retry: false,
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

  if (checking) return null;

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

      {!nameReady && (
        <div className="flex items-start gap-2 rounded-[8px] border border-amber-200 bg-amber-50 px-3 py-2">
          <UserPen className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-xs leading-5 text-amber-800">
            Your certificate needs your full name.{" "}
            <Link
              href="/settings"
              className="font-semibold underline underline-offset-2 hover:text-amber-900"
            >
              Update your profile
            </Link>{" "}
            first.
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={!nameReady || isPending}
        onClick={() => generate()}
        className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[8px] bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Generating…" : "Generate Certificate"}
      </button>
    </div>
  );
}
