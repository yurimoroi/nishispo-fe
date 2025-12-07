import { convertDateToJPDashWithTime } from "@/lib/utils";

export const convertToFormData = (formValues: any, isEditMode = false) => {
  if (!formValues) {
    throw new Error("Form values are required");
  }

  const { uploadFile, title, body, releasePeriodStart, releasePeriodEnd } =
    formValues;

  const formDataMapping = {
    title: title,
    body: body || "",
    published_at: convertDateToJPDashWithTime(releasePeriodStart),
    finished_at: releasePeriodEnd !== undefined
    ? convertDateToJPDashWithTime(releasePeriodEnd)
    : null,
  };

  if (typeof formDataMapping !== "object" || formDataMapping === null) {
    throw new Error("Invalid form data mapping");
  }

  const formData = new FormData();

  // Handle file upload
  if (uploadFile instanceof File) {
    formData.append("info_images", uploadFile);
  }

  if (isEditMode) {
    formData.append("_method", "PUT");
  }

   // Safely append form data fields to FormData
   Object.entries(formDataMapping).forEach(([key, value]) => {
    formData.append(key, value ? String(value) : "");
  });

  return formData;
};
