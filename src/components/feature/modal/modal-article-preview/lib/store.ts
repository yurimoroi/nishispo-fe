import { create } from "zustand";

export type ModalArticlePreviewStore = {
  isOpen: boolean;
};

const initialStore: ModalArticlePreviewStore = {
  isOpen: false,
};

export const useModalArticlePreviewStore = create<ModalArticlePreviewStore>()(
  () => ({
    ...initialStore,
  }),
);

export const openModalArticlePreview = () => {
  useModalArticlePreviewStore.setState({
    isOpen: true,
  });
};
export const closeModalArticlePreview = () => {
  useModalArticlePreviewStore.setState({
    ...initialStore,
  });
};
