import { create } from "zustand";

export type ModalContributorStore = {
  isOpen: boolean;
};

const initialStore: ModalContributorStore = {
  isOpen: false,
};

export const useModalContributorStore = create<ModalContributorStore>()(
  (set, get) => ({
    ...initialStore,
  }),
);

export const openModalContributor = () => {
  useModalContributorStore.setState({
    isOpen: true,
  });
};
export const closeModalContributor = () => {
  useModalContributorStore.setState({
    ...initialStore,
  });
};
