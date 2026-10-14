
"use client";

import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

export interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestionCardProps {
  questionNumber: number;
  question: string;
  options: QuizOption[];
  selectedOptionId?: string | null;
  correctOptionId?: string | null;
  explanation?: string;
  submitted?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  loading?: boolean;
  canFinish?: boolean;
  onSelect: (optionId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function QuizQuestionCard({
  questionNumber,
  question,
  options,
  selectedOptionId = null,
  correctOptionId = null,
  explanation,
  submitted = false,
  isFirst = false,
  isLast = false,
  loading = false,
  canFinish = false,
  onSelect,
  onPrevious,
  onNext,
}: QuizQuestionCardProps) {
  const hasAnswer = selectedOptionId !== null;
  const hasGrading =
    submitted && hasAnswer && correctOptionId !== null;

  const isCorrect =
    hasGrading && selectedOptionId === correctOptionId;

  return (
    <section className="w-full min-w-0 rounded-[10px] border border-[#E7EAE8] bg-white px-5 py-6 sm:px-6">
      <p className="text-[11px] font-medium uppercase tracking-wide text-[#455654]">
        Question {questionNumber}
      </p>

      <h2
        className="mt-3 text-[23px] font-normal leading-[1.35] text-[#0C404E]"
        style={{
          fontFamily: '"GFS Didot", "Times New Roman", serif',
        }}
      >
        {question}
      </h2>

      <p className="mt-2 text-[13px] text-[#63777B]">
        {submitted
          ? "Review your selected answer."
          : "Select the best answer."}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {options.map((option, index) => {
          const selected = selectedOptionId === option.id;
          const selectedCorrect =
            hasGrading && selected && isCorrect;
          const selectedIncorrect =
            hasGrading && selected && !isCorrect;
          const actualCorrect =
            hasGrading && option.id === correctOptionId;

          return (
            <button
              key={option.id}
              type="button"
              disabled={loading || submitted}
              onClick={() => onSelect(option.id)}
              aria-pressed={selected}
              className={`flex min-h-[50px] w-full items-center gap-3 rounded-[6px] border px-4 py-3 text-left transition-colors disabled:cursor-default ${
                selectedCorrect || actualCorrect
                  ? "border-[#43AC47] bg-[#EDF8EF]"
                  : selectedIncorrect
                    ? "border-[#D92D20] bg-[#FFF0EE]"
                    : selected
                      ? "border-[#43AC47] bg-[#F1F9F2]"
                      : "border-[#CAD5D1] bg-white hover:border-[#43AC47]"
              }`}
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                  selectedCorrect || actualCorrect
                    ? "border-[#43AC47] bg-[#43AC47] text-white"
                    : selectedIncorrect
                      ? "border-[#D92D20] bg-[#D92D20] text-white"
                      : selected
                        ? "border-[#43AC47]"
                        : "border-[#718A8F]"
                }`}
              >
                {selectedCorrect || actualCorrect ? (
                  <Check size={12} strokeWidth={3} />
                ) : selectedIncorrect ? (
                  <X size={12} strokeWidth={3} />
                ) : selected ? (
                  <span className="h-[9px] w-[9px] rounded-full bg-[#43AC47]" />
                ) : null}
              </span>

              <span className="shrink-0 text-[12px] text-[#63777B]">
                {String.fromCharCode(65 + index)}.
              </span>

              <span className="text-[13px] leading-[20px] text-[#52666D]">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {hasGrading && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-[7px] border px-4 py-4 ${
            isCorrect
              ? "border-[#C8EED2] bg-[#EFFAF2]"
              : "border-[#F2C6C1] bg-[#FFF0EE]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-white ${
                isCorrect ? "bg-[#43AC47]" : "bg-[#D92D20]"
              }`}
            >
              {isCorrect ? (
                <Check size={13} strokeWidth={3} />
              ) : (
                <X size={13} strokeWidth={3} />
              )}
            </span>

            <span
              className={`text-[14px] font-semibold ${
                isCorrect ? "text-[#087443]" : "text-[#B42318]"
              }`}
            >
              {isCorrect ? "Correct!" : "Not quite"}
            </span>
          </div>

          {explanation && (
            <p
              className={`mt-2 pl-7 text-[13px] leading-[21px] ${
                isCorrect ? "text-[#52666D]" : "text-[#9F2820]"
              }`}
            >
              {explanation}
            </p>
          )}
        </div>
      )}

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#E7EAE8] pt-5">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst || loading}
          className="inline-flex items-center gap-2 rounded-[7px] border border-[#CAD5D1] px-4 py-3 text-[12px] text-[#0C404E] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={15} />
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={
            loading ||
            (!submitted &&
              (!hasAnswer || (isLast && !canFinish)))
          }
          className="inline-flex items-center gap-2 rounded-[7px] bg-[#43AC47] px-4 py-3 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading
            ? "Submitting..."
            : isLast
              ? submitted
                ? "Back to Results"
                : "Submit Quiz"
              : "Next Question"}
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
