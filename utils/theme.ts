// theme/index.ts
import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#e6f4ec",
      "#c2e0ce",
      "#9dcbb0",
      "#78b692",
      "#53a174",
      "#066F33",
      "#055c2b",
      "#044922",
      "#03361a",
      "#022311",
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

    /* Optional: map Mantine theme colors */
    "--mantine-primary-color-filled": "black",
  },

  dark: {
    "--mantine-color-body": "var(--black-900)",
    "--mantine-color-text": "var(--white-50)",
  },
});
