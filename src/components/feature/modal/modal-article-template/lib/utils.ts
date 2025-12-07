import {
  openModalArticleTemplate,
  useModalArticleTemplateStore,
} from "./store";
import { TEMPLATE_VALUES } from "./template-values";
import { ModalArticleTemplateResponse } from "./types";

export const openModalArticleTemplateAsync =
  async (): Promise<ModalArticleTemplateResponse> => {
    openModalArticleTemplate();

    return new Promise((resolve) => {
      const unsubscribe = useModalArticleTemplateStore.subscribe((state) => {
        if (!state.isOpen) {
          resolve({ data: state.template });
          unsubscribe();
        }
      });
    });
  };

export const getTemplateByType = (type: string) => {
  switch (type) {
    case "1":
      return TEMPLATE_VALUES.first;
    case "2":
      return TEMPLATE_VALUES.second;
    case "3":
      return TEMPLATE_VALUES.third;
    case "4":
      return TEMPLATE_VALUES.fourth;
    default:
      return TEMPLATE_VALUES.first;
  }
};

export const removeHTMLTags = (value: string) => {
  return value.replace(/<[^>]*>/g, "");
};
