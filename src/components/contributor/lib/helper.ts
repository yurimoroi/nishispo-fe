import { getFinalParamValue } from "@/components/feature/datatable/lib";
import { ReadonlyURLSearchParams } from "next/navigation";

export enum UserArticlesQueryKeys {
  Status = "filter[status]",
  Search = "filter[search]",
  Categories = "filter[categories]",

  Page = "page",
  PerPage = "perPage",
}

type QueryParams = {
  [UserArticlesQueryKeys.Status]?: string | null;
  [UserArticlesQueryKeys.Search]?: string | null;
  [UserArticlesQueryKeys.Categories]?: string | null;
  [UserArticlesQueryKeys.Page]?: string | null;
  [UserArticlesQueryKeys.PerPage]?: string | null;
};

type GetPropertyQueryStringProps = {
  searchParams: ReadonlyURLSearchParams;
  queryParams?: QueryParams;
};

export const getUserArticleQueryString = ({
  searchParams,
  queryParams,
}: GetPropertyQueryStringProps) => {
  const params: Record<string, string> = {};

  const keysToProcess: (keyof QueryParams)[] = [
    UserArticlesQueryKeys.Status,
    UserArticlesQueryKeys.Search,
    UserArticlesQueryKeys.Categories,
    UserArticlesQueryKeys.Page,
    UserArticlesQueryKeys.PerPage,
  ];

  keysToProcess.forEach((key) => {
    const value = getFinalParamValue(searchParams.get(key), queryParams?.[key]);
    if (value) {
      params[key] = value;
    }
  });

  return new URLSearchParams(params).toString();
};
