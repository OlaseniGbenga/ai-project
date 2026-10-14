
"use client";

import { Check, X } from "lucide-react";

export type QuestionProgressStatus =
  | "correct"
  | "incorrect"
  | "answered"
  | "unanswered";

interface QuizProgressCardProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  statuses: QuestionProgressStatus[];
  answeredCount: number;
  onQuestionClick?: (index: number) => void;
}

export default function QuizProgressCard({
  totalQuestions,
  currentQuestionIndex,
  statuses,
  answeredCount,
  onQuestionClick,
}: QuizProgressCardProps) {
  const percentage =
    totalQuestions > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round((answeredCount / totalQuestions) * 100),
          ),
        )
      : 0;

  return (
    <section className="w-full rounded-[10px] border border-[#E7EAE8] bg-white px-5 py-5">
      <h2
        className="text-[18px] font-normal text-[#0C404E]"
        style={{
          fontFamily: '"GFS Didot", "Times New Roman", serif',
        }}
      >
        Quiz Progress
      </h2>

      <p className="mt-1 text-[12px] text-[#63777B]">
        {answeredCount} of {totalQuestions} questions
      </p>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const status = statuses[index] ?? "unanswered";
          const current = index === currentQuestionIndex;
          const correct = status === "correct";
          const incorrect = status === "incorrect";
          const answered = status === "answered";

          const isGraded = correct || incorrect;

          const stateClass = correct
            ? "border-[#43AC47] bg-[#43AC47] text-white"
            : incorrect
              ? "border-[#D92D20] bg-[#D92D20] text-white"
              : current
                ? "border-[#43AC47] bg-white text-[#43AC47]"
                : answered
                  ? "border-[#B9DEC0] bg-[#EFF8F0] text-[#277C35]"
                  : "border-[#E4E6ED] bg-[#F8F8FC] text-[#0C404E]";

          return (
            <button
              key={index}
              type="button"
              onClick={() => onQuestionClick?.(index)}
              disabled={!onQuestionClick}
              aria-label={`Question ${index + 1}: ${status}`}
              aria-current={current ? "step" : undefined}
              className={`flex h-[42px] min-w-0 items-center justify-center rounded-[5px] border text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#43AC47] ${stateClass} ${
                onQuestionClick
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              {correct ? (
                <Check
                  size={19}
                  strokeWidth={3}
                  aria-hidden="true"
                />
              ) : incorrect ? (
                <X
                  size={19}
                  strokeWidth={3}
                  aria-hidden="true"
                />
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-between gap-2">
        <span
          className="text-[13px] text-[#0C404E]"
          style={{
            fontFamily: '"GFS Didot", "Times New Roman", serif',
          }}
        >
          Overall Progress
        </span>

        <span className="text-[11px] text-[#43AC47]">
          {percentage}% Complete
        </span>
      </div>

      <div
        className="mt-2 h-[6px] overflow-hidden rounded-full bg-[#EEF0FA]"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Overall quiz progress"
      >
        <div
          className="h-full rounded-full bg-[#43AC47] transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </section>
  );
}
