
import Image from "next/image";

interface CoursesWelcomeBannerProps {
  firstName?: string;
}

export default function CoursesWelcomeBanner({
  firstName,
}: CoursesWelcomeBannerProps) {
  const greeting = firstName?.trim()
    ? `Welcome, ${firstName.trim()}`
    : "Welcome";

  return (
    <section
      className="flex min-h-[214px] w-full max-w-[1050px] flex-col justify-center rounded-[24px] bg-[#052128] px-6 py-8 text-white sm:px-[48px]"
      aria-label="Welcome to your courses"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Image
          src="/memoji.png"
          alt=""
          width={36}
          height={36}
          className="h-[36px] w-[36px] shrink-0"
        />

        <h1
          className="text-[26px] font-normal leading-[1.5] sm:text-[32px]"
          style={{ fontFamily: '"GFS Didot", serif' }}
        >
          {greeting}
        </h1>

        <Image
          src="/verify.svg"
          alt=""
          width={20}
          height={20}
          className="h-[20px] w-[20px] shrink-0"
        />
      </div>

      <p
        className="mt-4 max-w-[520px] text-[16px] font-normal leading-[1.5] text-[#B7C9CC]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Your learning journey starts here. Discover practical ways
        to use AI in your everyday work and business.
      </p>

      <div className="mt-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F6EB] px-3 py-1 text-xs font-medium text-[#269D45]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#39B54A]" />
          Live
        </span>
      </div>
    </section>
  );
}
