"use client";

import React from "react";
import { FlashCard } from "@/components/cards/flashcard";
import BackButton from "@/components/ui/btn/back-button";
import { Button, Skeleton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  useGetLesson,
  usePostCompletedLesson,
} from "@/features/auth/hooks/useCourse";
import Quiz from "@/components/quiz/quiz";
import { useRouter } from "next/navigation";
interface PageProps {
  params: Promise<{
    lessonID: string;
  }>;
}

function Page({ params }: PageProps) {
  const { lessonID } = React.use(params);
  const { data, isLoading, isError, error } = useGetLesson(lessonID);
  const { mutate, isPending } = usePostCompletedLesson(lessonID);
  const router = useRouter();

  const handleSubmit = async () => {
    mutate(undefined, {
      onSuccess: () => {
        notifications.show({
          title: "Lesson completed",
          message: "You have completed this lesson",
          color: "brand.5",
        });
      },
      onError: (error: Error) => {
        notifications.show({
          title: "Request failed",
          message: error.message,
          color: "red",
        });
      },
    });
  };
  return (
    <div>
      {isLoading && <Skeleton h={400} />}

      {!isLoading && (
        <div className="flex flex-col">
          <div className="flex flex-col  justify-between">
            <div className="mb-2">
              <BackButton />
            </div>
            <h1 className="text-2xl font-bold text-primary-700">
              Lesson {data?.data.orderNumber}
            </h1>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-8">
            <p className="text-gray-500">
              Lesson · {data?.data.durationMinutes}min
            </p>
            <p className="heading font-black ">{data?.data.title}</p>
          </div>
          <div className="flex flex-col gap-4">
            {" "}
            <p>{data?.data.content}</p>
            <div className="flex flex-col gap-4 items-center">
              {data?.data.flashcards.map((flashCard) => {
                return (
                  <FlashCard
                    key={flashCard.id}
                    question={flashCard.front}
                    answer={flashCard.back}
                    answerTitle="Answer to question"
                  />
                );
              })}
            </div>
            <Button
              loading={isPending}
              onClick={() => {
                router.push(`/quiz/${data?.data.id}`);
              }}
              className="btn btn-primary self-start"
            >
              Continue
            </Button>
          </div>
          {/* <Quiz lessonID={lessonID} /> */}
        </div>
      )}
    </div>
  );
}

export default Page;
