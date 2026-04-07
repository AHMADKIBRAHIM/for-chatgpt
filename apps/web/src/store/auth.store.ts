import { create } from "zustand";
import { api, setAccessToken } from "../lib/api";

type User = { id: string; name: string; email: string; language: "en" | "ar"; theme: "light" | "dark" | "system" };

type AuthState = {
  user: User | null;
  accessToken: string | null;
  setSession: (params: { user: User; accessToken: string }) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setSession: ({ user, accessToken }) => {
    setAccessToken(accessToken);
    set({ user, accessToken });
  },
  logout: async () => {
    await api.post("/api/auth/logout");
    setAccessToken(null);
    set({ user: null, accessToken: null });
  }
}));
