import { ArticleType } from "@/components/top/lib/types";

export interface ArticleRankingResponseType {
  success: boolean;
  message: string;
  data: ArticleRankingData[];
}

export interface ArticleRankingData {
  id: string;
  article_id: string;
  view_count: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  article: ArticleType;
}

export type EventArticlesResponseType = {
  success: boolean;
  message: string;
  data: EventArticlesType;
};

export type EventArticlesType = {
  id: string;
  name: string;
  short_name: null;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: number;
  articles: Article[];
  updated_at: string;
};

export type Article = {
  id: string;
  title: string;
  link: Link;
  content: string;
  body: string;
  pr_flg: boolean;
  status: Status;
  published_at: string;
  publish_at_diffForHumans: string;
  publish_ended_at: string;
  updated_at: string;
  updated_at_diffForHumans: string;
  all_media_url: AllMediaURL[];
  btns: Btns;
};

export type Link = {
  src: string;
};

export type AllMediaURL = {
  id: number;
  original: string;
  carousel: string;
  "thumbnail-medium": string;
  "thumbnail-small": string;
};

export type Btns = {
  preview: boolean;
  submit: boolean;
  save: boolean;
  edit: boolean;
  delete: boolean;
  editRequest: boolean;
  deleteRequest: boolean;
  withdrawDeleteEditRequest: boolean;
};

export type Status = {
  value: number;
  label: string;
};
