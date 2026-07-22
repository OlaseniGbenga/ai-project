"use client";

import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Anchor,
  Paper,
  Group,
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
  AUTH_FORM_WIDTH,
  ONBOARDING_HEADER_MAX_WIDTH,
} from "@/features/auth/utils/auth.validations";
import {
  OnboardingGoalChallengeValues,
  TRADE_ID_MAP,
  GOAL_ID_MAP,
  AI_USAGE_ENUM_MAP,
  TECH_COMFORT_ENUM_MAP,
  DAILY_TIME_ENUM_MAP,
} from "@/features/auth/types/onboarding.types";
import { useCompleteOnboarding } from "@/features/auth/hooks/useOnboarding";

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

export default function GoalChallengePage() {
  const router = useRouter();
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();
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

    const aboutWork = JSON.parse(
      localStorage.getItem("onboarding_about_work") ?? "{}",
    );
    const comfortPace = JSON.parse(
      localStorage.getItem("onboarding_comfort_pace") ?? "{}",
    );

    const tradeId = TRADE_ID_MAP[aboutWork.occupation] ?? TRADE_ID_MAP["other"];
    const goalId = GOAL_ID_MAP[values.learningGoal] ?? GOAL_ID_MAP["other"];
    const aiFamiliarityLevel =
      AI_USAGE_ENUM_MAP[aboutWork.aiUsage] ?? "OCCASIONALLY";
    const technologyComfortLevel =
      TECH_COMFORT_ENUM_MAP[comfortPace.techComfort] ?? "COMFORTABLE";
    const dailyLearningTime =
      DAILY_TIME_ENUM_MAP[comfortPace.dailyTime] ?? "TEN_MINUTES";

    completeOnboarding(
      {
        tradeId,
        otherTrade:
          aboutWork.occupation === "other"
            ? aboutWork.occupationOther
            : undefined,
        aiFamiliarityLevel,
        technologyComfortLevel,
        dailyLearningTime,
        goalId,
        otherGoal:
          values.learningGoal === "other"
            ? values.learningGoalOther
            : undefined,
        mainChallenge: values.biggestChallenge || values.biggestChallengeOther,
      },
      {
        onSuccess: () => {
          localStorage.setItem(
            "onboarding_goal_challenge",
            JSON.stringify(values),
          );
          router.push("/onboarding/learning-path");
        },
        onError: (err: Error) => {
          notifications.show({
            title: "Onboarding failed",
            message: err.message,
            color: "red",
          });
        },
      },
    );
  };

  return (
    <AuthPageWrapper showBack={false}>
      <Stack
        w={AUTH_FORM_WIDTH}
        maw="800px"
        px="md"
        gap={0}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box mb="sm" maw={ONBOARDING_HEADER_MAX_WIDTH} mx="auto" w="100%">
          <AuthHeader />
          <AuthProgress currentStep={5} totalSteps={6} />
        </Box>
        <Paper
          radius="lg"
          p="xl"
          bg="white"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Text fw={700} size="24px" c="#000000" mb={4}>
            Your goal & challenge
          </Text>
          <Text size="13px" c="#919191" mb="lg">
            Tell us what success looks like — and what's in the way.
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
          <Group pt="lg" gap="md">
            <Anchor
              onClick={() => router.back()}
              style={{ textDecoration: "none", flex: 1 }}
            >
              <Button
                fullWidth
                size="md"
                variant="outline"
                color="brand.5"
                radius="md"
                leftSection={<ArrowLeft size={14} />}
              >
                Back
              </Button>
            </Anchor>
            <Box style={{ flex: 2 }}>
              <Button
                fullWidth
                size="md"
                color="brand.5"
                radius="md"
                loading={isPending}
                onClick={handleContinue}
              >
                Generate my path
              </Button>
            </Box>
          </Group>
        </Paper>
      </Stack>
    </AuthPageWrapper>
  );
}
