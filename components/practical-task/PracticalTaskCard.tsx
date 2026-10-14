
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  Clipboard,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface PracticalTaskCardProps {
  lessonSummary: string;
  taskInstructions: string;
  suggestedPrompt?: string | null;
  completed?: boolean;
  loading?: boolean;
  onComplete: () => void;
  onContinue?: () => void;
}

export default function PracticalTaskCard({
  lessonSummary,
  taskInstructions,
  suggestedPrompt,
  completed = false,
  loading = false,
  onComplete,
  onContinue,
}: PracticalTaskCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!suggestedPrompt) return;

    try {
      await navigator.clipboard.writeText(suggestedPrompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleTryWithAI = () => {
    window.open(
      "https://chatgpt.com/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="mx-auto w-full max-w-[760px] rounded-[12px] border border-[#E4E9E6] bg-white px-5 py-10 sm:px-12 sm:py-14">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#EFFAF2] px-4 py-[7px] text-[11px] font-semibold uppercase tracking-[0.07em] text-[#0C404E]">
          <Sparkles size={13} className="text-[#43AC47]" />
          Practical Task
        </span>

        <h1
          className="mt-4 text-[28px] leading-[1.2] text-[#0B3440] sm:text-[34px]"
          style={{
            fontFamily: '"GFS Didot", Georgia, serif',
          }}
        >
          Put what you learned into practice
        </h1>

        <p className="mt-3 text-[14px] leading-[22px] text-[#647A82]">
          See how you can apply AI to what you've learned.
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-[590px] space-y-5">
        <div className="border-l-[2px] border-[#43AC47] pl-4">
          <p
            className="text-[11px] uppercase tracking-[0.08em] text-[#0B3440]"
            style={{
              fontFamily: '"GFS Didot", Georgia, serif',
            }}
          >
            Based on this lesson
          </p>

          <p className="mt-2 text-[14px] leading-[23px] text-[#647A82]">
            {lessonSummary}
          </p>
        </div>

        <div className="border-l-[2px] border-[#E4E9E6] pl-4">
          <p
            className="text-[11px] uppercase tracking-[0.08em] text-[#0B3440]"
            style={{
              fontFamily: '"GFS Didot", Georgia, serif',
            }}
          >
            Try this with AI
          </p>

          <p className="mt-2 whitespace-pre-line text-[14px] leading-[23px] text-[#647A82]">
            {taskInstructions}
          </p>
        </div>

        {suggestedPrompt && (
          <div className="rounded-[10px] border border-[#E4E9E6] bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#43AC47]">
                <Brain size={16} />
                <span
                  className="text-[13px]"
                  style={{
                    fontFamily: '"GFS Didot", Georgia, serif',
                  }}
                >
                  Suggested prompt
                </span>
              </div>

              <span className="text-[11px] text-[#647A82]">
                One-click ready
              </span>
            </div>

            <div className="mt-4 rounded-[7px] bg-[#F1F1FF] px-4 py-4">
              <p className="whitespace-pre-line text-[14px] leading-[23px] text-[#647A82]">
                {suggestedPrompt}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-[6px] border border-[#E4E9E6] bg-white px-4 text-[12px] font-medium text-[#0B3440]"
              >
                {copied ? (
                  <Check size={15} />
                ) : (
                  <Clipboard size={15} />
                )}
                {copied ? "Copied!" : "Copy prompt"}
              </button>

              <button
                type="button"
                onClick={handleTryWithAI}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-[6px] bg-[#006B4B] px-4 text-[12px] font-medium text-white hover:bg-[#00563D]"
              >
                Try it with AI
                <ExternalLink size={14} />
              </button>
            </div>

            <p className="mt-3 text-[12px] text-[#43AC47]">
              Use the prompt in your preferred AI tool.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        {completed ? (
          onContinue ? (
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-[6px] bg-[#43AC47] px-6 text-[13px] font-medium text-white"
            >
              Continue
              <ArrowRight size={15} />
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#43AC47]">
              <Check size={17} />
              Task Completed
            </span>
          )
        ) : (
          <button
            type="button"
            onClick={onComplete}
            disabled={loading}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-[6px] bg-[#43AC47] px-6 text-[13px] font-medium text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Mark As Done"}
            {!loading && <ArrowRight size={15} />}
          </button>
        )}
      </div>
    </section>
  );
}
