export interface UpdateUserProfile {
  firstName: string;
  lastName: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isOnboardingComplete: boolean;
}

export interface UserProfileResponse {
  data: UserProfile;
  timestamp: string;
}