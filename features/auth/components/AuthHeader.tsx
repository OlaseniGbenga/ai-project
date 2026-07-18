import React from "react";
import { Stack, Text } from "@mantine/core";

const AuthHeader: React.FC = () => {
  return (
    <Stack gap={2} align="center" mb="lg">
      <Text fw={700} size="20px" c="#000000">
        CUNIV AI
      </Text>
      <Text size="16px" py={2} c="#8E8E8E">
        Learn, apply, grow
      </Text>
    </Stack>
  );
};

export default AuthHeader;