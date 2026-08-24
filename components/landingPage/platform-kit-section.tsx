import Image from "next/image";

const assetPath = "/homepage/platform-kit";

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

export default function PlatformKitSection() {
  return (
    <section className="relative z-20 -my-12 bg-[#f8fbfc] px-4 py-12 sm:-my-16 sm:px-8 lg:-my-20 lg:px-12 lg:py-20">
      <div
        className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-8 rounded-[18px] border border-[#e6f1f6] bg-white/95 px-6 py-8 backdrop-blur-[18px] sm:px-10 lg:flex-row lg:items-center lg:px-12"
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
                src={`${assetPath}/${feature.icon}`}
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
    </section>
  );
}
