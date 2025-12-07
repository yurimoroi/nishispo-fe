export interface AlignMediaResponseType {
  success: boolean;
  message: string;
  data: AlignMediaType[];
  errors?: any;
}

export interface AlignMediaType {
  id: string;
  name: string;
  url: string;
  banner: string;
  order: number;
  display_top_flg: number;
  display_article_list_flg: number;
  display_flg: number;
  started_at: Date;
  started_at_diffForHumans: string;
  ended_at: Date;
  ended_at_diffForHumans: string;
  articles: Article[];
}

export interface AlignMediaDetailsResponseType {
  success: boolean;
  message: string;
  data: AlignMediaDetailsType;
  errors?: any;
}

export interface AlignMediaDetailsType {
  id: string;
  company_id: string;
  name: string;
  url: string;
  order: number;
  display_top_flg: number;
  display_article_list_flg: number;
  display_flg: number;
  note: null;
  started_at: Date;
  ended_at: Date;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  banner: string;
  media: any[];
}

export interface Article {
  id: string;
  title: string;
  body: string;
  pr_flg: boolean;
  status: Status;
  published_at: string;
  publish_at_diffForHumans: string;
  publish_ended_at: string;
  updated_at: string;
  updated_at_diffForHumans: string;
  all_media_url: any[];
  btns: Btns;
}

export interface Btns {
  preview: boolean;
  submit: boolean;
  save: boolean;
  edit: boolean;
  delete: boolean;
  editRequest: boolean;
  deleteRequest: boolean;
  withdrawDeleteEditRequest: boolean;
  approve: boolean;
  remand: boolean;
  editApproval: boolean;
}

export interface Status {
  value: number;
  label: string;
}
