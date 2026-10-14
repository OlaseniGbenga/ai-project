
"use client";

import { Sparkles } from "lucide-react";

export default function ChatTypingIndicator() {
  return (
    <div
      role="status"
      aria-label="AI assistant is responding"
      className="flex items-center gap-3"
    >
      <div className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#00343E]">
        <Sparkles
          size={16}
          strokeWidth={1.8}
          className="text-[#43AC47]"
        />
      </div>

      <div className="flex items-center gap-[5px] rounded-full px-2 py-3">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-[7px] w-[7px] animate-bounce rounded-full bg-[#63777B]"
            style={{
              animationDelay: `${index * 150}ms`,
              animationDuration: "900ms",
            }}
          />
        ))}
      </div>
    </div>
  );
}
