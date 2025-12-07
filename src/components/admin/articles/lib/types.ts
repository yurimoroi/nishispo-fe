import { ArticleDetailDataType } from "@/components/contributor";
import { Tag } from "@/components/feature/articles/details/lib/types";
import {
  Category,
  PaginationLink,
  User,
} from "@/components/feature/articles/search";

export type AdminArticlesDataResponseType = {
  success: boolean;
  message: string;
  data: AdminArticlesResponse;
};

export type AdminArticlesResponse = {
  data: AdminArticlesDataType[];
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

export type AdminArticlesDataType = {
  id: number;
  title: string;
  body: string;
  organization: {
    id: string;
    name: string;
  };
  categories: Category[];
  tags: Tag[];
  user: User;
  updated_at: string;
  published_at: string;
  publish_ended_at: string;
  btns: {
    preview: boolean;
    submit: boolean;
    save: boolean;
    delete: boolean;
    editRequest: boolean;
    deleteRequest: boolean;
    withdrawDeleteEditRequest: boolean;
    approve: boolean;
    remand: boolean;
    editApproval: boolean;
    deleteApproval: boolean;
  };
  status: {
    value: number;
    label: string;
  };
};

export type AdminArticlesStatusResponseType = {
  success: boolean;
  message: string;
  data: AdminArticleStatusDataType[];
};

export type AdminArticleStatusDataType = {
  id: number;
  value: number;
  label: string;
};

// #region ADMIN ARTICLE DETAIL
export type ArticleAdminDetailResponseType = {
  success: boolean;
  message: string;
  data: ArticleAdminDetailDataType;
};

// Currently ArticleAdminDetailDataType shares the same structure as ArticleDetailResponseType.
// If admin-specific fields are needed in the future, create a separate type definition.
export type ArticleAdminDetailDataType = ArticleDetailDataType;
// #endregion

export type CommonStatusUpdatedResponseType = {
  success: boolean;
  message: string;
};
