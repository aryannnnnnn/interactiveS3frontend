import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useFileStore = create(
  combine({ prefix: "", delimeter: "/" }, (set) => {
    return {
      setPrefix: (p: string) => {
        set((state) => ({
          prefix: state.prefix + p,
        }));
      },
    };
  }),
);
