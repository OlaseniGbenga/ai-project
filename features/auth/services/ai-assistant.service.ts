
import axiosInstance from "./axios.instance";

export interface AiAssistantChatRequest {
  message: string;
  courseId: string;
  lessonId?: string;
}

export interface AiAssistantChatResponse {
  reply: string;
  courseId: string;
  lessonId: string | null;
  dailyLimit: number;
  remainingQuestions: number;
}

type AiAssistantResponsePayload =
  | AiAssistantChatResponse
  | {
      data: AiAssistantChatResponse;
    };

export const sendAiAssistantMessage = async (
  payload: AiAssistantChatRequest,
): Promise<AiAssistantChatResponse> => {
  const response = await axiosInstance.post<AiAssistantResponsePayload>(
    "/ai-assistant/chat",
    payload,
  );

  const body = response.data;

  const result =
    body &&
    typeof body === "object" &&
    "data" in body
      ? body.data
      : body;

  if (
    !result ||
    typeof result !== "object" ||
    typeof result.reply !== "string" ||
    !result.reply.trim()
  ) {
    throw new Error(
      "The AI assistant response did not contain a valid reply. Check the response in your browser Network tab.",
    );
  }

  return result;
};
