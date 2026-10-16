
import Link from "next/link";
import {
  CircleCheck,
  ExternalLink,
  LockKeyhole,
} from "lucide-react";

export interface OutlineModule {
  id: string;
  title: string;
  description: string;
  locked: boolean;
}

interface CourseOutlineProps {
  modules: OutlineModule[];
  href?: string;
}

export default function CourseOutline({
  modules,
  href,
}: CourseOutlineProps) {
  return (
    <section className="w-full rounded-[12px] border border-[#E5EAE8] bg-white px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          className="flex items-center gap-2 text-[22px] font-normal text-[#052128]"
          style={{ fontFamily: '"GFS Didot", serif' }}
        >
          <CircleCheck
            size={17}
            fill="#40AC49"
            stroke="#FFFFFF"
            strokeWidth={2}
            className="shrink-0"
          />
          Course Outline
        </h2>

        {href ? (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#40AC49] hover:underline"
          >
            View Full Outline
            <ExternalLink size={13} />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 text-[13px] text-[#40AC49]">
            View Full Outline
            <ExternalLink size={13} />
          </span>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {modules.length === 0 ? (
          <p className="text-[14px] text-[#536B73]">
            No lessons are available yet.
          </p>
        ) : (
          modules.map((module) => (
            <article
              key={module.id}
              className="flex items-center justify-between gap-4 rounded-[10px] border border-[#E5EAE8] px-4 py-3"
            >
              <div className="min-w-0">
                <h3 className="text-[13px] font-medium text-[#052128]">
                  {module.title}
                </h3>

                <p className="mt-1 text-[12px] leading-[1.5] text-[#536B73]">
                  {module.description}
                </p>
              </div>

              {module.locked && (
                <LockKeyhole
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#A7B8BA]"
                />
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
