export const AUTH_FORM_WIDTH = "100%";
export const AUTH_FORM_MAX_WIDTH = "438px";

export const ONBOARDING_HEADER_MAX_WIDTH = "600px";
export const ONBOARDING_CARD_MAX_WIDTH = "700px";

export const validateFullName = (value: string) =>
  value.trim().length >= 2 ? null : "Please enter your full name.";

export const validateEmail = (value: string) =>
  /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address, try again.";

export const validatePassword = (value: string) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    ? null
    : "Password should consist of 8 characters; a combination of letters, numbers and special characters.";

export const validateConfirmPassword = (
  value: string,
  values: { password: string },
) => (value === values.password ? null : "Passwords do not match.");

export const validateLoginPassword = (value: string) =>
  value.length > 0 ? null : "Email or password is incorrect.";