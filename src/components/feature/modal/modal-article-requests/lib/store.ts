import { create } from "zustand";

export type ModalArticleRequestStore = {
  isOpen: boolean;
  articleId: string;
  initialRequestType: string;
};

const initialStore: ModalArticleRequestStore = {
  isOpen: false,
  articleId: "",
  initialRequestType: "",
};

export const useModalArticleRequestStore = create<ModalArticleRequestStore>()(
  (set, get) => ({
    ...initialStore,
  }),
);

export const openModalArticleRequest = (
  articleId: string,
  initialRequestType: string,
) => {
  useModalArticleRequestStore.setState({
    isOpen: true,
    articleId,
    initialRequestType,
  });
};

export const closeModalArticleRequest = () => {
  useModalArticleRequestStore.setState({
    ...initialStore,
  });
};
