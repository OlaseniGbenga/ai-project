"use client";

import LessonProgressCard from "@/components/cards/LessonProgressCard";
import PickedForYouSection from "@/components/cards/CourseCard";
import Progress from "@/components/dashboard/Progress";
import AskAnything from "@/components/input/AskAnything";
import Avatar from "@/components/dashboard/Avatar";

function page() {
  return (
    <>
      <Avatar />
      {/* <DashboardOverviewCard /> */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-6">
        <LessonProgressCard />
        <Progress />
      </div>
      <div className="mt-10">
        <PickedForYouSection />
      </div>
      <AskAnything />
    </>
  );
}

export default page;
