import { PaginationLink } from "@/components/feature/datatable/lib";
import { OrganizationDataType } from "@/components/admin/teams";

export type AdminUsersDataResponseType = {
  success: boolean;
  message: string;
  data: AdminUsersDataResponse;
};

export type AdminUsersDataResponse = {
  data: AdminUsersDataDataType[];
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

export type AdminUsersDataDataType = {
  id: string;
  full_name: string;
  nickname: string;
  login_id: string;
  email: string;
  permissions: {
    is_secretariat: boolean;
    is_advertiser: boolean;
    can_contribute_article: boolean;
    is_event_leader: boolean;
    is_administrator_flg: boolean;
    is_general: boolean;
  };
  organizations: OrganizationDataType[];
  contributor: {
    status: number;
    label: string;
  };
};

export type ContributorStatusNameListResponseType = {
  success: boolean;
  message: string;
  data: ContributorStatusNameListDataType[];
};

export type ContributorStatusNameListDataType = {
  id: number;
  label: string;
};
