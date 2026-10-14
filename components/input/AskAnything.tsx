
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { SendHorizontal, Sparkles } from "lucide-react";

import { useAiAssistant } from "@/features/auth/hooks/useAiAssistant";
import ChatHeader from "./ask-anything/ChatHeader";
import ChatMessages from "./ask-anything/ChatMessages";
import ChatComposer from "./ask-anything/ChatComposer";
import type {
  ApiErrorBody,
  ChatMessage,
} from "./ask-anything/chat.types";

interface AskAnythingProps {
  courseId: string;
  lessonId?: string;
}

export default function AskAnything({
  courseId,
  lessonId,
}: AskAnythingProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [remainingQuestions, setRemainingQuestions] = useState<
    number | null
  >(null);
  const [dailyLimit, setDailyLimit] = useState<number | null>(null);

  const nextMessageId = useRef(0);
  const sendingRef = useRef(false);

  const { mutateAsync, isPending } = useAiAssistant();

  const limitReached = remainingQuestions === 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const addMessage = (
    role: ChatMessage["role"],
    content: string,
  ) => {
    nextMessageId.current += 1;

    const message: ChatMessage = {
      id: nextMessageId.current,
      role,
      content,
    };

    setMessages((previous) => [...previous, message]);
  };

  const sendMessage = async (
    question: string,
    retry = false,
  ) => {
    const trimmed = question.trim();

    if (
      !trimmed ||
      sendingRef.current ||
      limitReached ||
      !courseId
    ) {
      return;
    }

    sendingRef.current = true;

    setIsOpen(true);
    setError(null);
    setFailedMessage(null);
    setValue("");

    if (!retry) {
      addMessage("user", trimmed);
    }

    try {
      const response = await mutateAsync({
        message: trimmed,
        courseId,
        ...(lessonId ? { lessonId } : {}),
      });

      if (!response.reply?.trim()) {
        throw new Error(
          "The assistant did not return a valid reply.",
        );
      }

      if (typeof response.dailyLimit === "number") {
        setDailyLimit(response.dailyLimit);
      }

      if (typeof response.remainingQuestions === "number") {
        setRemainingQuestions(response.remainingQuestions);
      }

      addMessage("assistant", response.reply);
    } catch (caughtError: unknown) {
      if (axios.isAxiosError<ApiErrorBody>(caughtError)) {
        const status = caughtError.response?.status;
        const body = caughtError.response?.data;
        const backendMessage = body?.message;

        if (typeof body?.dailyLimit === "number") {
          setDailyLimit(body.dailyLimit);
        }

        if (typeof body?.remainingQuestions === "number") {
          setRemainingQuestions(body.remainingQuestions);
        }

        if (status === 429) {
          setRemainingQuestions(0);
        }

        const formattedMessage = Array.isArray(backendMessage)
          ? backendMessage.join(". ")
          : backendMessage;

        setError(
          formattedMessage ||
            (status === 401
              ? "Your session has expired. Please log in again."
              : status === 403
                ? "This assistant only answers questions related to your assigned course."
                : status === 404
                  ? "Your course or lesson could not be found."
                  : status === 429
                    ? "You have reached your daily AI question limit. Please try again tomorrow."
                    : "Unable to send your question. Please try again."),
        );
      } else {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to send your question. Please try again.",
        );
      }

      setFailedMessage(trimmed);
    } finally {
      sendingRef.current = false;
    }
  };

  const handleSend = () => {
    void sendMessage(value);
  };

  const handleRetry = () => {
    if (failedMessage) {
      void sendMessage(failedMessage, true);
    }
  };

  const remainingLabel =
    remainingQuestions !== null && dailyLimit !== null
      ? `${remainingQuestions} of ${dailyLimit} questions remaining today`
      : null;

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
        className="mt-5 flex w-full items-center gap-3"
      >
        <div className="flex min-h-[64px] min-w-0 flex-1 items-center gap-4 rounded-[24px] bg-[#0C404E] px-5">
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#43AC47]">
            <Sparkles
              size={23}
              strokeWidth={1.7}
              className="text-white"
            />
          </div>

          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={
              limitReached
                ? "Daily question limit reached"
                : "Ask anything......"
            }
            aria-label="Ask a course-related question"
            disabled={isPending || limitReached}
            className="h-[64px] min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-[#B8CBCE] disabled:opacity-70"
          />
        </div>

        <button
          type="submit"
          disabled={
            !value.trim() ||
            isPending ||
            limitReached ||
            !courseId
          }
          aria-label="Send question"
          className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[12px] bg-[#0C404E] text-white transition-colors hover:bg-[#125463] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={25} strokeWidth={1.8} />
        </button>
      </form>

      {mounted &&
        isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#071D22]/40 p-3 sm:p-5">
            <section
              role="dialog"
              aria-modal="true"
              aria-label="Ask Anything AI assistant"
              className="flex h-[min(773px,calc(100dvh-24px))] w-full max-w-[992px] flex-col overflow-hidden rounded-[20px] border border-[#DCE5E2] bg-[#F7FAF9] shadow-[0_20px_80px_rgba(0,0,0,0.12)] sm:h-[min(773px,calc(100dvh-40px))]"
            >
              <ChatHeader onClose={() => setIsOpen(false)} />

              <ChatMessages
                messages={messages}
                isSending={isPending}
                error={error}
                canRetry={
                  Boolean(failedMessage) &&
                  !isPending &&
                  !limitReached
                }
                onRetry={handleRetry}
              />

              <div className="shrink-0 px-4 pb-5 sm:px-10 sm:pb-7 lg:px-[80px]">
                {remainingLabel && (
                  <p className="mb-3 text-right text-[11px] text-[#63777B]">
                    {remainingLabel}
                  </p>
                )}

                <ChatComposer
                  value={value}
                  onChange={setValue}
                  onSubmit={handleSend}
                  isSending={isPending}
                  limitReached={limitReached}
                  disabled={!courseId}
                />
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
