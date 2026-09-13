"use client";

import { ActionIcon, Box, Button, Input } from "@mantine/core";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "@/utils";
import Image from "next/image";

export default function AskAnything() {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full  mt-[20px] gap-4">
        <div className="lg:w-[800px]">
          <Input
            size="lg"
            placeholder="Ask anything......"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            radius={24}
            styles={{
              input: {
                height: 64,
                paddingLeft: 80,
                paddingRight: 20,
                fontSize: 16,
                color: "#C5D3D2",
                background: "#0C404E",
              },
              section: {
                width: 100,
              },
            }}
            leftSection={
              <Image
                width={100}
                height={100}
                src="ai-assist-icon.svg"
                alt="AI Assistant"
              />
            }
          />
        </div>

        <Button h={64} radius={12} bg={"#0C404E"}>
          <Image
            width={30}
            height={30}
            src="send-horizontal.svg"
            alt="AI Assistant"
          />
        </Button>
      </div>
    </div>
  );
}
