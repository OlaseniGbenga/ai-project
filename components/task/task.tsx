
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import {
  ArrowRight,
  CheckCheck,
  Copy,
  Sparkles,
} from "lucide-react";

import { PracTask } from "@/features/auth/types/courses.type";
import { usePostPracTask } from "@/features/auth/hooks/useCourse";

interface TaskProps {
  lessonID?: string;
  TaskData: PracTask;
}

export default function TaskCard({
  lessonID,
  TaskData,
}: TaskProps) {
  const router = useRouter();
  const { mutate, isPending } = usePostPracTask(TaskData.id);
  const [copied, setCopied] = useState(false);

  const instructions = TaskData.instructions?.trim() ?? "";

  const handleCopyPrompt = async () => {
    if (!instructions) return;

    try {
      await navigator.clipboard.writeText(instructions);
      setCopied(true);

      notifications.show({
        title: "Prompt copied",
        message: "You can paste the prompt into your preferred AI tool.",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Unable to copy",
        message: "Please select and copy the prompt manually.",
        color: "red",
      });
    }
  };

  const handleTryWithAI = () => {
    window.open(
      "https://chatgpt.com/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleCompleteTask = () => {
    mutate(undefined, {
      onSuccess: (res) => {
        if (res?.data?.task.status === "COMPLETED") {
          notifications.show({
            title: "Completed",
            message: "You have completed the practical task.",
            color: "green",
          });

          if (res?.data?.nextLessonId) {
            router.push(
              `/courses/${res.data.task.courseId}/lesson/${res.data.nextLessonId}`,
            );
          } else {
            router.push("/courses");
          }
        } else {
          notifications.show({
            title: "Try again",
            message: "The practical task could not be completed.",
            color: "red",
          });
        }
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while completing the task.";

        notifications.show({
          title: "Submission failed",
          message,
          color: "red",
        });
      },
    });
  };

  return (
    <section className="mx-auto w-full max-w-[720px] rounded-[10px] border border-[#E6E9E8] bg-white px-5 py-10 sm:px-10 sm:py-12">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFAF0] px-3 py-[6px]">
          <Sparkles
            size={13}
            strokeWidth={1.8}
            className="text-[#087D4B]"
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-[#0B3440]">
            Practical Task
          </span>
        </div>

        <h1
          className="mt-4 text-[26px] font-normal leading-[1.25] text-[#0B3440] sm:text-[30px]"
          style={{
            fontFamily: '"GFS Didot", Georgia, serif',
          }}
        >
          Put what you learned into practice
        </h1>

        <p className="mt-3 max-w-[440px] text-[13px] leading-[21px] text-[#647A82]">
          See how you can apply what you learned using AI.
        </p>
      </div>

      <div className="mx-auto mt-9 w-full max-w-[560px]">
        <div className="border-l-2 border-[#43AC47] pl-4">
          <h2
            className="text-[11px] uppercase tracking-[0.06em] text-[#0B3440]"
            style={{
              fontFamily: '"GFS Didot", Georgia, serif',
            }}
          >
            Based on this lesson
          </h2>

          <p className="mt-2 text-[13px] leading-[21px] text-[#647A82]">
            Apply the concepts covered in this lesson to a practical
            exercise using an AI assistant.
          </p>
        </div>

        <div className="mt-4 border-l-2 border-[#E6E9E8] pl-4">
          <h2
            className="text-[11px] uppercase tracking-[0.06em] text-[#0B3440]"
            style={{
              fontFamily: '"GFS Didot", Georgia, serif',
            }}
          >
            Try this with AI
          </h2>

          <p className="mt-2 whitespace-pre-line text-[13px] leading-[21px] text-[#647A82]">
            {instructions}
          </p>
        </div>

        <div className="mt-7 rounded-[10px] border border-[#E6E9E8] bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles
                size={15}
                strokeWidth={1.8}
                className="text-[#43AC47]"
              />
              <span
                className="text-[13px] text-[#43AC47]"
                style={{
                  fontFamily: '"GFS Didot", Georgia, serif',
                }}
              >
                Suggested prompt
              </span>
            </div>

            <span
              className="text-[10px] text-[#63777B]"
              style={{
                fontFamily: '"GFS Didot", Georgia, serif',
              }}
            >
              One-click ready
            </span>
          </div>

          <div className="mt-4 rounded-[7px] bg-[#F0F0FF] px-4 py-4">
            <p className="whitespace-pre-line break-words text-[13px] leading-[21px] text-[#647A82]">
              {instructions}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyPrompt}
              disabled={!instructions}
              className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-[6px] border border-[#E6E9E8] bg-white px-4 text-[12px] font-medium text-[#0B3440] transition-colors hover:bg-[#F7F8F7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? (
                <CheckCheck
                  size={15}
                  strokeWidth={1.8}
                />
              ) : (
                <Copy
                  size={15}
                  strokeWidth={1.8}
                />
              )}
              {copied ? "Copied" : "Copy prompt"}
            </button>

            <button
              type="button"
              onClick={handleTryWithAI}
              className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-[6px] bg-[#006747] px-5 text-[12px] font-medium text-white transition-colors hover:bg-[#00563C]"
            >
              Try it with AI
              <ArrowRight size={15} strokeWidth={1.8} />
            </button>
          </div>

          <p className="mt-3 text-[11px] leading-[18px] text-[#43AC47]">
            Use the prompt in your preferred AI tool.
          </p>
        </div>

        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={handleCompleteTask}
            disabled={isPending}
            className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-[6px] bg-[#43AC47] px-6 text-[12px] font-medium text-white transition-colors hover:bg-[#36983B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Completing..." : "Continue"}
            {!isPending && (
              <ArrowRight size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
