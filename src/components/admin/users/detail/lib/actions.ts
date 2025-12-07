"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminContributorApprovalResponseType,
  AdminUserDetailResponseType,
  UserOrganizationWithdrawApprovalResponseType,
  UserToOrganizationApprovalResponseType,
} from "./types";

export async function getAdminUserDetail(userId: string) {
  const path = `/users/${userId}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminUserDetailResponseType = await response.json();

  return data;
}

export const approveContributor = async (userId: string) => {
  const path = `/users/${userId}/contributor-acknowledge`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      cache: "no-store",
    },
  });

  const data: AdminContributorApprovalResponseType = await response.json();

  return data;
};

export const approveUserToOrganization = async (
  userId: string,
  organizationId: string,
) => {
  const path = `/organizations/${organizationId}/users/${userId}/approve`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
  });

  const data: UserToOrganizationApprovalResponseType = await response.json();

  return data;
};

export const approveUserWithdrawFromOrganization = async (
  userId: string,
  organizationId: string,
) => {
  const path = `/organizations/${organizationId}/users/${userId}/withdraw-approve`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
  });

  const data: UserOrganizationWithdrawApprovalResponseType =
    await response.json();

  return data;
};