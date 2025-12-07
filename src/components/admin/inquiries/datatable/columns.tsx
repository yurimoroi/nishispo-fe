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

export type AdminInquiriesColumnType = {
  id: string;
  name: string;
  title: string;
  dateTimeOfSending: string;
  reply: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminInquiriesColumnType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
          await genericDeleteById(rowData.id, "inquiries");
          router.refresh();
        },
      });
    } catch (error) {
      toast({
        title: "Inquiry Delete Error",
        description: String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    {
      label: "削除",
      onClick: handleDelete,
      disabled: loading,
      styles: "bg-orange-100 text-white hover:bg-orange-200",
    },
  ];

  return (
    <div className="flex justify-center">
      <TableAction buttons={buttons} className="gap-2" />
    </div>
  );
};

export const columns: ColumnDef<AdminInquiriesColumnType>[] = [
  {
    accessorKey: "name",
    header: "お名前",
  },
  {
    accessorKey: "title",
    header: "件名",
  },
  {
    accessorKey: "dateTimeOfSending",
    header: "送信日時",
  },
  {
    accessorKey: "reply",
    header: "返信",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
