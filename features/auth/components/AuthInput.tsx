import React from "react";
import { PasswordInput, TextInput, Text } from "@mantine/core";
import { AuthInputProps } from "../types/auth.types";
import { EMERALD } from "../utils/auth.theme";

const inputStyles = {
  label: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "6px",
    color: EMERALD[900],
  },
  input: {
    backgroundColor: "rgba(236, 253, 245, 0.6)",
    borderColor: EMERALD[200],
    borderRadius: "12px",
    height: "52px",
    fontSize: "16px",
    marginBottom: "4px",
    color: "#000000",
  },
};

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  error,
  onChange,
}) => {
  const shared = {
    label,
    placeholder,
    value,
    onChange,
    size: "lg" as const,
    styles: inputStyles,
    className: "auth-input",
  };

  return (
    <div>
      {type === "password" ? (
        <PasswordInput {...shared} />
      ) : (
        <TextInput {...shared} type={type} />
      )}
      {error && (
        <Text size="12px" c="#fa5252" mt={4}>
          {error}
        </Text>
      )}
    </div>
  );
};

export default AuthInput;