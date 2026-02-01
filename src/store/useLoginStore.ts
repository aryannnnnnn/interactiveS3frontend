import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useLoginState = create(
  combine({ token: "", isLoggedIn: false }, (set) => {
    return {
      setToken: (newToken: string) => {
        set(() => ({
          token: newToken,
          isLoggedIn: true,
        }));
      },
      unsetToken: () => {
        set(() => ({
          token: "",
          isLoggedIn: false,
        }));
      },
    };
  }),
);
