import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";
import Image from "next/image";
import PlaceholderImage from "@public/placeholder/no-image.webp";
import { ButtonReturn } from "@/components/feature/datatable";
import { getUserInformationsById } from "@/components/informations";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "お知らせ詳細 - ミヤスポ",
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function InformationsDetailPage({ params }: PageProps) {
  const { id } = params;
  const [informationsResponse] = await Promise.all([
    getUserInformationsById(id),
  ]);
  const { data: notice } = informationsResponse || {};
  if (!notice) notFound();

  return (
    <>
      <MainBlock className="px-6 lg:px-[2.5rem]">
        <SectionBreadcrumbs label={notice?.title} slug={id} />
      </MainBlock>
      <MainBlock size="sm">
        {/* Title & New Badge */}
        <div className="mb-5 flex gap-5">
          <div className="text-base font-bold">{notice?.title}</div>
          {notice?.is_new && (
            <div className="bg-blue-100 px-3 py-1 text-xs text-white">New</div>
          )}
        </div>
        {/* Release Date */}
        <div className="text-right">{notice?.published_at}</div>
        {/* Content */}
        <div className="mt-5 whitespace-pre-line">{notice?.body}</div>
        {/* Image */}
        <div className="relative mx-auto mt-5 h-[18.75rem] w-full sm:h-[18.5625rem] md:h-[8.875rem] md:w-[19.625rem]">
          <Image
            src={notice?.info_images || PlaceholderImage}
            layout="fill"
            objectFit="cover"
            sizes="100%"
            alt={`image`}
          />
        </div>
        <ButtonReturn />
      </MainBlock>
    </>
  );
}
