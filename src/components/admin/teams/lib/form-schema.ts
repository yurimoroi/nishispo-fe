import { fileSizeValidation } from "@/components/feature/form";
import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

import { z } from "zod";

export const formAdminTeamsSchema = z.object({
  organizationName: z.string(),
  organizationLabel: z.string(),
  freeWord: z.string().optional(),
  paymentTypeItems: z.array(z.string()).optional(),
  isNextUseRights: z.boolean().optional(),
  isUnpaid: z.boolean().optional(),
});

export const formTeamSchema = z.object({
  orgName: z
    .string()
    .min(1, JP_ERROR_MESSAGE_ALT.TEAM_EVENT_ORGANIZATION_NAME_REQUIRED),
  image: fileSizeValidation(),
  eventName: z.string().min(1, JP_ERROR_MESSAGE_ALT.TEAM_EVENT_NAME_REQUIRED),
  eventLeader: z.array(z.string()).optional(),
  activitiesDetails: z.string().optional(),
  membersFee: z.preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z
      .number({ invalid_type_error: "順序は数値でなければなりません。" })
      .min(1, JP_ERROR_MESSAGE_ALT.TEAM_EVENT_MEMBERS_FEE_REQUIRED)
      .refine((value) => !isNaN(value), { message: "Invalid number format" }),
  ),
  membersInformation: z.string().optional(),
  settlementType: z.string().optional(),
  moneyCollectingSpan: z.string().optional(),
});
