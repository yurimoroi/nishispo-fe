"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { SetTrainingToCompleted } from "../lib/actions";
import { toast } from "@/hooks/use-toast";
import { UsersContributorTrainings } from "../lib/types";
import { cn } from "@/lib/utils";

interface WithAddtionalKey {
  url: string;
  id: React.Key; // React.Key is a type that can be used as a React element key (string | number)
  users_contributor_trainings: UsersContributorTrainings | null;
}

interface DataTableProps<TriningDataType, TValue> {
  columns: ColumnDef<TriningDataType, TValue>[];
  data: TriningDataType[];
  hideHeader?: boolean;
}

export const MainTable = <TriningDataType extends WithAddtionalKey, TValue>({
  columns,
  data,
  hideHeader = true,
}: DataTableProps<TriningDataType, TValue>) => {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleTableCellClicked = (
    url: string,
    id: string,
    status: UsersContributorTrainings | null,
  ) => {
    if (status === null) {
      handleSetToCompleted(id);
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    window.open(url, "_blank");
    return false;
  };

  const handleTableCellClickedSP = (
    url: string,
    id: string,
    status: UsersContributorTrainings | null,
  ) => {
    if (status === null) {
      handleSetToCompleted(id);
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    window.open(
      url,
      "Snopzer",
      "left=20,top=20,width=375,height=500,toolbar=1,resizable=0",
    );
    return false;
  };

  const handleSetToCompleted = async (id: string) => {
    try {
      const data = await SetTrainingToCompleted(id);

      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during training completion",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="border-0">
      <Table className="hidden lg:table">
        <TableHeader className="hidden lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={
                hideHeader ? "border-none" : "bg-shade-400 hover:bg-shade-400"
              }
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-medium text-black"
                    style={
                      hideHeader
                        ? {
                            height: 0,
                            width:
                              header.getSize() !== 150
                                ? header.getSize()
                                : "auto",
                          }
                        : {
                            width:
                              header.getSize() !== 150
                                ? header.getSize()
                                : "auto",
                          }
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="[&_tr:last-child]:border-1 grid grid-cols-1 gap-[0.625rem] lg:table-row-group">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clsx(
                  "flex flex-col rounded border-[1px] hover:bg-transparent lg:table-row lg:border-0",
                )}
              >
                {row.getVisibleCells().map((cell, cellIndex) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={clsx(
                        "grid cursor-pointer grid-cols-3 gap-11 border-b-[1px] py-2 lg:table-cell lg:bg-transparent lg:p-4 lg:px-0",
                      )}
                      {...(cellIndex !== 2 && {
                        onClick: () =>
                          handleTableCellClicked(
                            row.original.url,
                            row.original.id.toString(),
                            row.original.users_contributor_trainings,
                          ),
                      })}
                    >
                      {cell.column.id !== "color" &&
                        cell.column.id !== "showHeadFlg" && (
                          <span>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </span>
                        )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <span className="text-sm text-gray-400">
                  データがありません
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="lg:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap justify-between border-b py-[.625rem]"
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <div
                  key={cell.id}
                  className={cn("cursor-pointer", {
                    "order-0 w-[calc(100%-120px)] break-all": cellIndex === 0,
                    "order-3 w-full": cellIndex === 1,
                    "order-2": cellIndex !== 0 && cellIndex !== 1,
                  })}
                  {...(cellIndex !== 2 && {
                    onClick: () =>
                      handleTableCellClickedSP(
                        row.original.url,
                        row.original.id.toString(),
                        row.original.users_contributor_trainings,
                      ),
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>データがありません</div>
        )}
      </div>
    </div>
  );
};
