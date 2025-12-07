import { Category } from "@/components/top/lib/types";
import { Button } from "@/components/ui/button";
import arrowRight from "@public/icon-arrow-right-white.svg";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";
import shieldIcon from "@public/shield-fill.svg";
import Image from "next/image";
import Link from "next/link";

interface Props {
  category: Category[];
}

const ArticleBlockCategory = ({ category }: Props) => {
  if (
    typeof category === "undefined" ||
    (Array.isArray(category) && category.length === 0) ||
    (Array.isArray(category) && !category[0]) ||
    category[0].articles.length === 0
  ) {
    return null;
  }
  return (
    <section className="pb-10 sm:pb-5">
      <div className="bg-[#E4F3FF] px-5 py-[.625rem] text-black sm:flex sm:justify-between sm:px-[1.875rem] sm:py-2">
        <p className="mb-[.625rem] flex items-center gap-[.625rem] sm:mb-0 sm:gap-2">
          <span className="relative h-4 w-4">
            <Image src={shieldIcon} alt="sheild icon" className="invert" />
          </span>
          <span className="text-lg font-bold sm:text-[1.375rem]">
            {category[0].name}
          </span>
        </p>
        <p className="text-sm font-normal sm:text-lg sm:font-bold">
          ミヤスポは{category[0].name}の活動を応援しています！
        </p>
      </div>
      <div className="border border-blue-100 bg-white p-5 sm:p-[1.875rem]">
        <p className="mb-5 text-sm sm:mb-[.625rem]">
          西宮市内各地域で元気に活動する{category[0].name}
          の最新情報をお届けします
        </p>
        <ul className="gap-[2.38%] sm:flex sm:flex-wrap">
          {category[0].articles.map((article) => (
            <li key={article.id} className="mb-5 sm:mb-5 sm:w-[23.21%]">
              <Link href={`/articles/${article.id}`} className="flex sm:block">
                <div className="relative h-[3.75rem] w-[3.75rem] flex-shrink-0 sm:h-[5.9375rem] sm:w-full">
                  <Image
                    className="object-cover"
                    src={
                      article.all_media_url.length === 0
                        ? ArticleNoImagePlaceholder
                        : article.all_media_url[0]["thumbnail-medium"]
                    }
                    fill
                    sizes="100%"
                    alt={`${article.title} image`}
                  />
                </div>
                <h3 className="line-clamp-2 pl-5 text-sm font-black text-black sm:pl-0 sm:pt-[.625rem] sm:text-base sm:font-black">
                  {article.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Button
            className="px-5 py-2 text-base font-semibold sm:px-4 sm:text-xl sm:font-bold"
            asChild
          >
            <Link href={`/articles/categories/${category[0].id}`}>
              {category[0].name}のニュース一覧
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
    </section>
  );
};

export default ArticleBlockCategory;
