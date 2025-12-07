import { InquiryFormType } from "./types";

export const transformInquiryDataToFormData = (formValues: InquiryFormType) => {
  const formDataMapping = {
    name: formValues.name,
    inquiry_type_id: formValues.subject,
    body: formValues.body,
    email: formValues.email,
  };
  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  return formData;
};
