import Image from "next/image";
import { Button } from "@mantine/core";

const assetPath = "/homepage/ai-work";

const insights = [
  ["Engagement", "+18%"],
  ["Sessions", "-19%"],
  ["Activity", "+24%"],
  ["Conversions", "30%"],
  ["New Visitors", "22%"],
];

export default function AiWorkSection() {
  return (
    <section className="bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-40">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-12 lg:flex-row lg:gap-14">
        <div className="relative h-[360px] w-full max-w-[468px] shrink-0 sm:h-[459px]">
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <Image
              src={`${assetPath}/workshop.png`}
              alt="A business owner working with AI in his workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 468px"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[rgba(5,33,40,0.15)] via-[rgba(5,33,40,0.05)] to-[rgba(5,33,40,0.4)]" />
          </div>

          <div className="absolute -right-3 top-10 w-[calc(100%-100px)] min-w-[240px] rounded-[7px] bg-white p-3 shadow-[9px_9px_18px_rgba(0,0,0,0.16)] sm:-right-16 sm:top-[72px] sm:w-[251px]">
            <div className="flex items-center gap-3">
              <Image
                src={`${assetPath}/dollar.svg`}
                alt=""
                width={31}
                height={31}
                className="h-[31px] w-[31px] shrink-0"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="text-[9px] font-medium text-black">
                  AI Business Insight
                </span>
                <div className="flex flex-col gap-0.5">
                  <div className="h-1.5 rounded-full bg-[#edf0f4]">
                    <div className="h-full w-[52%] rounded-full bg-[#43ac47]" />
                  </div>
                  <div className="h-1.5 w-[59%] rounded-full bg-[#edf0f4]" />
                </div>
              </div>
              <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#43ac47]/[0.08] px-2 py-0.5 text-[6px] font-medium text-[#43ac47]">
                <Image
                  src={`${assetPath}/active-dot.svg`}
                  alt=""
                  width={4}
                  height={4}
                  className="h-1 w-1"
                />
                Active
              </span>
            </div>
          </div>

          <div className="absolute -right-4 top-[132px] w-[130px] rounded-md bg-white px-3 py-3 shadow-[-3px_3px_10px_rgba(0,0,0,0.25)] sm:-right-8 sm:top-[200px] sm:w-[151px]">
            <p className="text-[10px] font-medium tracking-[-0.02em] text-[#7c7c7c]">
              Business Growth Score
            </p>
            <p className="mt-1 text-[32px] leading-none font-extralight tracking-[-0.06em] text-[#185370] sm:text-[39px]">
              80.8%
            </p>
            <p className="mt-1 text-[10px] font-medium text-[#b3b4b8]">
              Up <span className="text-[#06bc0b]">10%</span> Today
            </p>
          </div>

          <div className="absolute -right-4 bottom-12 w-[145px] rounded-md bg-white px-3 py-3 shadow-[-3px_3px_10px_rgba(0,0,0,0.25)] sm:-right-20 sm:bottom-[97px] sm:w-[151px]">
            <p className="text-[10px] font-medium text-[#7c7c7c]">
              Journey Insights
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {insights.map(([label, value]) => (
                <span
                  key={label}
                  className="rounded-full bg-[#ebf3f7] px-2 py-1 text-[6px] text-[#7c7c7c]"
                >
                  {label} <span className="text-[#185370]">| {value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[389px] flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-serif text-[clamp(2.25rem,4vw,2.375rem)] leading-[1.2] tracking-[-0.095rem] text-[#082a35]">
              Bring AI into the way you already work.
            </h2>
            <p className="text-base leading-[1.4] text-[#52666d]">
              Explore practical guidance built around your profession, discover
              how AI can support your everyday work, and get help when you need
              it, all in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              component="a"
              href="#"
              variant="default"
              radius="md"
              className="h-12 w-40 border-[#333333]/15 text-base font-medium text-[#082a35]"
            >
              Try for free
            </Button>
            <Button
              component="a"
              href="#"
              radius="md"
              className="h-12 w-[163px] bg-[#43ac47] text-base font-medium text-white hover:bg-[#36913a]"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
