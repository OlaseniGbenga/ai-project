import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#ecfdf5",
      "#d1fae5",
      "#a7f3d0",
      "#6ee7b7",
      "#34d399",
      "#047857",
      "#065f46",
      "#064e3b",
      "#022c22",
      "#011a15",
    ],
  },

  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",

  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  defaultRadius: "md",

  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  headings: {
    fontFamily: "Inter, sans-serif",
  },
});

export const variablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    "--mantine-color-body": "white",
    "--mantine-color-text": "black",
    "--mantine-primary-color-filled": "#047857",
    "--mantine-primary-color-filled-hover": "#065f46",
  },

  dark: {
    "--mantine-color-body": "var(--black-900)",
    "--mantine-color-text": "var(--white-50)",
  },
});
