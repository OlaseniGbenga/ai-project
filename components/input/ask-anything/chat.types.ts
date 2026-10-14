
export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export interface ApiErrorBody {
  message?: string | string[];
  dailyLimit?: number;
  remainingQuestions?: number;
}

export interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSending: boolean;
  limitReached: boolean;
  disabled?: boolean;
}
