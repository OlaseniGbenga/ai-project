import { ChevronRight } from "lucide-react";

const settingsOptions = [
  {
    label: "Update Password",
    href: "#update-password",
  },
  {
    label: "Set Notifications",
    href: "#set-notifications",
  },
  {
    label: "View Privacy Policy",
    href: "#privacy-policy",
  },
];

function Page() {
  return (
    <section className="min-h-[calc(100vh-92px)] bg-[#f3f2f2] px-0 py-8 sm:px-2">
      <div className="w-full max-w-[640px] rounded-[10px] bg-white px-6 py-7 shadow-sm">
        <div className="flex flex-col gap-4">
          {settingsOptions.map((option) => (
            <a
              key={option.label}
              href={option.href}
              className="flex min-h-10 items-center justify-between rounded-[8px] bg-[#e7e7e7] px-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#dddddd] focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
            >
              <span>{option.label}</span>
              <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
            </a>
          ))}

          <button
            type="button"
            className="mt-2 min-h-9 rounded-[8px] bg-[#aa0000] px-4 text-sm font-bold text-white transition-colors hover:bg-[#8f0000] focus:outline-none focus:ring-2 focus:ring-[#aa0000] focus:ring-offset-2"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}

export default Page;