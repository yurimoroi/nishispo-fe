"use server";
import { genericRequest } from "@/lib/generic-action";
import { RemandResponseType } from "./types";
import { z } from "zod";
import { remandFormSchema } from "./form-schema";
export const saveRemand = async (
  formData: z.infer<typeof remandFormSchema>,
  id: string,
) => {
  const path = `/articles/${id}/remand`;
  const { titleRemand, bodyRemand, imageRemand, otherRemand } = formData;
  const payload = {
    comment_to_title: titleRemand,
    comment_to_body: bodyRemand,
    comment_to_image: imageRemand,
    comment: otherRemand,
  };

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "POST",
    options: {
      cache: "no-store",
      body: JSON.stringify(payload),
    },
  });

  const data: RemandResponseType = await response.json();

  return data;
};
