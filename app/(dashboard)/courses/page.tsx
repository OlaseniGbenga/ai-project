
"use client";

import { useEffect } from "react";
import { Skeleton } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CoursesWelcomeBanner from "@/components/courses/CoursesWelcomeBanner";
import FeaturedCourseCard from "@/components/courses/FeaturedCourseCard";
import LearningCourseCard from "@/components/courses/LearningCourseCard";
import AskAnything from "@/components/input/AskAnything";
import { getMe } from "@/features/auth/services/auth.service";
import {
  useGetLearningPath,
  useGetLearningPathStatus,
} from "@/features/auth/hooks/useCourse";
import { useAuth } from "@/contexts/AuthContext";

export default function CoursesPage() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const {
    data: statusResponse,
    isLoading: statusLoading,
    isError: statusError,
  } = useGetLearningPathStatus();

  const {
    data: learningPath,
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorDetails,
  } = useGetLearningPath();

  const { data: userResponse } = useQuery({
    queryKey: ["current-user"],
    queryFn: getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  const isReady = statusResponse?.data.isReady;

  useEffect(() => {
    if (isReady) {
      void queryClient.invalidateQueries({
        queryKey: ["learning-path"],
      });
    }
  }, [isReady, queryClient]);

  const courses = learningPath?.data.courses ?? [];

  const featuredCourse =
    courses.find((course) =>
      course.lessons?.some(
        (lesson) => lesson.status === "IN_PROGRESS",
      ),
    ) ?? courses[0];

  if (statusLoading || (isReady && coursesLoading)) {
    return (
      <main className="mx-auto flex w-full max-w-[1050px] flex-col gap-8 pb-10">
        <Skeleton height={214} radius={24} />
        <Skeleton height={348} radius={12} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} height={407} radius={12} />
          ))}
        </div>
      </main>
    );
  }

  if (statusError || (isReady && coursesError)) {
    return (
      <main className="mx-auto w-full max-w-[1050px]">
        <p role="alert" className="rounded-xl bg-red-50 p-6 text-red-700">
          {coursesErrorDetails instanceof Error
            ? coursesErrorDetails.message
            : "Unable to load your courses. Please try again."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-[1050px] min-w-0 flex-col gap-8 pb-10">
      <CoursesWelcomeBanner
        firstName={userResponse?.data.firstName}
      />

      {!isReady ? (
        <section className="rounded-xl border border-[#E5EAE8] bg-white p-6 text-[#536B73]">
          {statusResponse?.data.message ??
            "Your learning path is being prepared."}
        </section>
      ) : (
        <>
          {featuredCourse && (
            <FeaturedCourseCard course={featuredCourse} />
          )}

          <section>
            <h2
              className="mb-6 text-[30px] font-normal text-[#052128]"
              style={{ fontFamily: '"GFS Didot", serif' }}
            >
              All Courses
            </h2>

            {courses.length === 0 ? (
              <div className="rounded-xl border border-[#E5EAE8] bg-white p-6 text-[#536B73]">
                No courses available yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <LearningCourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {isReady && featuredCourse?.id && (
        <div className="w-full max-w-[810px]">
          <AskAnything courseId={featuredCourse.id} />
        </div>
      )}
    </main>
  );
}
