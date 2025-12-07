"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ArticlesPopupColumnType = {
  id: string;
  title: string;
  articleContributor: string;
  updatedAt: string;
};

export const columns: ColumnDef<ArticlesPopupColumnType>[] = [
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
];
