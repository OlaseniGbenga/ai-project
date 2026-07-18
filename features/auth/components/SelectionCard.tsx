import React from "react";
import { Box, Text, ActionIcon } from "@mantine/core";
import { X } from "lucide-react";
import { SelectionCardProps } from "@/features/auth/types/onboarding.types";
import { EMERALD } from "@/features/auth/utils/auth.theme";

type Props = SelectionCardProps & {
  onClear?: () => void;
};

const SelectionCard: React.FC<Props> = ({
  label,
  selected,
  onClick,
  onClear,
}) => {
  return (
    <Box
      onClick={onClick}
      style={{
        borderRadius: "12px",
        border: `1.5px solid ${selected ? EMERALD[600] : EMERALD[200]}`,
        backgroundColor: selected ? EMERALD[50] : "#ffffff",
        cursor: "pointer",
        transition: "all 0.15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        padding: "16px 16px",
        width: "100%",
      }}
    >
      <Text
        size="14px"
        fw={selected ? 600 : 500}
        c={selected ? EMERALD[800] : EMERALD[700]}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
      {onClear && (
        <ActionIcon
          size="xs"
          variant="transparent"
          c={EMERALD[700]}
          onClick={(event) => {
            event.stopPropagation();
            onClear();
          }}
        >
          <X size={14} />
        </ActionIcon>
      )}
    </Box>
  );
};

export default SelectionCard;