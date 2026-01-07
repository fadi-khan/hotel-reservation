import { useMemo } from "react";
import { create } from "zustand";

type ModalName = string;

interface ModalStore {
  modals: Record<ModalName, boolean>;
  openModal: (modalName: ModalName) => void;
  closeModal: (modalName: ModalName) => void;
  setModalState: (modalName: ModalName, isOpen: boolean) => void;
  isModalOpen: (modalName: ModalName) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {},
  
  openModal: (modalName: ModalName) => 
    set((state) => ({
      modals: { ...state.modals, [modalName]: true }
    })),
    
  closeModal: (modalName: ModalName) => 
    set((state) => ({
      modals: { ...state.modals, [modalName]: false }
    })),
    
  setModalState: (modalName: ModalName, isOpen: boolean) => 
    set((state) => ({
      modals: { ...state.modals, [modalName]: isOpen }
    })),
    
  isModalOpen: (modalName: ModalName) => {
    const state = get();
    return state.modals[modalName] || false;
  }
}));

// Generic hook that works for any modal
export const useModal = (modalName: ModalName) => {
  const { openModal, closeModal, setModalState, isModalOpen } = useModalStore();
  
  return useMemo(() => ({
    isOpen: isModalOpen(modalName),
    open: () => openModal(modalName),
    close: () => closeModal(modalName),
    setState: (isOpen: boolean) => setModalState(modalName, isOpen)
  }), [modalName, openModal, closeModal, setModalState, isModalOpen]);
};