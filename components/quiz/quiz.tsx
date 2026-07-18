"use client";

import { Button, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import { usePostCompletedLesson } from "@/features/auth/hooks/useCourse";

const questions = [
  {
    id: 1,
    question: "What best describes how modern AI works?",
    options: [
      { id: "A", text: "It follows rigid hand-written rules" },
      { id: "B", text: "It predicts based on learned patterns" },
      { id: "C", text: "It searches the internet live for each answer" },
      { id: "D", text: "It thinks like a human brain" },
    ],
    answer: "B",
  },
  {
    id: 2,
    question: "What is a prompt in generative AI?",
    options: [
      { id: "A", text: "A password for using AI" },
      { id: "B", text: "An instruction or question given to an AI" },
      { id: "C", text: "The AI's final answer" },
      { id: "D", text: "A type of computer virus" },
    ],
    answer: "B",
  },
  {
    id: 3,
    question: "Which of the following is a good prompt?",
    options: [
      { id: "A", text: "Help" },
      { id: "B", text: "Write" },
      { id: "C", text: "Write a polite email requesting a meeting tomorrow." },
      { id: "D", text: "AI" },
    ],
    answer: "C",
  },
  {
    id: 4,
    question: "Why is it important to verify AI-generated information?",
    options: [
      { id: "A", text: "AI is always correct" },
      { id: "B", text: "AI can sometimes produce incorrect information" },
      { id: "C", text: "AI only works offline" },
      { id: "D", text: "AI cannot answer questions" },
    ],
    answer: "B",
  },
  {
    id: 5,
    question: "Which task is generative AI especially good at?",
    options: [
      { id: "A", text: "Creating text, images, or code" },
      { id: "B", text: "Repairing broken hardware" },
      { id: "C", text: "Charging a phone battery" },
      { id: "D", text: "Installing computer memory" },
    ],
    answer: "A",
  },
  {
    id: 6,
    question: "Which of these is a common use of generative AI?",
    options: [
      { id: "A", text: "Summarizing long documents" },
      { id: "B", text: "Cooking a meal" },
      { id: "C", text: "Turning on a light bulb" },
      { id: "D", text: "Working as a human assistant" },
    ],
    answer: "A",
  },
  {
    id: 7,
    question: "What is a key limitation of AI models?",
    options: [
      { id: "A", text: "They can never make mistakes" },
      { id: "B", text: "They may produce incorrect or biased output" },
      { id: "C", text: "They cannot answer questions" },
      { id: "D", text: "They only work with images" },
    ],
    answer: "B",
  },
  {
    id: 8,
    question: "Why should you include context in a prompt?",
    options: [
      { id: "A", text: "It makes the answer shorter" },
      { id: "B", text: "It helps the AI understand the task better" },
      { id: "C", text: "It changes the question type" },
      { id: "D", text: "It removes the need for creativity" },
    ],
    answer: "B",
  },
  {
    id: 9,
    question: "What does the word 'hallucination' mean in AI?",
    options: [
      { id: "A", text: "A fake or made-up response" },
      { id: "B", text: "A system reboot" },
      { id: "C", text: "A visual effect" },
      { id: "D", text: "A hardware failure" },
    ],
    answer: "A",
  },
  {
    id: 10,
    question: "Which statement is true about AI-generated content?",
    options: [
      { id: "A", text: "It is always perfect" },
      { id: "B", text: "It should be reviewed and verified" },
      { id: "C", text: "It cannot be edited" },
      { id: "D", text: "It requires no human oversight" },
    ],
    answer: "B",
  },
];

interface QuizProps {
  lessonID?: string;
}

export default function Quiz({ lessonID }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState<{
    correct: number;
    total: number;
    percentage: number;
  } | null>(null);

  const completionTriggeredRef = useRef(false);
  const { mutate: completeLesson } = usePostCompletedLesson(lessonID ?? "");

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  useEffect(() => {
    if (!showFeedback) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!isLastQuestion) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setShowFeedback(false);
        return;
      }

      const correctAnswers = results.filter(Boolean).length;
      const percentage = Math.round((correctAnswers / totalQuestions) * 100);
      setScore({ correct: correctAnswers, total: totalQuestions, percentage });
      setQuizFinished(true);

      if (lessonID && percentage >= 50 && !completionTriggeredRef.current) {
        completionTriggeredRef.current = true;
        completeLesson(undefined, {
          onSuccess: () => {
            notifications.show({
              title: "Quiz completed",
              message: "Your lesson has been marked as completed.",
              color: "green",
            });
          },
          onError: (error: Error) => {
            notifications.show({
              title: "Completion failed",
              message: error.message,
              color: "red",
            });
          },
        });
      }
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [
    completeLesson,
    isLastQuestion,
    lessonID,
    results,
    showFeedback,
    totalQuestions,
  ]);

  const handleSelectAnswer = (optionId: string) => {
    if (showFeedback) return;

    const isCorrect = optionId === question.answer;
    setSelectedOptionId(optionId);
    setShowFeedback(true);
    setResults((prev) => [...prev, isCorrect]);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setShowFeedback(false);
    setResults([]);
    setQuizFinished(false);
    setScore(null);
    completionTriggeredRef.current = false;
  };

  if (quizFinished && score) {
    const passed = score.percentage >= 50;

    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-[34px] border border-slate-200 bg-white p-10 shadow-lg">
        <Text size="lg" className="font-semibold text-slate-900">
          Quiz complete
        </Text>
        <div className="space-y-2">
          <Text size="sm" className="text-slate-600">
            Total score: {score.correct}/{score.total}
          </Text>
          <Text size="sm" className="text-slate-600">
            Percentage: {score.percentage}%
          </Text>
          <Text
            size="sm"
            className={passed ? "text-emerald-600" : "text-red-600"}
          >
            {passed
              ? "You passed the quiz."
              : "You did not pass. You can retake the quiz."}
          </Text>
        </div>
        {!passed && (
          <Button onClick={handleRetakeQuiz} className="h-14">
            Retake Quiz
          </Button>
        )}
      </div>
    );
  }

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
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = option.id === question.answer;

          let buttonClasses =
            "w-full rounded-3xl border p-5 text-left transition-all duration-200 disabled:cursor-not-allowed";

          if (showFeedback && isCorrectOption) {
            buttonClasses += " border-emerald-500 bg-emerald-50 text-slate-900";
          } else if (showFeedback && isSelected && !isCorrectOption) {
            buttonClasses += " border-red-500 bg-red-50 text-slate-900";
          } else {
            buttonClasses +=
              " border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectAnswer(option.id)}
              disabled={showFeedback}
              className={buttonClasses}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold">{option.id}</div>
                  <div className="text-base leading-6">{option.text}</div>
                </div>
                {showFeedback && isCorrectOption && (
                  <span className="text-lg font-semibold text-emerald-600">
                    ✓
                  </span>
                )}
                {showFeedback && isSelected && !isCorrectOption && (
                  <span className="text-lg font-semibold text-red-600">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={`rounded-2xl border px-4 py-3 ${selectedOptionId === question.answer ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}
        >
          {selectedOptionId === question.answer
            ? "Correct answer!"
            : "Incorrect. The correct answer is highlighted in green."}
        </div>
      )}
    </div>
  );
}
