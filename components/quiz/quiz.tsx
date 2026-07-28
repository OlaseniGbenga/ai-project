"use client";

import { Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRef, useState } from "react";
import { usePostCompletedLesson } from "@/features/auth/hooks/useCourse";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePostSubmitQuiz } from "@/features/auth/hooks/useCourse";
import { useRouter } from "next/navigation";

interface QuizOption {
  id: string;
  optionText: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizData {
  id: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

interface QuizProps {
  quizData: QuizData;
  lessonID?: string;
}

export default function Quiz({ quizData, lessonID }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  // const [quizFinished, setQuizFinished] = useState(false);
  // const [score, setScore] = useState<{
  //   correct: number;
  //   total: number;
  //   percentage: number;
  // } | null>(null);

  // const completionTriggeredRef = useRef(false);
  // const { mutate: completeLesson } = usePostCompletedLesson(lessonID ?? "");

  const questions = quizData.questions;
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentSelection = selections[currentQuestionIndex] || null;
  const allQuestionsAnswered =
    Object.keys(selections).length === totalQuestions;

  const { mutate, isPending, data } = usePostSubmitQuiz(quizData.id);
  const router = useRouter();
  const handleSelectAnswer = (optionId: string) => {
    // Store the selection (questionId as the index, selectedOptionId as the value)
    setSelections((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    if (Object.keys(selections).length !== totalQuestions) {
      notifications.show({
        title: "Incomplete Quiz",
        message: "All quiz questions must be answered before submitting.",
        color: "red",
      });
      return;
    }

    const submissionData = Object.entries(selections).map(
      ([questionIndex, selectedOptionId]) => ({
        questionId: questions[parseInt(questionIndex)].id,
        selectedOptionId,
      }),
    );
    mutate(
      { answers: submissionData },
      {
        onSuccess: (res) => {
          if (res?.data?.isPassed) {
            notifications.show({
              title: "Passed",
              message: "You scored above the passmark",
              color: "brand.5",
            });
            router.push(`/practical-task/${lessonID}`);
          } else {
            notifications.show({
              title: "You scored less than the pass mark",
              message: "Take quiz again",
              color: "red",
            });
          }
          setSelections({});
          setCurrentQuestionIndex(0);
        },
        onError: (error: unknown) => {
          notifications.show({
            title: "Submission Failed",
            //@ts-expect-error expected
            message: error.data.message,
            color: "red",
          });
        },
      },
    );
  };

  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-8 rounded-[34px] border border-slate-200 bg-white p-10 shadow-lg">
      <div className="flex items-center justify-between">
        <Text
          size="sm"
          className="font-medium uppercase tracking-[0.2em] text-slate-500"
        >
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
      </div>

      <div className="space-y-4">
        <Text size="lg" className="font-semibold text-slate-900">
          {question.question}
        </Text>
        {question.options.map((option, i) => {
          const isSelected = currentSelection === option.id;
          const optionLabel = String.fromCharCode(97 + i); // a, b, c, ...

          let buttonClasses =
            "w-full rounded-3xl border p-5 text-left transition-all duration-200";

          if (isSelected) {
            buttonClasses +=
              " border-primary-600 bg-primary-50 text-slate-900 hover:border-primary-600";
          } else {
            buttonClasses +=
              " border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectAnswer(option.id)}
              className={buttonClasses}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold">{optionLabel}</div>
                  <div className="text-base leading-6">{option.optionText}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="default"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            loading={isPending}
            disabled={isPending}
            onClick={handleSubmitQuiz}
            className="btn btn-primary"
            title={
              !allQuestionsAnswered
                ? "Answer all questions before submitting"
                : ""
            }
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isLastQuestion}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
