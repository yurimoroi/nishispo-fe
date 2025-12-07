"use client";

import { genericDeleteById } from "@/components/feature/datatable/lib";
import TableAction from "@/components/feature/datatable/table-action";
import {
  ModalMessageVariant,
  openModalMessage,
  openModalUserEvents,
} from "@/components/feature/modal";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminUsersColumnType = {
  id: string;
  accountName: string;
  nickname: string;
  loginId: string;
  email: string;
  permissions: string;
  organization: string;
  articleAuthorStatus: string;
};

const ActionsCell = ({ rowData }: { rowData: AdminUsersColumnType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleParticipationEvents = (event: React.MouseEvent) => {
    event.stopPropagation();

    openModalUserEvents();

    // TODO:  For Phase 2, Set the setUserEvents() from  @/components/feature/modal
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
          await genericDeleteById(rowData.id, "users");
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
    /**
     * NOTE: Hide as per request.
    {
      label: "参加種目",
      onClick: handleParticipationEvents,
      disabled: loading,
    },
     **/
    {
      label: "削除",
      onClick: handleDelete,
      disabled: loading,
      styles: "bg-orange-100 hover:bg-orange-200",
    },
  ];

  return (
    <div className="flex justify-end lg:justify-center">
      <TableAction buttons={buttons} className="gap-2" />
    </div>
  );
};

export const columns: ColumnDef<AdminUsersColumnType>[] = [
  {
    accessorKey: "accountName",
    header: "アカウント名",
  },
  {
    accessorKey: "nickname",
    header: "ニックネーム",
  },
  {
    accessorKey: "loginId",
    header: "ログインID",
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "permissions",
    header: "権限",
  },
  {
    accessorKey: "organization",
    header: "所属組織",
  },
  {
    accessorKey: "articleAuthorStatus",
    header: "記事投稿者ステータス",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <ActionsCell rowData={rowData} />;
    },
  },
];
