import { Category } from "@/components/top/lib/types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import arrowRight from "@public/icon-arrow-right-white.svg";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";
import shieldIcon from "@public/shield-fill.svg";
import Image from "next/image";
import Link from "next/link";

interface Props {
  category: Category[];
}

const ArticleSpreadCategory = ({ category }: Props) => {
  if (
    typeof category === "undefined" ||
    (Array.isArray(category) && category.length < 2) ||
    (Array.isArray(category) && !category[1]) ||
    category[1].articles.length === 0
  ) {
    return null;
  }

  const selectedArticle = category[1].articles[0];

  return (
    <section className="pb-10 sm:pb-0">
      <div className="bg-destructive px-5 py-[.625rem] text-white sm:flex sm:justify-between sm:px-[1.875rem] sm:py-2">
        <p className="mb-[.625rem] flex items-center gap-[.625rem] sm:mb-0 sm:gap-2">
          <span className="relative h-4 w-4">
            <Image src={shieldIcon} alt="sheild icon" />
          </span>
          <span className="text-lg font-bold sm:text-[1.375rem]">
            {category[1].name}情報
          </span>
        </p>
        <p className="text-sm font-normal sm:text-lg sm:font-bold">
          ミヤスポは{category[1].name}を応援しています！
        </p>
      </div>
      <div className="border border-destructive bg-white p-5 sm:p-[1.875rem]">
        <div key={selectedArticle.id} className="flex flex-wrap gap-[3.6%]">
          <Link
            href={`/articles/${selectedArticle.id}`}
            className="block h-[3.75rem] w-[3.75rem] sm:h-[9.375rem] sm:w-[36.64%]"
          >
            <div className="relative h-full w-full flex-shrink-0">
              <Image
                className="object-cover"
                src={
                  selectedArticle.all_media_url.length === 0
                    ? ArticleNoImagePlaceholder
                    : selectedArticle.all_media_url[0].original
                }
                fill
                sizes="100%"
                alt={`${selectedArticle.title} image`}
              />
            </div>
          </Link>

          <div className="w-[59%] flex-grow">
            <h3 className="mb-[.625rem] line-clamp-2 text-base font-bold text-black sm:mb-2 sm:text-xl sm:leading-[1.875rem]">
              <Link href={`/articles/${selectedArticle.id}`}>
                {selectedArticle.title}
              </Link>
            </h3>
            <p className="pb-5 text-sm text-[#ADB5BD] sm:pb-7 sm:text-[.75rem] sm:leading-[1.125rem]">
              {formatDate(selectedArticle.updated_at)} 投稿
            </p>
            <div className="hidden sm:block">
              <Button
                className="rounded-full px-5 py-2 text-base font-semibold sm:px-4 sm:text-xl sm:font-bold"
                asChild
              >
                <Link href={`/articles/categories/${category[1].id}`}>
                  {category[1].name}のニュース一覧
                  <Image
                    className="ml-1 cursor-pointer"
                    src={arrowRight}
                    alt="icon password toggle"
                    height={16}
                    width={16}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="block text-center sm:hidden">
          <Button
            className="px-5 py-2 text-base font-semibold sm:px-4 sm:text-xl sm:font-normal"
            asChild
          >
            <Link href={`/articles/categories/${category[1].id}`}>
              {category[1].name}のニュース一覧
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleSpreadCategory;
