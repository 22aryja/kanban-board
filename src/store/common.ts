import { create } from "zustand";

type CommonStore = {
    isMobile: boolean;
    setIsMobile: (flag: boolean) => void;
};

export const useCommonStore = create<CommonStore>((set) => ({
    isMobile: false,
    setIsMobile: (isMobile: boolean) => set({ isMobile }),
}));
