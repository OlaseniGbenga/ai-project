
"use client";

import Link from "next/link";
import { Check, Clock3, LockKeyhole } from "lucide-react";

type LessonStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "LOCKED"
  | "UP_NEXT";

interface ModuleLesson {
  id: string;
  title: string;
  orderNumber: number;
  durationMinutes?: number | null;
  status: LessonStatus | string;
}

interface CourseModule {
  id: string;
  title: string;
  orderNumber: number;
  lessons?: ModuleLesson[];
}

interface ModuleLessonsSidebarProps {
  courseId: string;
  lessonId: string;
  modules: CourseModule[];
}

export default function ModuleLessonsSidebar({
  courseId,
  lessonId,
  modules,
}: ModuleLessonsSidebarProps) {
  const currentModule = modules.find((module) =>
    module.lessons?.some((lesson) => lesson.id === lessonId),
  );

  if (!currentModule) {
    return null;
  }

  const lessons = [...(currentModule.lessons ?? [])].sort(
    (a, b) => a.orderNumber - b.orderNumber,
  );

  return (
    <aside className="w-full max-w-[355px] rounded-[10px] border border-[#E3E8E5] bg-white px-5 py-6">
      <h2
        className="mb-6 text-[23px] font-normal leading-[31px] text-[#0C404E]"
        style={{
          fontFamily: '"GFS Didot", "Times New Roman", serif',
        }}
      >
        Module {String(currentModule.orderNumber).padStart(2, "0")} Lessons
      </h2>

      <div className="relative">
        {lessons.length > 1 && (
          <div className="absolute bottom-[34px] left-[15px] top-[34px] w-px bg-[#D7DEDB]" />
        )}

        <div className="flex flex-col gap-2">
          {lessons.map((lesson, index) => {
            const isCurrent = lesson.id === lessonId;
            const isCompleted = lesson.status === "COMPLETED";
            const isLocked = lesson.status === "LOCKED";

            const row = (
              <div
                className={`relative flex min-h-[78px] items-start gap-3 rounded-[8px] px-3 py-[14px] ${
                  isCurrent ? "bg-[#F1EFF9]" : ""
                }`}
              >
                <div className="relative z-10 flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-white">
                  {isCompleted ? (
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#43AC47] text-white">
                      <Check size={14} strokeWidth={2} />
                    </span>
                  ) : isCurrent ? (
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-[2px] border-[#43AC47]">
                      <span className="h-[9px] w-[9px] rounded-full bg-[#43AC47]" />
                    </span>
                  ) : isLocked ? (
                    <LockKeyhole size={18} strokeWidth={1.5} className="text-[#A6AFAC]" />
                  ) : (
                    <span className="h-[20px] w-[20px] rounded-full border-[1.5px] border-[#A6AFAC]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[14px] font-normal leading-[21px] ${
                      isLocked ? "text-[#A5AFAD]" : "text-[#0C404E]"
                    }`}
                  >
                    {lesson.title}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-[7px] text-[12px] text-[#82918E]">
                    <span>
                      Lesson {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true">·</span>
                    <Clock3 size={13} strokeWidth={1.5} />
                    <span>{lesson.durationMinutes ?? 0} min</span>
                  </div>
                </div>
              </div>
            );

            if (isCurrent || isLocked) {
              return (
                <div
                  key={lesson.id}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-disabled={isLocked ? true : undefined}
                >
                  {row}
                </div>
              );
            }

            return (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lesson/${lesson.id}`}
                className="block rounded-[8px] hover:bg-[#F7F8F7]"
              >
                {row}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
