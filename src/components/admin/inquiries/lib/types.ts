import { PaginationLink } from "@/components/feature/datatable/lib/types";

export type AdminInquiriesDataResponseType = {
  success: boolean;
  message: string;
  data: AdminInquiriesDataResponse;
};

export type AdminInquiriesDataResponse = {
  data: AdminInquiriesDataType[];
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

export type AdminInquiriesDataType = {
  id: string;
  name: string;
  body: string;
  email: string;
  reply: string;
  reply_flg: boolean;
  inquiry_type: {
    id: string;
    name: string;
    type: string;
  };
  created_at: string;
  created_at_diffForHumans: string;
};

export type AdminInquiriesByIdResponseType = {
  success: boolean;
  message: string;
  data: AdminInquiriesDataType;
};

export type SendReplyToInquiryResponseType = {
  success: boolean;
  message: string;
  data: AdminInquiriesDataType;
};
