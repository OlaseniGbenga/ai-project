
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

interface LessonSlide {
  heading: string;
  body: string;
}

function cleanText(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|h[1-6]|li)>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function createHeading(text: string, fallback: string) {
  const firstSentence =
    text.match(/^[^.!?]+[.!?]?/)?.[0]?.trim() ?? text.trim();

  const words = firstSentence.split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return fallback;
  }

  const heading = words.slice(0, 7).join(" ");

  return words.length > 7
    ? `${heading.replace(/[.,;:!?]+$/, "")}...`
    : heading;
}

function createSlides(content: string, title: string): LessonSlide[] {
  const paragraphs = cleanText(content)
    .split(/\n\s*\n|\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const sections: string[] = [];

  for (const paragraph of paragraphs) {
    const sentences =
      paragraph
        .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
        ?.map((sentence) => sentence.trim())
        .filter(Boolean) ?? [paragraph];

    let current = "";

    for (const sentence of sentences) {
      if (current && `${current} ${sentence}`.length > 240) {
        sections.push(current);
        current = sentence;
      } else {
        current = current ? `${current} ${sentence}` : sentence;
      }
    }

    if (current) {
      sections.push(current);
    }
  }

  if (sections.length === 0) {
    return [
      {
        heading: title,
        body: "Lesson content is not available yet.",
      },
    ];
  }

  return sections.map((body, index) => ({
    heading:
      index === 0 ? title : createHeading(body, `Lesson Part ${index + 1}`),
    body,
  }));
}

export default function LessonCarousel({
  lessonId,
  lessonNumber,
  title,
  content,
}: LessonCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () => createSlides(content, title),
    [content, title],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [lessonId]);

  const currentIndex = Math.min(activeIndex, slides.length - 1);
  const currentSlide = slides[currentIndex];

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
          disabled={currentIndex === 0}
          aria-label="Previous slide"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={25} strokeWidth={1.5} />
        </button>

        <div className="flex h-[470px] w-full min-w-0 max-w-[506px] flex-col overflow-hidden rounded-[10px] bg-[#F1F1EA] px-5 pb-7 pt-9 sm:h-[543px] sm:px-9 sm:pb-9 sm:pt-12">
          <div className="shrink-0">
            <span className="inline-flex min-h-[40px] items-center rounded-[6px] bg-[#0C404E] px-4 py-2 text-[11px] font-normal tracking-[0.08em] text-white">
              LESSON {String(lessonNumber).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-7 flex min-h-0 flex-1 flex-col sm:mt-9">
            <div className="shrink-0">
              <h2
                key={`${lessonId}-heading-${currentIndex}`}
                className="line-clamp-3 break-words text-[27px] font-normal leading-[1.16] text-[#40AC47] sm:text-[36px]"
                style={{
                  fontFamily:
                    '"GFS Didot", "Times New Roman", serif',
                }}
                title={currentSlide.heading}
              >
                {currentSlide.heading}
              </h2>

              <div className="relative mt-3 h-[18px] w-[160px] max-w-full sm:mt-4 sm:h-[22px] sm:w-[205px]">
                <Image
                  src="/lesson-title-stroke.svg"
                  alt=""
                  fill
                  sizes="205px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>

            <div
              key={`${lessonId}-content-${currentIndex}`}
              className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2 sm:mt-6"
            >
              <p
                className="whitespace-pre-wrap break-words text-[18px] font-normal leading-[1.45] text-[#0C404E] sm:text-[24px] sm:leading-[32px]"
                style={{
                  fontFamily:
                    '"GFS Didot", "Times New Roman", serif',
                }}
              >
                {currentSlide.body}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={currentIndex === slides.length - 1}
          aria-label="Next slide"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
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
            aria-current={currentIndex === index ? "step" : undefined}
            className={`h-[8px] w-[8px] shrink-0 rounded-full transition-colors ${
              currentIndex === index
                ? "bg-white"
                : "bg-[#718084]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
