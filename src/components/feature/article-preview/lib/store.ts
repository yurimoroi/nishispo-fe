import {
  ArticleAdminDetailDataType,
  articleAdminFormSchema,
} from "@/components/admin/articles";
import {
  ArticleButtonsType,
  ArticleDetailDataType,
  articleFormSchema,
  ArticleTagType,
  convertLinkToFile,
} from "@/components/contributor";
import { convertDateToJPDashWithTime, convertDateToJPDot } from "@/lib/utils";
import { z } from "zod";
import { create } from "zustand";
import { ArticleCategoryType } from "@feature/article-post";

export type ArticlePreviewStore = {
  id: string;
  isPR: boolean;
  categories: ArticleCategoryType[];
  title: string;
  publishDate: string; // this will hold the converted date "."
  authorName: string;
  images: string[];
  organizationName: string;
  body: string;
  tags: string[]; // These are tag names

  btns?: ArticleButtonsType;

  // additional data needed for saving but not need for preview
  organizationId: string;
  publishStart: string; // this will hold data from API
  publishEnd: string;
  tagsWithMetaData: ArticleTagType[];
  attachments: File[]; // This will hold the original images of gallery
};

const initialStore: ArticlePreviewStore = {
  id: "",
  isPR: false,
  categories: [],
  title: "",
  body: "",
  publishDate: "",
  authorName: "",
  images: [],
  organizationName: "",

  tags: [],

  organizationId: "",
  publishStart: "",
  publishEnd: "",
  tagsWithMetaData: [],
  attachments: [],
};

export const useArticlePreviewStore = create<ArticlePreviewStore>()((set) => ({
  ...initialStore,
}));

export const setArticlePreviewByForm = (
  data: z.infer<typeof articleFormSchema> & {
    articleId?: string;
    authorName?: string;
    isPR?: boolean;
    selectedCategoriesWithMetadata?: ArticleCategoryType[];
    tagsWithMetaData?: ArticleTagType[];
    organizationId?: string;
    btns?: ArticleButtonsType;
  },
) => {
  const {
    publishStart,
    categories,
    title,
    attachments,
    body,
    tags,
    authorName,
    organization,

    articleId,
    publishEnd,
    isPR,
    selectedCategoriesWithMetadata,
    tagsWithMetaData,
    organizationId,
    btns,
  } = data;

  const imageLinks = attachments.map((attachment) =>
    URL.createObjectURL(attachment),
  );

  useArticlePreviewStore.setState({
    id: articleId || "",
    isPR,
    categories: selectedCategoriesWithMetadata,
    title,
    body,
    publishDate: convertDateToJPDot(publishStart),
    images: imageLinks,
    tags,
    authorName: authorName || "-",
    organizationName: organization,

    publishEnd: publishEnd ? convertDateToJPDashWithTime(publishEnd) : "-",
    publishStart: convertDateToJPDashWithTime(publishStart),
    tagsWithMetaData,
    organizationId,
    btns,
    attachments,
  });
};

// This is for admin article
export const setArticleAdminPreviewByForm = (
  data: z.infer<typeof articleAdminFormSchema> & {
    articleId?: string;
    authorName?: string;
    isPR?: boolean;
    selectedCategoriesWithMetadata?: ArticleCategoryType[];
    tagsWithMetaData?: ArticleTagType[];
    organizationId?: string;
    btns?: ArticleButtonsType;
  },
) => {
  const {
    publishStart,
    categories,
    title,
    attachments,
    body,
    tags,
    authorName,
    organization,

    articleId,
    publishEnd,
    isPR,
    selectedCategoriesWithMetadata,
    tagsWithMetaData,
    organizationId,
    btns,
  } = data;

  const imageLinks = attachments.map((attachment) =>
    URL.createObjectURL(attachment),
  );

  useArticlePreviewStore.setState({
    id: articleId || "",
    isPR,
    categories: selectedCategoriesWithMetadata,
    title,
    body,
    publishDate: convertDateToJPDot(publishStart),
    images: imageLinks,
    tags,
    authorName: authorName || "-",
    organizationName: organization,

    publishEnd: publishEnd ? convertDateToJPDashWithTime(publishEnd) : "-",
    publishStart: convertDateToJPDashWithTime(publishStart),
    tagsWithMetaData,
    organizationId,
    btns,
    attachments,
  });
};

export const setArticlePreviewByEndpoint = async (
  data: ArticleAdminDetailDataType | ArticleDetailDataType,
) => {
  const {
    id,
    pr_flg,
    categories,
    title,
    body,
    published_at,
    all_media_url,
    tags,
    organization,
    user,

    btns,
  } = data;

  const { contributor_name } = user;
  const imageLinks = all_media_url.map((media) => {
    // On local environment, the BE returns localhost link which does not work
    // On higher environments, replacing hostname is negligible
    const finalLinkUrl = media.original.replace("localhost", "127.0.0.1:8000");
    return finalLinkUrl;
  });

  useArticlePreviewStore.setState({
    id,
    isPR: pr_flg,
    categories,
    title,
    body,
    publishDate: convertDateToJPDot(new Date(published_at)),
    images: imageLinks,
    tags: tags.map((tag) => tag?.name),
    authorName: contributor_name || "-",
    organizationName: organization?.name,
    btns,

    organizationId: organization?.id,
    publishStart: convertDateToJPDashWithTime(new Date(data.published_at)),
    publishEnd: data.publish_ended_at ? data?.publish_ended_at : "",
    attachments: await convertLinkToFile(all_media_url),
  });
};
