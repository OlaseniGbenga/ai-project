
"use client";

import { useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";

export default function CoursesAskAnything() {
    const [question, setQuestion] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-5"
        >
            <div className="flex h-[70px] w-full max-w-[713px] min-w-0 items-center gap-5 rounded-[24px] bg-[#0C404E] px-5">
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#40AC49] text-white">
                    <Sparkles size={23} />
                </span>

                <input
                    type="text"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask anything........."
                    aria-label="Ask anything"
                    className="w-full min-w-0 bg-transparent text-[16px] text-white outline-none placeholder:text-[#B6CCD0]"
                />
            </div>

            <button
                type="submit"
                aria-label="Send question"
                disabled={!question.trim()}
                className="flex h-[70px] w-[78px] shrink-0 items-center justify-center rounded-[14px] bg-[#0C404E] text-white disabled:opacity-60"
            >
                <SendHorizontal size={35} strokeWidth={1.8} />
            </button>
        </form>
    );

}
