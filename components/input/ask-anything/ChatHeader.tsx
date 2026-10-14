
"use client";

import { ArrowLeft, Sparkles, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({
  onClose,
}: ChatHeaderProps) {
  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-[#E4EBE8] px-5 py-5 sm:px-9">
      <button
        type="button"
        onClick={onClose}
        aria-label="Return to lesson"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0C404E] transition-colors hover:bg-[#E6EFEC]"
      >
        <ArrowLeft size={21} strokeWidth={1.8} />
      </button>

      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#00343E]">
        <Sparkles
          size={22}
          strokeWidth={1.8}
          className="text-[#43AC47]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-[17px] font-semibold text-[#0C404E]">
          Ask Anything
        </h2>

        <p className="mt-1 text-[12px] text-[#63777B]">
          Your course learning assistant
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close chat"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#63777B] transition-colors hover:bg-[#E6EFEC]"
      >
        <X size={19} strokeWidth={1.8} />
      </button>
    </header>
  );
}
