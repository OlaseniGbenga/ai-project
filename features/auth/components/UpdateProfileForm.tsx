"use client";

import { useState } from "react";
import { Check, Mail, Pencil, UserRound } from "lucide-react";
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

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const displayFirst = firstName ?? data?.data.firstName ?? "";
  const displayLast = lastName ?? data?.data.lastName ?? "";

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

  const fullName = `${displayFirst} ${displayLast}`.trim() || "Your name";
  const initials = `${displayFirst.charAt(0)}${displayLast.charAt(0)}`.toUpperCase() || "U";

  return (
    <div className="rounded-[14px] border border-[#edf0ed] bg-white p-5 shadow-[0_8px_24px_rgba(31,72,38,0.05)] sm:p-6">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f96eae] text-lg font-semibold text-white shadow-sm">{initials}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[#1a1a1a]">{fullName}</h3>
              <span className="flex items-center gap-1 rounded-full bg-[#ecf8ee] px-2 py-1 text-[10px] font-semibold text-[#43ac47]"><Check size={12} /> Active</span>
            </div>
            <p className="mt-1 text-sm text-[#909090]">Personal account</p>
          </div>
        </div>
        <button type="button" onClick={() => { setFirstName(null); setLastName(null); setOpen((value) => !value); }} aria-expanded={open} className="flex items-center gap-1.5 rounded-[8px] border border-[#e5e5e5] px-3 py-2 text-xs font-semibold text-[#52666d] transition-colors hover:border-[#066f33] hover:text-[#066f33] focus:outline-none focus:ring-2 focus:ring-[#066f33] focus:ring-offset-2"><Pencil size={14} /> {open ? "Close" : "Edit"}</button>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[10px] bg-[#f8faf8] p-3"><div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#909090]"><UserRound size={15} /> Full name</div><p className="text-sm font-semibold text-[#1a1a1a]">{fullName}</p></div>
        <div className="rounded-[10px] bg-[#f8faf8] p-3"><div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#909090]"><Mail size={15} /> Email address</div><p className="truncate text-sm font-semibold text-[#1a1a1a]">{data?.data.email || "Not available"}</p></div>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="border-t border-[#eeeeee] pt-5">
          <p className="mb-4 text-sm font-semibold text-[#1a1a1a]">Edit personal details</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs font-medium text-[#52666d]" htmlFor="firstName">First name<input id="firstName" type="text" value={displayFirst} onChange={(e) => setFirstName(e.target.value)} required disabled={isLoading} className="h-11 rounded-[9px] border border-[#e3e8e3] bg-[#fbfcfb] px-3 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-[#066f33] focus:ring-2 focus:ring-[#066f33]/10 disabled:opacity-50" placeholder="First name" /></label>
            <label className="flex flex-col gap-1.5 text-xs font-medium text-[#52666d]" htmlFor="lastName">Last name<input id="lastName" type="text" value={displayLast} onChange={(e) => setLastName(e.target.value)} required disabled={isLoading} className="h-11 rounded-[9px] border border-[#e3e8e3] bg-[#fbfcfb] px-3 text-sm text-[#1a1a1a] outline-none transition-colors focus:border-[#066f33] focus:ring-2 focus:ring-[#066f33]/10 disabled:opacity-50" placeholder="Last name" /></label>
          </div>
          <button type="submit" disabled={isPending || isLoading} className="mt-5 rounded-[9px] bg-[#066f33] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#055b2a] focus:outline-none focus:ring-2 focus:ring-[#066f33] focus:ring-offset-2 disabled:opacity-60">{isPending ? "Saving…" : "Save changes"}</button>
        </form>
      )}
    </div>
  );
}
