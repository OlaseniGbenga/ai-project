export const EMERALD = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
};

export const PILL_RADIUS = "999px";

export const ONBOARDING_CARD_STYLE = {
  backgroundColor: "#ffffff",
  border: `1px solid ${EMERALD[100]}`,
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

export const PRIMARY_BUTTON_STYLE = {
  root: {
    height: "48px",
    fontSize: "15px",
    borderRadius: PILL_RADIUS,
    backgroundColor: EMERALD[600],
  },
};

export const OUTLINE_BUTTON_STYLE = {
  root: {
    height: "48px",
    fontSize: "15px",
    borderRadius: PILL_RADIUS,
    borderColor: EMERALD[200],
    color: EMERALD[700],
  },
};
