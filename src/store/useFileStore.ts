import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useFileStore = create(
  combine(
    { prefix: "", delimeter: "/", bucketName: "None", region: "XYZ" },
    (set) => {
      return {
        setPrefix: (p: string) => {
          set((state) => ({
            prefix: state.prefix + p,
          }));
        },
        setBucketName: (bn: string) => {
          set({ bucketName: bn });
        },
        setRegion: (rg: string) => {
          set({ region: rg });
        },
      };
    },
  ),
);
