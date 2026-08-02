"use client";

import { Badge, Button, Paper, Text } from "@mantine/core";
import { Check } from "lucide-react";
import { PracTask } from "@/features/auth/types/courses.type";
import { usePostPracTask } from "@/features/auth/hooks/useCourse";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

interface TaskProps {
  lessonID?: string;
  TaskData: PracTask;
}
export default function TaskCard({ lessonID, TaskData }: TaskProps) {
  const { mutate, isPending, data } = usePostPracTask(TaskData.id);
  const router = useRouter();
  const handleCompleteTask = () => {
    mutate(undefined, {
      onSuccess: (res) => {
        if (res?.data?.task.status === "COMPLETED") {
          notifications.show({
            title: "Completed",
            message: "You have completed the task",
            color: "brand.5",
          });

          if (res?.data?.nextLessonId) {
            router.push(`/practical-task/${res?.data?.nextLessonId}`);
          } else {
            router.push(`/courses`);
          }
        } else {
          notifications.show({
            title: "Try again",
            message: "",
            color: "red",
          });
        }
      },
      onError: (error: unknown) => {
        notifications.show({
          title: "Submission Failed",
          //@ts-expect-error expected
          message: error.data.message,
          color: "red",
        });
      },
    });
  };

  return (
    <div className="rounded-4xl flex flex-col gap-5  border-2 border-dashed border-emerald-600  p-10">
      {/* Header */}
      <div className=" flex items-center justify-between">
        <Badge
          variant="transparent"
          color="green"
          className="px-0 font-mono text-xs font-semibold uppercase tracking-[0.35em]"
        >
          Try this now • Hands-on
        </Badge>

        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
          <Check size={16} strokeWidth={2.5} />
          Done
        </div>
      </div>

      {/* Content */}
      <Text className="max-w-4xl text-[42px] leading-[1.3] font-normal text-neutral-900">
        {/* {TaskData.title}
        <br /> */}
        {TaskData.instructions}{" "}
      </Text>

      {/* Button */}
      <Button
        onClick={() => {
          handleCompleteTask();
        }}
        loading={isPending}
        disabled={isPending}
        variant="outline"
        className="  btn-xs self-start"
      >
        Mark As Done
      </Button>
    </div>
  );
}
