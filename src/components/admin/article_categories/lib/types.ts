import { PaginationLink } from "@/components/feature/datatable/lib/types";

export type AdminArticleCategoriesDataResponseType = {
  success: boolean;
  message: string;
  data: AdminArticleCategoriesResponse;
};

export type AdminArticleCategoriesResponse = {
  data: AdminArticleCategoriesDataType[];
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

export type AdminArticleCategoriesDataType = {
  id: number; 
  name: string;
  short_name: string;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: boolean;
  updated_at: string;
};

export type AdminArticleCategoryByIdResponseType = {
  success: boolean;
  message: string;
  data: AdminArticleCategoriesDataType;
};

export type CreateOrUpDateAdminArticleCategoryResponseType = {
  success: boolean;
  message: string;
  data: CreateOrUpDateAdminArticleCategoryType;
};

export type CreateOrUpDateAdminArticleCategoryType = {
  name: string;
  short_name: string;
  color: string;
  show_head_flg: number;
  order: number;
};
