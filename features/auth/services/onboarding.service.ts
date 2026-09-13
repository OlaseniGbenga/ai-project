import axiosInstance from "./axios.instance";

export interface OnboardingPayload {
  fullName: string;
  tradeId: string;
  otherTrade?: string;
  aiFamiliarityLevel: string;
  technologyComfortLevel: string;
  dailyLearningTime: string;
  goalId: string;
  otherGoal?: string;
  mainChallenge: string;
}

export interface OnboardingOption {
  id: string;
  name: string;
}

export interface OnboardingOptionsResponse {
  data: {
    trades: OnboardingOption[];
    goals: OnboardingOption[];
  };
  timestamp: string;
}

export const getOnboardingOptions =
  async (): Promise<OnboardingOptionsResponse> => {
    const response =
      await axiosInstance.get<OnboardingOptionsResponse>(
        "/onboarding/options"
      );
    return response.data;
  };

export const completeOnboarding = async (
  payload: OnboardingPayload
): Promise<void> => {
  await axiosInstance.post("/onboarding", payload);
};