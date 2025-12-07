export interface TopNewsResponseType {
  success: boolean;
  message: string;
  data: TopNewsData;
}

export interface TopNewsData {
  top_articles: TopArticleTypes[];
  articles: ArticleType[];
  category: Category[];
}

export interface ArticleType {
  id: string;
  company_id: string;
  user_id: string;
  title: string;
  body: string;
  organization_id: string;
  pr_flg: number;
  status: number;
  published_at: Date;
  publish_ended_at: Date;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  all_media_url: AllMediaURL[];
  user: User;
  categories: Category[];
  media: Media[];
}

export interface User {
  id: string;
  contributor_name: string;
}

export interface AllMediaURL {
  original: string;
  carousel: string;
  "thumbnail-medium": string;
  "thumbnail-small": string;
}

export enum CompanyID {
  The01J7Jk9Bg6Rs7Cvy3Hwnzv9Wpg = "01J7JK9BG6RS7CVY3HWNZV9WPG",
}

export interface Media {
  id: number;
  model_type: ModelType;
  model_id: string;
  uuid: string;
  collection_name: CollectionName;
  name: string;
  file_name: FileName;
  mime_type: MIMEType;
  disk: Disk;
  conversions_disk: Disk;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: GeneratedConversions;
  responsive_images: any[];
  order_column: number;
  created_at: Date;
  updated_at: Date;
  original_url: string;
  preview_url: string;
}

export enum CollectionName {
  Images = "images",
}

export enum Disk {
  Public = "public",
}

export enum FileName {
  The2119JPEG = "2119.jpeg",
}

export interface GeneratedConversions {
  carousel: boolean;
  "thumbnail-medium": boolean;
  "thumbnail-small": boolean;
}

export enum MIMEType {
  ImageJPEG = "image/jpeg",
}

export enum ModelType {
  AppModelsArticle = "App\\Models\\Article",
}

export interface Pivot {
  article_category_id: string;
  article_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  company_id: CompanyID;
  name: string;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  articles: ArticleType[];
}

export interface TopArticleTypes {
  id: string;
  article_id: string;
  order: number;
  published_at: Date;
  publish_ended_at: Date;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
  article: ArticleType;
}
