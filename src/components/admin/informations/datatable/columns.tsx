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

export type AdminInformationsColumnType = {
  id: string;
  title: string;
  releasePeriod: string;
  createDate: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminInformationsColumnType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDetail = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/admin/informations/${rowData.id}`);
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/admin/informations/${rowData.id}/edit`);
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
          await genericDeleteById(rowData.id, "information");
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
      label: "詳細",
      onClick: handleDetail,
      disabled: loading,
    },
    {
      label: "編集",
      onClick: handleEdit,
      disabled: loading,
    },
    {
      label: "削除",
      onClick: handleDelete,
      disabled: loading,
      styles: "bg-orange-100 hover:bg-blue-100",
    },
  ];

  return (
    <div className="flex items-center justify-end">
      <TableAction buttons={buttons} className="gap-2" />
    </div>
  );
};

export const columns: ColumnDef<AdminInformationsColumnType>[] = [
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "releasePeriod",
    header: "公開期間",
  },
  {
    accessorKey: "createDate",
    header: "作成日時",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
