"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableAction from "./table-action";
import { TriningDataType } from "../lib/types";

export const columns: ColumnDef<TriningDataType>[] = [
  {
    accessorKey: "title",
    header: "",
    cell: ({ row }) => (
      <div className="text-base sm:text-lg">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "",
    size: 130,
    cell: ({ row }) => (
      <div className="text-[.75rem] leading-[1.125rem] lg:text-sm lg:leading-[1.3125rem]">
        {row.getValue("type") === 0 ? "ブログ" : "動画"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const training = row.original;

      return (
        <div className="flex justify-end">
          {training.users_contributor_trainings !== null && <TableAction />}
        </div>
      );
    },
    size: 140,
    header: "",
  },
];
