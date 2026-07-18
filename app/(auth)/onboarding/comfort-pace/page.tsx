"use client";

import { useState } from "react";
import { Stack, Text, Box, Anchor, Paper, Flex, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { notifications } from "@mantine/notifications";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthProgress from "@/features/auth/components/AuthProgress";
import AuthPageWrapper from "@/features/auth/components/AuthPageWrapper";
import SelectionCardGroup from "@/features/auth/components/SelectionCardGroup";
import {
  ONBOARDING_HEADER_MAX_WIDTH,
  ONBOARDING_CARD_MAX_WIDTH,
} from "@/features/auth/utils/auth.validations";
import {
  EMERALD,
  ONBOARDING_CARD_STYLE,
  PRIMARY_BUTTON_STYLE,
  OUTLINE_BUTTON_STYLE,
} from "@/features/auth/utils/auth.theme";
import { OnboardingComfortPaceValues } from "@/features/auth/types/onboarding.types";

const TECH_COMFORT_OPTIONS = [
  "I need help",
  "I'm comfortable",
  "I'm very confident",
];

const DAILY_TIME_OPTIONS = ["5 mins", "10 mins", "15 mins", "20 mins or more"];

const CURRENT_STEP = 4;
const TOTAL_STEPS = 6;

export default function ComfortPacePage() {
  const router = useRouter();
  const [values, setValues] = useState<OnboardingComfortPaceValues>({
    techComfort: "",
    dailyTime: "",
  });

  const handleContinue = () => {
    if (!values.techComfort) {
      notifications.show({
        title: "Selection required",
        message: "Please select your comfort level with technology.",
        color: "red",
      });
      return;
    }
    if (!values.dailyTime) {
      notifications.show({
        title: "Selection required",
        message: "Please select your daily learning time.",
        color: "red",
      });
      return;
    }
    localStorage.setItem("onboarding_comfort_pace", JSON.stringify(values));
    router.push("/onboarding/goal-challenge");
  };

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
          <Text fw={700} size="24px" c="#000000" mb={4}>
            Your comfort & pace
          </Text>
          <Text size="13px" c="#919191" mb="lg">
            We&apos;ll calibrate lessons to what feels right.
          </Text>
          <Stack gap="xl" style={{ flex: 1 }}>
            <SelectionCardGroup
              label="How comfortable are you with technology?"
              options={TECH_COMFORT_OPTIONS}
              value={values.techComfort}
              onChange={(value) => setValues({ ...values, techComfort: value })}
            />
            <SelectionCardGroup
              label="How long can you spend learning each day?"
              options={DAILY_TIME_OPTIONS}
              value={values.dailyTime}
              onChange={(value) => setValues({ ...values, dailyTime: value })}
            />
          </Stack>
          <Flex direction={{ base: "column", xs: "row" }} gap="md" pt="lg">
            <Anchor
              onClick={() => router.back()}
              style={{ textDecoration: "none", flex: 1 }}
            >
              <Button
                fullWidth
                variant="outline"
                leftSection={<ArrowLeft size={14} />}
                styles={OUTLINE_BUTTON_STYLE}
              >
                Back
              </Button>
            </Anchor>
            <Box style={{ flex: 2 }}>
              <Button
                fullWidth
                onClick={handleContinue}
                styles={PRIMARY_BUTTON_STYLE}
              >
                Continue
              </Button>
            </Box>
          </Flex>
        </Paper>
      </Stack>
    </AuthPageWrapper>
  );
}