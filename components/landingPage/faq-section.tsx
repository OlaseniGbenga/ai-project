"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Who is the platform for?",
    answer:
      "The platform is designed for artisans, skilled professionals, entrepreneurs, freelancers, and business owners who want to discover practical ways to use AI in their everyday work.",
  },
  {
    question: "Do I need to already own a business?",
    answer:
      "No. Cuniv is useful whether you are exploring an idea, preparing to start a business, or already running one.",
  },
  {
    question: "Do I need any AI experience?",
    answer:
      "No prior AI experience is needed. The lessons begin with practical, approachable examples and build from there.",
  },
  {
    question: "How does the platform know what is relevant to me?",
    answer:
      "Your profile, goals, profession, and learning activity help Cuniv tailor course recommendations and guidance to your work.",
  },
  {
    question: "Can I ask the AI Assistant questions?",
    answer:
      "Yes. You can ask the AI Assistant questions as you learn and get practical support when you need it.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Complete the required course work and quiz to receive a certificate recognising your progress.",
  },
];

const minusIcon = "/homepage/faq/minus.svg";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faqs"
      className="scroll-mt-6 bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-40"
    >
      <div className="mx-auto flex w-full max-w-[725px] flex-col items-center gap-12 lg:gap-[62px]">
        <div className="flex w-full max-w-[447px] flex-col items-center gap-8 text-center">
          <div className="flex h-[34px] w-[72px] items-center justify-center rounded-[34px] border-2 border-[#fcfcfc] bg-[#edf2f6] p-1">
            <div className="flex h-full w-full items-center justify-center rounded-[30px] border border-[#d9e0e4] bg-[#edf2f6]">
              <span className="font-serif text-base text-[#52666d]">FAQ</span>
            </div>
          </div>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,2.875rem)] leading-[1.2] tracking-[-0.14rem] text-[#082a35]">
            Questions? Let&apos;s clear things up.
          </h2>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-[22px]">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={item.question}
                  className="overflow-hidden rounded-2xl bg-[#edf2f6] px-6 py-5"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="font-serif text-xl leading-8 tracking-[-0.06rem] text-[#082a35] sm:text-2xl">
                      {item.question}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0c404e] p-0.5">
                      {isOpen ? (
                        <Image
                          src={minusIcon}
                          alt="Collapse answer"
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                      ) : (
                        <Plus
                          aria-label="Expand answer"
                          className="h-6 w-6 text-white"
                          strokeWidth={2}
                        />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ${isOpen ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="min-h-0 overflow-hidden font-sans text-base leading-7 tracking-[-0.03rem] text-[#42616a] sm:text-xl">
                      {item.answer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="text-center text-xs leading-5 tracking-[-0.02rem] text-[#42616a]">
            Still curious? Our team is ready to help. Reach out any time through
            our{" "}
            <a className="font-bold underline" href="#contact">
              contact
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
