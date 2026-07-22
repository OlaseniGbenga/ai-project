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

export const TRADE_ID_MAP: Record<string, string> = {
  "Tailor / Fashion designer": "41465a51-f957-446e-afe6-a3aaf70de691",
  "Mechanic / Auto technician": "1f213bfc-d7cd-4efe-87aa-3cdf100a79bf",
  "Food vendor / Caterer": "268e02da-32a5-4b16-9329-5fc09958a0a3",
  "Trader / Shop owner": "ac5ec973-b849-45c5-9cf1-72d0275ab729",
  "Artisan / Craftsperson": "2a01c779-a7a1-4642-8d7e-1fd73be937ab",
  "Technician": "fcd39376-d6c8-486d-8495-775875c906e7",
  "other": "4ed8be4a-0771-43c5-bc40-e7708767d5c0",
};

export const GOAL_ID_MAP: Record<string, string> = {
  "Save time on tasks": "ca5d40ac-1453-4b32-9b61-3ddb8b81f9d9",
  "Better client communication": "8b1d8404-57c3-46f0-8caf-74e4806abf1b",
  "Grow sales and marketing": "f96a052f-b1e4-4bad-9b10-5a6e981a26f3",
  "Understand AI generally": "d737dc6e-5590-4561-ad5f-136c7641fc58",
  "other": "5d5e2d3c-0161-48f6-b764-ed606639b91d",
};

export const AI_USAGE_ENUM_MAP: Record<string, string> = {
  "Never": "NEVER",
  "Occasionally": "OCCASIONALLY",
  "Constantly": "CONSTANTLY",
};

export const TECH_COMFORT_ENUM_MAP: Record<string, string> = {
  "I need help": "I_NEED_HELP",
  "I'm comfortable": "COMFORTABLE",
  "I'm very confident": "VERY_CONFIDENT",
};

export const DAILY_TIME_ENUM_MAP: Record<string, string> = {
  "5 mins": "FIVE_MINUTES",
  "10 mins": "TEN_MINUTES",
  "15 mins": "FIFTEEN_MINUTES",
  "20 mins or more": "TWENTY_MINUTES_OR_MORE",
};