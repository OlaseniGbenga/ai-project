"use client";

import Image from "next/image";
// import BackButton from "@/components/ui/btn/back-button";

type ResetLayoutProps = {
  children: React.ReactNode;
};

export default function ResetLayout({ children }: ResetLayoutProps) {
  return (
    // <div className=" w-full ">
    //   <div className="">
    //     <BackButton />
    //   </div>
    <div className="flex flex-col items-center justify-center gap-6 w-full px-4">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="self-center mb-8"
      />
      {children}
    </div>
    // </div>
  );
}
