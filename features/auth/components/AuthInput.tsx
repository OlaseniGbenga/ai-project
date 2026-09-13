
import React from "react";
import { PasswordInput, TextInput, Text } from "@mantine/core";
import { AuthInputProps } from "../types/auth.types";

const inputStyles = {
  input: {
    height: "48px",
    backgroundColor: "#ffffff",
    border: "1px solid #dedede",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#171717",
    paddingLeft: "14px",
    paddingRight: "14px",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",

    "&:focus": {
      borderColor: "#3caf4a",
      boxShadow: "0 0 0 2px rgba(60, 175, 74, 0.08)",
    },

    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },

  innerInput: {
    height: "48px",
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
    label: label || undefined,
    placeholder,
    value,
    onChange,
    size: "md" as const,
    styles: inputStyles,
    error: false,
  };

  return (
    <div>
      {type === "password" ? (
        <PasswordInput {...shared} />
      ) : (
        <TextInput {...shared} type={type} />
      )}

      {error && (
        <Text
          size="12px"
          c="#fa5252"
          mt={4}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default AuthInput;
