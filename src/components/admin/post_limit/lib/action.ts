"use server";

import { z } from "zod";
import { postLimitFormSchema } from "./form-schema";
import { genericRequest } from "@/lib/generic-action";
import { PostLimitResponseType } from "./types";

export const updatePostLimit = async (
  formData: z.infer<typeof postLimitFormSchema>,
) => {
  const path = "/company/post-limit";

  const payload = {
    organization_member_post_limit: formData.orgMemberPostLimit,
    organization_post_limit: formData.orgPostLimit,
    post_limit: formData.postLimit,
  };

  const response = await genericRequest({
    path,
    method: "PUT",
    isAdminPath: true,
    options: {
      cache: "no-store",
      body: JSON.stringify(payload),
    },
  });

  const data: PostLimitResponseType = await response.json();

  return data;
};
