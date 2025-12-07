"use client";

import { deleteArticle, getArticleDetails } from "@/components/contributor";
import { toast } from "@/hooks/use-toast";
import { formatDateTime, formatResponseError } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import {
  AdminArticlesProvider,
  adminArticleStatusName,
  editApprovedArticle,
  submitArticle,
  withdrawEditDeleteRequest,
} from "../lib";
import CustomTableAction from "./custom-table-action";
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

type ArticleStatusType = {
  value: string;
  label: string;
};

export type AdminArticlesColumnType = {
  id: string;
  title: string;
  body: string;
  organizationId: string;
  categories: string;
  tags: string;
  articleContributor: string;
  advertiserAccountArticles: string;
  publishedAt: string;
  publishEndedAt: string;
  updatedAt: string;
  articleStatus: string;
  btns: {
    preview: boolean;
    submit: boolean;
    save: boolean;
    delete: boolean;
    editRequest: boolean;
    deleteRequest: boolean;
    withdrawDeleteEditRequest: boolean;
  };
};

const ActionsCell = ({ rowData }: { rowData: AdminArticlesColumnType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPath = pathname.includes("admin");

  const handleSubmit = async (
    event: React.MouseEvent,
    id: string,
    rowData?: any,
  ) => {
    event.stopPropagation();
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

  const handleEdit = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();

    if (isAdminPath) {
      router.push(`/admin/articles/new?id=${id}`); // This URL is expected by the client.
    } else {
      router.push(`/contributor/articles/${id}/edit`);
    }
  };

  const handleEditApproval = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      await editApprovedArticle(id);
      router.refresh();
    } catch (error) {
      toast({
        title: "Edit Approval Error",
        description: formatResponseError(error),
      });
    }
  };

  const handleDelete = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      const title = "警告";
      const message = "一度削除されると復元はできませんがよろしいですか？";
      openModalMessage({
        title,
        message,
        variant: ModalMessageVariant.Confirm,
        handler: () => {
          deleteArticle(id?.toString());
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

  const handleEditRequest = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const [articleDataByIdResponse] = await Promise.all([
      getArticleDetails(id),
    ]);
    const { data: articleDetail } = articleDataByIdResponse ?? {};
    setArticlePreviewByEndpoint(articleDetail);
    openModalArticleRequest(id, ModalArticleRequestType.Edit);
  };

  const handleDeleteRequest = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const [articleDataByIdResponse] = await Promise.all([
      getArticleDetails(id),
    ]);
    const { data: articleDetail } = articleDataByIdResponse ?? {};
    setArticlePreviewByEndpoint(articleDetail);
    openModalArticleRequest(id, ModalArticleRequestType.Delete);
  };

  const handlePreview = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      const [articleDataByIdResponse] = await Promise.all([
        getArticleDetails(id),
      ]);
      const { data: articleDetail } = articleDataByIdResponse ?? {};
      setArticlePreviewByEndpoint(articleDetail);
      openModalArticlePreview();
    } catch (error) {
      toast({
        title: "Preview Error",
        description: formatResponseError(error),
      });
    }
  };

  const handleWithdrawDeleteEditRequest = async (
    event: React.MouseEvent,
    id: string,
  ) => {
    event.stopPropagation();
    try {
      await withdrawEditDeleteRequest(id);
      router.refresh();
    } catch (error) {
      toast({
        title: "Withdraw Error",
        description: formatResponseError(error),
      });
    }
  };

  const articleId = rowData?.id;
  const btns = rowData?.btns;
  const buttons = [
    {
      id: "submit",
      label: "入稿",
      onClick: handleSubmit,
      styles: "text-blue-100",
    },
    {
      id: "edit",
      label: "修正する",
      articleId,
      onClick: handleEdit,
      styles: "text-blue-100",
    },
    {
      id: "editApproval",
      label: "編集依頼承認",
      onClick: handleEditApproval,
      styles: "text-blue-100",
    },
    {
      id: "delete",
      label: "削除する",
      onClick: handleDelete,
      styles: "text-orange-100",
    },
    {
      id: "preview",
      label: "記事プレビュー",
      onClick: handlePreview,
      styles: "text-blue-100",
    },
    {
      id: "withdrawDeleteEditRequest",
      label:
        rowData?.articleStatus === adminArticleStatusName.requestEdit
          ? "編集依頼取り下げ"
          : "削除依頼取り下げ",
      onClick: handleWithdrawDeleteEditRequest,
      styles: "text-blue-100",
    },
  ];

  const articleStatusBtns = Object.keys(btns).filter(
    (key) => key in btns && (btns as Record<string, boolean>)[key] === true,
  );

  // Define the context values for each article
  const contextValue = {
    articleId: rowData?.id.toString(),
    articleTitle: rowData?.title,
    articleBody: rowData?.body,
    organizationId: rowData?.organizationId,
    categories: rowData?.categories?.split(","),
    tags: rowData?.tags?.split(","),
    publishedAt: rowData?.publishedAt,
    publishEndedAt: rowData?.publishEndedAt,
    updatedAt: rowData?.updatedAt,
    articleStatus: rowData?.articleStatus,
    articleStatusBtns,
  };

  return (
    <div className="flex justify-end gap-0 lg:justify-start">
      <AdminArticlesProvider value={contextValue}>
        <CustomTableAction buttons={buttons} hasSeparator={true} />
      </AdminArticlesProvider>
    </div>
  );
};

export const columns: ColumnDef<AdminArticlesColumnType>[] = [
  {
    accessorKey: "title",
    header: "記事タイトル",
    size: 200,
  },
  {
    accessorKey: "categories",
    header: "カテゴリ",
    size: 100,
  },
  {
    accessorKey: "articleContributor",
    header: "記事投稿者名",
    size: 100,
  },
  {
    accessorKey: "advertiserAccountArticles",
    header: "広告主アカウントの記事",
    size: 80,
  },
  {
    accessorKey: "updatedAt",
    header: "最終更新日時",
    size: 160,
  },
  {
    accessorKey: "publishedAt",
    header: "公開日時",
    size: 160,
  },
  {
    accessorKey: "articleStatus",
    header: "ステータス",
    size: 100,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
