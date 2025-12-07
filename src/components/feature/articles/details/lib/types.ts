import { AllMediaURL, Media, ArticleType } from "@/components/top/lib/types";

export interface ArticleDetailsResponseType {
  success: boolean;
  message: string;
  data: ArticleDetailsType;
}

export interface Tag {
  id: string;
  name: string;
  pivot: Pivot;
  articles?: ArticleDetailsType[];
}

export interface ArticleDetailsType {
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
  tags?: Tag[];
  related_article_by_tags: RelatedArticlesType[];
  related_article_by_categories: RelatedArticlesType[];
  media: Media[];
  pivot?: Pivot;
  user: {
    id: string;
    contributor_name: string;
  };
  organization: OrganizationType;
  categories: ArticleDetailsCategoriesType[];
  alignment_medias: AlignmentMediaDetails[];
}

export interface ArticleDetailsCategoriesType {
  id: string;
  name: string;
  short_name: null;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: number;
  updated_at: string;
  pivot: CategoriesType;
}

export interface CategoriesType {
  article_id: string;
  article_category_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface RelatedArticlesType {
  id: string;
  name: string;
  pivot: Pivot;
  articles: ArticleType[];
}

export interface OrganizationType {
  id: string;
  name: string;
  representative_name: string;
  activity_description: string;
}

export interface Pivot {
  article_tag_id: string;
  article_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface AlignmentMediaDetails {
  id: string;
  name: string;
  url: string;
  banner: string;
  order: number;
  display_top_flg: number;
  display_article_list_flg: number;
  display_flg: number;
  started_at: Date;
  started_at_diffForHumans: AtDiffForHumans;
  ended_at: Date;
  ended_at_diffForHumans: string;
}
export enum AtDiffForHumans {
  The16HoursAgo = "16 hours ago",
}

