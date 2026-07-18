import React from "react";
import { PinInput, Group } from "@mantine/core";
import { OtpInputProps } from "@/features/auth/types/auth.types";

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const handleChange = (val: string) => {
    onChange(val.split(""));
  };

  return (
    <Group justify="center">
      <PinInput
        length={6}
        value={value.join("")}
        onChange={handleChange}
        oneTimeCode
        inputMode="numeric"
        type={/^[0-9]*$/}
        gap="lg"
        styles={{
          input: {
            width: "clamp(32px, 8vw, 48px)",
            height: "clamp(32px, 8vw, 48px)",
            textAlign: "center",
            fontSize: "clamp(14px, 4vw, 20px)",
            borderColor: "#423E3E",
            borderRadius: "8px",
          },
        }}
      />
    </Group>
  );
};

export default OtpInput;
