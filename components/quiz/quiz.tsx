
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { ArrowLeft } from "lucide-react";
import { usePostSubmitQuiz } from "@/features/auth/hooks/useCourse";
import QuizQuestionCard from "@/components/quiz/QuizQuestionCard";
import QuizProgressCard, {
  type QuestionProgressStatus,
} from "@/components/quiz/QuizProgressCard";
import QuizInstructionsCard from "@/components/quiz/QuizInstructionsCard";
import QuizResultCard from "@/components/quiz/QuizResultCard";

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

interface QuestionFeedback {
  questionId: string;
  question: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  explanation: string;
}

interface SubmissionResult {
  attemptId: string;
  quizId: string;
  scorePercent: number;
  totalQuestions: number;
  correctAnswers: number;
  passingScore: number;
  isPassed: boolean;
  lessonPracticalTaskUnlocked: boolean;
  practicalTasksUnlocked: boolean;
  feedback: QuestionFeedback[];
}

interface SubmissionResponse {
  data: SubmissionResult;
  timestamp?: string;
}

export default function Quiz({ quizData, lessonID }: QuizProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [selections, setSelections] = useState<
    Record<string, string>
  >({});

  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const [showReview, setShowReview] = useState(false);

  const { mutate, isPending } = usePostSubmitQuiz(quizData.id);

  const questions = quizData.questions;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const answeredCount = questions.filter(
    (question) => selections[question.id] !== undefined,
  ).length;

  const allQuestionsAnswered =
    totalQuestions > 0 && answeredCount === totalQuestions;

  const feedbackByQuestionId = useMemo(() => {
    const feedback = submissionResult?.feedback ?? [];

    return new Map(
      feedback.map((item) => [item.questionId, item]),
    );
  }, [submissionResult]);

  const statuses = useMemo<QuestionProgressStatus[]>(() => {
    return questions.map((question) => {
      const feedback = feedbackByQuestionId.get(question.id);

      if (feedback) {
        return feedback.isCorrect ? "correct" : "incorrect";
      }

      if (selections[question.id] !== undefined) {
        return "answered";
      }

      return "unanswered";
    });
  }, [questions, selections, feedbackByQuestionId]);

  const currentFeedback = currentQuestion
    ? feedbackByQuestionId.get(currentQuestion.id)
    : undefined;

  const currentSelection = currentQuestion
    ? (selections[currentQuestion.id] ?? null)
    : null;

  const handleSelectAnswer = (optionId: string) => {
    if (!currentQuestion || isPending || submissionResult) {
      return;
    }

    setSelections((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId,
    }));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((previous) =>
      Math.max(previous - 1, 0),
    );
  };

  const handleSubmitQuiz = () => {
    if (isPending || submissionResult) {
      return;
    }

    if (!allQuestionsAnswered) {
      notifications.show({
        title: "Incomplete Quiz",
        message: "Please answer every question before submitting.",
        color: "red",
      });
      return;
    }

    const answers = questions.map((question) => ({
      questionId: question.id,
      selectedOptionId: selections[question.id],
    }));

    mutate(
      { answers },
      {
        onSuccess: (response) => {
          const result = (response as SubmissionResponse)?.data;

          if (
            !result ||
            typeof result.isPassed !== "boolean" ||
            typeof result.correctAnswers !== "number" ||
            typeof result.totalQuestions !== "number" ||
            !Array.isArray(result.feedback)
          ) {
            notifications.show({
              title: "Unexpected Response",
              message:
                "The server did not return complete quiz grading information.",
              color: "red",
            });
            return;
          }

          setSubmissionResult(result);
          setShowReview(false);

          if (result.isPassed) {
            queryClient.invalidateQueries({
              queryKey: ["lessons"],
            });
          }

          notifications.show({
            title: result.isPassed
              ? "Quiz Passed!"
              : "Quiz Not Passed",
            message: result.isPassed
              ? `You scored ${result.scorePercent}%. Great work!`
              : `You scored ${result.scorePercent}%. Review your answers and try again.`,
            color: result.isPassed ? "green" : "red",
          });
        },
        onError: (error: unknown) => {
          notifications.show({
            title: "Submission Failed",
            message:
              error instanceof Error
                ? error.message
                : "Unable to submit the quiz. Please try again.",
            color: "red",
          });
        },
      },
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((previous) => previous + 1);
      return;
    }

    if (submissionResult) {
      setShowReview(false);
      return;
    }

    handleSubmitQuiz();
  };

  const handleRetakeQuiz = () => {
    setSelections({});
    setSubmissionResult(null);
    setShowReview(false);
    setCurrentQuestionIndex(0);
  };

  const handleContinue = () => {
    if (lessonID) {
      router.push(`/practical-task/${lessonID}`);
      return;
    }

    router.push("/courses");
  };

  const handlePrimaryAction = () => {
    if (submissionResult?.isPassed) {
      handleContinue();
      return;
    }

    handleRetakeQuiz();
  };

  if (!totalQuestions || !currentQuestion) {
    return (
      <section className="mx-auto mt-6 w-full max-w-[1040px] rounded-[10px] border border-[#E7EAE8] bg-white p-8">
        <h2 className="text-[22px] text-[#0C404E]">
          No questions available
        </h2>
        <p className="mt-2 text-[14px] text-[#63777B]">
          This lesson does not have quiz questions yet.
        </p>
      </section>
    );
  }

  if (submissionResult && !showReview) {
    return (
      <div className="mx-auto w-full max-w-[1040px] pb-12">
        <div className="mb-6">
          <p className="text-[12px] text-[#63777B]">
            My Learning &gt; {quizData.title}
          </p>

          <h1
            className="mt-4 text-[30px] font-normal text-[#0C404E]"
            style={{
              fontFamily:
                '"GFS Didot", "Times New Roman", serif',
            }}
          >
            Knowledge Check
          </h1>
        </div>

        <QuizResultCard
          correctAnswers={submissionResult.correctAnswers}
          totalQuestions={submissionResult.totalQuestions}
          passed={submissionResult.isPassed}
          requiredPercentage={submissionResult.passingScore}
          onReview={() => {
            setCurrentQuestionIndex(0);
            setShowReview(true);
          }}
          onPrimaryAction={handlePrimaryAction}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-[1040px] pb-12">
      <div className="mb-6">
        <p className="text-[12px] text-[#63777B]">
          My Learning &gt; {quizData.title}
        </p>

        <span className="mt-3 inline-flex rounded-[6px] bg-[#0C404E] px-3 py-[5px] text-[10px] font-medium uppercase tracking-wide text-white">
          {quizData.title}
        </span>

        <h1
          className="mt-2 text-[30px] font-normal text-[#0C404E]"
          style={{
            fontFamily:
              '"GFS Didot", "Times New Roman", serif',
          }}
        >
          {showReview ? "Review Your Answers" : "Knowledge Check"}
        </h1>

        <p className="mt-2 text-[13px] text-[#63777B]">
          {showReview
            ? "See which answers were correct and read the explanations."
            : "Test your understanding of the lesson before continuing."}
        </p>

        {showReview && (
          <button
            type="button"
            onClick={() => setShowReview(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-[7px] border border-[#CAD5D1] bg-white px-4 py-2 text-[12px] text-[#0C404E]"
          >
            <ArrowLeft size={15} />
            Back to Results
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_254px]">
        <QuizQuestionCard
          questionNumber={currentQuestionIndex + 1}
          question={currentQuestion.question}
          options={currentQuestion.options.map((option) => ({
            id: option.id,
            text: option.optionText,
          }))}
          selectedOptionId={currentSelection}
          correctOptionId={
            showReview
              ? (currentFeedback?.correctOptionId ?? null)
              : null
          }
          explanation={
            showReview
              ? currentFeedback?.explanation
              : undefined
          }
          submitted={showReview}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === totalQuestions - 1}
          loading={isPending}
          canFinish={allQuestionsAnswered}
          onSelect={handleSelectAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <aside className="flex min-w-0 flex-col gap-3">
          <QuizProgressCard
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentQuestionIndex}
            statuses={statuses}
            answeredCount={answeredCount}
            onQuestionClick={(index) => {
              if (!isPending) {
                setCurrentQuestionIndex(index);
              }
            }}
          />

          <QuizInstructionsCard />
        </aside>
      </div>
    </div>
  );
}
