import { OrganizationsType } from "@/components/admin/organizations/lib";
import noImage from "@public/placeholder/no-image.webp";
import Image from "next/image";
import Link from "next/link";
import { AlignmentSpreadActions } from "./alignment-spread-actions";
import { AlignMediaType } from "./lib";
// import { OrganizationSpreadActions } from "./organization-spread-actions";
interface Props {
  data: AlignMediaType;
}

export const AlignmentSpread = ({ data }: Props) => {
  const renderViewFlags = (data: AlignMediaType) => {
    return (
      <>
        {data.display_flg === 1 && <p>表示する</p>}

        {(data.display_top_flg || data.display_article_list_flg) && (
          <ul className="flex gap-[.625rem] text-center text-base text-dark-200">
            {data.display_top_flg === 1 && (
              <li className="bg-shade-400 px-[.625rem] py-1">
                トップページに表示する
              </li>
            )}
            {data.display_article_list_flg === 1 && (
              <li className="bg-shade-400 px-[.625rem] py-1">
                ニュース一覧ページに表示する
              </li>
            )}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="mb-5 border border-shade-400 p-5">
      <div className="gap-5 pb-5 md:flex md:pb-0">
        <div className="pb-5 md:pb-[.625rem]">
          <div className="relative h-[9.1875rem] w-full sm:h-[18.5625rem] md:h-[8.875rem] md:w-[19.625rem]">
            <Image
              className="object-cover"
              src={data.banner || noImage}
              fill
              sizes="100%"
              alt={`image`}
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-[.625rem] border-b border-shade-400 pb-[.625rem] text-xs font-bold md:text-xl md:leading-[1.875rem]">
            {data.name}
          </h2>
          <div>
            <div className="flex gap-5 pb-[.625rem]">
              <div className="min-w-[4.0625rem] text-[.75rem] font-bold md:text-xs">
                URL
              </div>
              <div className="flex-1 space-y-[.625rem] font-open text-[.75rem] leading-[1.125rem] md:text-base md:leading-[1.5rem]">
                <p>
                  <Link
                    className="text-blue-100"
                    href={data.url}
                    target="_blank"
                  >
                    {data.url}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex gap-5 pb-[.625rem]">
              <div className="min-w-[4.0625rem] text-[.75rem] font-bold md:text-xs">
                表示
              </div>
              <div className="flex-1 space-y-[.625rem] font-open text-[.75rem] leading-[1.125rem] md:text-base md:leading-[1.5rem]">
                {renderViewFlags(data)}
              </div>
            </div>
            <div className="flex gap-5 pb-[.625rem]">
              <div className="min-w-[4.0625rem] text-[.75rem] font-bold md:text-xs">
                記事
              </div>
              <div className="flex-1 space-y-[.625rem] font-open text-[.75rem] leading-[1.125rem] md:text-base md:leading-[1.5rem]">
                {data.articles &&
                  data?.articles.map((article) => (
                    <>
                      <p key={article.id}>{article.title}</p>
                    </>
                  ))}
              </div>
            </div>

            <div className="flex gap-5 pb-[.625rem]">
              <div className="min-w-[4.0625rem] text-[.75rem] font-bold md:text-xs">
                表示順位
              </div>
              <div className="flex-1 space-y-[.625rem] font-open text-[.75rem] leading-[1.125rem] md:text-base md:leading-[1.5rem]">
                <p>{data.order}</p>
              </div>
            </div>

            <div className="flex gap-5 pb-[.625rem]">
              <div className="min-w-[4.0625rem] text-[.75rem] font-bold md:text-xs">
                掲載期間
              </div>
              <div className="flex-1 space-y-[.625rem] font-open text-[.75rem] leading-[1.125rem] md:text-base md:leading-[1.5rem]">
                <p>{`${data.started_at} - ${data.ended_at}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlignmentSpreadActions alignMediaId={data.id} />
    </div>
  );
};
