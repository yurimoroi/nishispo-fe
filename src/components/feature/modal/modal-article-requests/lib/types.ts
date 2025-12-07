export enum ModalArticleRequestType {
  Edit = "1",
  Delete = "2",
}

export type ArticleRequestResponseType = {
  success: boolean;
  message: string;
  data: string;
};