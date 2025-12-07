import { z } from "zod";
import { articleFormSchema } from "./form-schema";
import { convertDateToJPDashWithTime } from "@/lib/utils";
import {
  AllMediaDataType,
  ArticleButtonsType,
  ArticleDetailDataType,
  ArticleTagType,
} from "./types";
import {
  ArticleCategoryType,
  CacheMediaRefType,
} from "@/components/feature/article-post";
import { MutableRefObject } from "react";
import { articleAdminFormSchema } from "@/components/admin/articles/form";

export const getNewlyAddedMediaFile = (
  cachedMedia: MutableRefObject<CacheMediaRefType>,
): File[] => {
  if (cachedMedia.current === undefined) {
    return [];
  }
  return (cachedMedia.current || [])
    .filter((media) => media.id < 0) // Filter only newly added media
    .map((media) => media.file); // Map to files
};

// BE requested to only send newly added media/images, to prevent duplication on their end
export const generateMediaListWithId = async (
  allMedia: AllMediaDataType[],
): Promise<{ id: number; file: File }[]> => {
  const promises = allMedia.map(async ({ id, original: link }) => {
    const files = await convertLinkStringsToFile([link]);
    return {
      id,
      file: files[0], // Take the first file
    };
  });

  return await Promise.all(promises || []);
};

// We need to transform the form data to FormData for payload to pass on endpoint
export const transformArticleFormToFormData = (
  data: z.infer<typeof articleFormSchema>,
) => {
  const {
    title,
    body,
    organization: organizationId,
    categories,
    tags,
    publishStart,
    publishEnd,
  } = data;

  const publishStartString = convertDateToJPDashWithTime(publishStart);
  const publishEndString = publishEnd
    ? convertDateToJPDashWithTime(publishEnd)
    : "";

  const formDataToSubmit = new FormData();
  formDataToSubmit.append("title", title);
  formDataToSubmit.append("body", body);
  formDataToSubmit.append("organization_id", organizationId);
  formDataToSubmit.append("published_at", publishStartString);
  formDataToSubmit.append("publish_ended_at", publishEndString);

  categories.forEach((category, index) =>
    formDataToSubmit.append(`categories[${index}]`, category),
  );
  tags.forEach((tag, index) => formDataToSubmit.append(`tags[${index}]`, tag));
  data.attachments.forEach((attachment, index) =>
    formDataToSubmit.append(`attachments[${index}]`, attachment),
  );

  return formDataToSubmit;
};

export const transformArticleAdminFormToFormData = (
  data: z.infer<typeof articleAdminFormSchema>,
) => {
  const {
    title,
    body,
    organization: organizationId,
    categories,
    tags,
    publishStart,
    publishEnd,

    isPR,
    isPublished,
    affiliatedMedia,
  } = data;

  const publishStartString = convertDateToJPDashWithTime(publishStart);
  const publishEndString = publishEnd
    ? convertDateToJPDashWithTime(publishEnd)
    : "";

  const formDataToSubmit = new FormData();
  formDataToSubmit.append("title", title);
  formDataToSubmit.append("body", body);
  formDataToSubmit.append("organization_id", organizationId);
  formDataToSubmit.append("published_at", publishStartString);
  formDataToSubmit.append("publish_ended_at", publishEndString);
  formDataToSubmit.append("pr_flg", isPR ? "1" : "0");
  formDataToSubmit.append("publication_confirmation", String(isPublished));

  categories.forEach((category, index) =>
    formDataToSubmit.append(`categories[${index}]`, category),
  );
  tags.forEach((tag, index) => formDataToSubmit.append(`tags[${index}]`, tag));

  data.attachments.forEach((attachment, index) =>
    formDataToSubmit.append(`attachments[${index}]`, attachment),
  );

  (affiliatedMedia || []).forEach((media, index) =>
    formDataToSubmit.append(`alignment_medias[${index}]`, media.id),
  );

  return formDataToSubmit;
};

const getConvertedFiles = async (linkUrls: string[]) => {
  return await Promise.all(
    linkUrls.map(async (link) => {
      // On local environment, the BE returns localhost link which does not work
      // On higher environments, replacing hostname is negligible code is negligible
      const finalLinkUrl = link.replace("localhost", "127.0.0.1:8000");
      const response = await fetch(
        `${process.env.basePathPDF || ""}/download/image?url=${finalLinkUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/",
          },
        },
      );

      const blob = await response.blob();
      const fileName = link.split("/").pop() || "";
      const extension = fileName.split(".").pop() || "";
      const file = new File([blob], `${fileName}.${extension}`, {
        type: `image/${extension}`,
      });

      return file;
    }),
  );
};

export const convertLinkToFile = async (
  links: AllMediaDataType[] | undefined,
): Promise<File[]> => {
  if (!links) return [];

  const linkUrls = links.map((link) => link.original);

  return await getConvertedFiles(linkUrls);
};

export const convertLinkStringsToFile = async (
  links: string[] | undefined,
): Promise<File[]> => {
  if (!links) return [];

  return await getConvertedFiles(links);
};

export const transformSelectedCategoriesWithMetadata = (
  categoryList: ArticleCategoryType[],
  selectedCategoryIds: string[],
) => {
  return categoryList.filter((category) =>
    selectedCategoryIds.includes(category.id),
  );
};

export const getDetailsForArticlePreview = (
  data: z.infer<typeof articleFormSchema>,
  userSession: unknown,
  articleId: string | undefined,
  selectedCategoriesWithMetadata: ArticleCategoryType[],
  organizationId: string,
  tagsWithMetaData: ArticleTagType[],
  btns: ArticleButtonsType | undefined,
) => {
  const { user } = userSession as {
    user: { isPR: boolean; authorName: string };
  };

  return {
    ...data,
    articleId: articleId || "",
    isPR: user?.isPR || false,
    authorName: user?.authorName || "-",
    selectedCategoriesWithMetadata,
    organizationId,
    tagsWithMetaData,
    btns,
  };
};

export const getDetailsForArticleAdminPreview = (
  data: z.infer<typeof articleAdminFormSchema>,
  userSession: unknown,
  articleId: string | undefined,
  selectedCategoriesWithMetadata: ArticleCategoryType[],
  organizationId: string,
  tagsWithMetaData: ArticleTagType[],
) => {
  const { user } = userSession as {
    user: { isPR: boolean; authorName: string };
  };

  return {
    ...data,
    articleId: articleId || "",
    isPR: user?.isPR || false,
    authorName: user?.authorName || "-",
    selectedCategoriesWithMetadata,
    organizationId,
    tagsWithMetaData,
  };
};


export const getRemands = (info: ArticleDetailDataType | undefined) => {
  return {
    titleRemand: info?.remand_comments?.comment_to_title || null,
    bodyRemand: info?.remand_comments?.comment_to_body || null,
    imageRemand: info?.remand_comments?.comment_to_image || null,
    otherRemand: info?.remand_comments?.comment || null,
  };
};

