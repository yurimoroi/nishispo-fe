import { genericRequest } from "@/lib/generic-action";
import { AlignmentMediaResponseType } from "./types";

export const getAlignmentMedia = async () => {
  const response = await genericRequest({
    path: "/company/alignment-media",
    method: "GET",
    options: {
      cache: "no-store",
    }
  });

  const data: AlignmentMediaResponseType = await response.json();
  return data;
}