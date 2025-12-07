"use client";

// import for the DataTableProps type
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

// import for route navigation
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { cn } from "@/lib/utils";

// import for the Link component
import Link from "next/link";

// Image
import Image from "next/image";
import PlaceholderImage from "@public/placeholder/ImageSample.png";
import { Button } from "@/components/ui/button";
interface WithAddtionalKey {
  id: React.Key; // React.Key is a type that can be used as a React element key (string | number)
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  detailLinkBase?: string;
  containsEdit?: boolean;
  onClickTriggerPreview?: (id: string) => void;
  className?: string;
}

export const MainTable = <TData extends WithAddtionalKey, TValue>({
  columns,
  data,
  detailLinkBase,
  containsEdit = false,
  className = "",
  onClickTriggerPreview,
}: DataTableProps<TData, TValue>) => {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-0">
      <Table parentClassname={cn(className, "")}>
        <TableHeader className="sticky top-0 hidden lg:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-blue-300 hover:bg-blue-300"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-medium text-white"
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : "auto",
                    }}
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
                  "flex flex-col rounded hover:bg-transparent lg:table-row lg:border-0",
                  {
                    "cursor-pointer": row.original.id && detailLinkBase !== "",
                  },
                )}
                onClick={() => {
                  if (!row.original.id || detailLinkBase === "") {
                    return;
                  }
                  if (onClickTriggerPreview) {
                    onClickTriggerPreview(row.original.id.toString());
                  } else if (detailLinkBase) {
                    const url = `${detailLinkBase}/${row.original.id}${
                      containsEdit ? "/edit" : ""
                    }`;
                    router.push(url);
                    router.refresh();
                  }
                }}
              >
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const cellValue = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  );
                  const isBgColor = cell.column.id === "color";

                  return (
                    <TableCell
                      key={cell.id}
                      className={clsx(
                        "grid grid-cols-2 gap-11 border-b border-blue-300 px-5 py-2 lg:table-cell lg:border-gray-200 lg:bg-transparent lg:p-4",
                        {
                          "bg-blue-300 text-white lg:text-black":
                            cellIndex === 0,
                        },
                      )}
                    >
                      {/* Header on Cell */}
                      <div className="font-medium lg:hidden">
                        {cell.column.id !== "actions" &&
                          cell.column.columnDef.header?.toString()}
                      </div>

                      {/* Background Color */}
                      {cell.column.id === "color" && (
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              isBgColor ? "block" : "hidden",
                              "h-[1.875rem] w-[1.875rem] flex-shrink-0 border align-middle lg:mr-[.625rem]",
                            )}
                            style={{
                              backgroundColor: cell.getValue() as string,
                            }}
                          />
                          <span>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </span>
                        </div>
                      )}

                      {/* Include Header News */}
                      {cell.column.id === "showHeadFlg" && (
                        <div className="flex gap-2">
                          <span>
                            {cell.getValue() ? "表示する" : "表示しない"}
                          </span>
                        </div>
                      )}

                      {/* Admin Teams Organization Logo */}
                      {cell.column.id === "adminTeamsOrganizationLogo" && (
                        <div className="relative max-h-[3.125rem] max-w-[6.875rem] sm:h-[18.5625rem] md:h-[8.875rem] md:w-[19.625rem]">
                          <Image
                            src={
                              (cell.getValue() as string) || PlaceholderImage
                            }
                            objectFit="cover"
                            fill
                            alt={`image`}
                          />
                        </div>
                      )}

                      {/* Admin Teams Organization Usage Rights */}
                      {cell.column.id === "adminTeamsUsageRights" && (
                        <div className="flex gap-2">
                          <span>
                            {!cell.getValue() ? (
                              <Button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  router.push(
                                    `/admin/teams/${row.original.id}/groupwear_privileges`,
                                  );
                                }}
                              >
                                利用権
                              </Button>
                            ) : (
                              <></>
                            )}
                          </span>
                        </div>
                      )}

                      {/* Admin Teams Event Logo */}
                      {cell.column.id === "adminTeamsEventLogo" && (
                        <div className="relative max-h-[3.125rem] max-w-[6.875rem] sm:h-[18.5625rem] md:h-[8.875rem] md:w-[19.625rem]">
                          <Image
                            src={
                              (cell.getValue() as string) || PlaceholderImage
                            }
                            objectFit="cover"
                            fill
                            alt={`image`}
                          />
                        </div>
                      )}

                      {/* Actions */}
                      {/* This is a fix for hiding customized columns in the table */}
                      {cell.column.id !== "color" &&
                        cell.column.id !== "showHeadFlg" &&
                        cell.column.id !== "adminTeamsOrganizationLogo" &&
                        cell.column.id !== "adminTeamsUsageRights" &&
                        cell.column.id !== "adminTeamsEventLogo" && (
                          <span className="break-words">
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
    </div>
  );
};
