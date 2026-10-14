import { ChevronRight, LockKeyhole, Bell, ShieldCheck } from "lucide-react";
import UpdateProfileForm from "@/features/auth/components/UpdateProfileForm";

const profileOptions = [
  { label: "Update Password", detail: "Keep your account secure", icon: LockKeyhole, href: "#update-password" },
  { label: "Set Notifications", detail: "Choose what you hear from us", icon: Bell, href: "#set-notifications" },
  { label: "View Privacy Policy", detail: "Learn how we protect your data", icon: ShieldCheck, href: "#privacy-policy" },
];

function ProfilePage() {
  return (
    <section className="min-h-[calc(100vh-92px)] bg-[#f3f2f2] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-[920px]">
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#43ac47]">Account</p>
          <h2 className="text-[28px] font-semibold tracking-[-0.7px] text-[#1a1a1a]">Your profile</h2>
          <p className="mt-1 text-sm text-[#757575]">Manage your personal details and account preferences.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
          <UpdateProfileForm />

          <aside className="rounded-[14px] border border-[#edf0ed] bg-white p-5 shadow-[0_8px_24px_rgba(31,72,38,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#1a1a1a]">Account settings</h3>
                <p className="mt-1 text-xs text-[#909090]">Quick links</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecf8ee] text-[#43ac47]"><ShieldCheck size={18} strokeWidth={1.8} /></div>
            </div>
            <div className="flex flex-col gap-2">
              {profileOptions.map(({ label, detail, icon: Icon, href }) => (
                <a key={label} href={href} className="group flex items-center gap-3 rounded-[10px] border border-[#f0f0f0] p-3 transition-colors hover:border-[#cde8d0] hover:bg-[#f8fcf8] focus:outline-none focus:ring-2 focus:ring-[#066f33] focus:ring-offset-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#f3f7f3] text-[#52666d] group-hover:text-[#066f33]"><Icon size={17} strokeWidth={1.8} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#1a1a1a]">{label}</span><span className="mt-0.5 block text-xs text-[#909090]">{detail}</span></span>
                  <ChevronRight size={17} className="text-[#b0b0b0] transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
            <button type="button" className="mt-5 w-full rounded-[9px] border border-[#f1d6d6] py-2.5 text-sm font-semibold text-[#aa0000] transition-colors hover:bg-[#fff7f7] focus:outline-none focus:ring-2 focus:ring-[#aa0000] focus:ring-offset-2">Delete Account</button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
