"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { notifications } from "@mantine/notifications";

import { useRegister } from "@/features/auth/hooks/useAuth";

const GREEN = "#3caf4a";

const OCCUPATIONS = [
  "Tailor / Fashion designer",
  "Mechanic / Auto technician",
  "Food vendor / Caterer",
  "Trader / Shop owner",
  "Artisan / Craftsperson",
  "Technician",
  "Other",
];

const AI_USAGE_OPTIONS = [
  "Never",
  "Occasionally",
  "Constantly",
];

const TECH_COMFORT_OPTIONS = [
  "I need help",
  "I'm comfortable",
  "I'm very confident",
];

/* =====================================================
   SHARED FIELD STYLES
   Matches the screenshot: flat light-gray fill, no
   visible border at rest, border + white bg on focus.
===================================================== */
const inputCls = `
  w-full
  rounded-[8px]
  border
  border-transparent
  bg-[#f5f5f5]
  px-[14px]
  py-[13px]
  text-[14px]
  text-[#171717]
  outline-none
  transition-all
  duration-200
  placeholder:text-[#999999]
  focus:border-[#3caf4a]
  focus:bg-white
  focus:ring-2
  focus:ring-[#3caf4a]/10
`;

const selectCls = `
  w-full
  appearance-none
  rounded-[8px]
  border
  border-transparent
  bg-[#f5f5f5]
  px-[14px]
  py-[13px]
  pr-[38px]
  text-[14px]
  text-[#171717]
  outline-none
  transition-all
  duration-200
  focus:border-[#3caf4a]
  focus:bg-white
  focus:ring-2
  focus:ring-[#3caf4a]/10
`;

const labelCls = `
  mb-[4px]
  block
  text-[12px]
  font-medium
  leading-none
  text-[#555555]
`;

