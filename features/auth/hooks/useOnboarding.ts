import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getOnboardingOptions,
  completeOnboarding,
  OnboardingPayload,
} from "@/features/auth/services/onboarding.service";

export const useOnboardingOptions = () => {
  return useQuery({
    queryKey: ["onboarding-options"],
    queryFn: getOnboardingOptions,
  });
};

export const useCompleteOnboarding = () => {
  return useMutation({
    mutationFn: (payload: OnboardingPayload) => completeOnboarding(payload),
  });
};