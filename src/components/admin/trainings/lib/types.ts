import { PaginationLink } from "@/components/feature/datatable/lib";

export type AdminTrainingsResponseType = {
  success: boolean;
  message: string;
  data: AdminTrainingsResponse;
};

export type AdminTrainingsResponse = {
  data: AdminTrainingsDataType[];
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

export type AdminTrainingsDataType = {
  id: string;
  type: number;
  title: string;
  url: string;
  no: number;
  overview: string;
};

export type AdminTrainingsByIdResponseType = {
  success: boolean;
  message: string;
  data: AdminTrainingsDataType;
};

export type CreateOrUpDateAdminTrainingsResponseType = {
  success: boolean;
  message: string;
  data: CreateOrUpDateAdminTrainingsType;
};

export type CreateOrUpDateAdminTrainingsType = {
  id: string;
  type: string;
  title: string;
  url: string;
  no: string;
  overview: string;
};
