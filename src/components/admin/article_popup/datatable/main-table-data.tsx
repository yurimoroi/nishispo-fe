"use client";

import React, { useEffect, useState } from "react";
import { DataPagination, MainTable } from "@/components/feature/datatable";
import { ArticlesPopupColumnType, columns } from "./columns";
import { getArticlesDataFromPopup } from "@components/admin/top_articles";
import { Article } from "@/components/feature/articles/search";
import { Spinner } from "@/components/feature/common/spinner";
import { PaginationLink as GenericPaginationLink } from "@components/feature/articles/search";
import usePageStore from "../lib/store";
import { formatDateTime } from "@/lib/utils";

type FilterParams = {
  filters: {
    status?: string;
    freeWord?: string;
    categoryItems?: string[];
    publishedAt?: string;
    publishEndedAt?: string;
  };
  pageNumber?: number;
};

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

// Data transformation function
const getData = (
  data: Article[] | null | undefined,
): ArticlesPopupColumnType[] => {
  if (!data || data.length === 0) return [];

  return data.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    articleContributor: item.user?.contributor_name,
    updatedAt: formatDateTime(item.updated_at, "/"),
  }));
};

export const MainTableData = ({ filters }: FilterParams) => {
  const [articlesData, setArticlesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState<PaginationDataProps>({
    current_page: 1,
    first_page_url: "",
    last_page: 1,
    last_page_url: "",
    next_page_url: null,
    prev_page_url: null,
    path: "",
    links: [],
  });

  // Zustand store
  const { getPageNumber } = usePageStore((state) => state);
  const currentPageNumber = Number(getPageNumber()); // Get current page from Zustand

  // Re-fetch data whenever page number or filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getArticlesDataFromPopup({
          filters,
          pageNumber: currentPageNumber, // Fetch based on current page from Zustand
        });
        const { data, ...pagination } = response?.data || {};

        setPaginationData(pagination);
        setArticlesData(getData(data));
      } catch (error) {
        console.error("Error fetching articles data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPageNumber]); // Re-fetch when filters or page number changes

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={articlesData}
        detailLinkBase="/admin/top_articles"
        containsEdit={false}
        className="mb-[1.875rem] max-h-[15.625rem]"
      />
      <DataPagination popupMode={true} paginationData={paginationData} />
    </div>
  );
};
