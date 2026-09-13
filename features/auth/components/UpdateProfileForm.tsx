"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useUpdateProfile } from "@/features/auth/hooks/useAuth";
import { getMe } from "@/features/auth/services/auth.service";

export default function UpdateProfileForm() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Display name logic
  const displayFirst = firstName || data?.data.firstName || "";
  const displayLast = lastName || data?.data.lastName || "";

  const { mutate, isPending } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { firstName: displayFirst, lastName: displayLast },
      {
        onSuccess: () => {
          notifications.show({
            title: "Profile updated",
            message: "Your name has been saved successfully.",
            color: "green",
          });
          setOpen(false);
        },
        onError: () => {
          notifications.show({
            title: "Update failed",
            message: "Something went wrong. Please try again.",
            color: "red",
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-10 cursor-pointer items-center justify-between rounded-[8px] bg-[#e7e7e7] px-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#dddddd] focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
      >
        <span>Update Profile</span>
        <ChevronRight
          aria-hidden="true"
          strokeWidth={2}
          className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3 px-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-xs font-medium text-neutral-600">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={displayFirst}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isLoading}
              className="rounded-[8px] border border-neutral-300 bg-[#f3f2f2] px-3 py-2 text-sm text-neutral-900 outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700 disabled:opacity-50"
              placeholder="First name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-xs font-medium text-neutral-600">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={displayLast}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isLoading}
              className="rounded-[8px] border border-neutral-300 bg-[#f3f2f2] px-3 py-2 text-sm text-neutral-900 outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700 disabled:opacity-50"
              placeholder="Last name"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || isLoading}
            className="min-h-9 cursor-pointer rounded-[8px] bg-primary-700 px-4 text-sm font-bold text-white transition-colors hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 disabled:opacity-60"
          >
            {isPending ? "Saving…" : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}
