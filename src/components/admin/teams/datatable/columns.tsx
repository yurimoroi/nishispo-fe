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

export type AdminTeamsColumnType = {
  id: string;
  adminTeamsOrganizationLogo: string;
  organizationName: string;
  paymentType: string;
  licenseExpirationDate: string;
  unpaidBalance: string;
  adminTeamsUsageRights: string;
  adminTeamsEventLogo: string;
  eventName: string;
  numberOfParticipants: number;
};

const ActionsCell = ({ rowData }: { rowData: AdminTeamsColumnType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/admin/teams/${rowData.id}/edit`);
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
          await genericDeleteById(rowData.id, "teams"); // TODO: to confirm with backend what's the correct delete api key
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

export const columns: ColumnDef<AdminTeamsColumnType>[] = [
  {
    accessorKey: "adminTeamsOrganizationLogo",
    header: "組織ロゴ画像",
  },
  {
    accessorKey: "organizationName",
    header: "組織名",
  },
  {
    accessorKey: "paymentType",
    header: "決済種別",
  },
  {
    accessorKey: "licenseExpirationDate",
    header: "利用権失効日時",
  },
  {
    accessorKey: "unpaidBalance",
    header: "未入金あり",
  },
  {
    accessorKey: "adminTeamsUsageRights",
    header: "利用権",
  },
  {
    accessorKey: "adminTeamsEventLogo",
    header: "種目ロゴ画像",
  },
  {
    accessorKey: "eventName",
    header: "種目名",
  },
  {
    accessorKey: "numberOfParticipants",
    header: "会員数",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
