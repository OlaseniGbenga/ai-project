
import CoursesAskAnything from "@/components/courses/CoursesAskAnything";
import CourseModuleList, {
  type CourseModule,
} from "@/components/courses/outline/CourseModuleList";
import CourseProgressPanel from "@/components/courses/outline/CourseProgressPanel";
import UpNextPanel from "@/components/courses/outline/UpNextPanel";

const modules: CourseModule[] = [
  {
    id: "module-1",
    title: "INTRODUCTION TO FASHION DESIGN",
    lessons: [
      {
        id: "lesson-1",
        title: "Lesson 1: The Role of a Fashion Designer",
        durationMinutes: 15,
        status: "completed",
      },
      {
        id: "lesson-2",
        title: "Lesson 2: History of Modern Fashion",
        durationMinutes: 22,
        status: "completed",
      },
    ],
  },
  {
    id: "module-2",
    title: "INTRODUCTION TO FASHION DESIGN",
    lessons: [
      {
        id: "lesson-3",
        title: "Lesson 3: The Role of a Fashion Designer",
        durationMinutes: 15,
        status: "completed",
      },
      {
        id: "lesson-4",
        title: "Lesson 4: Understanding Fabric Types",
        durationMinutes: 18,
        status: "current",
      },
    ],
  },
  {
    id: "module-3",
    title: "INTRODUCTION TO FASHION DESIGN",
    lessons: [
      {
        id: "lesson-5",
        title: "Lesson 5: The Role of a Fashion Designer",
        durationMinutes: 15,
        status: "locked",
      },
      {
        id: "lesson-6",
        title: "Lesson 6: History of Modern Fashion",
        durationMinutes: 22,
        status: "locked",
      },
    ],
  },
  {
    id: "module-4",
    title: "INTRODUCTION TO FASHION DESIGN",
    lessons: [
      {
        id: "lesson-7",
        title: "Lesson 7: The Role of a Fashion Designer",
        durationMinutes: 15,
        status: "locked",
      },
      {
        id: "lesson-8",
        title: "Lesson 8: History of Modern Fashion",
        durationMinutes: 22,
        status: "locked",
      },
    ],
  },
  {
    id: "module-5",
    title: "INTRODUCTION TO FASHION DESIGN",
    lessons: [],
  },
  {
    id: "module-6",
    title: "INTRODUCTION TO FASHION DESIGN",
    lessons: [],
  },
];

export default function CourseOutlinePreviewPage() {
  return (
    <main className="mx-auto w-full max-w-[1050px] px-4 py-6 sm:px-0">
      <h1
        className="mb-5 text-[28px] text-[#052128]"
        style={{ fontFamily: '"GFS Didot", serif' }}
      >
        Course Outline
      </h1>

    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,632px)_minmax(0,362px)]">
        <CourseModuleList modules={modules} />

        <aside className="flex flex-col gap-5">
          <CourseProgressPanel
            completedLessons={3}
            totalLessons={12}
          />

          <UpNextPanel
            title="Lesson 4: Understanding Fabric Types"
            durationMinutes={18}
          />
        </aside>
      </div>

      <div className="mt-8">
        <CoursesAskAnything />
      </div>
    </main>
  );
}
