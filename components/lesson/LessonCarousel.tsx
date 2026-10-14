
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonCarouselProps {
    lessonId: string;
    lessonNumber: number;
    title: string;
    content: string;
}

function createSlides(content: string) {
    const paragraphs = content
        .replace(/<[^>]*>/g, " ")
        .split(/\n\s*\n|\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const slides: string[] = [];

    for (const paragraph of paragraphs) {
        const sentences =
            paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((part) => part.trim()) ??
            [paragraph];

        let current = "";

        for (const sentence of sentences) {
            if (current && `${current} ${sentence}`.length > 240) {
                slides.push(current);
                current = sentence;
            } else {
                current = current ? `${current} ${sentence}` : sentence;
            }
        }

        if (current) {
            slides.push(current);
        }
    }

    return slides.length ? slides : ["Lesson content is not available yet."];
}

export default function LessonCarousel({
    lessonId,
    lessonNumber,
    title,
    content,
}: LessonCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = useMemo(() => createSlides(content), [content]);

    useEffect(() => {
        setActiveIndex(0);
    }, [lessonId]);

    const previous = () => {
        setActiveIndex((index) => Math.max(0, index - 1));
    };

    const next = () => {
        setActiveIndex((index) =>
            Math.min(slides.length - 1, index + 1),
        );
    };

    return (
        <section
            aria-label="Lesson slides"
            className="flex min-h-[620px] w-full max-w-[676px] flex-col items-center justify-center bg-[#052128] px-3 py-10 sm:min-h-[758px] sm:px-5"
        >
            <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
                <button
                    type="button"
                    onClick={previous}
                    disabled={activeIndex === 0}
                    aria-label="Previous slide"
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-white disabled:opacity-30 sm:h-10 sm:w-10"
                >
                    <ChevronLeft size={25} strokeWidth={1.5} />
                </button>

                <div
                    className="relative flex h-[470px] w-full max-w-[506px] flex-col overflow-hidden rounded-[10px] bg-[#F1F1EA] px-5 pb-8 pt-9 sm:h-[543px] sm:px-9 sm:pt-12"
                    style={{
                        backgroundImage: "url('/lessons/lesson-card-bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span className="w-fit rounded-[6px] bg-[#0C404E] px-4 py-2 text-[11px] font-normal tracking-[0.08em] text-white">
                        LESSON {String(lessonNumber).padStart(2, "0")}
                    </span>

                    <div className="mt-8 flex min-h-0 flex-1 flex-col sm:mt-10">
                        <h2
                            className="line-clamp-3 text-[29px] font-normal leading-[1.13] text-[#40AC47] sm:text-[37px]"
                            style={{
                                fontFamily:
                                    '"GFS Didot", "Times New Roman", serif',
                            }}
                        >
                            {title}
                        </h2>

                        <div className="relative mt-2 h-[25px] w-[190px] max-w-full sm:w-[230px]">
                            <Image
                                src="/lessons/lesson-title-stroke.svg"
                                alt=""
                                fill
                                className="object-contain object-left"
                            />
                        </div>

                        <p
                            className="mt-5 overflow-y-auto text-[18px] font-normal leading-[1.4] text-[#0C404E] sm:mt-7 sm:text-[24px] sm:leading-[32px]"
                            style={{
                                fontFamily:
                                    '"GFS Didot", "Times New Roman", serif',
                            }}
                        >
                            {slides[activeIndex]}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={next}
                    disabled={activeIndex === slides.length - 1}
                    aria-label="Next slide"
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-white disabled:opacity-30 sm:h-10 sm:w-10"
                >
                    <ChevronRight size={25} strokeWidth={1.5} />
                </button>
            </div>

            <div
                className="mt-8 flex max-w-full flex-wrap items-center justify-center gap-[9px]"
                aria-label="Slide navigation"
            >
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={activeIndex === index ? "step" : undefined}
                        className={`h-[8px] w-[8px] shrink-0 rounded-full transition-colors ${activeIndex === index
                                ? "bg-white"
                                : "bg-[#718084]"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
