import { ModalArticleTemplateStore } from "./store";

export type ModalArticleTemplateResponse = {
  data: ModalArticleTemplateStore["template"] | null;
};

export type ArticleTemplateType = "1" | "2" | "3" | "4";
