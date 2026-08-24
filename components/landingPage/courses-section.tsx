import Image from "next/image";
import { Button } from "@mantine/core";

const assetPath = "/homepage/courses";

const courses = [
  {
    title: "Fashion Designers",
    description:
      "Explore AI for design ideas, customer insights, marketing, pricing, and planning.",
    image: "fashion-designer.png",
  },
  {
    title: "Plumbers",
    description:
      "Explore AI for customer communication, marketing, pricing, planning, and business decisions.",
    image: "plumber.png",
  },
  {
    title: "Fashion Designers",
    description:
      "Discover AI for customer service, marketing, organisation, problem-solving, and business planning.",
    image: "mechanic.png",
  },
  {
    title: "Caterers",
    description:
      "Discover AI for menu planning, customer engagement, marketing, pricing, and business growth.",
    image: "caterer.png",
  },
];

function RulePattern() {
  return (
    <div className="relative h-[46px] w-full overflow-hidden border border-[#637077]/25">
      <Image
        src={`${assetPath}/line-pattern.svg`}
        alt=""
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover opacity-80"
      />
    </div>
  );
}

export default function CoursesSection() {
  return (
    <section
      id="courses"
      className="scroll-mt-6 bg-[#052128] px-6 py-20 text-[#f5f7f5] sm:px-10 lg:px-[7.3vw] lg:py-40"
    >
      <div className="mx-auto flex w-full max-w-[1204px] flex-col items-center gap-12">
        <div className="flex w-full max-w-[599px] flex-col items-center gap-8 text-center">
          <div className="flex h-[42px] w-[128px] items-center justify-center rounded-[34px] border-2 border-[#1e383e] bg-[#1e383e] p-1">
            <div className="flex h-full w-full items-center justify-center rounded-[30px] border border-[#052128]">
              <span className="font-serif text-base text-white">Courses</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-[clamp(2.25rem,4vw,2.875rem)] leading-[1.2] text-[#f5f7f5]">
              Learn how AI can work for your{" "}
              <em className="text-[#43ac47]">business.</em>
            </h2>
            <p className="text-base leading-6 text-[#c5d3d2]">
              Every profession has different challenges. Explore practical AI
              guidance designed around the work you already do and discover new
              ways to save time, serve customers, solve problems, and grow.
            </p>
          </div>
        </div>

        <div className="w-full">
          <RulePattern />
          <div className="relative px-0 py-12 sm:px-8 sm:py-14 lg:px-[72px]">
            <Image
              src={`${assetPath}/course-grid.svg`}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="pointer-events-none object-fill opacity-70"
            />
            <div className="relative grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-2 lg:gap-x-[146px] lg:gap-y-[121px]">
              {courses.map((course) => (
                <article key={course.image} className="flex flex-col gap-6">
                  <div className="relative h-[260px] overflow-hidden rounded-xl sm:h-[364px]">
                    <Image
                      src={`${assetPath}/${course.image}`}
                      alt={`${course.title} at work`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 455px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,33,40,0.15)] via-[rgba(5,33,40,0.05)] to-[rgba(5,33,40,0.4)]" />
                  </div>
                  <div className="flex max-w-[331px] flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-serif text-2xl leading-8 text-[#f5f7f5]">
                        {course.title}
                      </h3>
                      <p className="text-base leading-6 text-[#c5d3d2]">
                        {course.description}
                      </p>
                    </div>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-base font-semibold leading-6 text-[#43ac47]"
                    >
                      Explore Course
                      <Image
                        src={`${assetPath}/move-right.svg`}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              component="a"
              href="#"
              variant="white"
              radius="md"
              className="h-12 w-40 text-base font-medium text-[#43ac47]"
            >
              Explore Courses
            </Button>
          </div>
        </div>

        <RulePattern />
      </div>
    </section>
  );
}
