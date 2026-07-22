"use client";

import { Button, Divider, Skeleton } from "@mantine/core";
import { useRouter } from "next/navigation";
import {
  useGetLearningPath,
  useGetLearningPathStatus,
} from "@/features/auth/hooks/useCourse";

function Page() {
  const { data, isLoading, isError, error } = useGetLearningPath();
  const { data: pathStatus, isLoading: pathStatusLoading } =
    useGetLearningPathStatus();
  const courseLessons = data?.data.courses ?? [];
  const router = useRouter();

  if (!pathStatus?.data.isReady ){
    return (<p>
      {pathStatus?.data.message}
    </p>)
  }

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
          <p className="text-primary-700">My courses</p>
        </div>
      </div>

      {isLoading || pathStatusLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton h={100} />
          <Skeleton h={100} />
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4">
            {courseLessons.map((item, index) => (
              <div
                onClick={() => router.push(`/courses/${item.id}`)}
                key={item.id ?? index}
                className="flex flex-col gap-4 cursor-pointer "
              >
                <div className="flex  justify-between flex-col md:flex-row   gap-4 ">
                  <div className="flex gap-4 items-center flex-row ">
                    <p className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-700 bg-primary-50  text-primary-700">
                      {index + 1}
                    </p>
                    <div>
                      <p className="font-bold   "> {item.title}</p>
                    </div>
                  </div>
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
