import {
  ButtonReturn,
  DataPagination,
  MainTable,
} from "@/components/feature/datatable";
import { columns } from "@components/admin/inquiries";
import { AdminInquiriesColumnType } from "./columns";
import { AdminInquiriesDataType, getAdminInquiriesData } from "../lib";

type MainTableDataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getData = (
  data: AdminInquiriesDataType[],
): AdminInquiriesColumnType[] => {
  if (!data) return [];

  return data.map((data: any) => {
    const {
      id,
      name,
      body,
      reply,
      reply_flg,
      inquiry_type,
      created_at: dateTimeOfSending,
    } = data || {};

    const replyText = reply_flg ? "返信済み" : "未返信";

    return {
      id: id.toString(),
      name,
      title: inquiry_type.type,
      dateTimeOfSending,
      reply: replyText || "",
    };
  });
};

export const MainTableData = async ({ searchParams }: MainTableDataProps) => {
  const [inquiriesResponse] = await Promise.all([
    getAdminInquiriesData({ searchParams }),
  ]);

  const { data } = inquiriesResponse || {};
  const { data: inquiries, ...paginationData } = data || {};
  return (
    <div className="relative">
      <MainTable
        columns={columns}
        data={getData(inquiries)}
        detailLinkBase="/admin/inquiries"
      />
      <ButtonReturn />
      <DataPagination paginationData={paginationData} className="w-full" />
    </div>
  );
};
