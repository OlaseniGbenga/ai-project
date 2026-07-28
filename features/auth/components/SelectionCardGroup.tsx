"use client";

import React, { useState } from "react";
import { Stack, Text, SimpleGrid, TextInput, Anchor } from "@mantine/core";
import SelectionCard from "@/features/auth/components/SelectionCard";
import { SelectionCardGroupProps } from "@/features/auth/types/onboarding.types";
import { EMERALD } from "@/features/auth/utils/auth.theme";

const SelectionCardGroup: React.FC<SelectionCardGroupProps> = ({
  label,
  options,
  value,
  onChange,
  allowOther = false,
  otherValue = "",
  onOtherChange,
}) => {
  const [isEditingOther, setIsEditingOther] = useState(
    value === "other" && !otherValue,
  );

  const openOtherEditor = () => {
    onChange("other");
    setIsEditingOther(true);
  };

  const confirmOther = () => {
    if (otherValue.trim()) {
      setIsEditingOther(false);
    }
  };

  const cancelOther = () => {
    onOtherChange?.("");
    onChange("");
    setIsEditingOther(false);
  };

  const otherLabel =
    value === "other" && !isEditingOther && otherValue ? otherValue : "Other";

  return (
    <Stack gap={10}>
      <Text fw={600} size="15px" c="#000000">
        {label}
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={10}>
        {options.map((option) => (
          <SelectionCard
            key={option}
            label={option}
            selected={value === option}
            onClick={() => {
              onChange(option);
              setIsEditingOther(false);
            }}
          />
        ))}
        {allowOther && (
          <SelectionCard
            label={otherLabel}
            selected={value === "other"}
            onClick={openOtherEditor}
            onClear={
              value === "other" && !isEditingOther && otherValue
                ? cancelOther
                : undefined
            }
          />
        )}
      </SimpleGrid>

      {allowOther && value === "other" && isEditingOther && (
        <Stack gap={6}>
          <TextInput
            placeholder="Please specify..."
            value={otherValue}
            autoFocus
            onChange={(event) => onOtherChange?.(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                confirmOther();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                cancelOther();
              }
            }}
            size="md"
            mt={4}
            styles={{
              input: {
                backgroundColor: EMERALD[50],
                borderColor: EMERALD[200],
                borderWidth: "1.5px",
                borderRadius: "12px",
                fontSize: "16px",
                padding: "16px 16px",
              },
            }}
          />
          <Anchor
            component="button"
            type="button"
            onClick={cancelOther}
            size="12px"
            fw={600}
            c="#919191"
            style={{ alignSelf: "flex-start" }}
          >
            Cancel
          </Anchor>
        </Stack>
      )}
    </Stack>
  );
};

export default SelectionCardGroup;
