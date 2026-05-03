import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  token: string;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  unsetToken: () => void;
};

export const useLoginState = create<LoginState>()(
  persist(
    (set) => ({
      token: "",
      isLoggedIn: false,
      setToken: (token: string) => set({ token, isLoggedIn: true }),
      unsetToken: () => set({ token: "", isLoggedIn: false }),
    }),
    { name: "login-storage" },
  ),
);
