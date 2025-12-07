import { Article, ArticlesResponse, PaginationLink } from "../../search";
export type ArticlesCategoryListResponseType = {
  success: boolean;
  message: string;
  data: ArticlesCategory[];
};

export type ArticlesCategory = {
  id: string;
  name: string;
  updated_at: string;
  articles: Article[];
};

export type ArticlesCategoryTopListResponseType = {
  success: boolean;
  message: string;
  data: ArticlesCategoryTopListResponse;
};

export type ArticlesCategoryTopListResponse = {
  articles: ArticlesResponse;
  category: {
    id: string;
    name: string;
    color?: string;
  };
};
