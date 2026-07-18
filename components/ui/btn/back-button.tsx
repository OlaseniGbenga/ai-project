"use client";

import { useRouter } from "next/navigation";
import LeftArrow from "@/public/arrow-left.svg";
import Image from "next/image";

function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Image
      className="transition-all duration-300 ease-out hover:scale-105 hover:-translate-x-1 cursor-pointer"
      onClick={handleBack}
      priority
      src={LeftArrow}
      alt="Follow us on Twitter"
    />
  );
}
export default BackButton;
