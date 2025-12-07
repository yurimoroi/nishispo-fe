import { getFinalParamValue } from "@/components/feature/datatable/lib";
import { ReadonlyURLSearchParams } from "next/navigation";

export enum AdminArticlesQueryKeys {
  Status = "filter[status]",
  Search = "filter[search]",
  Categories = "filter[categories]",
  Dates = "filter[dates]",

  // Combobox Labels
  

  Page = "page",
  PerPage = "perPage",
}

type QueryParams = {
  [AdminArticlesQueryKeys.Status]?: string | null;
  [AdminArticlesQueryKeys.Search]?: string | null;
  [AdminArticlesQueryKeys.Categories]?: string | null;
  [AdminArticlesQueryKeys.Dates]?: string | null;

  [AdminArticlesQueryKeys.Page]?: string | null;
  [AdminArticlesQueryKeys.PerPage]?: string | null;
};

type GetPropertyQueryStringProps = {
  searchParams: ReadonlyURLSearchParams;
  queryParams?: QueryParams;
};

export const getAdminArticleQueryString = ({
  searchParams,
  queryParams,
}: GetPropertyQueryStringProps) => {
  const params: Record<string, string> = {};

  const keysToProcess: (keyof QueryParams)[] = [
    AdminArticlesQueryKeys.Status,
    AdminArticlesQueryKeys.Search,
    AdminArticlesQueryKeys.Categories,
    AdminArticlesQueryKeys.Dates,
    AdminArticlesQueryKeys.Page,
    AdminArticlesQueryKeys.PerPage,
  ];

  keysToProcess.forEach((key) => {
    const value = getFinalParamValue(searchParams.get(key), queryParams?.[key]);
    if (value) {
      params[key] = value;
    }
  });

  return new URLSearchParams(params).toString();
};
