import {
  convertLinkStringsToFile,
  convertLinkToFile,
} from "@/components/contributor";
import { ArticlePreviewStore } from "@/components/feature/article-preview";

export const transformDetailToFormData = async (data: ArticlePreviewStore) => {
  const {
    title,
    body,
    organizationId,
    publishDate,
    publishStart,
    publishEnd,
    categories,
    tagsWithMetaData,
    images,
    attachments,
  } = data;

  const formDataToSubmit = new FormData();

  const updatedAttachments = await convertLinkStringsToFile(images);

  formDataToSubmit.append("title", title);
  formDataToSubmit.append("body", body);
  formDataToSubmit.append("organization_id", organizationId);
  formDataToSubmit.append("published_at", publishStart);
  formDataToSubmit.append(
    "publish_ended_at",
    publishEnd && publishEnd !== "-" ? publishEnd : "",
  );
  categories.forEach((category, index) =>
    formDataToSubmit.append(`categories[${index}]`, category.id),
  );
  tagsWithMetaData.forEach((tag, index) =>
    formDataToSubmit.append(`tags[${index}]`, tag.id),
  );
  attachments.forEach((attachment, index) => {
    formDataToSubmit.append(`attachments[${index}]`, attachment);
  });

  return formDataToSubmit;
};
