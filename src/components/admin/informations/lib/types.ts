import { PaginationLink } from "@/components/feature/datatable/lib";

export type AdminInformationsResponseType = {
  success: boolean;
  message: string;
  data: AdminInformationsResponse;
};

export type AdminInformationsResponse = {
  data: AdminInformationsDataType[];
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

export type AdminInformationsDataType = {
  id: string;
  company_id: string;
  title: string;
  body: string;
  published_at: string;
  finished_at: string;
  info_images: string;
  company: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
};

export type AdminInformationsByIdResponseType = {
  success: boolean;
  message: string;
  data: AdminInformationsDataType;
};
export type SubmitInformationResponseType = {
  success: boolean;
  message: string;
  data: SubmitInformationResponse;
};

export type SubmitInformationResponse = {
  title: string;
  body: string;
  publised_at: string;
  finished_at: string;
  info_images: string;
  _method: string;
};

export type UpdateInformationResponseType = {
  success: boolean;
  message: string;
  data: UpdateInformationResponse;
};

export type UpdateInformationResponse = {
  id: string;
  company_id: string;
  title: string;
  body: string;
  publised_at: string;
  finished_at: string;
  info_images: string;
  company: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
};
