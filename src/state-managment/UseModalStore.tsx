import {create} from 'zustand';

interface ModalStore {
    showModal: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  showModal: false,
  openModal: () => {set({ showModal: true }); console.log("show")},
  closeModal: () => set({ showModal: false }),
}));

export default useModalStore;