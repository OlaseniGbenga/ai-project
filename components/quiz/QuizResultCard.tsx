
"use client";

import {
  ArrowRight,
  Award,
  CircleCheck,
  Info,
  RotateCcw,
} from "lucide-react";

import QuizScoreGauge from "@/components/quiz/QuizScoreGauge";

interface QuizResultCardProps {
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  requiredPercentage?: number;
  onReview: () => void;
  onPrimaryAction: () => void;
}

export default function QuizResultCard({
  correctAnswers,
  totalQuestions,
  passed,
  requiredPercentage = 80,
  onReview,
  onPrimaryAction,
}: QuizResultCardProps) {
  return (
    <section className="mx-auto w-full max-w-[720px] rounded-[10px] border border-[#E6E9E8] bg-white px-5 py-9 sm:px-10 sm:py-10">
      <div className="flex flex-col items-center text-center">
        <div
          className={`flex h-[44px] w-[44px] items-center justify-center rounded-full ${
            passed ? "bg-[#ECFAF0]" : "bg-[#FFF4F3]"
          }`}
        >
          {passed ? (
            <CircleCheck
              size={24}
              strokeWidth={1.8}
              className="text-[#43AC47]"
            />
          ) : (
            <Info
              size={24}
              strokeWidth={1.8}
              className="text-[#D92D20]"
            />
          )}
        </div>

        <h2
          className="mt-4 text-[26px] font-normal leading-[1.25] text-[#0B3440]"
          style={{
            fontFamily: '"GFS Didot", Georgia, serif',
          }}
        >
          {passed ? "Quiz Completed!" : "Quiz Not Passed!"}
        </h2>

        <p className="mt-3 max-w-[340px] text-[12px] leading-[19px] text-[#647A82]">
          {passed
            ? "Great job! You've completed the knowledge check for this lesson."
            : "Don't worry. Review the lesson and try the quiz again when you're ready."}
        </p>

        <div className="mt-6 flex w-full justify-center">
          <QuizScoreGauge
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            passed={passed}
          />
        </div>

        <p className="mt-5 max-w-[380px] text-[12px] leading-[19px] text-[#647A82]">
          {passed
            ? "Excellent work! You have a strong understanding of the key concepts covered in this lesson."
            : "Review the lesson and try again to strengthen your understanding of the key concepts covered."}
        </p>

        <div
          className={`mt-7 w-full max-w-[390px] rounded-[7px] px-5 py-4 text-left ${
            passed ? "bg-[#EFFAF2]" : "bg-[#FFF5F4]"
          }`}
        >
          <div className="flex items-start gap-3">
            {passed ? (
              <Award
                size={19}
                strokeWidth={1.8}
                className="mt-[1px] shrink-0 text-[#43AC47]"
              />
            ) : (
              <Info
                size={19}
                strokeWidth={1.8}
                className="mt-[1px] shrink-0 text-[#D92D20]"
              />
            )}

            <div className="min-w-0">
              <p
                className={`text-[11px] font-medium uppercase tracking-[0.06em] ${
                  passed ? "text-[#43AC47]" : "text-[#D92D20]"
                }`}
              >
                {passed ? "PASSED" : "NOT PASSED"}
              </p>

              <p className="mt-1 text-[11px] leading-[18px] text-[#63777B]">
                {passed
                  ? "You met the required score to continue learning."
                  : `You need ${requiredPercentage}% to pass this quiz. Review the lesson and try again to strengthen your understanding.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full max-w-[390px] flex-col items-center justify-between gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReview}
            className="inline-flex min-h-[36px] w-full items-center justify-center rounded-[6px] border border-[#E6EAE8] bg-white px-5 text-[12px] font-medium text-[#43AC47] transition-colors hover:bg-[#F4FAF5] sm:w-auto"
          >
            {passed ? "Review Answers" : "Review Lesson"}
          </button>

          <button
            type="button"
            onClick={onPrimaryAction}
            className="inline-flex min-h-[36px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#43AC47] px-5 text-[12px] font-medium text-white transition-colors hover:bg-[#36983B] sm:w-auto"
          >
            {passed ? (
              <>
                Next Lesson
                <ArrowRight size={14} strokeWidth={1.8} />
              </>
            ) : (
              <>
                Retake Quiz
                <RotateCcw size={14} strokeWidth={1.8} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
