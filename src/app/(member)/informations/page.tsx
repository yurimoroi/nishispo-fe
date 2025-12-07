import { ResultsHeaderSelect } from "@/components/feature/articles/search";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { DataPagination, Loading } from "@/components/feature/datatable";

import MainBlock from "@/components/feature/wrapper/main-block";
import { getUserInformationsData } from "@/components/informations";
import { getUniqueId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "お知らせ一覧 - ミヤスポ",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function InformationsPage({ searchParams }: PageProps) {
  const [noticesResponse] = await Promise.all([
    getUserInformationsData({ searchParams }),
  ]);
  const { data } = noticesResponse || {};
  const { data: notices, ...paginationData } = data || {};
  return (
    <>
      <MainBlock className="px-6 lg:px-[2.5rem]">
        <SectionBreadcrumbs />
      </MainBlock>
      <MainBlock size="sm">
        <Suspense fallback={<Loading />}>
          <ResultsHeaderSelect
            labelName="お知らせ"
            labelStyles="font-bold"
            className="mb-5 w-full justify-between text-base"
          />
        </Suspense>
        {notices &&
          notices.map((notice, index) => (
            <Link href={`/informations/${notice.id}`} key={getUniqueId()}>
              <div className="flex items-center justify-between border-b py-5">
                {/* Title & New Badge */}
                <div className="flex w-full flex-col gap-5 lg:flex-row">
                  <div className="text-base font-bold">{notice?.title}</div>
                  {notice.is_new && (
                    <div className="order-[-1] w-fit bg-blue-100 px-3 py-1 text-xs text-white">
                      New
                    </div>
                  )}
                  {/* Release Date */}
                  <div className="ml-0 lg:ml-auto">{notice?.published_at}</div>
                </div>
              </div>
            </Link>
          ))}
      </MainBlock>
      <DataPagination paginationData={paginationData} />
    </>
  );
}
