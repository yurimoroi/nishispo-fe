import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@/components/feature/datatable";
import {
  AdminTrainingsDataType,
  columns,
  getAdminTrainingsData,
} from "@components/admin/trainings";
import { AdminTrainingsColumnType } from "./columns";
import { trainingTypeValues } from "@/lib";

const getData = (
  data: AdminTrainingsDataType[],
): AdminTrainingsColumnType[] => {
  if (!data) return [];

  return data.map((data: any) => {
    const { id, title, type, overview, no } = data || {};
    const trainingTypeLabel =
      trainingTypeValues.find((item) => item.id === type)?.label || "-";

    return {
      id: id.toString(),
      title,
      type: trainingTypeLabel,
      overview,
      trainingNo: no,
    };
  });
};

export const MainTableData = async () => {
  const [trainingsResponse] = await Promise.all([getAdminTrainingsData()]);
  const { data } = trainingsResponse || {};
  const { data: trainings, ...paginationData } = data || {};

  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(trainings)}
        detailLinkBase="/admin/trainings"
        containsEdit={true}
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
