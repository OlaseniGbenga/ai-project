// contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import axiosInstance from "@/features/auth/services/axios.instance";
import { modals } from "@mantine/modals";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
const WARNING_TIMEOUT_MS = 25 * 60 * 1000;
const WARNING_PROMPT_ID = "session-warning";
const ACTIVITY_EVENTS = [
  "mousemove",
  "keydown",
  "click",
  "scroll",
  "touchstart",
  "touchmove",
] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("accessToken");
  });

  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const warningTimerRef = useRef<number | null>(null);
  const showInactivityPromptRef = useRef<() => void>(() => {});

  const clearAuthState = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setToken(null);
  }, []);

  const logout = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (warningTimerRef.current) {
      window.clearTimeout(warningTimerRef.current);
    }

    clearAuthState();
    router.replace("/login");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth:logout"));
    }
  }, [clearAuthState, router]);

  const restartInactivityTimers = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (warningTimerRef.current) {
      window.clearTimeout(warningTimerRef.current);
    }

    if (!token) {
      return;
    }

    warningTimerRef.current = window.setTimeout(() => {
      showInactivityPromptRef.current();
    }, WARNING_TIMEOUT_MS);

    timeoutRef.current = window.setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT_MS);
  }, [logout, token]);

  const handleStayLoggedIn = useCallback(async () => {
    try {
      await axiosInstance.get("/learning-path/me");
      restartInactivityTimers();
      notifications.show({
        title: "Session extended",
        message: "You’re still signed in.",
        color: "green",
      });
    } catch {
      logout();
    }
  }, [logout, restartInactivityTimers]);

  const showInactivityPrompt = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    // notifications.show({
    //   id: WARNING_PROMPT_ID,
    //   title: "Still here?",
    //   message:
    //     "You’ve been inactive for 25 minutes. Do you want to stay logged in?",
    //   color: "yellow",
    //   autoClose: false,
    //   withCloseButton: true,
    // });

    // const shouldStayLoggedIn = window.confirm(
    //   "You’ve been inactive for 25 minutes. Do you want to stay logged in?",
    // );

    modals.openConfirmModal({
      title: "Still here?",
      centered: true,
      children: (
        <p>
          You’ve been inactive for 25 minutes. Do you want to stay logged in?
        </p>
      ),
      labels: {
        confirm: "Stay logged in",
        cancel: "Log out",
      },
      confirmProps: {
        color: "green",
      },
      cancelProps: {
        color: "red",
      },
      closeOnConfirm: true,

      async onConfirm() {
        notifications.hide(WARNING_PROMPT_ID);
        void handleStayLoggedIn();
      },

      onCancel() {
        notifications.hide(WARNING_PROMPT_ID);
        logout();
      },
    });

    // if (shouldStayLoggedIn) {
    //   notifications.hide(WARNING_PROMPT_ID);
    //   void handleStayLoggedIn();
    //   return;
    // }

    // notifications.hide(WARNING_PROMPT_ID);
    // logout();
  }, [handleStayLoggedIn, logout]);

  useEffect(() => {
    showInactivityPromptRef.current = showInactivityPrompt;
  }, [showInactivityPrompt]);

  const login = useCallback((newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleActivity = () => {
      restartInactivityTimers();
    };

    const handleExternalLogout = () => {
      clearAuthState();
    };

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    window.addEventListener("auth:activity", handleActivity);
    window.addEventListener("auth:logout", handleExternalLogout);

    restartInactivityTimers();

    return () => {
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      window.removeEventListener("auth:activity", handleActivity);
      window.removeEventListener("auth:logout", handleExternalLogout);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (warningTimerRef.current) {
        window.clearTimeout(warningTimerRef.current);
      }
      notifications.hide(WARNING_PROMPT_ID);
    };
  }, [clearAuthState, restartInactivityTimers]);

  useEffect(() => {
    if (!token) {
      return;
    }

    restartInactivityTimers();
  }, [restartInactivityTimers, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        loading: false,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
