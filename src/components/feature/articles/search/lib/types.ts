export type ArticlesSearchResponseType = {
  success: boolean;
  message: string;
  data: ArticlesResponse;
};

export type ArticlesResponse = {
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
  data: Article[];
};

export type Article = {
  id: string;
  title: string;
  body: string;
  pr_flg: number;
  updated_at: string;
  all_media_url: MediaUrls[];
  categories: Category[];
  user: User;
  published_at: string;
  publish_ended_at: string;
  top_article: {
    id: string;
    order: number;
  };
};

export type MediaUrls = {
  original: string;
  carousel: string;
  "thumbnail-medium": string;
  "thumbnail-small": string;
};

export type Category = {
  id: string;
  name: string;
  updated_at: string;
  color: string;
};

export type User = {
  id: string;
  advertiser_flg: number;
  advertiser_name: string;
  contributor_name: string;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};
