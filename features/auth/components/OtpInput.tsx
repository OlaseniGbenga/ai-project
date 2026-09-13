import React from "react";
import { PinInput, Group } from "@mantine/core";
import { OtpInputProps } from "@/features/auth/types/auth.types";

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const handleChange = (val: string) => {
    onChange(val.split(""));
  };

  return (
    <Group justify="flex-start" w="100%" my="md">
      <PinInput
        length={6}
        value={value.join("")}
        onChange={handleChange}
        oneTimeCode
        inputMode="numeric"
        type={/^[0-9]*$/}
        gap="sm"
        styles={{
          input: {
            width: "clamp(36px, 8vw, 44px)",
            height: "clamp(36px, 8vw, 44px)",
            textAlign: "center",
            fontSize: "clamp(14px, 3vw, 18px)",
            borderColor: "#423E3E",
            borderRadius: "8px",
            fontWeight: 600,
            padding: 0,
          },
        }}
      />
    </Group>
  );
};

export default OtpInput;
