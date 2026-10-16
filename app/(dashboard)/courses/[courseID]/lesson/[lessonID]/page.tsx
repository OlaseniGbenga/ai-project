
"use client";

import { use, useMemo, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Alert, Loader } from "@mantine/core";
import { BookOpen, Clock3 } from "lucide-react";

import BackButton from "@/components/ui/btn/back-button";
import AskAnything from "@/components/input/AskAnything";
import LessonCarousel from "@/components/lesson/LessonCarousel";
import LessonQuizCard from "@/components/lesson/LessonQuizCard";
import ModuleLessonsSidebar from "@/components/lesson/ModuleLessonsSidebar";

import {
  useGetLesson,
  useGetCourseModules,
  usePostCompletedLesson,
} from "@/features/auth/hooks/useCourse";

interface LessonPageProps {
  params: Promise<{
    courseID: string;
    lessonID: string;
  }>;
}

type LessonStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "LOCKED"
  | "UP_NEXT";

function getStatusLabel(status?: LessonStatus | string) {
  switch (status) {
    case "COMPLETED":
      return "Completed";
    case "IN_PROGRESS":
      return "In progress";
    case "LOCKED":
      return "Locked";
    case "UP_NEXT":
      return "Up next";
    default:
      return "Not Started";
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const { courseID, lessonID } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [quizError, setQuizError] = useState<string | null>(null);

  const {
    data: lessonResponse,
    isLoading: isLessonLoading,
    isError: isLessonError,
    error: lessonError,
  } = useGetLesson(lessonID);

  const {
    data: modulesResponse,
    isLoading: isModulesLoading,
    isError: isModulesError,
  } = useGetCourseModules(courseID);

  const completeLesson = usePostCompletedLesson(lessonID);

  const lesson = lessonResponse?.data;
  const modules = modulesResponse?.data ?? [];

  const currentModule = useMemo(
    () =>
      modules.find((module) =>
        module.lessons?.some(
          (moduleLesson) => moduleLesson.id === lessonID,
        ),
      ),
    [modules, lessonID],
  );

  const currentModuleLesson = currentModule?.lessons?.find(
    (moduleLesson) => moduleLesson.id === lessonID,
  );

  const lessonNumber =
    currentModuleLesson?.orderNumber ??
    lesson?.orderNumber ??
    1;

  const durationMinutes =
    currentModuleLesson?.durationMinutes ??
    lesson?.durationMinutes ??
    0;

  const status = currentModuleLesson?.status ?? lesson?.status;

  const handleStartQuiz = async () => {
    if (!lesson || completeLesson.isPending) return;

    setQuizError(null);

    if (status === "COMPLETED") {
      router.push(`/quiz/${lessonID}`);
      return;
    }

    try {
      await completeLesson.mutateAsync();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["lesson", lessonID],
        }),
        queryClient.invalidateQueries({
          queryKey: ["course-modules", courseID],
        }),
        queryClient.invalidateQueries({
          queryKey: ["lessons", courseID],
        }),
        queryClient.invalidateQueries({
          queryKey: ["learning-path"],
        }),
      ]);

      router.push(`/quiz/${lessonID}`);
    } catch (error: unknown) {
      const apiMessage = axios.isAxiosError<{
        message?: string | string[];
      }>(error)
        ? error.response?.data?.message
        : undefined;

      setQuizError(
        Array.isArray(apiMessage)
          ? apiMessage.join(". ")
          : apiMessage ||
              (error instanceof Error
                ? error.message
                : "Unable to complete this lesson. Please try again."),
      );
    }
  };

  if (isLessonLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader color="#43AC47" />
      </div>
    );
  }

  if (isLessonError || !lesson) {
    return (
      <div className="space-y-5">
        <BackButton />

        <Alert color="red" radius="md" title="Unable to load lesson">
          {lessonError instanceof Error
            ? lessonError.message
            : "The lesson could not be loaded. Please try again."}
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <header className="mb-8">
        <BackButton />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF6EA] px-3 py-[7px] text-[12px] font-normal leading-none text-[#277A39]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#43AC47]" />
            {getStatusLabel(status)}
          </span>
        </div>

        <h1
          className="mt-4 max-w-[1030px] text-[28px] font-normal leading-[1.2] tracking-normal text-[#0C404E] sm:text-[34px]"
          style={{
            fontFamily: '"GFS Didot", "Times New Roman", serif',
          }}
        >
          {lesson.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-normal text-[#637C80]">
          <div className="flex items-center gap-2">
            <BookOpen size={16} strokeWidth={1.6} />
            <span>
              Lesson {String(lessonNumber).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} strokeWidth={1.6} />
            <span>{durationMinutes} min</span>
          </div>
        </div>
      </header>

      {isModulesError && (
        <Alert color="yellow" radius="md" className="mb-6">
          The module lesson list could not be loaded.
        </Alert>
      )}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,676px)_355px]">
        <div className="flex w-full min-w-0 max-w-[676px] flex-col gap-6">
          <LessonCarousel
            lessonId={lessonID}
            lessonNumber={lessonNumber}
            title={lesson.title}
            content={lesson.content ?? ""}
          />

          {quizError && (
            <Alert color="red" radius="md" title="Unable to start quiz">
              {quizError}
            </Alert>
          )}

          <LessonQuizCard
            onStart={handleStartQuiz}
            loading={completeLesson.isPending}
          />
        </div>

        <div className="w-full max-w-[355px]">
          {isModulesLoading ? (
            <div className="flex min-h-[180px] items-center justify-center rounded-[12px] border border-[#E5E9E7] bg-white">
              <Loader size="sm" color="#43AC47" />
            </div>
          ) : (
            <ModuleLessonsSidebar
              courseId={courseID}
              lessonId={lessonID}
              modules={modules}
            />
          )}
        </div>
      </div>

      <div className="mt-6 w-full max-w-[810px]">
        <AskAnything
          key={`${courseID}:${lessonID}`}
          courseId={courseID}
          lessonId={lessonID}
        />
      </div>
    </div>
  );
}
