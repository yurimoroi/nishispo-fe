import { create } from "zustand";

export type ModalArticleTemplateStore = {
  isOpen: boolean;
  template: {
    title: string;
    body: string;
  } | null;
};

const initialStore: ModalArticleTemplateStore = {
  isOpen: false,
  template: null,
};

export const useModalArticleTemplateStore = create<ModalArticleTemplateStore>()(
  () => ({
    ...initialStore,
  }),
);

export const openModalArticleTemplate = () => {
  useModalArticleTemplateStore.setState({
    isOpen: true,
  });
};
export const closeModalArticleTemplate = () => {
  useModalArticleTemplateStore.setState({
    ...initialStore,
  });
};

export const setModalArticleTemplateAndClose = (
  template: ModalArticleTemplateStore["template"],
) => {
  useModalArticleTemplateStore.setState({
    template,
    isOpen: false,
  });
};
