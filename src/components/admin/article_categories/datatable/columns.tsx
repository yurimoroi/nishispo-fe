"use client";

import { TableAction } from "@/components/feature/datatable";
import { genericDeleteById } from "@/components/feature/datatable/lib";
import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminArticleCategoriesColumnType = {
  id: string;
  name: string;
  shortName: string;
  order: number;
  color: string;
  showHeadFlg: number;
  updatedAt: string;
};

const ActionsCell = ({
  rowData,
}: {
  rowData: AdminArticleCategoriesColumnType;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/admin/article_categories/${rowData.id}/edit`);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setLoading(true);
    try {
      const title = "警告";
      const message = "一度削除されると復元はできませんがよろしいですか？";
      openModalMessage({
        title,
        message,
        variant: ModalMessageVariant.Confirm,
        handler: async () => {
          await genericDeleteById(rowData.id, "categories");
          router.refresh();
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

export const columns: ColumnDef<AdminArticleCategoriesColumnType>[] = [
  {
    accessorKey: "name",
    header: "記事カテゴリ名",
    size: 280,
  },
  {
    accessorKey: "shortName",
    header: "カテゴリ名（短縮）",
    size: 180,
  },
  {
    accessorKey: "order",
    header: "表示順",
    size: 100,
  },
  {
    accessorKey: "color",
    header: "背景色",
    size: 120,
  },
  {
    accessorKey: "showHeadFlg",
    header: "ニュースヘッダに表示するか否か",
    size: 300,
  },
  {
    accessorKey: "updatedAt",
    header: "更新日時",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
