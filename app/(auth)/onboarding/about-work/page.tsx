"use client";

import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Anchor,
  Paper,
  Flex,
  Button,
  ScrollArea,
} from "@mantine/core";
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
import { OnboardingAboutWorkValues } from "@/features/auth/types/onboarding.types";

const OCCUPATIONS = [
  "Tailor / Fashion designer",
  "Mechanic / Auto technician",
  "Food vendor / Caterer",
  "Trader / Shop owner",
  "Artisan / Craftsperson",
  "Technician",
];

const AI_USAGE_OPTIONS = ["Never", "Occasionally", "Constantly"];

const CURRENT_STEP = 3;
const TOTAL_STEPS = 6;

export default function AboutWorkPage() {
  const router = useRouter();
  const [values, setValues] = useState<OnboardingAboutWorkValues>({
    occupation: "",
    occupationOther: "",
    aiUsage: "",
  });

  const handleContinue = () => {
    if (!values.occupation) {
      notifications.show({
        title: "Selection required",
        message: "Please select your occupation.",
        color: "red",
      });
      return;
    }
    if (!values.aiUsage) {
      notifications.show({
        title: "Selection required",
        message: "Please select how often you use AI.",
        color: "red",
      });
      return;
    }
    localStorage.setItem("onboarding_about_work", JSON.stringify(values));
    router.push("/onboarding/comfort-pace");
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
            overflow: "hidden",
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
            About your work
          </Text>
          <Text size="13px" c="#919191" mb="lg">
            So we can tailor lessons to your trade and how you use AI.
          </Text>
          <ScrollArea style={{ flex: 1 }} offsetScrollbars>
            <Stack gap="xl" pb="md">
              <SelectionCardGroup
                label="Select your specific occupation"
                options={OCCUPATIONS}
                value={values.occupation}
                onChange={(value) =>
                  setValues({ ...values, occupation: value, occupationOther: "" })
                }
                allowOther
                otherValue={values.occupationOther}
                onOtherChange={(value) =>
                  setValues({
                    ...values,
                    occupationOther: value,
                    occupation: "other",
                  })
                }
              />
              <SelectionCardGroup
                label="How often do you use AI?"
                options={AI_USAGE_OPTIONS}
                value={values.aiUsage}
                onChange={(value) => setValues({ ...values, aiUsage: value })}
              />
            </Stack>
          </ScrollArea>
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