import React from "react";
import { Stack, Text } from "@mantine/core";
import { EMERALD } from "@/features/auth/utils/auth.theme";

const AuthHeader: React.FC = () => {
  return (
    <Stack gap={2} align="center" mb="lg" mx="auto" w="90%">
      <Text fw={800} size="32px" c={EMERALD[700]}>
        CUNIV AI
      </Text>
      <Text size="16px" py={2} c="#8E8E8E">
        Learn, apply, grow
      </Text>
    </Stack>
  );
};

export default AuthHeader;
