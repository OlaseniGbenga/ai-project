
"use client";

import Image from "next/image";
import { Button } from "@mantine/core";
import { ArrowRight, Clock3, List } from "lucide-react";

interface LessonQuizCardProps {
  onStart: () => void;
  loading?: boolean;
  questionCount?: number;
  quizUnavailable?: boolean;
}

export default function LessonQuizCard({
  onStart,
  loading = false,
  questionCount,
  quizUnavailable = false,
}: LessonQuizCardProps) {
  const hasQuestions =
    typeof questionCount === "number" && questionCount > 0;

  const estimatedMinutes = hasQuestions
    ? Math.max(1, Math.ceil(questionCount * 0.6))
    : null;

  return (
    <section className="flex min-h-[404px] w-full max-w-[676px] flex-col items-center justify-center bg-[#F7F8F7] px-5 py-10 text-center sm:px-10">
      <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#E9ECEB]">
        <Image
          src="/question.svg"
          alt=""
          width={36}
          height={36}
          className="object-contain"
        />
      </div>

      <h2
        className="mt-5 text-[25px] font-normal leading-[1.25] text-[#0C404E] sm:text-[28px]"
        style={{
          fontFamily:
            '"GFS Didot", "Times New Roman", serif',
        }}
      >
        Ready to test your understanding?
      </h2>

      <p className="mt-3 max-w-[460px] text-[14px] font-normal leading-[23px] text-[#63777B]">
        Take a short quiz to reinforce what you've learned in this lesson
        before moving on to the next module.
      </p>

      <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#DFE5E2] bg-white px-4 py-[9px] text-[12px] text-[#52666D]">
        <List size={15} strokeWidth={1.5} />

        <span>
          {hasQuestions
            ? `${questionCount} ${
                questionCount === 1 ? "Question" : "Questions"
              }`
            : loading
              ? "Loading questions..."
              : quizUnavailable
                ? "Quiz details unavailable"
                : "Quiz questions"}
        </span>

        {estimatedMinutes !== null && (
          <>
            <span>·</span>
            <Clock3 size={15} strokeWidth={1.5} />
            <span>
              ~{estimatedMinutes}{" "}
              {estimatedMinutes === 1 ? "Minute" : "Minutes"}
            </span>
          </>
        )}
      </div>

      <Button
        onClick={onStart}
        loading={loading}
        disabled={loading}
        radius="md"
        h={48}
        mt={24}
        rightSection={<ArrowRight size={18} strokeWidth={1.6} />}
        className="bg-[#43AC47] px-7 text-[14px] font-medium text-white hover:bg-[#3A9A40]"
        styles={{
          root: {
            backgroundColor: "#43AC47",
            boxShadow: "none",
          },
          label: {
            fontWeight: 500,
          },
        }}
      >
        Start Quiz
      </Button>
    </section>
  );
}
