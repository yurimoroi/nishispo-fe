"use client";

import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@components/feature/datatable";
import { AdminArticlesDataType } from "../lib/types";
import { AdminArticlesColumnType, columns } from "./columns";
import { ArticleStatusType, getArticleDetails } from "@/components/contributor";
import { PaginationLink as GenericPaginationLink } from "@components/feature/articles/search";
import { setArticlePreviewByEndpoint } from "@/components/feature/article-preview";
import { openModalArticlePreview } from "@/components/feature/modal/modal-article-preview";

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
  data: AdminArticlesDataType[];
  paginationData: PaginationDataProps;
};

const getData = (
  data: AdminArticlesDataType[] | null | undefined,
): AdminArticlesColumnType[] => {
  if (!data || data.length === 0) return [];

  return data.map((item) => {
    const {
      id,
      title,
      body,
      organization,
      updated_at,
      published_at,
      publish_ended_at,
      categories,
      tags,
      btns,
      user,
      status,
    } = item || {};
    return {
      id: id?.toString() || "",
      title: title ?? "",
      organizationId: organization?.id?.toString() || "",
      body,
      articleContributor: user?.contributor_name || "",
      advertiserAccountArticles: user?.advertiser_name || "",
      updatedAt: updated_at,
      publishedAt: published_at,
      publishEndedAt: publish_ended_at,
      categories:
        categories?.map((category) => category?.name).join(", ") || "",
      tags: tags?.map((tag) => tag?.name).join(", ") || "",
      btns,
      articleStatus: status.label,
    };
  });
};

export const MainTableData = ({ data, paginationData }: MainTableDataProps) => {
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        detailLinkBase="/admin/articles"
        data={getData(data)}
        containsEdit={false}
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
