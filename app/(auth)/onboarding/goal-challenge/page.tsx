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
import { OnboardingGoalChallengeValues } from "@/features/auth/types/onboarding.types";

const LEARNING_GOALS = [
  "Save time on tasks",
  "Better client communication",
  "Grow sales and marketing",
  "Understand AI generally",
];

const BIGGEST_CHALLENGES = [
  "Too technical",
  "Not enough time",
  "Not sure how it will help my business",
  "I don't know where / how to start learning",
];

const CURRENT_STEP = 5;
const TOTAL_STEPS = 6;

export default function GoalChallengePage() {
  const router = useRouter();
  const [values, setValues] = useState<OnboardingGoalChallengeValues>({
    learningGoal: "",
    learningGoalOther: "",
    biggestChallenge: "",
    biggestChallengeOther: "",
  });

  const handleContinue = () => {
    if (!values.learningGoal && !values.learningGoalOther) {
      notifications.show({
        title: "Selection required",
        message: "Please select your learning goal.",
        color: "red",
      });
      return;
    }
    if (!values.biggestChallenge && !values.biggestChallengeOther) {
      notifications.show({
        title: "Selection required",
        message: "Please select your biggest challenge.",
        color: "red",
      });
      return;
    }
    localStorage.setItem("onboarding_goal_challenge", JSON.stringify(values));
    router.push("/onboarding/learning-path");
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
            Your goal & challenge
          </Text>
          <Text size="13px" c="#919191" mb="lg">
            Tell us what success looks like — and what&apos;s in the way.
          </Text>
          <ScrollArea style={{ flex: 1 }} offsetScrollbars>
            <Stack gap="xl" pb="md">
              <SelectionCardGroup
                label="Select your learning goal"
                options={LEARNING_GOALS}
                value={values.learningGoal}
                onChange={(value) =>
                  setValues({
                    ...values,
                    learningGoal: value,
                    learningGoalOther: "",
                  })
                }
                allowOther
                otherValue={values.learningGoalOther}
                onOtherChange={(value) =>
                  setValues({
                    ...values,
                    learningGoalOther: value,
                    learningGoal: "other",
                  })
                }
              />
              <SelectionCardGroup
                label="Biggest challenge with learning AI"
                options={BIGGEST_CHALLENGES}
                value={values.biggestChallenge}
                onChange={(value) =>
                  setValues({
                    ...values,
                    biggestChallenge: value,
                    biggestChallengeOther: "",
                  })
                }
                allowOther
                otherValue={values.biggestChallengeOther}
                onOtherChange={(value) =>
                  setValues({
                    ...values,
                    biggestChallengeOther: value,
                    biggestChallenge: "other",
                  })
                }
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
                Generate my path
              </Button>
            </Box>
          </Flex>
        </Paper>
      </Stack>
    </AuthPageWrapper>
  );
}