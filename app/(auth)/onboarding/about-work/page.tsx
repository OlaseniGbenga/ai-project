"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { ChevronDown } from "lucide-react";

const OCCUPATIONS = [
  "Tailor / Fashion designer",
  "Mechanic / Auto technician",
  "Food vendor / Caterer",
  "Trader / Shop owner",
  "Artisan / Craftsperson",
  "Technician",
  "Other",
];

const AI_USAGE_OPTIONS = ["Never", "Occasionally", "Constantly"];
const TECH_COMFORT_OPTIONS = ["I need help", "I'm comfortable", "I'm very confident"];

const GREEN = "#3caf4a";

function Select({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[8px] border border-[#e8e8e8] bg-[#f7f7f7] px-4 py-3 text-[14px] text-[#171717] focus:border-[#3caf4a] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/10"
        style={{ color: value ? "#171717" : "#aaa" }}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aaa]" />
    </div>
  );
}

export default function AboutWorkPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occupationOther, setOccupationOther] = useState("");
  const [aiUsage, setAiUsage] = useState("");
  const [techComfort, setTechComfort] = useState("");

  const handleContinue = () => {
    if (!fullName.trim()) {
      notifications.show({ title: "Required", message: "Please enter your full name.", color: "red" });
      return;
    }
    if (!occupation) {
      notifications.show({ title: "Required", message: "Please select your occupation.", color: "red" });
      return;
    }
    if (occupation === "Other" && !occupationOther.trim()) {
      notifications.show({ title: "Required", message: "Please specify your occupation.", color: "red" });
      return;
    }
    if (!aiUsage) {
      notifications.show({ title: "Required", message: "Please select how often you use AI.", color: "red" });
      return;
    }
    if (!techComfort) {
      notifications.show({ title: "Required", message: "Please select your comfort level with technology.", color: "red" });
      return;
    }

    localStorage.setItem(
      "onboarding_about_work",
      JSON.stringify({ fullName, occupation: occupation === "Other" ? "other" : occupation, occupationOther, aiUsage }),
    );
    localStorage.setItem("onboarding_comfort_pace", JSON.stringify({ techComfort, dailyTime: "" }));
    router.push("/onboarding/comfort-pace");
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left image */}
        <div className="relative hidden min-h-screen w-1/2 overflow-hidden lg:block">
          <Image src="/left_image.png" alt="Professional" fill priority sizes="50vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/[0.03]" />
          <div className="absolute bottom-8 left-8 max-w-[250px] text-white drop-shadow-md xl:left-12">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/80">Your AI journey starts here</p>
          </div>
        </div>

        {/* Right form */}
        <section className="flex min-h-screen w-full items-start justify-center overflow-y-auto px-6 pt-16 pb-10 sm:px-10 lg:w-1/2 lg:px-14 lg:pt-24 xl:px-20">
          <div className="w-full max-w-[430px]">
            {/* Header row */}
            <div className="mb-8 flex items-center justify-between">
              <div className="inline-flex rounded-full border border-[#dcefe0] bg-[#f3faf4] px-[14px] py-[7px]">
                <span className="text-[12px] font-medium leading-none text-[#3caf4a]">Trusted by professionals across Nigeria</span>
              </div>
              {/* Circular progress 1/2 */}
              <div className="relative flex h-10 w-10 items-center justify-center" aria-label="Step 1 of 2">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="50 100" strokeLinecap="round" />
                </svg>
                <span className="relative text-[12px] font-semibold text-[#171717]">1/2</span>
              </div>
            </div>

            <div className="mb-7">
              <h1 className="mb-2 font-serif text-[31px] font-medium leading-[1.15] tracking-[-0.5px] text-[#171717] sm:text-[34px]">
                Let&apos;s personalise<br />your experience
              </h1>
              <p className="text-[14px] leading-[1.55] text-[#777]">
                We&apos;ll use your answers to recommend AI guidance and courses that fit your business.
              </p>
            </div>

            <div className="rounded-[14px] border border-[#edf0ed] bg-white p-2 shadow-[0_12px_36px_rgba(31,72,38,0.06)]">
              <div className="rounded-[10px] bg-[#fcfdfc] p-5 sm:p-6">
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your first and last name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-[8px] border border-[#e8e8e8] bg-[#f7f7f7] px-4 py-3 text-[13px] text-[#171717] placeholder-[#aaa] focus:border-[#3caf4a] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/10"
                    />
                  </div>

                  {/* Occupation */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">What do you do?</label>
                    <Select placeholder="select specific occupation" options={OCCUPATIONS} value={occupation} onChange={setOccupation} />
                  </div>

                  {/* Other occupation */}
                  {occupation === "Other" && (
                    <input
                      type="text"
                      placeholder="If other, please specify"
                      value={occupationOther}
                      onChange={(e) => setOccupationOther(e.target.value)}
                      className="w-full rounded-[8px] border border-[#e8e8e8] bg-[#f7f7f7] px-4 py-3 text-[13px] text-[#171717] placeholder-[#aaa] focus:border-[#3caf4a] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/10"
                    />
                  )}

                  {/* AI Usage */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">How often do you use AI</label>
                    <Select placeholder="Never" options={AI_USAGE_OPTIONS} value={aiUsage} onChange={setAiUsage} />
                  </div>

                  {/* Tech Comfort */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">How comfortable are you with technology?</label>
                    <Select placeholder="I need help" options={TECH_COMFORT_OPTIONS} value={techComfort} onChange={setTechComfort} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-6 h-[50px] w-full rounded-[8px] bg-[#3caf4a] px-5 text-[14px] font-semibold text-white transition hover:bg-[#329640] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/20 cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
