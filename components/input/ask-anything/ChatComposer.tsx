
"use client";

import {
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { SendHorizontal, Sparkles } from "lucide-react";
import type { ChatComposerProps } from "./chat.types";

export default function ChatComposer({
  value,
  onChange,
  onSubmit,
  isSending,
  limitReached,
  disabled = false,
}: ChatComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSending && !limitReached && !disabled && value.trim()) {
      onSubmit();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (!isSending && !limitReached && !disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-[62px] items-center gap-3 rounded-[19px] bg-white px-4 py-2"
    >
      <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-[#00343E]">
        <Sparkles
          size={20}
          strokeWidth={1.8}
          className="text-[#43AC47]"
        />
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          limitReached
            ? "Daily question limit reached"
            : "Ask anything........."
        }
        aria-label="Type your course question"
        rows={1}
        disabled={isSending || limitReached || disabled}
        className="max-h-[120px] min-h-[26px] min-w-0 flex-1 resize-none bg-transparent py-1 text-[13px] leading-[21px] text-[#0C404E] outline-none placeholder:text-[#B9C8C8] disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={
          !value.trim() ||
          isSending ||
          limitReached ||
          disabled
        }
        aria-label="Send message"
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px] bg-[#43AC47] text-white transition-colors hover:bg-[#36983B] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SendHorizontal size={22} strokeWidth={1.8} />
      </button>
    </form>
  );
}
