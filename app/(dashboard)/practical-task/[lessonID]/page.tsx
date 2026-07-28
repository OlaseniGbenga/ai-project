"use client";

import React from "react";
import Quiz from "@/components/quiz/quiz";
import { Skeleton, Center, Stack, Group, Box } from "@mantine/core";
import { useGetPracTask } from "@/features/auth/hooks/useCourse";
import BackButton from "@/components/ui/btn/back-button";
import TaskCard from "@/components/task/task";

interface PageProps {
  params: Promise<{
    lessonID: string;
  }>;
}

function Page({ params }: PageProps) {
  const { lessonID } = React.use(params);
  const { data, isLoading, isError, error } = useGetPracTask(lessonID);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <BackButton />
        <div className="rounded-4xl flex flex-col gap-5 border-2 border-dashed border-emerald-600 p-10">
          <div className="flex items-center justify-between">
            <Skeleton height={18} width={180} radius="xl" />

            <div className="flex items-center gap-2">
              <Skeleton circle height={16} width={16} />
              <Skeleton height={16} width={60} radius="xl" />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton height={42} radius="md" />
            <Skeleton height={42} radius="md" width="95%" />
            <Skeleton height={42} radius="md" width="70%" />
          </div>

          <Skeleton
            height={40}
            width={150}
            radius="xl"
            className="self-start"
          />
        </div>{" "}
      </div>
    );
  }

  if (isError || !data?.data) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <TaskCard TaskData={data.data} lessonID={lessonID} />
    </div>
  );
}

export default Page;
