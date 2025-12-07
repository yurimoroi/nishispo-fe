import { formatDate } from "@/lib/utils";
import ArticleShareButtons from "../blocks/article-share-buttons";
import { ArticleDetailsType } from "./lib/types";

interface Props {
  articleDetails: ArticleDetailsType;
}

export const TopDetails = ({ articleDetails }: Props) => {
  return (
    <>
      <div className="mb-[.625rem] flex items-center gap-2 border-b border-black pb-4 md:pb-5">
        {articleDetails?.pr_flg && (
          <span className="block bg-destructive px-2 py-1 text-sm font-bold leading-6 text-white sm:text-base">
            PR
          </span>
        )}
        <h1 className="text-lg font-bold leading-9 sm:text-[1.625rem]">
          {articleDetails.title}
        </h1>
      </div>
      <div className="pb-8 sm:flex sm:items-center sm:justify-between sm:gap-2 sm:pb-[3.125rem]">
        <div className="flex flex-wrap items-center pb-3 sm:pb-0">
          <p className="mr-[.625rem] border-r border-[#ADB5BD] pr-[.625rem] text-xs leading-[1.125rem] text-[#ADB5BD]">
            {formatDate(articleDetails.published_at)} 投稿
          </p>
          <p className="mr-[.625rem] border-r border-[#ADB5BD] pr-[.625rem] text-xs leading-[1.125rem]">
            {articleDetails.user.contributor_name}
          </p>
          <p className="text-xs leading-[1.125rem]">
            {articleDetails.organization.name}
          </p>
        </div>
        <ArticleShareButtons title={articleDetails.title} />
      </div>
    </>
  );
};

export default TopDetails;
