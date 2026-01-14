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

export const useModal = (modalName: ModalName) => {
  // 1. Subscribe to the specific modal state using a selector
  // This is the "magic" that makes the component re-render when the state changes
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  
  // 2. Grab the actions (these don't change, so no selector needed)
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const setModalState = useModalStore((state) => state.setModalState);

  return useMemo(() => ({
    isOpen, // Now this will correctly toggle between true/false
    open: () => openModal(modalName),
    close: () => closeModal(modalName),
    setState: (isOpen: boolean) => setModalState(modalName, isOpen)
  }), [isOpen, modalName, openModal, closeModal, setModalState]);
};

