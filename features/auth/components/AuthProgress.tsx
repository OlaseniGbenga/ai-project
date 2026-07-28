import React from "react";
import { Progress } from "@mantine/core";
import { AuthProgressProps } from "@/features/auth/types/auth.types";
import { EMERALD } from "@/features/auth/utils/auth.theme";

const AuthProgress: React.FC<AuthProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <Progress
      value={percentage}
      mb="lg"
      w="100%"
      mx="auto"
      size="md"
      styles={{
        root: {
          backgroundColor: EMERALD[100],
        },
        section: {
          backgroundColor: EMERALD[700],
        },
      }}
    />
  );
};

export default AuthProgress;
