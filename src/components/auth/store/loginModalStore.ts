import { create } from "zustand";

interface LoginModalStore {
    loginModalOpen: boolean;
    setLoginModalOpen: (v: boolean) => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
    loginModalOpen: false,
    setLoginModalOpen: (v: boolean) => set({ loginModalOpen: v }),
    openLoginModal: () => set({ loginModalOpen: true }),
    closeLoginModal: () => set({ loginModalOpen: false }),
}))