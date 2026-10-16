
import type { Course } from "@/features/auth/types/courses.type";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedCourseCardProps {
  course: Course;
}

export default function FeaturedCourseCard({
  course,
}: FeaturedCourseCardProps) {
  const duration =
    course.lessons?.reduce(
      (total, lesson) => total + (lesson.durationMinutes ?? 0),
      0,
    ) ?? 0;

  return (
    <section className="grid w-full max-w-[1050px] overflow-hidden rounded-[12px] border border-[#E5EAE8] bg-white lg:min-h-[348px] lg:grid-cols-[56%_44%]">
      <div className="relative min-h-[260px] lg:min-h-[348px]">
        <Image
          src="/tailor-cutting-dress.webp"
          alt={course.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 587px"
        />

        <span className="absolute left-6 top-6 inline-flex items-center gap-1 rounded-full bg-[#E8F7ED] px-2.5 py-1 text-[11px] font-medium text-[#299C45]">
          <span className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#2DAA66]">
            <Check size={9} strokeWidth={3} color="#FFFFFF" />
          </span>
          Featured Course
        </span>
      </div>

      <div className="flex min-w-0 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="w-full max-w-[350px]">
          <h2
            className="text-[28px] font-normal leading-[1.3] text-[#052128] lg:text-[32px]"
            style={{ fontFamily: '"GFS Didot", serif' }}
          >
            {course.title}
          </h2>

          <p className="mt-3 line-clamp-4 text-[14px] leading-[1.6] text-[#536B73]">
            {course.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] text-[#536B73]">
            <span className="capitalize">
              {course.level.toLowerCase()}
            </span>

            <span className="h-1 w-1 rounded-full bg-[#B8D8CE]" />

            <span>{course.totalModules} Modules</span>

            {duration > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-[#B8D8CE]" />
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={13} strokeWidth={1.7} />
                  {duration} min
                </span>
              </>
            )}
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="mt-7 inline-flex w-fit items-center gap-4 rounded-[10px] bg-[#40AC49] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#348D3B]"
          >
            View Course
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
