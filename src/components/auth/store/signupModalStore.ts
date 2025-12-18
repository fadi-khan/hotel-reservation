import { create } from "zustand";

interface SignUpModalStore {
    signUpModalOpen: boolean;
    setSignUpModalOpen: (v: boolean) => void;
    openSignUpModal: () => void;
    closeSignUpModal: () => void;
}

export const useSignUpModalStore = create<SignUpModalStore>((set) => ({
    signUpModalOpen: false,
    setSignUpModalOpen: (v: boolean) => set({ signUpModalOpen: v }),
    openSignUpModal: () => set({ signUpModalOpen: true }),
    closeSignUpModal: () => set({ signUpModalOpen: false }),
}))