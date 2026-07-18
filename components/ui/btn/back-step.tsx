"use client";

import LeftArrow from "@/public/arrow-left.svg";
import Image from "next/image";

type BackStepProps = {
  onPrevStep: () => void;
};

function BackStep({ onPrevStep }: BackStepProps) {
  return (
    <Image
      className="transition-all duration-300 ease-out hover:scale-105 hover:-translate-x-1 cursor-pointer"
      onClick={onPrevStep}
      priority
      src={LeftArrow}
      alt="Go back to previous step"
    />
  );
}

export default BackStep;
