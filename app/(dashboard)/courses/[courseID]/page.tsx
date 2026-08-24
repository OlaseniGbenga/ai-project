"use client";
import React, { useState } from "react";

import { Button, Progress, Divider, Skeleton } from "@mantine/core";
import { getProgressPercentage } from "@/utils";
import { useRouter } from "next/navigation";
import { useGetLessons } from "@/features/auth/hooks/useCourse";
import BackButton from "@/components/ui/btn/back-button";
import GenerateCertificateBanner from "@/features/certificate/components/GenerateCertificateBanner";

interface PageProps {
  params: Promise<{
    courseID: string;
  }>;
}

function Page({ params }: PageProps) {
  const { courseID } = React.use(params);
  const { data, isLoading, isError, error } = useGetLessons(courseID);
  const [step, setStep] = useState(6);
  const courseLessons = data?.data.lessons ?? [];
  //   const percentage =
  //     data?.data.course.progressPercent ?? getProgressPercentage(step, 7);
  //   const totalModules = data?.data.course.totalModules ?? 7;
  //   const completedModules = data?.data.course.completedModules ?? step;
  const router = useRouter();

  const getLessonStatusLabel = (status: string) => {
    switch (status) {
      case "UP_NEXT":
        return "Up next";
      case "IN_PROGRESS":
        return "In progress";
      case "COMPLETED":
        return "Completed";
      case "LOCKED":
        return "Locked";
        case "NOT_STARTED":
          return "Not started"
      default:
        return status;
    }
  };

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return (
      <p className="text-red-600">Unable to load course data: {errorMessage}</p>
    );
  }

  return (
    <div className=" flex flex-col gap-4">
      <div className="flex  justify-between flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <BackButton />
          <p className="text-primary-700">My Lessons</p>
          {/* <p className="heading font-black ">Pick up where you left off</p>
          <p>Built from your goal: Business application</p> */}
        </div>
        {/* <Button className="btn btn-primary btn-rounded max-w-[200px]">
          Resume Course
        </Button> */}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton h={100} />
          <Skeleton h={100} />
        </div>
      ) : (
        <div>
          {" "}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>{/* Progress: {percentage}% */}</p>
              <p>{/* Module: {completedModules}/{totalModules} */}</p>
            </div>

            {/* <Progress
              value={percentage}
              color="var(--color-primary-green)"
              size="sm"
              mb="lg"
              styles={{
                root: {
                  backgroundColor: "var(--color-primary-50)",
                },
                section: {
                  backgroundColor: "var(--color-primary-600)",
                },
              }}
            /> */}
          </div>
          {data?.data.completedLessons === data?.data.totalLessons &&
            (data?.data.totalLessons ?? 0) > 0 && (
              <GenerateCertificateBanner />
            )}

          <div className="flex flex-col gap-4">
            {courseLessons.map((item, index) => (
              <div key={item.id ?? index} className="flex flex-col gap-4">
                <div className="flex  justify-between flex-col md:flex-row   gap-4 ">
                  <div className="flex gap-4 items-center flex-row ">
                    <p className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-700 bg-primary-50  text-primary-700">
                      {index + 1}
                    </p>
                    <div>
                      <p className="font-bold   "> {item.title}</p>
                      <div className="flex gap-4 items-center">
                        <p className="text-gray-500">
                          {getLessonStatusLabel(item.status)}{" "}
                        </p>
                        .
                        <p className="text-gray-500">
                          {item.durationMinutes} min
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      router.push(`/courses/${courseID}/lesson/${item.id}`)
                    }
                    className="btn-xs btn-primary btn-rounded"
                    disabled={item.isLocked}
                  >
                    Start Lesson
                  </Button>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
