
"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock3,
  LockKeyhole,
} from "lucide-react";
import { Skeleton } from "@mantine/core";
import CourseProgressPanel from "@/components/courses/outline/CourseProgressPanel";
import UpNextPanel from "@/components/courses/outline/UpNextPanel";
import AskAnything from "@/components/input/AskAnything";
import { useGetLessons } from "@/features/auth/hooks/useCourse";

interface PageProps {
  params: Promise<{
    courseID: string;
  }>;
}

export default function CourseOutlinePage({ params }: PageProps) {
  const { courseID } = use(params);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetLessons(courseID);

  const course = data?.data;

  const lessons = [...(course?.lessons ?? [])].sort(
    (a, b) => a.orderNumber - b.orderNumber,
  );

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "COMPLETED",
  ).length;

  const totalLessons = course?.totalLessons ?? lessons.length;

  const nextLesson =
    lessons.find((lesson) => lesson.status === "IN_PROGRESS") ??
    lessons.find((lesson) => lesson.status === "UP_NEXT") ??
    lessons.find(
      (lesson) =>
        !lesson.isLocked && lesson.status !== "COMPLETED",
    );

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-[1050px] pb-10">
        <Skeleton height={40} width={240} radius={8} />
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,632px)_minmax(0,362px)]">
          <Skeleton height={450} radius={12} />
          <Skeleton height={300} radius={12} />
        </div>
      </main>
    );
  }

  if (isError || !course) {
    return (
      <main className="mx-auto w-full max-w-[1050px]">
        <Link
          href={`/courses/${courseID}`}
          className="inline-flex items-center gap-2 text-[#536B73]"
        >
          <ArrowLeft size={18} />
          Back to Course
        </Link>

        <p role="alert" className="mt-6 rounded-xl bg-red-50 p-6 text-red-700">
          {error instanceof Error
            ? error.message
            : "Unable to load the course outline."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1050px] min-w-0 pb-10">
      <Link
        href={`/courses/${courseID}`}
        className="inline-flex items-center gap-2 text-[14px] text-[#536B73] hover:text-[#052128]"
      >
        <ArrowLeft size={18} />
        Back to Course
      </Link>

      <h1
        className="mb-6 mt-5 text-[28px] font-normal text-[#052128] sm:text-[32px]"
        style={{ fontFamily: '"GFS Didot", serif' }}
      >
        Course Outline
      </h1>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,632px)_minmax(0,362px)]">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="overflow-hidden rounded-[12px] border border-[#E5EAE8] bg-white">
            <div className="bg-[#F8F8FC] px-5 py-5">
              <h2
                className="text-[18px] font-normal text-[#052128]"
                style={{ fontFamily: '"GFS Didot", serif' }}
              >
                {course.title}
              </h2>

              <p className="mt-2 text-[13px] text-[#536B73]">
                {lessons.length} Lessons
              </p>
            </div>

            {lessons.length === 0 ? (
              <p className="border-t border-[#EEF0F0] px-5 py-8 text-[14px] text-[#536B73]">
                No lessons are available for this course yet.
              </p>
            ) : (
              lessons.map((lesson, index) => {
                const locked =
                  lesson.isLocked || lesson.status === "LOCKED";

                const completed = lesson.status === "COMPLETED";

                const current =
                  lesson.status === "IN_PROGRESS" ||
                  lesson.status === "UP_NEXT";

                const content = (
                  <div
                    className={`flex items-center gap-4 border-t border-[#EEF0F0] px-5 py-4 ${
                      current ? "bg-[#DDEDE9]" : "bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        completed
                          ? "bg-[#E1F2E8] text-[#2FA66A]"
                          : current
                            ? "bg-[#0C404E] text-white"
                            : "border border-[#E5EAE8] bg-[#F8F8FC] text-[#B5C0C4]"
                      }`}
                    >
                      {completed ? (
                        <Check size={17} />
                      ) : locked ? (
                        <LockKeyhole size={15} />
                      ) : (
                        <BookOpen size={16} />
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] leading-5 text-[#052128]">
                        Lesson {index + 1}: {lesson.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-[#536B73]">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={13} />
                          {lesson.durationMinutes} min
                        </span>

                        <span>
                          {completed
                            ? "Completed"
                            : locked
                              ? "Locked"
                              : lesson.status === "IN_PROGRESS"
                                ? "In Progress"
                                : "Up Next"}
                        </span>
                      </div>
                    </div>

                    {!locked && (
                      <span className="shrink-0 text-[12px] font-medium text-[#40AC49]">
                        {completed ? "Review" : "Open"}
                      </span>
                    )}
                  </div>
                );

                return locked ? (
                  <div key={lesson.id} aria-disabled="true">
                    {content}
                  </div>
                ) : (
                  <Link
                    key={lesson.id}
                    href={`/courses/${courseID}/lesson/${lesson.id}`}
                    className="block hover:bg-[#F4FAF6]"
                  >
                    {content}
                  </Link>
                );
              })
            )}
          </section>
        </div>

        <aside className="flex min-w-0 flex-col gap-5">
          <CourseProgressPanel
            completedLessons={completedLessons}
            totalLessons={totalLessons}
          />

          {nextLesson && (
            <UpNextPanel
              title={nextLesson.title}
              durationMinutes={nextLesson.durationMinutes}
              href={`/courses/${courseID}/lesson/${nextLesson.id}`}
            />
          )}

          {!nextLesson && lessons.length > 0 && (
            <section className="rounded-[12px] border border-[#E5EAE8] bg-white p-5">
              <h2
                className="text-[20px] text-[#052128]"
                style={{ fontFamily: '"GFS Didot", serif' }}
              >
                {completedLessons === lessons.length
                  ? "Course Completed"
                  : "No Available Lesson"}
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-[#536B73]">
                {completedLessons === lessons.length
                  ? "You have completed all the lessons in this course."
                  : "Your next lesson is not available yet."}
              </p>
            </section>
          )}
        </aside>
      </div>

      <div className="mt-8 w-full max-w-[810px]">
        <AskAnything courseId={courseID} />
      </div>
    </main>
  );
}
