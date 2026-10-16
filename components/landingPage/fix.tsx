"use client";

import HowItWorksSection from "./how-it-works-section";
import Image from "next/image";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const assetPath = "/homepage/ai-work";
const assetPath2 = "/homepage/platform-kit";

const features = [
  { label: "AI Guidance", icon: "ai-guidance.svg", background: "bg-[#f0f7fa]", textColor: "text-[#185370]" },
  { label: "Personalised Courses", icon: "personalised-courses.svg", background: "bg-[#f0f8df]", textColor: "text-[#1f2e34]" },
  { label: "Practical Tasks", icon: "practical-tasks.svg", background: "bg-[#f9d1dc]", textColor: "text-[#263238]" },
  { label: "AI Assistant", icon: "ai-assistant.svg", background: "bg-[#eee5fb]", textColor: "text-[#185370]" },
  { label: "Certificates", icon: "certificates.svg", background: "bg-[#b9e8ff]", textColor: "text-[#185370]" },
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
    <div>
      <HowItWorksSection />

      <section className="relative bg-white px-6 py-20 sm:px-10 lg:px-20 lg:py-40">
        {/* Platform Kit Banner */}
        <motion.div
          className="mb-[30px] flex w-full flex-col items-start justify-between gap-8 rounded-[18px] border border-[#e6f1f6] bg-white/95 px-6 py-8 backdrop-blur-[18px] sm:px-10 lg:absolute lg:top-[clamp(-100px,-8vw,-40px)] lg:left-1/2 lg:w-[80vw] lg:-translate-x-1/2 lg:flex-row lg:items-center lg:px-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="max-w-[326px] font-serif text-[clamp(2.1rem,4vw,2.375rem)] leading-[1.2] tracking-[-0.095rem] text-[#082a35]">
            Our Platform Conversion Kit
          </h2>

          <div className="flex w-full max-w-[609px] flex-wrap items-center justify-start gap-4 lg:justify-end">
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                className={`flex min-h-[57px] items-center justify-center gap-3 rounded-[9px] px-[22px] py-4 backdrop-blur-[24px] ${feature.background} ${feature.textColor}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.18 } }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Work Content */}
        <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-12 lg:flex-row lg:gap-14">
          {/* Image with floating cards */}
          <motion.div
            className="relative h-[360px] w-full max-w-[568px] shrink-0 sm:h-[459px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              backgroundImage: `url('${assetPath}/workshop.webp')`,
              backgroundSize: "cover",
            }}
          >
            {/* Floating insight card 1 */}
            <motion.div
              className="absolute -right-3 top-10 w-[calc(100%-100px)] min-w-[240px] rounded-[7px] bg-white p-3 shadow-[9px_9px_18px_rgba(0,0,0,0.16)] sm:-right-16 sm:top-[72px] sm:w-[251px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <Image src={`${assetPath}/dollar.svg`} alt="" width={31} height={31} className="h-[31px] w-[31px] shrink-0" />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="text-[9px] font-medium text-black">AI Business Insight</span>
                  <div className="flex flex-col gap-0.5">
                    <div className="h-1.5 rounded-full bg-[#edf0f4]">
                      <div className="h-full w-[52%] rounded-full bg-[#43ac47]" />
                    </div>
                    <div className="h-1.5 w-[59%] rounded-full bg-[#edf0f4]" />
                  </div>
                </div>
                <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#43ac47]/[0.08] px-2 py-0.5 text-[6px] font-medium text-[#43ac47]">
                  <Image src={`${assetPath}/active-dot.svg`} alt="" width={4} height={4} className="h-1 w-1" />
                  Active
                </span>
              </div>
            </motion.div>

            {/* Floating score card */}
            <motion.div
              className="absolute -right-4 top-[132px] w-[130px] rounded-md bg-white px-3 py-3 shadow-[-3px_3px_10px_rgba(0,0,0,0.25)] sm:-right-8 sm:top-[200px] sm:w-[151px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <p className="text-[10px] font-medium tracking-[-0.02em] text-[#7c7c7c]">Business Growth Score</p>
              <p className="mt-1 text-[32px] leading-none font-extralight tracking-[-0.06em] text-[#185370] sm:text-[39px]">80.8%</p>
              <p className="mt-1 text-[10px] font-medium text-[#b3b4b8]">
                Up <span className="text-[#06bc0b]">10%</span> Today
              </p>
            </motion.div>

            {/* Floating journey insights card */}
            <motion.div
              className="absolute -right-4 bottom-12 w-[145px] rounded-md bg-white px-3 py-3 shadow-[-3px_3px_10px_rgba(0,0,0,0.25)] sm:-right-20 sm:bottom-[97px] sm:w-[151px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-[10px] font-medium text-[#7c7c7c]">Journey Insights</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {insights.map(([label, value]) => (
                  <span key={label} className="rounded-full bg-[#ebf3f7] px-2 py-1 text-[6px] text-[#7c7c7c]">
                    {label} <span className="text-[#185370]">| {value}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="flex w-full max-w-[389px] flex-col gap-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
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
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component="a"
                  href="/login"
                  variant="default"
                  radius="md"
                  className="h-12 w-40 border-[#333333]/15 text-base font-medium text-[#082a35]"
                >
                  Try for free
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component="a"
                  href="#courses"
                  radius="md"
                  className="h-12 w-[163px] bg-[#43ac47] text-base font-medium text-white hover:bg-[#36913a]"
                >
                  Explore Courses
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
