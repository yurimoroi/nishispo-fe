import { Article, Category, User } from "@/components/feature/articles/search";
import { PaginationLink } from "@/components/feature/datatable/lib/types";

export type ArticlesDataFromPopupResponseType = {
  success: boolean;
  message: string;
  data: ArticleDataFromPopupResponse;
};

export type ArticleDataFromPopupResponse = {
  data: Article[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  path: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number | string;
  links: PaginationLink[];
};

export type AdminTopArticlesResponseType = {
  success: boolean;
  message: string;
  data: AdminTopArticlesResponse;
};

export type AdminTopArticlesResponse = {
  data: AdminTopArticlesDataType[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  path: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number | string;
  links: PaginationLink[];
};

export type AdminTopArticlesDataType = {
  id: string;
  order: number;
  published_at: string;
  publish_ended_at: string;
  article: Article;
};

export type AdminTopArticlesByIdResponseType = {
  success: boolean;
  message: string;
  data: AdminTopArticlesDataType;
};

export type CreateOrUpdateAdminTopArticleResponseType = {
  success: boolean;
  message: string;
  data: CreateOrUpdateAdminTopArticleType;
};

export type CreateOrUpdateAdminTopArticleType = {
  article_id: string;
  order: string;
  published_at: string;
  publish_ended_at: string | null;
};

export type GetArticleByArticleIdResponseType = {
  success: boolean;
  message: string;
  data: Article;
};
