import { PaginationLink } from "@/components/feature/datatable/lib";
import { User } from "@/components/top/lib/types";

// #region ARTICLE SAVE
export type ArticleSaveAllMediaUrlType = {
  id: string;
  url: string;
  file: Blob;
};

export type ArticleSaveResponseType = {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    body: string;
    pr_flg: boolean;
    status: null;
    published_at: string;
    publish_ended_at: string;
    updated_at: string;
    all_media_url: ArticleSaveAllMediaUrlType[];
  };
  errors?: any;
};
// #endregion

// #region ARTICLE DETAILS
export type ArticleDetailResponseType = {
  success: boolean;
  message: string;
  data: ArticleDetailDataType;
};

export type ArticleAdminDetailResponseType = {
  success: boolean;
  message: string;
  data: ArticleDetailDataType & {
    isPr: boolean;
  };
};

export type ArticleStatusType = {
  value: number;
  label: string;
};

export type ArticleUserType = {
  id: string;
  family_name: string;
  given_name: string;
  phonetic_family_name: string;
  phonetic_given_name: string;
  nickname: string;
  contributor_name: string | null;
  advertiser_flg: number;
  advertiser_name: string | null;
};

export type ArticleTagType = {
  id: string;
  name: string;
};

export type ArticleCategoryType = {
  id: string;
  name: string;
  short_name: string | null;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: number;
  updated_at: string;
};

export type ArticleOrganizationType = {
  id: string;
  name: string;
};

export type ArticleRemandCommentsType = {
  comment_to_title: string;
  comment_to_body: string;
  comment_to_image: string;
  comment: string;
};

export type ArticleButtonsType = {
  preview: boolean;
  submit: boolean;
  save: boolean;
  delete: boolean;
  editRequest: boolean;
  deleteRequest: boolean;
  approve: boolean;
  remand: boolean;
  withdrawDeleteEditRequest: boolean;
  editApproval: boolean;
  deleteApproval: boolean;
};

export type AllMediaDataType = {
  id: number;
  original: string;
  carousel: string;
  "thumbnail-medium": string;
  "thumbnail-small": string;
};

export type AlignmentMediaType = {
  id: string;
  name: string;
};

export type BaseArticleDataType = {
  id: string;
  title: string;
  body: string;
  pr_flg: boolean;
  status: ArticleStatusType;
  published_at: string;
  publish_at_diffForHumans: string;
  publish_ended_at: string;
  updated_at: string;
  updated_at_diffForHumans: string;
  all_media_url: AllMediaDataType[];
  user: ArticleUserType;
  tags: ArticleTagType[];
  categories: ArticleCategoryType[];
  organization: ArticleOrganizationType;
  comment?: string;
};

export type ArticleDetailDataType = BaseArticleDataType & {
  top_article: null | unknown;
  remand_comments: ArticleRemandCommentsType | null;
  revision: BaseArticleDataType | null;
  un_submitted_edits: null | unknown;
  btns: ArticleButtonsType;
  alignment_medias: AlignmentMediaType[];
};
// #endregion

// #region USER ARTICLES
export type UserArticlesResponseType = {
  success: boolean;
  message: string;
  data: UserArticlesResponse;
};

export type UserArticlesResponse = {
  data: UserArticlesDataType[];
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

export type UserArticlesDataType = {
  id: number;
  title: string;
  body: string;
  organization: {
    id: string;
    name: string;
  };
  categories: string[];
  tags: string[];
  pr_flg: boolean;
  published_at: string;
  publish_ended_at: string;
  created_at: string;
  updated_at: string;
  publish_at_diffForHumans: string;
  un_submitted_edits: boolean;
  status: {
    value: number;
    label: string;
  };
  btns: {
    preview: boolean;
    submit: boolean;
    save: boolean;
    delete: boolean;
    editRequest: boolean;
    deleteRequest: boolean;
    withdrawDeleteEditRequest: boolean;
  };
};
// #endregion

// #region USER ARTICLES COUNT DETAILS
export type UserArticlesCountResponseType = {
  success: boolean;
  message: string;
  data: UserArticlesCountDataType;
};

export type UserArticlesCountDataType = {
  count: number;
  draft: number;
  applying_publish: number;
  published: number;
  remand: number;
  applying_remand: number;
  request_edit: number;
  request_delete: number;
};
// #endregion

// #region ARTICLE DELETE
export type ArticleDeleteResponseType = {
  success: boolean;
  message: string;
  data: string;
};
// #endregion

export type ArticlesStatusResponseType = {
  success: boolean;
  message: string;
  data: ArticleStatusDataType[];
};

export type ArticleStatusDataType = {
  id: number;
  value: number;
  label: string;
};