export default function PersonalisePage() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [otherOccupation, setOtherOccupation] = useState("");
  const [aiUsage, setAiUsage] = useState("");
  const [techComfort, setTechComfort] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleContinue = () => {
    const email = localStorage.getItem("pendingEmail") ?? "";
    const password = localStorage.getItem("pendingPassword") ?? "";

    localStorage.setItem(
      "personalise",
      JSON.stringify({
        fullName,
        occupation,
        otherOccupation,
        aiUsage,
        techComfort,
      }),
    );

    register(
      {
        email,
        password,
        confirmPassword: password,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
        },

        onError: (err: Error) => {
          notifications.show({
            title: "Registration failed",
            message: err.message,
            color: "red",
          });
        },
      },
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#fafbf9]">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* =====================================================
            LEFT IMAGE PANEL
        ===================================================== */}
        <div className="relative hidden min-h-screen w-1/2 overflow-hidden bg-[#e8f0e8] lg:block">
          <Image
            src="/register_left_image.png"
            alt="Professional using phone"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/[0.03]" />
          <div className="absolute bottom-8 left-8 max-w-[250px] text-white drop-shadow-md xl:left-12">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              Your AI journey starts here
            </p>
            {/* <p className="font-serif text-[24px] leading-[1.15]">
              Built around the way you work.
            </p> */}
          </div>
        </div>

        {/* =====================================================
            RIGHT PANEL
        ===================================================== */}
        <section
          className="
            flex
            min-h-screen
            w-full
            items-start
            justify-center
            bg-white
            overflow-y-auto
            px-6
            py-8
            sm:px-10
            sm:py-10
            lg:w-[54%]
            lg:items-center
            lg:px-14
            lg:py-12
            xl:px-20
          "
        >
          <div className="relative w-full max-w-[440px]">

            {/* =================================================
                PROGRESS INDICATOR
            ================================================= */}
            <div
              className="
                absolute
                right-0
                top-0
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
              "
              aria-label="Step 2 of 2"
            >
              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 36 36"
              >
                {/* Background circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2.3"
                />

                {/* Progress circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="2.3"
                  strokeDasharray="100 100"
                  strokeLinecap="round"
                />
              </svg>

              <span className="relative text-[10px] font-semibold text-[#171717]">
                2/2
              </span>
            </div>

            {/* =================================================
                BACK BUTTON
            ================================================= */}
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="
                mb-[22px]
                flex
                h-[34px]
                w-[34px]
                items-center
                justify-center
                rounded-full
                border
                border-[#e4e4e4]
                text-[#777777]
                transition-all
                duration-200
                hover:border-[#3caf4a]
                hover:text-[#3caf4a]
                active:scale-95
              "
            >
              <ArrowLeft className="h-[15px] w-[15px]" />
            </button>

            {/* =================================================
                HEADING
            ================================================= */}
            <div className="mb-[24px]">
              <h1
                className="
                  mb-[9px]
                  font-serif
                  text-[30px]
                  font-medium
                  leading-[1.15]
                  tracking-[-0.5px]
                  text-[#171717]
                  sm:text-[33px]
                "
              >
                Let&apos;s personalise
                <br />
                your experience
              </h1>

              <p
                className="
                  max-w-[400px]
                  text-[14px]
                  leading-[1.55]
                  text-[#777777]
                  sm:text-[15px]
                "
              >
                We&apos;ll use your answers to recommend AI guidance and
                courses that fit your business.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================= */}
            <div className="rounded-[14px] border border-[#edf0ed] bg-white p-1 shadow-[0_12px_36px_rgba(31,72,38,0.06)] sm:p-2">
              <div className="flex flex-col gap-[14px] rounded-[10px] bg-[#fcfdfc] p-4 sm:p-5">

              {/* -------------------------------------------------
                  FULL NAME
              ------------------------------------------------- */}
              <div>
                <label htmlFor="fullName" className={labelCls}>
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your first and last name"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  className={`${inputCls} bg-[#f3f6f3]`}
                />
              </div>

              {/* -------------------------------------------------
                  OCCUPATION
              ------------------------------------------------- */}
              <div>
                <label htmlFor="occupation" className={labelCls}>
                  What do you do?
                </label>

                <div className="relative">
                  <select
                    id="occupation"
                    value={occupation}
                    onChange={(event) =>
                      setOccupation(event.target.value)
                    }
                    className={`${selectCls} bg-[#f3f6f3]`}
                  >
                    <option value="" disabled>
                      Select specific occupation
                    </option>

                    {OCCUPATIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-[13px]
                      top-1/2
                      h-[14px]
                      w-[14px]
                      -translate-y-1/2
                      text-[#999999]
                    "
                  />
                </div>
              </div>

              {/* -------------------------------------------------
                  OTHER OCCUPATION
              ------------------------------------------------- */}
              <div>
                <input
                  id="otherOccupation"
                  type="text"
                  placeholder="If other, please specify"
                  value={otherOccupation}
                  onChange={(event) =>
                    setOtherOccupation(event.target.value)
                  }
                  disabled={occupation !== "Other"}
                  className={`
                    ${inputCls}
                    bg-[#f3f6f3]
                    disabled:cursor-not-allowed
                    disabled:bg-[#fafafa]
                    disabled:text-[#aaaaaa]
                    disabled:opacity-70
                  `}
                />
              </div>

              {/* -------------------------------------------------
                  AI USAGE
              ------------------------------------------------- */}
              <div>
                <label htmlFor="aiUsage" className={labelCls}>
                  How often do you use AI?
                </label>

                <div className="relative">
                  <select
                    id="aiUsage"
                    value={aiUsage}
                    onChange={(event) =>
                      setAiUsage(event.target.value)
                    }
                    className={`${selectCls} bg-[#f3f6f3]`}
                  >
                    <option value="" disabled>
                      Select frequency
                    </option>

                    {AI_USAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-[13px]
                      top-1/2
                      h-[14px]
                      w-[14px]
                      -translate-y-1/2
                      text-[#999999]
                    "
                  />
                </div>
              </div>

              {/* -------------------------------------------------
                  TECHNOLOGY COMFORT
              ------------------------------------------------- */}
              <div>
                <label htmlFor="techComfort" className={labelCls}>
                  How comfortable are you with technology?
                </label>

                <div className="relative">
                  <select
                    id="techComfort"
                    value={techComfort}
                    onChange={(event) =>
                      setTechComfort(event.target.value)
                    }
                    className={`${selectCls} bg-[#f3f6f3]`}
                  >
                    <option value="" disabled>
                      Select your comfort level
                    </option>

                    {TECH_COMFORT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-[13px]
                      top-1/2
                      h-[14px]
                      w-[14px]
                      -translate-y-1/2
                      text-[#999999]
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  CONTINUE BUTTON
              ================================================= */}
              <button
                type="button"
                onClick={handleContinue}
                disabled={isPending}
                className="
                  mt-[7px]
                  h-[50px]
                  w-full
                  rounded-[8px]
                  bg-[#3caf4a]
                  px-5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-[#329640]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#3caf4a]/20
                  focus:ring-offset-2
                  active:translate-y-[1px]
                  disabled:cursor-not-allowed
                  disabled:bg-[#a8d9ad]
                "
              >
                {isPending ? "Creating account..." : "Continue"}
              </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =======================================================
          SUCCESS MODAL
      ======================================================= */}
      {showSuccess && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-5
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full
              max-w-[460px]
              rounded-[18px]
              bg-white
              px-6
              py-9
              text-center
              shadow-2xl
              sm:px-10
              sm:py-11
            "
          >
            {/* =================================================
                HEADING
            ================================================= */}
            <h2
              className="
                mb-3
                font-serif
                text-[23px]
                font-medium
                leading-[1.25]
                tracking-[-0.3px]
                text-[#171717]
                sm:text-[26px]
              "
            >
              You have successfully completed
              <br />
              your onboarding.
            </h2>

            {/* =================================================
                DESCRIPTION
            ================================================= */}
            <p
              className="
                mx-auto
                mb-8
                max-w-[390px]
                text-[14px]
                leading-[1.6]
                text-[#888888]
                sm:mb-9
                sm:text-[15px]
              "
            >
              Your Cuniv experience has been personalised based on
              your work, goals, and AI experience. You&apos;re ready
              to explore.
            </p>

            {/* =================================================
                SUCCESS ICON
            ================================================= */}
            <div
              className="
                mx-auto
                mb-8
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-full
                bg-[#f4f4f4]
              "
            >
              <div
                className="
                  flex
                  h-[58px]
                  w-[58px]
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-[#3caf4a]
                "
              >
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

            {/* =================================================
                CTA
            ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/verify-otp")}
              className="
                h-[50px]
                w-full
                rounded-[8px]
                bg-[#3caf4a]
                px-5
                text-[13px]
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-[#329640]
                focus:outline-none
                focus:ring-2
                focus:ring-[#3caf4a]/20
                focus:ring-offset-2
                active:translate-y-[1px]
                cursor-pointer
              "
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </main>
  );
}