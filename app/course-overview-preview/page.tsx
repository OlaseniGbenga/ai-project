
import FeaturedCourseCard from "@/components/courses/FeaturedCourseCard";
import CoursesAskAnything from "@/components/courses/CoursesAskAnything";
import WhatYouWillLearn from "@/components/courses/overview/WhatYouWillLearn";
import AboutCourse from "@/components/courses/overview/AboutCourse";
import CourseOutline from "@/components/courses/overview/CourseOutline";
import type { Course } from "@/features/auth/types/courses.type";

const course: Course = {
  id: "preview-overview",
  title: "AI for Your Business",
  description:
    "Learn how AI can help you solve everyday challenges, improve your workflow, and grow your business.",
  level: "BEGINNER",
  progressPercent: 0,
  completedModules: 0,
  totalModules: 4,
  lessons: [
    {
      id: "preview-lesson",
      courseId: "preview-overview",
      title: "Introduction to AI",
      orderNumber: 1,
      durationMinutes: 15,
      content: "",
      isLocked: false,
      status: "UP_NEXT",
      flashcards: [],
    },
  ],
};

const outcomes = [
  "Understand how AI can support your everyday work and business",
  "Use AI to solve common challenges more efficiently",
  "Create useful content, ideas, and communication with AI",
  "Make smarter decisions using AI-powered insights",
  "Apply practical AI tools to improve your workflow",
  "Identify new opportunities to grow your business",
];

const modules = [
  {
    id: "1",
    title: "MODULE 1",
    description:
      "Discover practical AI tools and learn how to use them effectively.",
    locked: false,
  },
  {
    id: "2",
    title: "MODULE 2",
    description:
      "Learn how to use AI to organise information and generate ideas.",
    locked: true,
  },
  {
    id: "3",
    title: "MODULE 3 – 6",
    description:
      "Discover how AI can help you reach customers and support growth.",
    locked: true,
  },
];

export default function CourseOverviewPreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1050px] flex-col gap-6 px-4 py-6 sm:px-0">
      <FeaturedCourseCard course={course} />

     <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,673px)_minmax(0,357px)]">
        <div className="flex flex-col gap-5">
          <WhatYouWillLearn outcomes={outcomes} />
          <CourseOutline modules={modules} />
        </div>

        <AboutCourse
          description="This course is designed to help you understand and apply AI in practical ways that fit your work and business. You'll explore how AI can support everyday tasks, improve your workflow, generate useful ideas, and help you make better business decisions. No technical background required."
        />
      </div>

      <CoursesAskAnything />
    </main>
  );
}
