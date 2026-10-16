
import { CircleCheck } from "lucide-react";

interface CourseProgressPanelProps {
  completedLessons: number;
  totalLessons: number;
}

export default function CourseProgressPanel({
  completedLessons,
  totalLessons,
}: CourseProgressPanelProps) {
  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return (
    <section className="rounded-[12px] border border-[#E5EAE8] bg-white p-5">
      <h2 className="text-[11px] uppercase tracking-[0.08em] text-[#536B73]">
        Your Course Progress
      </h2>

      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-[28px] leading-none text-[#052128]">
          {progress}%
        </strong>

        <span className="text-right text-[11px] text-[#536B73]">
          {completedLessons} of {totalLessons} lessons completed
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Course progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-[6px] overflow-hidden rounded-full bg-[#E5EAE8]"
      >
        <div
          className="h-full rounded-full bg-[#40AC49]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 flex items-start gap-2 text-[12px] leading-5 text-[#536B73]">
        <CircleCheck
          size={15}
          className="mt-0.5 shrink-0 text-[#40AC49]"
        />
        Keep going. You&apos;re making progress!
      </p>
    </section>
  );
}
