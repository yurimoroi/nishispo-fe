import Image from "next/image";
import Link from "next/link";
import { getEventArticles } from "./lib/actions";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";

const ArticlePickUpList = async () => {
  const [eventArticlesResponse] = await Promise.all([
    getEventArticles("イベント"),
  ]);
  const eventArticles = eventArticlesResponse?.data?.articles || [];

  if (
    typeof eventArticles === "undefined" ||
    (Array.isArray(eventArticles) && eventArticles.length === 0)
  ) {
    return null;
  }

  return (
    <div className="pb-10">
      <div className="bg-[#E4F3FF] px-5 py-[.625rem] font-bold sm:p-2">
        <h3 className="text-lg">PICK UP</h3>
      </div>
      <div className="bg-[#E4F3FF] p-5 md:p-2 [&>*:last-child]:mb-0">
        {eventArticles.map((article) => (
          <div
            key={article?.id}
            className="mb-3 bg-white p-3 md:mb-[.625rem] md:p-2"
          >
            <Link href={`/articles/${article?.id}`}>
              <div className="relative h-[202px] w-full lg:h-[9rem]">
                <Image
                  className="object-cover"
                  src={
                    article?.all_media_url?.[0]?.["thumbnail-medium"] ??
                    ArticleNoImagePlaceholder
                  }
                  fill
                  sizes="100%"
                  alt="article image"
                />
              </div>
              <h3 className="pb-[.625rem] pt-[.625rem] text-lg font-bold sm:text-base">
                {article?.title}
              </h3>
            </Link>
            <p className="line-clamp-2 text-base text-[#6C757D] sm:text-sm">
              {article?.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlePickUpList;
