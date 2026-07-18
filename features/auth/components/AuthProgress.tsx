import React from "react";
import { Progress } from "@mantine/core";
import { AuthProgressProps } from "@/features/auth/types/auth.types";

const AuthProgress: React.FC<AuthProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
   <Progress
  value={percentage}
  color="brand.5"
  size="md"
  mb="lg"
  w="100%"
  mx="auto"
  styles={{
    root: {
      backgroundColor: "#c2e0ce",
    },
  }}
/>
  );
};

export default AuthProgress;
