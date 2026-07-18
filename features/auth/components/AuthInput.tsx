import React from "react";
import { PasswordInput, TextInput } from "@mantine/core";
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
  if (type === "password") {
    return (
      <PasswordInput
        label={label}
        placeholder={placeholder}
        value={value}
        error={error}
        onChange={onChange}
        size="lg"
        styles={inputStyles}
      />
    );
  }

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      error={error}
      onChange={onChange}
      size="lg"
      styles={inputStyles}
    />
  );
};

export default AuthInput;