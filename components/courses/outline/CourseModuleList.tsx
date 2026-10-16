import Link from "next/link";
import { BookOpen, Check, LockKeyhole } from "lucide-react";
import type { LessonStatus } from "@/features/auth/types/courses.type";

export interface OutlineLesson {
  id: string;
  title: string;
  durationMinutes: number;
  status: LessonStatus | "completed" | "current" | "locked";
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: OutlineLesson[];
}

interface CourseModuleListProps {
  modules: CourseModule[];
  courseId?: string;
}

export default function CourseModuleList({ modules, courseId }: CourseModuleListProps) {
  return (
    <div className="flex flex-col gap-5">
      {modules.map((module, index) => {
        const locked = module.lessons.every((lesson) =>
          lesson.status === "LOCKED" || lesson.status === "locked",
        );

        return (
          <section key={module.id} className="overflow-hidden rounded-[12px] border border-[#E5EAE8] bg-white">
            <div className="flex items-center justify-between gap-3 bg-[#F8F8FC] px-5 py-4">
              <h2 className="text-[14px] font-normal text-[#052128]" style={{ fontFamily: '"GFS Didot", serif' }}>
                Module {index + 1}: {module.title}
              </h2>
              {locked && <LockKeyhole size={17} className="shrink-0 text-[#A7B8BA]" />}
            </div>

            {module.lessons.map((lesson) => {
              const completed = lesson.status === "COMPLETED" || lesson.status === "completed";
              const current = lesson.status === "IN_PROGRESS" || lesson.status === "UP_NEXT" || lesson.status === "current";
              const isLocked = lesson.status === "LOCKED" || lesson.status === "locked";
              const content = (
                <div className={`flex items-center gap-4 border-t border-[#EEF0F0] px-5 py-4 ${current ? "bg-[#DDEDE9]" : ""}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${completed ? "bg-[#E1F2E8] text-[#2FA66A]" : current ? "bg-[#0C404E] text-white" : "border border-[#E5EAE8] bg-[#F8F8FC] text-[#B5C0C4]"}`}>
                    {completed ? <Check size={16} /> : isLocked ? <LockKeyhole size={14} /> : <BookOpen size={15} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] leading-5 text-[#052128]">
                      {lesson.title}
                      {current && <span className="text-[#536B73]"> · Current Lesson</span>}
                    </p>
                    <p className="mt-1 text-[12px] text-[#536B73]">{lesson.durationMinutes} min</p>
                  </div>
                </div>
              );
              return courseId && !isLocked ? (
                <Link key={lesson.id} href={`/courses/${courseId}/lesson/${lesson.id}`} className="block hover:bg-[#F7F8F7]">
                  {content}
                </Link>
              ) : (
                <div key={lesson.id} aria-disabled={isLocked || undefined}>{content}</div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
