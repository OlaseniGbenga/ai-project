
"use client";

import React from "react";
import { Alert, Skeleton } from "@mantine/core";

import { useGetPracTask } from "@/features/auth/hooks/useCourse";
import BackButton from "@/components/ui/btn/back-button";
import TaskCard from "@/components/task/task";

interface PageProps {
  params: Promise<{
    lessonID: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { lessonID } = React.use(params);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetPracTask(lessonID);

  return (
    <main className="w-full pb-16">
      <div className="mb-5">
        <BackButton />
      </div>

      {isLoading ? (
        <div className="mx-auto w-full max-w-[720px] rounded-[10px] border border-[#E6E9E8] bg-white px-5 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-center">
            <Skeleton
              height={24}
              width={125}
              radius="xl"
            />

            <Skeleton
              height={32}
              width="75%"
              radius="md"
              mt={20}
            />

            <Skeleton
              height={15}
              width="60%"
              radius="md"
              mt={16}
            />
          </div>

          <div className="mx-auto mt-10 w-full max-w-[560px] space-y-5">
            <div className="space-y-3">
              <Skeleton height={14} width={150} radius="sm" />
              <Skeleton height={14} width="100%" radius="sm" />
              <Skeleton height={14} width="80%" radius="sm" />
            </div>

            <div className="space-y-3">
              <Skeleton height={14} width={130} radius="sm" />
              <Skeleton height={14} width="100%" radius="sm" />
              <Skeleton height={14} width="85%" radius="sm" />
            </div>

            <div className="rounded-[10px] border border-[#E6E9E8] p-5">
              <Skeleton height={16} width={145} radius="sm" />
              <Skeleton height={90} radius="md" mt={18} />
              <div className="mt-4 flex justify-between gap-4">
                <Skeleton height={36} width={115} radius="md" />
                <Skeleton height={36} width={135} radius="md" />
              </div>
            </div>

            <div className="flex justify-center pt-3">
              <Skeleton height={38} width={120} radius="md" />
            </div>
          </div>
        </div>
      ) : isError || !data?.data ? (
        <div className="mx-auto w-full max-w-[720px]">
          <Alert
            color="red"
            radius="md"
            title="Unable to load practical task"
          >
            {error instanceof Error
              ? error.message
              : "The practical task could not be loaded. Please try again."}
          </Alert>
        </div>
      ) : (
        <TaskCard
          TaskData={data.data}
          lessonID={lessonID}
        />
      )}
    </main>
  );
}
