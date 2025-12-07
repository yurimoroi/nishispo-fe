import { getFinalParamValue } from "@/components/feature/datatable/lib";
import { prefectureValues } from "@/lib";
import { ReadonlyURLSearchParams } from "next/navigation";

export enum AdminUsersQueryKeys {
  Role = "filter[role]",
  GenericStatus = "filter[status]",
  ApprovalStatus = "filter[article_status]",
  OrganizationName = "filter[organization]",
  Search = "filter[search]",

  // Combobox Labels
  OrganizationLabel = "orgl",

  Page = "page",
  PerPage = "perPage",
}

type QueryParams = {
  [AdminUsersQueryKeys.Role]?: string | null;
  [AdminUsersQueryKeys.GenericStatus]?: string | null;
  [AdminUsersQueryKeys.ApprovalStatus]?: string | null;
  [AdminUsersQueryKeys.OrganizationName]?: string | null;
  [AdminUsersQueryKeys.Search]?: string | null;

  // Combobox Labels
  [AdminUsersQueryKeys.OrganizationLabel]?: string | null;

  [AdminUsersQueryKeys.Page]?: string | null;
  [AdminUsersQueryKeys.PerPage]?: string | null;
};

type GetPropertyQueryStringProps = {
  searchParams: ReadonlyURLSearchParams;
  queryParams?: QueryParams;
};

export const getAdminUsersQueryString = ({
  searchParams,
  queryParams,
}: GetPropertyQueryStringProps) => {
  const params: Record<string, string> = {};

  const keysToProcess: (keyof QueryParams)[] = [
    AdminUsersQueryKeys.Role,
    AdminUsersQueryKeys.GenericStatus,
    AdminUsersQueryKeys.ApprovalStatus,
    AdminUsersQueryKeys.OrganizationName,
    AdminUsersQueryKeys.Search,

    // Combobox Labels
    AdminUsersQueryKeys.OrganizationLabel,

    AdminUsersQueryKeys.Page,
    AdminUsersQueryKeys.PerPage,
  ];

  keysToProcess.forEach((key) => {
    const value = getFinalParamValue(searchParams.get(key), queryParams?.[key]);
    if (value) {
      params[key] = value;
    }
  });

  return new URLSearchParams(params).toString();
};

export const getPrefectureLabel = (prefectureId: string) => {
  return prefectureValues.find((item) => item.id === prefectureId)?.label || "";
};
