"use client";

import { genericDeleteById } from "@/components/feature/datatable/lib";
import TableAction from "@/components/feature/datatable/table-action";
import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminTrainingsColumnType = {
  id: string;
  title: string;
  type: string;
  overview: string;
  trainingNo: number;
};

const ActionsCell = ({ rowData }: { rowData: AdminTrainingsColumnType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/admin/trainings/${rowData.id}/edit`);
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
          await genericDeleteById(rowData.id, "contributor-trainings");
          router.refresh();
        },
      });
    } catch (error) {
      toast({
        title: "Article Delete Error",
        description: String(error),
      });
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

export const columns: ColumnDef<AdminTrainingsColumnType>[] = [
  {
    accessorKey: "title",
    header: "記事タイトル",
  },
  {
    accessorKey: "type",
    header: "記事種別",
  },
  {
    accessorKey: "overview",
    header: "概要",
  },
  {
    accessorKey: "trainingNo",
    header: "No.",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
