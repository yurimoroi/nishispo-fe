import { getFinalParamValue } from "@/components/feature/datatable/lib";
import { ReadonlyURLSearchParams } from "next/navigation";

export enum AdminTeamsQueryKeys {
  Name = "filter[org]",
  Search = "filter[search]",
  PaymentType = "filter[payment]",
  Unpaid = "filter[unpaid]",
  DateExpired = "filter[expire]",

  // Combobox Labels
  OrganizationLabel = "orgl",

  Page = "page",
  PerPage = "perPage",
}

type QueryParams = {
  [AdminTeamsQueryKeys.Name]?: string | null;
  [AdminTeamsQueryKeys.Search]?: string | null;
  [AdminTeamsQueryKeys.PaymentType]?: string | null;
  [AdminTeamsQueryKeys.Unpaid]?: string | null;
  [AdminTeamsQueryKeys.DateExpired]?: string | null;

  // Combobox Labels
  [AdminTeamsQueryKeys.OrganizationLabel]?: string | null;

  [AdminTeamsQueryKeys.Page]?: string | null;
  [AdminTeamsQueryKeys.PerPage]?: string | null;
};

type GetPropertyQueryStringProps = {
  searchParams: ReadonlyURLSearchParams;
  queryParams?: QueryParams;
};

export const getAdminTeamsQueryString = ({
  searchParams,
  queryParams,
}: GetPropertyQueryStringProps) => {
  const params: Record<string, string> = {};

  const keysToProcess: (keyof QueryParams)[] = [
    AdminTeamsQueryKeys.Name,
    AdminTeamsQueryKeys.Search,
    AdminTeamsQueryKeys.PaymentType,
    AdminTeamsQueryKeys.Unpaid,
    AdminTeamsQueryKeys.DateExpired,

    // Combobox Labels
    AdminTeamsQueryKeys.OrganizationLabel,

    AdminTeamsQueryKeys.Page,
    AdminTeamsQueryKeys.PerPage,
  ];

  keysToProcess.forEach((key) => {
    const value = getFinalParamValue(searchParams.get(key), queryParams?.[key]);
    if (value) {
      params[key] = value;
    }
  });

  return new URLSearchParams(params).toString();
};
