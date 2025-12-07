"use client";

import { TwoColContainer } from "@/components/feature/layout";
import {
  deleteArticle,
  getArticleDetails,
  submitArticle,
  UserArticlesDataType,
  withdrawEditDeleteRequest,
} from "../lib";
import { ListTopContent } from "./list-top-content";
import { formatDateTime, formatResponseError, getUniqueId } from "@/lib/utils";
import { ListBottomContent } from "./list-bottom-content";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { UserArticlesProvider } from "@components/contributor";
import { setArticlePreviewByEndpoint } from "@/components/feature/article-preview";
import { openModalArticlePreview } from "@/components/feature/modal/modal-article-preview";
import {
  ModalArticleRequestType,
  openModalArticleRequest,
} from "@/components/feature/modal/modal-article-requests";
import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal";

type MainListDataProps = {
  data: UserArticlesDataType[];
};

export const MainListData = ({ data }: MainListDataProps) => {
  const router = useRouter();

  const handleSubmit = async (id: string, rowData?: any) => {
    try {
      const formData = new FormData();
      const publishAt = formatDateTime(rowData?.publishedAt);
      const publishEndedAt = formatDateTime(rowData?.publishEndedAt);
      formData.append("title", rowData?.articleTitle);
      formData.append("body", rowData?.articleBody);
      formData.append("organization_id", rowData?.organizationId);
      formData.append("published_at", publishAt);
      formData.append("publish_ended_at", publishEndedAt);
      formData.append("categories", rowData?.categories);
      formData.append("tags", rowData?.tags);
      const [submitResponse] = await Promise.all([
        submitArticle(formData, id.toString()),
      ]);

      if (!submitResponse?.success) {
        toast({
          title: "Submit Error",
          description: submitResponse?.message,
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Submit Error",
        description: formatResponseError(error),
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/contributor/articles/${id}/edit`);
  };

  const handleEditRequest = async (id: string) => {
    try {
      const [articleDataByIdResponse] = await Promise.all([
        getArticleDetails(id),
      ]);
      const { data: articleDetail } = articleDataByIdResponse ?? {};
      await setArticlePreviewByEndpoint(articleDetail);
      openModalArticleRequest(id, ModalArticleRequestType.Edit);
    } catch (error) {
      toast({
        title: "Edit Request Error",
        description: formatResponseError(error),
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const title = "警告";
      const message = "一度削除されると復元はできませんがよろしいですか？";
      openModalMessage({
        title,
        message,
        variant: ModalMessageVariant.Confirm,
        handler: async () => {
          await deleteArticle(id?.toString());
          router.refresh();
        },
      });
    } catch (error) {
      toast({
        title: "Delete Error",
        description: formatResponseError(error),
      });
    }
  };

  const handlePreview = async (id: string) => {
    try {
      const [articleDataByIdResponse] = await Promise.all([
        getArticleDetails(id),
      ]);
      const { data: articleDetail } = articleDataByIdResponse ?? {};

      await setArticlePreviewByEndpoint(articleDetail);
      openModalArticlePreview();
    } catch (error) {
      toast({
        title: "Preview Error",
        description: formatResponseError(error),
      });
    }
  };

  const handleDeleteRequest = async (id: string) => {
    const [articleDataByIdResponse] = await Promise.all([
      getArticleDetails(id),
    ]);
    const { data: articleDetail } = articleDataByIdResponse ?? {};
    setArticlePreviewByEndpoint(articleDetail);
    openModalArticleRequest(id, ModalArticleRequestType.Delete);
  };

  const handleWithdrawDeleteEditRequest = async (id: string) => {
    await withdrawEditDeleteRequest(id);
    router.refresh();
  };

  const buttons = [
    {
      id: "submit",
      label: "入稿",
      onClick: handleSubmit,
      styles: "text-blue-100",
    },
    {
      id: "edit",
      label: "修正",
      onClick: handleEdit,
      styles: "text-blue-100",
    },
    {
      id: "editRequest",
      label: "編集依頼",
      onClick: handleEditRequest,
      styles: "text-blue-100",
    },
    {
      id: "delete",
      label: "削除",
      onClick: handleDelete,
      styles: "text-orange-100",
    },
    {
      id: "preview",
      label: "プレビュー",
      onClick: handlePreview,
      styles: "text-blue-100",
    },
    {
      id: "deleteRequest",
      label: "削除依頼",
      onClick: handleDeleteRequest,
      styles: "text-orange-100",
    },
    {
      id: "withdrawDeleteEditRequest",
      label: "依頼取り下げ",
      onClick: handleWithdrawDeleteEditRequest,
      styles: "text-blue-100",
    },
  ];

  return (
    <>
      {data?.map((article, index) => {
        let { btns } = article || {};
        const articleStatusBtns = Object.keys(btns).filter(
          (key) =>
            key in btns && (btns as Record<string, boolean>)[key] === true,
        );
        // Define the context values for each article
        const contextValue = {
          articleId: article?.id.toString(),
          articleTitle: article?.title,
          articleBody: article?.body,
          organizationId: article?.organization?.id,
          categories: article?.categories,
          tags: article?.tags,
          publishedAt: article?.published_at,
          publishEndedAt: article?.publish_ended_at,
          createdAt: article?.created_at,
          updatedAt: article?.updated_at,
          unSubmittedEdits: article?.un_submitted_edits ? true : false,
          articleStatus: article?.status?.label,
          articleStatusBtns,
        };

        return (
          <React.Fragment key={getUniqueId(article?.id.toString())}>
            <TwoColContainer className="flex border-b border-b-shade-400 px-6 py-5 lg:flex-col lg:px-0">
              <UserArticlesProvider value={contextValue}>
                <ListTopContent buttons={buttons} />
              </UserArticlesProvider>

              {/* Reintroduced the UserArticlesprovider here because the TwoColContainer expects more than one component */}
              <UserArticlesProvider value={contextValue}>
                <ListBottomContent />
              </UserArticlesProvider>
            </TwoColContainer>
          </React.Fragment>
        );
      })}
    </>
  );
};
