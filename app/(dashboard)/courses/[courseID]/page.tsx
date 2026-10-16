
"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@mantine/core";
import FeaturedCourseCard from "@/components/courses/FeaturedCourseCard";
import WhatYouWillLearn from "@/components/courses/overview/WhatYouWillLearn";
import AboutCourse from "@/components/courses/overview/AboutCourse";
import CourseOutline from "@/components/courses/overview/CourseOutline";
import AskAnything from "@/components/input/AskAnything";
import {
  useGetLearningPath,
  useGetLessons,
} from "@/features/auth/hooks/useCourse";
import type { Course } from "@/features/auth/types/courses.type";

interface PageProps {
  params: Promise<{
    courseID: string;
  }>;
}

export default function CourseDetailsPage({ params }: PageProps) {
  const { courseID } = use(params);

  const {
    data: learningPath,
    isLoading: pathLoading,
    isError: pathError,
  } = useGetLearningPath();

  const {
    data: courseResponse,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useGetLessons(courseID);

  const learningCourse = learningPath?.data.courses.find(
    (item) => item.id === courseID,
  );

  const details = courseResponse?.data;

  const course: Course | null = details
    ? {
        id: details.id,
        title: details.title,
        description: details.description,
        level:
          details.level === "INTERMEDIATE" ||
          details.level === "ADVANCED"
            ? details.level
            : "BEGINNER",
        progressPercent:
          learningCourse?.progressPercent ??
          details.progressPercent ??
          0,
        completedModules: learningCourse?.completedModules ?? 0,
        totalModules: learningCourse?.totalModules ?? 0,
        lessons: details.lessons ?? [],
      }
    : learningCourse ?? null;

  const lessons = course?.lessons ?? [];

  const outcomes = lessons
    .slice(0, 6)
    .map((lesson) => lesson.title);

  const outlineModules = lessons.map((lesson, index) => ({
    id: lesson.id,
    title: `LESSON ${index + 1}`,
    description: lesson.title,
    locked: lesson.isLocked || lesson.status === "LOCKED",
  }));

  const nextLesson =
    lessons.find((lesson) => lesson.status === "IN_PROGRESS") ??
    lessons.find((lesson) => lesson.status === "UP_NEXT") ??
    lessons.find(
      (lesson) =>
        !lesson.isLocked && lesson.status !== "COMPLETED",
    );

  if (pathLoading || detailsLoading) {
    return (
      <main className="mx-auto flex w-full max-w-[1050px] flex-col gap-6 pb-10">
        <Skeleton height={348} radius={12} />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,673px)_minmax(0,357px)]">
          <Skeleton height={339} radius={12} />
          <Skeleton height={280} radius={12} />
        </div>
      </main>
    );
  }

  if ((pathError && detailsError) || !course) {
    return (
      <main className="mx-auto w-full max-w-[1050px]">
        <Link
          href="/courses"
          className="mb-6 inline-flex items-center gap-2 text-[#536B73]"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </Link>
        <p role="alert" className="rounded-xl bg-red-50 p-6 text-red-700">
          Unable to load this course.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-[1050px] min-w-0 flex-col gap-6 pb-10">
      <Link
        href="/courses"
        className="inline-flex w-fit items-center gap-2 text-[14px] text-[#536B73] hover:text-[#052128]"
      >
        <ArrowLeft size={18} />
        Back to Courses
      </Link>

      <FeaturedCourseCard course={course} />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,673px)_minmax(0,357px)]">
        <div className="flex min-w-0 flex-col gap-5">
          {outcomes.length > 0 && (
            <WhatYouWillLearn outcomes={outcomes} />
          )}

          <CourseOutline
            modules={outlineModules}
            href={`/courses/${courseID}/outline`}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <AboutCourse description={course.description} />

          <section className="rounded-[12px] border border-[#E5EAE8] bg-white p-6">
            <h2
              className="text-[22px] text-[#052128]"
              style={{ fontFamily: '"GFS Didot", serif' }}
            >
              Ready to Learn?
            </h2>

            <p className="mt-3 text-[14px] leading-6 text-[#536B73]">
              Explore your course outline and continue your learning
              journey at your own pace.
            </p>

            <Link
              href={
                nextLesson
                  ? `/courses/${courseID}/lesson/${nextLesson.id}`
                  : `/courses/${courseID}/outline`
              }
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#40AC49] px-4 py-3 text-[14px] font-semibold text-white hover:bg-[#348D3B]"
            >
              {nextLesson ? "Start Course" : "View Course Outline"}
              <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </div>

      <div className="w-full max-w-[810px]">
       <AskAnything courseId={courseID} />
      </div>
    </main>
  );
}
