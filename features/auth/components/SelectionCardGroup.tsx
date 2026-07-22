import React from "react";
import { Stack, Text, SimpleGrid, TextInput } from "@mantine/core";
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
            onClick={() => onChange(option)}
          />
        ))}
        {allowOther && (
          <SelectionCard
            label={otherValue ? otherValue : "Other (fill it in)"}
            selected={value === "other"}
            onClick={() => onChange("other")}
            onClear={
              otherValue
                ? () => {
                    onOtherChange?.("");
                    onChange("");
                  }
                : undefined
            }
          />
        )}
      </SimpleGrid>
  
      {allowOther && value === "other" && (
        <TextInput
          placeholder="Please specify..."
          value={otherValue}
          onChange={(event) => onOtherChange?.(event.currentTarget.value)}
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
      )}
    </Stack>
  );
};
export default SelectionCardGroup;
