"use client";

import { genericDeleteById } from "@/components/feature/datatable/lib";
import TableAction from "@/components/feature/datatable/table-action";
import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminTopArticlesColumnType = {
  id: string;
  title: string;
  articleContributor: string;
  updatedAt: string;
  order: string;
  displayPeriod: string;
  topArticleId: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminTopArticlesColumnType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/admin/top_articles/${rowData.id}`);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setLoading(true); // Start loading when delete is triggered
    try {
      const title = "警告";
      const message = "一度削除されると復元はできませんがよろしいですか？";
      openModalMessage({
        title,
        message,
        variant: ModalMessageVariant.Confirm,
        handler: async () => {
          await genericDeleteById(rowData.topArticleId, "top-articles");
          router.refresh();
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading once the delete is done
    }
  };

  const buttons = [
    {
      label: "編集",
      onClick: handleEdit,
      disabled: loading,
    },
    {
      label: "削除",
      onClick: handleDelete,
      disabled: loading,
      styles: "bg-orange-100 hover:bg-orange-200",
    },
  ];

  return (
    <div className="flex justify-center">
      <TableAction buttons={buttons} className="gap-2" />
    </div>
  );
};

export const columns: ColumnDef<AdminTopArticlesColumnType>[] = [
  {
    accessorKey: "title",
    header: "記事タイトル",
  },
  {
    accessorKey: "articleContributor",
    header: "記事投稿者名",
  },
  {
    accessorKey: "updatedAt",
    header: "最終更新日時",
    size: 200,
  },
  {
    accessorKey: "order",
    header: "表示順",
    size: 200,
  },
  {
    accessorKey: "displayPeriod",
    header: "表示期間",
    size: 300,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
