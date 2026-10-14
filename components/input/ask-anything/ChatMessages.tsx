
"use client";

import { useEffect, useRef } from "react";
import {
  CircleAlert,
  Sparkles,
  UserRound,
} from "lucide-react";
import ChatTypingIndicator from "./ChatTypingIndicator";
import type { ChatMessage } from "./chat.types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isSending: boolean;
  error: string | null;
  canRetry: boolean;
  onRetry: () => void;
}

export default function ChatMessages({
  messages,
  isSending,
  error,
  canRetry,
  onRetry,
}: ChatMessagesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending, error]);

  return (
    <div
      ref={scrollContainerRef}
      className="min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-12 sm:py-10 lg:px-[80px]"
      aria-label="Chat conversation"
      aria-live="polite"
    >
      {messages.length === 0 && !isSending ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#E6F5EA]">
            <Sparkles
              size={28}
              strokeWidth={1.7}
              className="text-[#43AC47]"
            />
          </div>

          <h3
            className="mt-5 text-[26px] text-[#0C404E]"
            style={{
              fontFamily: '"GFS Didot", Georgia, serif',
            }}
          >
            What would you like to know?
          </h3>

          <p className="mt-3 max-w-[360px] text-[13px] leading-[22px] text-[#63777B]">
            Ask questions about your course, lessons, quizzes,
            or practical tasks.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {isUser ? (
                  <>
                    <div className="max-w-[85%] rounded-[17px] bg-[#E8F3EF] px-5 py-3 text-[13px] leading-[22px] text-[#0C404E]">
                      <p className="whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>

                    <div className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#C9C5FF] text-[#4138C9]">
                      <UserRound
                        size={16}
                        strokeWidth={1.8}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#00343E]">
                      <Sparkles
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#43AC47]"
                      />
                    </div>

                    <p className="max-w-[85%] whitespace-pre-wrap break-words pt-1 text-[13px] leading-[22px] text-[#0C404E]">
                      {message.content}
                    </p>
                  </>
                )}
              </div>
            );
          })}

          {isSending && <ChatTypingIndicator />}

          {error && (
            <div
              role="alert"
              className="rounded-[12px] border border-[#F3CECA] bg-[#FFF5F4] px-5 py-4"
            >
              <div className="flex items-start gap-3 text-[#C72E25]">
                <CircleAlert
                  size={19}
                  className="mt-[1px] shrink-0"
                />

                <div className="min-w-0">
                  <p className="text-[13px] leading-[21px]">
                    {error}
                  </p>

                  {canRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="mt-3 text-[13px] font-medium underline"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
