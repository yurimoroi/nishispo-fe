"use server";

import { genericRequest } from "@/lib/generic-action";
import { DashboardResponseType } from "./types";

export const getDashboardData = async () => {
  const response = await genericRequest({
    path: "/dashboard",
    method: "GET",
    options: {
      cache: "no-store",
    },
    isAdminPath: true,
  });

  const data: DashboardResponseType = await response.json();

  return data;
};
