import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@/components/feature/datatable";
import { AdminTeamsColumnType, columns } from "./columns";
import { getAdminTeamsDataDataType } from "../lib";
import { PaginationLink as GenericPaginationLink } from "@components/feature/articles/search";

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
  data: getAdminTeamsDataDataType[];
  paginationData: PaginationDataProps;
};

const getData = (data: getAdminTeamsDataDataType[]): AdminTeamsColumnType[] => {
  if (!data) return [];

  return data.map((data, index) => {
    const { id, name, team, event_images } = data || {};
    const {
      collection_type,
      organization,
      groupware_privileges,
      first_estimated_number,
    } = team || {};

    const { payment_flg } = groupware_privileges[0] || {};

    return {
      id: id?.toString(),
      adminTeamsOrganizationLogo: organization?.logo,
      organizationName: organization?.name,
      paymentType: collection_type?.label,
      licenseExpirationDate: team?.closing_date,
      unpaidBalance: payment_flg === 1 ? "あり" : "",
      adminTeamsUsageRights: payment_flg?.toString(),
      adminTeamsEventLogo: Array.isArray(event_images)
        ? event_images.join(", ")
        : event_images,
      eventName: name,
      numberOfParticipants: first_estimated_number,
    };
  });
};

export const MainTableData = ({ data, paginationData }: MainTableDataProps) => {
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(data)}
        detailLinkBase="/admin/teams"
        containsEdit={true}
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
