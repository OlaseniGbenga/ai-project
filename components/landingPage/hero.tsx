"use client";

import Image from "next/image";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-[560px] md:min-h-[896px] flex flex-col items-center justify-start text-center overflow-hidden">
      {/* Background image — Next.js optimized */}
      <Image
        src="/homepage/Hero section.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#052128]/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 md:px-15 pt-10 pb-16 md:pt-14 md:pb-24 w-full">
        <motion.div
          className="self-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="hidden md:inline-flex flex-row gap-3 items-center bg-[#1E373D] rounded-[28px] px-[12px] py-[8px]">
            <span className="py-[2px] px-[4px] rounded-[8px] font-semibold text-[12px] bg-white">
              NEW
            </span>
            <span className="text-white text-sm">
              AI-powered tools to help you learn, solve, and grow
            </span>
          </span>
        </motion.div>

        <motion.h1
          className="text-white text-[36px] md:text-[60px] font-normal leading-[1.2] md:leading-[1.15] max-w-[800px]"
          {...fadeUp(0.15)}
        >
          Build the skills to grow your business with{" "}
          <motion.span
            className="text-[#43AC47]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55, ease: "backOut" }}
          >
            AI.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-white font-normal text-[15px] md:text-[20px] max-w-[600px] leading-[1.6]"
          {...fadeUp(0.3)}
        >
          Practical courses, AI-powered guidance, and real business tools
          designed to help you make better decisions, solve everyday challenges,
          and turn what you learn into real progress.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => router.push("/login")}
              bg="#fff"
              c="#333333"
              className="font-medium text-[15px] md:text-[18px] h-[48px] px-8 rounded-[11.3px]"
            >
              Get Started
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              component="a"
              href="#courses"
              bg="#637077"
              color="#fff"
              className="font-medium text-[15px] md:text-[18px] h-[48px] px-8 rounded-[11.3px]"
            >
              Explore Courses
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
