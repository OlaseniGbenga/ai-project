
interface AboutCourseProps {
  description: string;
}

export default function AboutCourse({
  description,
}: AboutCourseProps) {
  return (
    <section className="h-fit w-full rounded-[12px] border border-[#E5EAE8] bg-white px-6 py-5">
      <h2
        className="text-[22px] font-normal text-[#052128]"
        style={{ fontFamily: '"GFS Didot", serif' }}
      >
        About this course
      </h2>

      <p className="mt-4 text-[14px] leading-[1.9] text-[#536B73]">
        {description}
      </p>
    </section>
  );
}
