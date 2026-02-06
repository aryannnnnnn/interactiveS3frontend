import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useLoginState = create(
  combine({ token: "", isLoggedIn: false }, (set) => {
    return {
      setToken: (newToken: string) => {
        set(() => {
          localStorage.setItem("token", newToken);
          return {
            token: newToken,
            isLoggedIn: true,
          };
        });
      },
      unsetToken: () => {
        set(() => {
          localStorage.removeItem("token");
          return {
            token: "",
            isLoggedIn: false,
          };
        });
      },
    };
  }),
);
