"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useCompleteOnboarding } from "@/features/auth/hooks/useOnboarding";
import { useUpdateProfile } from "@/features/auth/hooks/useAuth";
import {
  TRADE_ID_MAP,
  GOAL_ID_MAP,
  AI_USAGE_ENUM_MAP,
  TECH_COMFORT_ENUM_MAP,
  DAILY_TIME_ENUM_MAP,
} from "@/features/auth/types/onboarding.types";

const LEARNING_GOALS = [
  "Save time on tasks",
  "Better client communication",
  "Grow sales and marketing",
  "Understand AI generally",
  "Other",
];

const BIGGEST_CHALLENGES = [
  "Too technical",
  "Not enough time",
  "Not sure how it will help my business",
  "I don't know where / how to start learning",
  "Other",
];

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

export default function ComfortPacePage() {
  const router = useRouter();
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();

  const [dailyTime, setDailyTime] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [learningGoalOther, setLearningGoalOther] = useState("");
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [biggestChallengeOther, setBiggestChallengeOther] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const loading = isPending || isUpdatingProfile;

  const handleContinue = () => {
    if (!dailyTime) {
      notifications.show({ title: "Required", message: "Please select how long you can spend learning each day.", color: "red" });
      return;
    }
    if (!learningGoal) {
      notifications.show({ title: "Required", message: "Please select your learning goal.", color: "red" });
      return;
    }
    if (learningGoal === "Other" && !learningGoalOther.trim()) {
      notifications.show({ title: "Required", message: "Please specify your learning goal.", color: "red" });
      return;
    }
    if (!biggestChallenge) {
      notifications.show({ title: "Required", message: "Please select your biggest challenge.", color: "red" });
      return;
    }
    if (biggestChallenge === "Other" && !biggestChallengeOther.trim()) {
      notifications.show({ title: "Required", message: "Please specify your biggest challenge.", color: "red" });
      return;
    }

    const aboutWork = JSON.parse(localStorage.getItem("onboarding_about_work") ?? "{}");
    const comfortPace = JSON.parse(localStorage.getItem("onboarding_comfort_pace") ?? "{}");

    const tradeId = TRADE_ID_MAP[aboutWork.occupation] ?? TRADE_ID_MAP["other"];
    const goalId = GOAL_ID_MAP[learningGoal] ?? GOAL_ID_MAP["other"];
    const aiFamiliarityLevel = AI_USAGE_ENUM_MAP[aboutWork.aiUsage] ?? "OCCASIONALLY";
    const technologyComfortLevel = TECH_COMFORT_ENUM_MAP[comfortPace.techComfort] ?? "COMFORTABLE";

    const dailyLearningTime = DAILY_TIME_ENUM_MAP[dailyTime] ?? "TEN_MINUTES";

    const nameParts = (aboutWork.fullName ?? "").trim().split(/\s+/);
    const firstName = nameParts.shift() ?? "";
    const lastName = nameParts.join(" ") || firstName;

    updateProfile(
      { firstName, lastName },
      {
        onSuccess: () => {
          completeOnboarding(
            {
              fullName: aboutWork.fullName,
              tradeId,
              otherTrade: aboutWork.occupation === "other" ? aboutWork.occupationOther : undefined,
              aiFamiliarityLevel,
              technologyComfortLevel,
              dailyLearningTime,
              goalId,
              otherGoal: learningGoal === "Other" ? learningGoalOther : undefined,
              mainChallenge: biggestChallenge === "Other" ? biggestChallengeOther : biggestChallenge,
            },
            {
              onSuccess: () => {
                document.cookie = `onboardingCompleted=true; path=/; max-age=31536000; SameSite=Lax`;
                setShowSuccess(true);
              },
              onError: (err: Error) => {
                notifications.show({ title: "Onboarding failed", message: err.message, color: "red" });
              },
            },
          );
        },
        onError: (err: Error) => {
          notifications.show({ title: "Unable to save your name", message: err.message, color: "red" });
        },
      },
    );
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
            <div className="mb-6 flex items-center justify-between">
              <div className="inline-flex rounded-full border border-[#dcefe0] bg-[#f3faf4] px-[14px] py-[7px]">
                <span className="text-[12px] font-medium leading-none text-[#3caf4a]">Trusted by professionals across Nigeria</span>
              </div>
              {/* Circular progress 2/2 — full circle */}
              <div className="relative flex h-10 w-10 items-center justify-center" aria-label="Step 2 of 2">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="100 100" strokeLinecap="round" />
                </svg>
                <span className="relative text-[12px] font-semibold text-[#171717]">2/2</span>
              </div>
            </div>

            <div className="mb-7">
              <button
                type="button"
                onClick={() => router.push("/onboarding/about-work")}
                aria-label="Go back"
                className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#e4e4e4] text-[#777] transition hover:border-[#3caf4a] hover:text-[#3caf4a]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
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
                  {/* Daily time */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">How long can you spend learning each day?</label>
                    <Select placeholder="Select duration" options={["5 mins", "10 mins", "15 mins", "20 mins or more"]} value={dailyTime} onChange={setDailyTime} />
                  </div>

                  {/* Learning goal */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">Select your learning goal</label>
                    <Select placeholder="Save time on tasks" options={LEARNING_GOALS} value={learningGoal} onChange={setLearningGoal} />
                  </div>

                  {learningGoal === "Other" && (
                    <input
                      type="text"
                      placeholder="If other, please specify"
                      value={learningGoalOther}
                      onChange={(e) => setLearningGoalOther(e.target.value)}
                      className="w-full rounded-[8px] border border-[#e8e8e8] bg-[#f7f7f7] px-4 py-3 text-[13px] text-[#171717] placeholder-[#aaa] focus:border-[#3caf4a] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/10"
                    />
                  )}

                  {/* Biggest challenge */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium text-[#444]">Biggest challenge with learning AI</label>
                    <Select placeholder="Too technical" options={BIGGEST_CHALLENGES} value={biggestChallenge} onChange={setBiggestChallenge} />
                  </div>

                  {biggestChallenge === "Other" && (
                    <input
                      type="text"
                      placeholder="If other, please specify"
                      value={biggestChallengeOther}
                      onChange={(e) => setBiggestChallengeOther(e.target.value)}
                      className="w-full rounded-[8px] border border-[#e8e8e8] bg-[#f7f7f7] px-4 py-3 text-[13px] text-[#171717] placeholder-[#aaa] focus:border-[#3caf4a] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/10"
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={loading}
                  className="mt-6 h-[50px] w-full rounded-[8px] bg-[#3caf4a] px-5 text-[14px] font-semibold text-white transition hover:bg-[#329640] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/20 disabled:cursor-not-allowed disabled:bg-[#a8d9ad] cursor-pointer"
                >
                  {loading ? "Saving..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-[2px]">
          <div className="w-full max-w-[460px] rounded-[18px] bg-white px-6 py-9 text-center shadow-2xl sm:px-10 sm:py-11">
            <h2 className="mb-3 font-serif text-[23px] font-medium leading-[1.25] tracking-[-0.3px] text-[#171717] sm:text-[26px]">
              You have successfully completed
              <br />
              your onboarding.
            </h2>
            <p className="mx-auto mb-8 max-w-[390px] text-[14px] leading-[1.6] text-[#888888] sm:mb-9 sm:text-[15px]">
              Your Cuniv experience has been personalised based on your work,
              goals, and AI experience. You&apos;re ready to explore.
            </p>
            <div className="mx-auto mb-8 flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#f4f4f4]">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[3px] border-[#3caf4a]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push("/onboarding/learning-path")}
              className="h-[50px] w-full rounded-[8px] bg-[#3caf4a] px-5 text-[13px] font-semibold text-white transition hover:bg-[#329640] focus:outline-none focus:ring-2 focus:ring-[#3caf4a]/20 focus:ring-offset-2 cursor-pointer"
            >
              Continue to your learning path
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
