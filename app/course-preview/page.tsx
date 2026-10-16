
import CoursesWelcomeBanner from "@/components/courses/CoursesWelcomeBanner";
import FeaturedCourseCard from "@/components/courses/FeaturedCourseCard";
import LearningCourseCard from "@/components/courses/LearningCourseCard";
import CoursesAskAnything from "@/components/courses/CoursesAskAnything";
import type { Course } from "@/features/auth/types/courses.type";

const courses: Course[] = Array.from({ length: 6 }, (_, index) => ({
  id: `preview-${index + 1}`,
  title: "AI-Powered Marketing",
  description:
    "Learn how to use AI to create better content, reach customers and promote your business.",
  level: "BEGINNER",
  progressPercent: 0,
  completedModules: 0,
  totalModules: 4,
  lessons: [
    {
      id: `preview-lesson-${index + 1}`,
      courseId: `preview-${index + 1}`,
      title: "Introduction to AI Marketing",
      orderNumber: 1,
      durationMinutes: 15,
      content: "",
      isLocked: false,
      status: "UP_NEXT",
      flashcards: [],
    },
  ],
}));

const featuredCourse: Course = {
  ...courses[0],
  id: "featured-preview",
  title: "AI for Your Business",
  description:
    "Learn how AI can support your business, improve productivity and help you grow.",
};

export default function CoursePreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1050px] flex-col gap-9 px-4 py-6 sm:px-0">
      <CoursesWelcomeBanner />

      <FeaturedCourseCard course={featuredCourse} />

      <section>
        <h2
          className="mb-6 text-[32px] font-normal text-[#052128]"
          style={{ fontFamily: '"GFS Didot", serif' }}
        >
          All Courses
        </h2>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <LearningCourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </section>

      <CoursesAskAnything />
    </main>
  );
}
