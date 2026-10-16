
import { ArrowRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UpNextPanelProps {
  title: string;
  durationMinutes: number;
  href?: string;
}

export default function UpNextPanel({
  title,
  durationMinutes,
  href,
}: UpNextPanelProps) {
  return (
    <section className="rounded-[12px] border border-[#E5EAE8] bg-white p-5">
      <h2 className="text-[11px] uppercase tracking-[0.08em] text-[#536B73]">
        Up Next
      </h2>

      <div className="relative mt-4 h-[140px] overflow-hidden rounded-md bg-[#052128]">
        <Image
          src="/tailor-cutting-dress.webp"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 320px"
        />
      </div>

      <h3
        className="mt-4 text-[17px] leading-6 text-[#052128]"
        style={{ fontFamily: '"GFS Didot", serif' }}
      >
        {title}
      </h3>

      <p className="mt-2 flex items-center gap-1 text-[12px] text-[#536B73]">
        <Clock3 size={13} />
        {durationMinutes} minutes
      </p>

      {href ? (
        <Link
          href={href}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#40AC49] px-4 py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#348D3B]"
        >
          Continue Lesson
          <ArrowRight size={16} />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-md bg-[#40AC49] px-4 py-3 text-[13px] font-medium text-white opacity-60"
        >
          Continue Lesson
          <ArrowRight size={16} />
        </button>
      )}
    </section>
  );
}
