import {
  AdminArticleCategoriesDataType,
  getAdminArticleCategoriesData,
} from "../lib";
import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@components/feature/datatable";
import { AdminArticleCategoriesColumnType, columns } from "./columns";

type MainTableDataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getData = (
  data: AdminArticleCategoriesDataType[] | null | undefined,
): AdminArticleCategoriesColumnType[] => {
  if (!data || data.length === 0) return [];

  return data.map((item) => {
    const { id, name, short_name, color, show_head_flg, order, updated_at } =
      item || {};
    return {
      id: id?.toString() ?? "",
      name: name ?? "",
      shortName: short_name ?? "",
      order: order ?? 0,
      color: color ?? "",
      showHeadFlg: show_head_flg ?? false,
      updatedAt: updated_at ?? "",
    };
  });
};

export const MainTableData = async ({ searchParams }: MainTableDataProps) => {
  const [articleCategoriesResponse] = await Promise.all([
    getAdminArticleCategoriesData({ searchParams }),
  ]);

  // Ensure articleCategoriesResponse is valid and handle fallback
  const { data } = articleCategoriesResponse ?? {};
  const { data: articleCategories = [], ...paginationData } = data ?? {};

  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(articleCategories)}
        detailLinkBase="/admin/article_categories"
        containsEdit={true}
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
