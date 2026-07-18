"use client";

import { Stack, Text, Box, Group, Button, Paper, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthProgress from "@/features/auth/components/AuthProgress";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";
import {
  ONBOARDING_HEADER_MAX_WIDTH,
  ONBOARDING_CARD_MAX_WIDTH,
} from "@/features/auth/utils/auth.validations";
import {
  EMERALD,
  ONBOARDING_CARD_STYLE,
  PRIMARY_BUTTON_STYLE,
} from "@/features/auth/utils/auth.theme";

const LEARNING_PATH_ITEMS = [
  "Use AI to promote your tailoring business",
  "Create marketing content faster",
  "Learn AI step-by-step in simple English",
  "Complete lessons in 15 minutes a day",
];

const CURRENT_STEP = 6;
const TOTAL_STEPS = 6;

export default function LearningPathPage() {
  const router = useRouter();

  return (
    <AuthPageWrapper showBack={false}>
      <Stack
        w="100%"
        px="md"
        gap={0}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Box mb="sm" maw={ONBOARDING_HEADER_MAX_WIDTH} mx="auto" w="100%">
          <AuthHeader />
          <AuthProgress currentStep={CURRENT_STEP} totalSteps={TOTAL_STEPS} />
        </Box>
        <Paper
          radius={24}
          p={{ base: "md", sm: "xl" }}
          bg="white"
          maw={ONBOARDING_CARD_MAX_WIDTH}
          mx="auto"
          w="100%"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            ...ONBOARDING_CARD_STYLE,
          }}
        >
          <Flex justify="space-between" align="center" mb="md">
            <Text
              size="12px"
              fw={700}
              c={EMERALD[700]}
              style={{ letterSpacing: "0.5px" }}
            >
              ONBOARDING
            </Text>
            <Text size="12px" fw={600} c="#8E8E8E">
              Step {CURRENT_STEP} of {TOTAL_STEPS}
            </Text>
          </Flex>
          <Stack
            gap="lg"
            align="center"
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Image
              src="/success_icon.png"
              alt="Success"
              width={120}
              height={120}
              priority
            />
            <Text fw={700} size="24px" c="#000000" ta="center">
              Your Learning Path is Ready
            </Text>
            <Stack gap={12} w="100%">
              <Text size="14px" c="#000000" fw={500}>
                Based on your answers, we&apos;ll help you:
              </Text>
              {LEARNING_PATH_ITEMS.map((item) => (
                <Group key={item} gap={10} align="center">
                  <Check size={16} color={EMERALD[600]} />
                  <Text size="14px" c={EMERALD[700]} fw={500}>
                    {item}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>
          <Box pt="lg" style={{ display: "flex", justifyContent: "center" }}>
            <Button
              w={{ base: "100%", xs: 260 }}
              rightSection={<ArrowRight size={14} />}
              onClick={() => router.push("/dashboard")}
              styles={PRIMARY_BUTTON_STYLE}
            >
              Start learning
            </Button>
          </Box>
        </Paper>
      </Stack>
    </AuthPageWrapper>
  );
}