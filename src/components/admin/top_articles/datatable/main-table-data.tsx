import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@/components/feature/datatable";
import { AdminTopArticlesDataType, getAdminTopArticlesData } from "../lib";
import { AdminTopArticlesColumnType, columns } from "./columns";

const getData = (
  data: AdminTopArticlesDataType[],
): AdminTopArticlesColumnType[] => {
  if (!data) return [];

  return data.map((data) => {
    const { id, published_at, publish_ended_at, order, article } = data || {};
    const { user, title, updated_at } = article || {};

    const displayPeriodRange =
      (published_at ? published_at : "") ||
      (publish_ended_at ? publish_ended_at : "")
        ? `${published_at ? published_at : ""} - ${publish_ended_at ? publish_ended_at : ""}`
        : "-";

    return {
      id: article?.id?.toString() || "",
      title: title || "",
      articleContributor: user?.contributor_name || "",
      updatedAt: updated_at || "",
      order: order.toString() || "",
      displayPeriod: displayPeriodRange,
      topArticleId: id,
    };
  });
};

type SearchParamsType = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const MainTableData = async ({ searchParams }: SearchParamsType) => {
  const [topArticlesResponse] = await Promise.all([
    getAdminTopArticlesData({ searchParams }),
  ]);
  const { data } = topArticlesResponse || {};
  const { data: topArticles, ...paginationData } = data || {};

  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(topArticles)}
        detailLinkBase="/admin/top_articles"
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
