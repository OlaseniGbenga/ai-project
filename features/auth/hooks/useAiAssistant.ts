
"use client";

import { useMutation } from "@tanstack/react-query";
import {
  sendAiAssistantMessage,
  type AiAssistantChatRequest,
} from "@/features/auth/services/ai-assistant.service";

export function useAiAssistant() {
  return useMutation({
    mutationFn: (payload: AiAssistantChatRequest) =>
      sendAiAssistantMessage(payload),
  });
}
