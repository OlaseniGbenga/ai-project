import React from "react";
import { Button } from "@mantine/core";
import { AuthButtonProps } from "../types/auth.types";
import { EMERALD } from "../utils/auth.theme";

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  loading = false,
  onClick,
  type = "button",
}) => {
  return (
    <Button
      type={type}
      loading={loading}
      onClick={onClick}
      fullWidth
      size="lg"
      mt="md"
      radius="md"
      styles={{
        root: {
          height: "52px",
          fontSize: "16px",
          backgroundColor: EMERALD[700],
        },
      }}
    >
      {label}
    </Button>
  );
};

export default AuthButton;
