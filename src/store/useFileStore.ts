import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useFileStore = create(
  combine(
    {
      prefix: "",
      delimeter: "/",
      selectedBucketName: "",
      region: "",
      availBuckets: [""],
    },
    (set) => {
      return {
        setPrefix: (p: string) => {
          set(() => ({
            prefix: p,
          }));
        },
        setSelectedBucketName: (bn: string) => {
          set({ selectedBucketName: bn });
        },
        setRegion: (rg: string) => {
          set({ region: rg });
        },
        setAvailBuckets: (buckets: string[]) => {
          set(() => ({ availBuckets: buckets }));
        },
      };
    },
  ),
);
