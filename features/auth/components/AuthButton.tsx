import React from "react";
import { Button } from "@mantine/core";
import { AuthButtonProps } from "../types/auth.types";

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
      color="brand.5"
      mt="md"
      radius="md"
      styles={{
        root: {
          height: "52px",
          fontSize: "16px",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default AuthButton;