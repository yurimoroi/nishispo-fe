import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@/components/feature/datatable";
import {
  AdminInformationsDataType,
  columns,
  getAdminInformationsData,
} from "@components/admin/informations";
import { AdminInformationsColumnType } from "./columns";

const getData = (
  data: AdminInformationsDataType[],
): AdminInformationsColumnType[] => {
  if (!data) return [];

  return data.map((data) => {
    const { id, title, published_at, finished_at, created_at } = data || {};
    const displayPeriodRange =
      (published_at ? published_at : "") ||
      (finished_at ? finished_at : "")
        ? `${published_at ? published_at : ""} - ${finished_at ? finished_at : ""}`
        : "-";

    return {
      id: id.toString(),
      title,
      releasePeriod: displayPeriodRange,
      createDate: created_at,
    };
  });
};

export const MainTableData = async () => {
  const [informationsResponse] = await Promise.all([
    getAdminInformationsData(),
  ]);
  const { data } = informationsResponse || {};
  const { data: informations, ...paginationData } = data || {};
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(informations)}
        detailLinkBase="/admin/informations"
        containsEdit={true}
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
