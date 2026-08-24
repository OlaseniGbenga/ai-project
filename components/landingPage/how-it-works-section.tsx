"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const imagePath = "/homepage/how-it-works";

const steps = [
  {
    label: "Step 1:",
    title: "Set up your profile",
    description:
      "Tell us about your profession, business, goals, and experience.",
    image: "learning-profile.png",
    imageClass: "scale-[1.04] object-left",
  },
  {
    label: "Step 2:",
    title: "Explore your dashboard",
    description: "Find your personalised courses, progress, all in one place.",
    image: "learning-profile-alt.png",
    imageClass: "scale-[1.08] object-[18%_center]",
  },
  {
    label: "Step 3:",
    title: "Ask, learn, and practise",
    description:
      "Complete quizzes and use the AI Assistant whenever you need help.",
    image: "learning-profile.png",
    imageClass: "scale-[1.12] object-[35%_center]",
  },
  {
    label: "Step 4:",
    title: "Earn your certificate",
    description:
      "Pass the required quiz and receive a certificate recognising your completed course.",
    image: "learning-profile-alt.png",
    imageClass: "scale-[1.06] object-[58%_center]",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveStep((currentStep) => (currentStep + 1) % steps.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentImage = steps[activeStep];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-6 bg-[#052128] px-6 py-20 sm:px-10 lg:px-20 lg:py-40"
    >
      <div className="mx-auto flex w-full max-w-[1110px] flex-col items-center gap-12 lg:gap-[62px]">
        <div className="flex w-full max-w-[599px] flex-col items-center gap-8 text-center">
          <div className="flex h-[42px] w-[128px] items-center justify-center rounded-[34px] border-2 border-[#1e383e] bg-[#1e383e] p-1">
            <div className="flex h-full w-full items-center justify-center rounded-[30px] border border-[#052128]">
              <span className="font-serif text-base text-white">
                How it works
              </span>
            </div>
          </div>
          <h2 className="font-serif text-[clamp(2.25rem,4vw,2.875rem)] leading-[1.2] font-normal text-[#f5f7f5]">
            Everything you need to get{" "}
            <em className="text-[#43ac47]">started</em>.
          </h2>
        </div>

        <div
          className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-[55px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="relative h-[420px] w-full max-w-[525px] overflow-hidden rounded-[14px] sm:h-[560px] lg:h-[737px]">
            {steps.map((step, index) => (
              <Image
                key={step.title}
                src={`${imagePath}/${step.image}`}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 525px"
                className={`absolute inset-0 object-cover transition-[opacity,transform] duration-700 ${step.imageClass} ${index === activeStep ? "opacity-100" : "opacity-0"}`}
                priority={index === 0}
              />
            ))}
          </div>

          <div
            className="flex w-full max-w-[500px] flex-col gap-6"
            role="tablist"
            aria-label="How it works steps"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;

              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`how-it-works-panel-${index}`}
                  className="group flex w-full items-stretch gap-5 text-left"
                  onClick={() => setActiveStep(index)}
                >
                  <span
                    aria-hidden="true"
                    className={`w-3 shrink-0 rounded-[10px] transition-colors duration-300 sm:w-5 ${isActive ? "bg-[#43ac47]" : "bg-white"}`}
                  />
                  <span
                    id={`how-it-works-panel-${index}`}
                    className={`flex flex-1 flex-col gap-4 rounded-[10px] bg-white p-6 text-left shadow-[6px_6px_34px_0_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:-translate-y-0.5 ${isActive ? "ring-2 ring-[#43ac47]/20" : ""}`}
                  >
                    <span className="font-sans text-base font-normal text-[#2e2e2e]">
                      {step.label}
                    </span>
                    <span
                      className={`font-serif text-[#082a35] ${isActive ? "text-2xl" : "text-xl"}`}
                    >
                      {step.title}
                    </span>
                    <span className="font-sans text-base leading-6 text-[#52666d]">
                      {step.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
