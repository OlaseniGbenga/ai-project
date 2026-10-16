
import type { Course } from "@/features/auth/types/courses.type";
import { ArrowRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LearningCourseCardProps {
  course: Course;
}

export default function LearningCourseCard({
  course,
}: LearningCourseCardProps) {
  const lessons = course.lessons ?? [];

  const duration = lessons.reduce(
    (total, lesson) => total + (lesson.durationMinutes ?? 0),
    0,
  );

  const moduleCount = course.totalModules ?? 0;
  const lessonCount = lessons.length;

  const courseLevel = course.level
    ? course.level.toLowerCase()
    : "beginner";

  return (
    <article className="flex h-[407px] w-full min-w-0 max-w-[334px] flex-col overflow-hidden rounded-[12px] border border-[#E5EAE8] bg-white transition-shadow duration-200 hover:shadow-md">
      <Link
        href={`/courses/${course.id}`}
        className="relative block h-[165px] w-full shrink-0 overflow-hidden"
        aria-label={`View ${course.title}`}
      >
        <Image
          src="/tailor-cutting-dress.webp"
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 334px"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className="flex min-h-0 flex-1 flex-col px-[18px] pb-[18px] pt-[16px]">
        <span className="inline-flex w-fit items-center rounded-full bg-[#EAF7EC] px-[10px] py-[5px] text-[11px] font-medium capitalize leading-none text-[#35A44C]">
          {courseLevel}
        </span>

        <h3
          className="mt-[12px] line-clamp-2 text-[18px] font-normal leading-[1.35] text-[#052128]"
          style={{ fontFamily: '"GFS Didot", serif' }}
          title={course.title}
        >
          {course.title}
        </h3>

        <p
          className="mt-[9px] line-clamp-2 text-[13px] font-normal leading-[1.55] text-[#536B73]"
          title={course.description}
        >
          {course.description}
        </p>

        <div className="mt-auto pt-[12px]">
          <div className="flex min-h-[22px] flex-wrap items-center gap-x-[10px] gap-y-1 border-t border-[#E5EAE8] pt-[12px] text-[12px] text-[#536B73]">
            <span>
              {moduleCount > 0
                ? `${moduleCount} ${moduleCount === 1 ? "Module" : "Modules"}`
                : lessonCount > 0
                  ? `${lessonCount} ${lessonCount === 1 ? "Lesson" : "Lessons"}`
                  : "Course"}
            </span>

            {duration > 0 && (
              <>
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#B8D8CE]" />

                <span className="inline-flex items-center gap-[5px]">
                  <Clock3 size={14} strokeWidth={1.7} />
                  {duration} min
                </span>
              </>
            )}
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="mt-[13px] inline-flex min-h-[28px] items-center gap-[10px] text-[15px] font-semibold text-[#38A845] transition-colors hover:text-[#278635] hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38A845]"
          >
            View Course
            <ArrowRight size={18} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </article>
  );
}
