"use client";

import { Card, Button, Text, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";

interface FlashCardProps {
  question: string;
  answerTitle: string;
  answer: string;

  width?: number | string;
  height?: number | string;
}

export function FlashCard({
  question,
  answer,
  answerTitle,
  // width = 420,
  // height = 260,
}: FlashCardProps) {
  const [flipped, { toggle }] = useDisclosure(false);

  return (
    <div
      className="group relative cursor-pointer [perspective:1200px] w-full  md:max-w-[600px] "
      // style={{ width, height }}
      onClick={toggle}
    >
      <div
        className={clsx(
          "  relative h-full w-full origin-center duration-500 [transform-style:preserve-3d] [transform-origin:center_center] [will-change:transform]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div className=" bg-primary-50 text-primary-700   absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden] rounded-[20px] max-w-[600px] gap-4">
          {/* <Stack justify="space-between" className="h-full ">
            <Text fw={700} size="xl">
              Question
            </Text>


            <Text ta="center" size="lg">
              {question}
            </Text>


            <Button
             
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              Show Answer
            </Button>
          </Stack> */}
          <p className="mb-6">Flash Card Front</p>
          <p className="heading font-black ">{question}</p>

          <div className="h-125 "></div>
          <p className="self-end">Tap to reveal answer</p>
        </div>

        {/* Back */}
        <div className=" flex flex-col justify-between p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-primary-50 text-primary-700  rounded-[20px] max-w-[600px] gap-4">
          <p className="mb-6">Flash Card Back</p>
          <p className="font-black heading">{answerTitle}</p>

          <p>{answer}</p>
          <p className="self-end">Tap to reveal question</p>
        </div>
      </div>
    </div>
  );
}
