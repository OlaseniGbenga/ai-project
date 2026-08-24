import HowItWorksSection from "./how-it-works-section";
import Image from "next/image";
import { Button } from "@mantine/core";

const assetPath = "/homepage/ai-work";
const assetPath2 = "/homepage/platform-kit";

const features = [
  {
    label: "AI Guidance",
    icon: "ai-guidance.svg",
    background: "bg-[#f0f7fa]",
    textColor: "text-[#185370]",
  },
  {
    label: "Personalised Courses",
    icon: "personalised-courses.svg",
    background: "bg-[#f0f8df]",
    textColor: "text-[#1f2e34]",
  },
  {
    label: "Practical Tasks",
    icon: "practical-tasks.svg",
    background: "bg-[#f9d1dc]",
    textColor: "text-[#263238]",
  },
  {
    label: "AI Assistant",
    icon: "ai-assistant.svg",
    background: "bg-[#eee5fb]",
    textColor: "text-[#185370]",
  },
  {
    label: "Certificates",
    icon: "certificates.svg",
    background: "bg-[#b9e8ff]",
    textColor: "text-[#185370]",
  },
];

const insights = [
  ["Engagement", "+18%"],
  ["Sessions", "-19%"],
  ["Activity", "+24%"],
  ["Conversions", "30%"],
  ["New Visitors", "22%"],
];
export default function Fix() {
  return (
    <div className="">
      <HowItWorksSection />
      <section className="relative bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-40">
        <div
          className="mb-[30px] flex w-full flex-col items-start justify-between gap-8 rounded-[18px] border border-[#e6f1f6] bg-white/95 px-6 py-8 backdrop-blur-[18px] sm:px-10 lg:absolute lg:top-[clamp(-100px,-8vw,-40px)] lg:left-1/2 lg:w-[80vw] lg:-translate-x-1/2 lg:flex-row lg:items-center lg:px-12"
          data-node-id="73:2933"
        >
          <h2 className="max-w-[326px] font-serif text-[clamp(2.1rem,4vw,2.375rem)] leading-[1.2] tracking-[-0.095rem] text-[#082a35]">
            Our Platform Conversion Kit
          </h2>

          <div className="flex w-full max-w-[609px] flex-wrap items-center justify-start gap-4 lg:justify-end">
            {features.map((feature) => (
              <div
                key={feature.label}
                className={`flex min-h-[57px] items-center justify-center gap-3 rounded-[9px] px-[22px] py-4 backdrop-blur-[24px] ${feature.background} ${feature.textColor}`}
              >
                <Image
                  src={`${assetPath2}/${feature.icon}`}
                  alt=""
                  width={21}
                  height={21}
                  className="h-[21px] w-[21px] shrink-0 object-contain"
                />
                <span className="whitespace-nowrap text-[15px] leading-[1.2] font-light sm:text-base">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-12 lg:flex-row lg:gap-14">
          <div
            className="relative h-[360px] w-full max-w-[568px] shrink-0 sm:h-[459px] rounded-xl overflow-hidden"
            style={{
              backgroundImage: `url('${assetPath}/workshop.webp')`,
              backgroundSize: "cover",
            }}
          >
            {/* <Image
              src={`${assetPath}/workshop.webp`}
              alt="A business owner working with AI in his workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 468px"
              className="object-cover "
            /> */}
          </div>

          <div className="flex w-full max-w-[389px] flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-[clamp(2.25rem,4vw,2.375rem)] leading-[1.2] tracking-[-0.095rem] text-[#082a35]">
                Bring AI into the way you already work.
              </h2>
              <p className="text-base leading-[1.4] text-[#52666d]">
                Explore practical guidance built around your profession,
                discover how AI can support your everyday work, and get help
                when you need it, all in one place.
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
    </div>
  );
}
