export interface OnboardingAboutWorkValues {
  occupation: string;
  occupationOther: string;
  aiUsage: string;
}

export interface OnboardingComfortPaceValues {
  techComfort: string;
  dailyTime: string;
}

export interface OnboardingGoalChallengeValues {
  learningGoal: string;
  learningGoalOther: string;
  biggestChallenge: string;
  biggestChallengeOther: string;
}

export interface SelectionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export interface SelectionCardGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allowOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}