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
  AUTH_FORM_WIDTH,
  ONBOARDING_HEADER_MAX_WIDTH,
  ONBOARDING_CARD_MAX_WIDTH,
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
import { useUpdateProfile } from "@/features/auth/hooks/useAuth";
import {
  EMERALD,
  ONBOARDING_CARD_STYLE,
  PRIMARY_BUTTON_STYLE,
  OUTLINE_BUTTON_STYLE,
} from "@/features/auth/utils/auth.theme";

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

const CURRENT_STEP = 3;
const TOTAL_STEPS = 3;

export default function GoalChallengePage() {
  const router = useRouter();
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const [values, setValues] = useState<OnboardingGoalChallengeValues>({
    learningGoal: "",
    learningGoalOther: "",
    biggestChallenge: "",
    biggestChallengeOther: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleContinue = () => {
    if (!values.learningGoal) {
      notifications.show({
        title: "Selection required",
        message: "Please select your learning goal.",
        color: "red",
      });
      return;
    }

    if (values.learningGoal === "other" && !values.learningGoalOther.trim()) {
      notifications.show({
        title: "Goal required",
        message: "Please enter your learning goal before proceeding.",
        color: "red",
      });
      return;
    }

    if (!values.biggestChallenge) {
      notifications.show({
        title: "Selection required",
        message: "Please select your biggest challenge.",
        color: "red",
      });
      return;
    }

    if (
      values.biggestChallenge === "other" &&
      !values.biggestChallengeOther.trim()
    ) {
      notifications.show({
        title: "Challenge required",
        message: "Please enter your biggest challenge before proceeding.",
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

    const nameParts = aboutWork.fullName.trim().split(/\s+/);
    const firstName = nameParts.shift() ?? "";
    const lastName = nameParts.join(" ") || firstName;

    updateProfile(
      { firstName, lastName },
      {
        onSuccess: () => {
          completeOnboarding(
            {
              fullName: aboutWork.fullName,
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
              mainChallenge:
                values.biggestChallenge === "other"
                  ? values.biggestChallengeOther
                  : values.biggestChallenge,
            },
            {
              onSuccess: () => {
                document.cookie = `onboardingCompleted=true; path=/; max-age=31536000; SameSite=Lax`;
                localStorage.setItem(
                  "onboarding_goal_challenge",
                  JSON.stringify(values),
                );
                setShowSuccess(true);
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
        },
        onError: (err: Error) => {
          notifications.show({
            title: "Unable to save your name",
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
              size="13px"
              fw={700}
              c={EMERALD[700]}
              style={{ letterSpacing: "0.5px" }}
            >
              ONBOARDING
            </Text>
            <Text size="13px" fw={600} c="#8E8E8E">
              Step {CURRENT_STEP} of {TOTAL_STEPS}
            </Text>
          </Flex>
          <Text fw={700} size="28px" c="#000000" mb={4}>
            Your goal & challenge
          </Text>
          <Text size="15px" c="#919191" mb="lg">
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
                    learningGoalOther:
                      value === "other" ? values.learningGoalOther : "",
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
                    biggestChallengeOther:
                      value === "other" ? values.biggestChallengeOther : "",
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
              onClick={() => router.replace("/onboarding/comfort-pace")}
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
                loading={isPending || isUpdatingProfile}
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
