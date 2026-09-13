import React from "react";
import { Button } from "@mantine/core";
import { AuthButtonProps } from "../types/auth.types";
import { PILL_RADIUS } from "../utils/auth.theme";

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
      styles={{
        root: {
          height: "52px",
          fontSize: "15px",
          fontWeight: 600,
          borderRadius: PILL_RADIUS,
          backgroundColor: "#3ab54a",
          "&:hover": { backgroundColor: "#2ea040" },
        },
      }}
    >
      {label}
    </Button>
  );
};

export default AuthButton;