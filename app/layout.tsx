import type { Metadata } from "next";

import React from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "CUNIV-AI",
  description: "Learn, apply, and grow with AI-powered learning paths.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        {/* <ColorSchemeScript /> */}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}