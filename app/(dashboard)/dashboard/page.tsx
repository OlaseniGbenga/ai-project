
"use client";

import { Alert, Button, Paper, Skeleton, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LessonProgressCard from "@/components/cards/LessonProgressCard";
import Progress from "@/components/dashboard/Progress";
import AskAnything from "@/components/input/AskAnything";
import Avatar from "@/components/dashboard/Avatar";
import { useGetLearningPath } from "@/features/auth/hooks/useCourse";
import { getMe } from "@/features/auth/services/auth.service";
import { getMyCertificate } from "@/features/certificate/services/certificate.service";
import type { Course, Lesson } from "@/features/auth/types/courses.type";

const DEFAULT_USER_NAME = "there";

function getFirstName(
  firstName?: string,
  fallbackName = DEFAULT_USER_NAME,
) {
  return firstName?.trim() || fallbackName;
}

function findCurrentLesson(courses: Course[]) {
  for (const course of courses) {
    const activeLesson = course.lessons?.find((lesson) =>
      ["IN_PROGRESS", "UP_NEXT"].includes(lesson.status),
    );

    if (activeLesson) {
      return { course, lesson: activeLesson };
    }
  }

  const firstCourse = courses[0];
  const firstLesson = firstCourse?.lessons?.[0];

  return firstCourse && firstLesson
    ? { course: firstCourse, lesson: firstLesson }
    : null;
}

function getDashboardStats(courses: Course[]) {
  const totalProgress = courses.reduce(
    (sum, course) => sum + (course.progressPercent ?? 0),
    0,
  );

  const completedCount = courses.filter(
    (course) => (course.progressPercent ?? 0) >= 100,
  ).length;

  const inProgressCount = courses.filter((course) => {
    const progress = course.progressPercent ?? 0;
    return progress > 0 && progress < 100;
  }).length;

  return {
    overallPercent: courses.length
      ? Math.round(totalProgress / courses.length)
      : 0,
    inProgressCount,
    completedCount,
    certificateCount: completedCount,
  };
}

function formatLevel(level?: Course["level"] | string) {
  if (!level) {
    return "Beginner";
  }

  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

function getLessonMeta(course: Course, lesson: Lesson) {
  const completedLessons = (course.lessons ?? []).filter(
    (courseLesson) => courseLesson.status === "COMPLETED",
  ).length;

  return {
    completedLessons,
    totalLessons:
      course.lessons?.length || course.totalModules || 0,
    durationMinutes: lesson.durationMinutes || 0,
  };
}

function DashboardHero({
  name,
  isReturningUser,
  course,
}: {
  name: string;
  isReturningUser: boolean;
  course?: Course;
}) {
  return (
    <Paper
      withBorder
      radius={18}
      className="overflow-hidden border-[#dfe8e4] bg-gradient-to-br from-[#052128] via-[#073b32] to-[#043524] px-6 py-7 text-white shadow-none sm:px-8"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[620px]">
          <div className="mb-4 flex items-center gap-2">
            <Image
              src="/memoji.png"
              alt="Learner avatar"
              width={32}
              height={32}
            />

            <h1 className="font-serif text-[28px] leading-tight text-[#f5f7f5] sm:text-[34px]">
              {isReturningUser ? "Welcome back" : "Welcome"},{" "}
              {name}
            </h1>

            <Image
              src="/verify.svg"
              alt="Verified account"
              width={18}
              height={18}
            />
          </div>

          <p className="max-w-[520px] text-[14px] leading-6 text-[#c5d3d2] sm:text-base">
            {isReturningUser
              ? "Pick up where you left off and keep building practical AI skills for your everyday work."
              : "Your learning journey starts here. Discover practical ways to use AI in your everyday work and business."}
          </p>
        </div>

        <Button
          component={Link}
          href={course ? `/courses/${course.id}` : "/courses"}
          radius={12}
          className="w-fit bg-[#43ac47] px-6 font-semibold text-white hover:bg-[#3a9a40]"
        >
          {isReturningUser ? "Resume Course" : "Start Learning"}
        </Button>
      </div>
    </Paper>
  );
}

function FeaturedCourse({ course }: { course?: Course }) {
  return (
    <Paper
      withBorder
      radius={12}
      className="grid overflow-hidden border-[rgba(51,51,51,0.10)] bg-white shadow-none lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
    >
      <div className="relative min-h-[260px] overflow-hidden bg-[#d9d9d9]">
        <Image
          src="/tailor-cutting-dress.webp"
          alt={course?.title ?? "AI for your business course"}
          fill
          priority
          className="object-cover object-center"
        />

        <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[#43ac47]">
          Featured Course
        </span>
      </div>

      <div className="flex flex-col justify-center px-6 py-8 sm:px-8">
        <Text
          c="#082a35"
          fz={32}
          lh={1.2}
          mb={14}
          style={{
            fontFamily: '"GFS Didot", "Times New Roman", serif',
          }}
        >
          {course?.title ?? "AI for Your Business"}
        </Text>

        <p className="mb-5 max-w-[430px] text-[14px] leading-6 text-[#52666d]">
          {course?.description ??
            "Learn practical AI skills you can apply to customer communication, content, decision-making, and everyday business tasks."}
        </p>

        <p className="mb-6 text-[12px] text-[#42616a]">
          {formatLevel(course?.level)} ·{" "}
          {course?.totalModules ?? course?.lessons?.length ?? 4}{" "}
          modules
        </p>

        <Button
          component={Link}
          href={course ? `/courses/${course.id}` : "/courses"}
          radius={11}
          className="h-[48px] w-fit bg-[#43ac47] px-6 font-semibold text-white hover:bg-[#3a9a40]"
        >
          {course && (course.progressPercent ?? 0) > 0
            ? "Continue Course"
            : "Start Course"}
        </Button>
      </div>
    </Paper>
  );
}

function Page() {
  const router = useRouter();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 1,
  });

  const {
    data: learningPathData,
    isLoading: isLearningPathLoading,
    isError: isLearningPathError,
    error: learningPathError,
  } = useGetLearningPath();

  const { data: certificateData } = useQuery({
    queryKey: ["certificate-me"],
    queryFn: getMyCertificate,
    retry: false,
  });

  const courses = learningPathData?.data.courses ?? [];
  const currentLesson = findCurrentLesson(courses);
  const activeCourse = currentLesson?.course ?? courses[0];

  const hasStarted = courses.some((course) => (course.progressPercent ?? 0) > 0);
  const isReturningUser = hasStarted;
  const name = getFirstName(profileData?.data.firstName);
  const stats = getDashboardStats(courses);

  const latestCertificate = certificateData?.data
    ? {
        title: courses.find((c) => (c.progressPercent ?? 0) >= 100)?.title ?? certificateData.data.trade,
        completedAt: new Date(certificateData.data.completionDate).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      }
    : null;

  const lessonMeta = currentLesson
    ? getLessonMeta(
        currentLesson.course,
        currentLesson.lesson,
      )
    : null;

  if (isProfileLoading || isLearningPathLoading) {
    return (
      <div className="space-y-6">
        <Skeleton height={48} width={280} radius="md" />
        <Skeleton height={170} radius={18} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_399px]">
          <Skeleton height={520} radius={12} />
          <Skeleton height={360} radius={12} />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Avatar
        name={name}
        isReturningUser={isReturningUser}
      />

      {(isProfileError || isLearningPathError) && (
        <Alert
          color="yellow"
          radius="md"
          className="mt-4"
        >
          {isLearningPathError &&
          learningPathError instanceof Error
            ? learningPathError.message
            : "Some dashboard data could not be loaded. Showing what is available."}
        </Alert>
      )}

      <div className="mt-6">
        <DashboardHero
          name={name}
          isReturningUser={isReturningUser}
          course={activeCourse}
        />
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        {currentLesson && lessonMeta ? (
          <LessonProgressCard
            title={
              currentLesson.course.description ||
              currentLesson.lesson.title
            }
            completedPercent={
              currentLesson.course.progressPercent ?? 0
            }
            durationMinutes={lessonMeta.durationMinutes}
            totalLessons={lessonMeta.totalLessons}
            completedLessons={lessonMeta.completedLessons}
            onResumeLesson={() =>
              router.push(
                `/courses/${currentLesson.course.id}/lesson/${currentLesson.lesson.id}`,
              )
            }
          />
        ) : (
          <div className="w-full lg:max-w-[627px]">
            <FeaturedCourse course={activeCourse} />
          </div>
        )}

        <Progress
          stats={stats}
          latestCertificate={latestCertificate}
        />
      </div>

      {activeCourse && (
        <AskAnything
          key={`${activeCourse.id}:${currentLesson?.lesson.id ?? "dashboard"}`}
          courseId={activeCourse.id}
          lessonId={currentLesson?.lesson.id}
        />
      )}
    </div>
  );
}

export default Page;
