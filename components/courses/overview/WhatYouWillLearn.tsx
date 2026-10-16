
import { Check, CircleCheck } from "lucide-react";

interface WhatYouWillLearnProps {
  outcomes: string[];
}

export default function WhatYouWillLearn({
  outcomes,
}: WhatYouWillLearnProps) {
  return (
    <section className="w-full rounded-[12px] border border-[#E5EAE8] bg-white px-6 py-5 lg:min-h-[339px]">
      <h2
        className="flex items-center gap-2 border-b border-[#E5EAE8] pb-4 text-[22px] font-normal text-[#052128]"
        style={{ fontFamily: '"GFS Didot", serif' }}
      >
        <CircleCheck
          size={17}
          fill="#40AC49"
          stroke="#FFFFFF"
          strokeWidth={2}
          className="shrink-0"
        />
        What You Will Learn
      </h2>

      <ul className="mt-4 space-y-3">
        {outcomes.map((outcome) => (
          <li
            key={outcome}
            className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#536B73]"
          >
            <Check
              size={17}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0"
            />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
