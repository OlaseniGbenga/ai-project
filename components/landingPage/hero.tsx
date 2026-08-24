"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div
      className="w-full flex-col gap-6  min-h-224.5 bg-center bg-no-repeat px-2.5 md:px-15 py-[50px] md:py-[100px]  flex item-center   text-center "
      style={{
        backgroundImage: "url('/homepage/Hero section.webp')",
        backgroundSize: "cover",
      }}
    >
      <p className="self-center">
        <span className=" md:flex md:flex-row hidden flex-col gap-4 px-[2px] items-center  bg-[#1E373D] rounded-[28px] px-[12px] py-[8px]">
          {" "}
          <span className="py-[2px] px-[4px] rounded-[8px] font-semibold text-[12px] bg-white">
            NEW
          </span>
          <span className="text-white">
            AI-powered tools to help you learn, solve, and grow
          </span>
        </span>
      </p>
      <p className="text-white text-[40px] md:text-[60px] font-normal leading-[60px] md:leading-[90px]">
        Build the skills to grow your
        <br /> business with <span className="text-[#43AC47]">AI.</span>
      </p>
      <p className="text-white font-normal text-[16px] md:text-[24px]">
        Practical courses, AI-powered guidance, and real business tools <br />
        designed to help you make better decisions, solve everyday challenges,
        <br /> and turn what you learn into real progress.
      </p>
      <div className="flex flex-col self-center gap-4  gap-0 md:flex-row">
        <Button
          onClick={() => router.push(` /login`)}
          type="submit"
          bg={"#fff"}
          c={"#333333"}
          className=" text-[#333333] font-normal text-[16px] md:text-[24px] w-[20px] h-[48px] rounded-[11.3px] "
        >
          Get Started
        </Button>

    
        <Button
          bg={"#637077"}
          color={"#fff"}
          type="submit"
          className="bg-[#637077] text-white font-normal text-[16px] md:text-[24px] w-[20px] h-[48px] rounded-[11.3px] "
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
}
