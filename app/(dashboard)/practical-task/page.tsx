
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PracticalTaskContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lessonID = searchParams.get("lessonID");

  useEffect(() => {
    if (lessonID) {
      router.replace(`/practical-task/${encodeURIComponent(lessonID)}`);
      return;
    }

    router.replace("/courses");
  }, [lessonID, router]);

  return (
    <div className="flex min-h-[400px] items-center justify-center text-[14px] text-[#63777B]">
      Loading practical task...
    </div>
  );
}

export default function PracticalTaskPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center text-[14px] text-[#63777B]">
          Loading practical task...
        </div>
      }
    >
      <PracticalTaskContent />
    </Suspense>
  );
}
