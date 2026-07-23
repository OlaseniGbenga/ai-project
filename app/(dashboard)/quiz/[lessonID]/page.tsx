"use client";

import React from "react";
import Quiz from "@/components/quiz/quiz";
import { Skeleton, Center, Stack, Group, Box } from "@mantine/core";
import { useGetQuizs } from "@/features/auth/hooks/useCourse";
import BackButton from "@/components/ui/btn/back-button";

interface PageProps {
  params: Promise<{
    lessonID: string;
  }>;
}

function Page({ params }: PageProps) {
  const { lessonID } = React.use(params);
  const { data, isLoading, isError, error } = useGetQuizs(lessonID);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Box className="mx-auto mt-6 w-[80%] rounded-[34px] border border-slate-200 bg-white p-10 shadow-lg">
          <Stack gap="xl">
            {/* Question counter */}
            <Group justify="space-between">
              <Skeleton height={16} width={160} radius="xl" />
            </Group>

            {/* Question */}
            <Stack gap="md">
              <Skeleton height={28} width="75%" radius="sm" />

              {/* Options */}
              {Array.from({ length: 4 }).map((_, index) => (
                <Box
                  key={index}
                  className="rounded-3xl border border-slate-200 p-5"
                >
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={6} style={{ flex: 1 }}>
                      <Skeleton height={14} width={20} radius="sm" />
                      <Skeleton height={16} width="90%" radius="sm" />
                      <Skeleton height={16} width="70%" radius="sm" />
                    </Stack>

                    <Skeleton height={20} width={20} circle />
                  </Group>
                </Box>
              ))}
            </Stack>

            {/* Navigation buttons */}
            <Group justify="space-between">
              <Skeleton height={42} width={120} radius="md" />
              <Skeleton height={42} width={140} radius="md" />
            </Group>
          </Stack>
        </Box>
      </Center>
    );
  }

  if (isError || !data?.data) {
    return (
      <Center h="100vh">
        <div>
          {error instanceof Error
            ? error.message
            : "Error loading quiz. Please try again."}
        </div>
      </Center>
    );
  }

  return (
    <div>
        <BackButton/>
      <Quiz quizData={data.data[0]} lessonID={lessonID} />
    </div>
  );
}

export default Page;
