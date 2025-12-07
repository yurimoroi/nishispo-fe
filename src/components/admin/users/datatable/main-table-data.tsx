import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@/components/feature/datatable";
import { AdminUsersColumnType, columns } from "./columns";
import { PaginationLink as GenericPaginationLink } from "@components/feature/articles/search";
import { AdminUsersDataDataType } from "../lib/types";

type PaginationDataProps = {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  links: GenericPaginationLink[];
};

type MainTableDataProps = {
  data: AdminUsersDataDataType[];
  paginationData: PaginationDataProps;
};

const getData = (data: AdminUsersDataDataType[]): AdminUsersColumnType[] => {
  if (!data) return [];

  return data.map((data, index) => {
    const {
      id,
      full_name,
      nickname,
      login_id,
      email,
      permissions,
      organizations,
      contributor,
    } = data || {};

    // converting permissions object to array of key value pairs
    const permissionArray = Object.entries(permissions).map(([key, value]) => ({
      key,
      value,
    }));

    // This is a mapping of the permission key to the label that will be displayed in the table
    const permissionLabels: { [key: string]: string } = {
      is_secretariat: "事務局",
      is_advertiser: "広告主",
      can_contribute_article: "記事投稿者",
      is_event_leader: "種目リーダー",
      is_administrator_flg: "組織管理者",
      is_general: "一般",
    };

    return {
      id: id?.toString(),
      accountName: full_name || "",
      nickname: nickname || "",
      loginId: login_id || "",
      email: email || "",
      permissions: permissionArray
        .filter((permission) => permission?.value === true)
        .map(
          (permission) => permissionLabels[permission?.key] || permission?.key,
        )
        .join(", "),
      organization: organizations
        .map((organization) => organization?.name)
        .join(", "),
      articleAuthorStatus: contributor?.label || "",
    };
  });
};

export const MainTableData = ({ data, paginationData }: MainTableDataProps) => {
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(data)}
        detailLinkBase="/admin/users"
        containsEdit={false}
      />
      <DataPagination paginationData={paginationData} className="mt-5 w-full" />
    </div>
  );
};
