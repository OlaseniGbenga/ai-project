"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme, variablesResolver } from "@/utils/theme";
import queryClient from "@/lib/query.client";
import { ModalsProvider } from "@mantine/modals";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider cssVariablesResolver={variablesResolver} theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" zIndex={9999} />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default Providers;
