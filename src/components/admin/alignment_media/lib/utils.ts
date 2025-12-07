import { z } from "zod";
import { formAlignMediaSchema } from "./form-schema";

export const formatFormDataDate = (date: string | undefined) => {
  if (!date) return "";

  const formattedDate = date.replace(/\//g, "-");

  const currentTime =
    new Date().toISOString().split("T")[1]?.slice(0, 8) || "00:00:00";

  return formattedDate.concat(" " + currentTime);
};

export const formatDateRange = (
  started_at: string | Date,
  ended_at: string | Date,
): string => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1; // Months are 0-based
    const day = parsedDate.getDate();
    return `${year}/${month}/${day}`;
  };

  return `${formatDate(started_at)} - ${formatDate(ended_at)}`;
};

export const formatDateToSlashFormat = (dateTime: string) => {
  if (!dateTime) return "";
  const date = dateTime.split(" ")[0];
  return date.replace(/-/g, "/");
};

export const formatDefaultDate = (startedAt: Date | string): string => {
  if (startedAt instanceof Date) {
    return startedAt.toISOString().split("T")[0]; // Extract only the date part (yyyy-mm-dd)
  }
  return startedAt; // If it's already a string, return as is
};

export const transformMediaDataToFormData = (
  formValues: z.infer<typeof formAlignMediaSchema>,
  isEditMode = false,
) => {
  const formDataMapping = {
    name: formValues.name,
    banner: formValues.banner,
    url: formValues.url,
    display_top_flg: formValues.displayTopFlg,
    display_article_list_flg: formValues.displayArticleListFlg,
    display_flg: formValues.displayFlg,
    note: formValues.note ? formValues.note : "-",
    order: formValues.order,
    started_at: formatFormDataDate(formValues.startedAt),
    ended_at: formatFormDataDate(formValues.endedAt),
  };
  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  if (isEditMode) {
    formData.append("_method", "PUT");
  }

  return formData;
};
