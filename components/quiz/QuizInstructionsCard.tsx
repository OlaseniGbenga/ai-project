
import {
  BookOpen,
  CheckCircle2,
  CircleDot,
  History,
  Info,
} from "lucide-react";



export default function QuizInstructionsCard() {
  return (
    <section className="rounded-[12px] border border-[#E7EAE8] bg-white px-5 py-6">
      <div className="flex items-center gap-2">
        <Info size={18} strokeWidth={1.6} className="text-[#758784]" />
        
        

        <h2
          className="text-[17px] font-normal text-[#0C404E]"
          style={{ fontFamily: '"GFS Didot", "Times New Roman", serif' }}
        >
          Quiz Instructions
        </h2>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <BookOpen size={15} className="mt-0.5 shrink-0 text-[#758784]" />
          <p className="text-[12px] leading-[19px] text-[#63777B]">
            Read carefully before selecting an answer.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <CircleDot size={15} className="mt-0.5 shrink-0 text-[#758784]" />
          <p className="text-[12px] leading-[19px] text-[#63777B]">
            Select one best answer for each question.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <History size={15} className="mt-0.5 shrink-0 text-[#758784]" />
          <p className="text-[12px] leading-[19px] text-[#63777B]">
            Review previous answers anytime before submission.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#758784]" />
          <p className="text-[12px] leading-[19px] text-[#63777B]">
            Complete to see score and detailed feedback.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[7px] border border-[#CBD4E0] bg-[#F0F3FF] px-3 py-4">
        <p className="text-[12px] italic leading-[19px] text-[#455654]">
          &ldquo;Final Score Context: Complete all questions to see your
          score and review your answers in depth.&rdquo;
        </p>
      </div>
    </section>
  );
}
