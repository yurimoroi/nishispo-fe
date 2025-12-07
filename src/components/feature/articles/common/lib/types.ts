export interface TagsResponseType {
  success: boolean;
  message: string;
  data: TagType[];
}

export interface TagType {
  id: string;
  name: string;
}

export interface MediaResponseType {
  success: boolean;
  message: string;
  data: MediaType[];
}

export interface MediaType {
  id: string;
  company_id: string;
  name: string;
  url: string;
  banner: string;
  order: number;
  display_top_flg: number;
  display_article_list_flg: number;
  display_flg: number;
  started_at: Date;
  ended_at: Date;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}
