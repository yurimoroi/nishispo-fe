import { PaginationLink } from "@/components/feature/articles/search";

export type UserInformationsResponseType = {
  success: string;
  message: string;
  data: UserInformationsResponse;
};

export type UserInformationsResponse = {
  data: UserInformationDataType[];
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

export type UserInformationDataType = {
  id: string;
  company_id: string;
  title: string;
  body: string;
  published_at: string;
  finished_at: string;
  is_new: boolean;
  info_images: string;
  company: {
    id: string;
    name: string;
  };
  created_at: string;
  created_at_diffForHumans: string;
};

export type UserInformationByIdResponseType = {
  success: string;
  message: string;
  data: UserInformationDataType;
};
