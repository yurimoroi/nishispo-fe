import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getArticleById } from "@/components/feature/articles/details/lib/actions";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import {
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import MainBlock from "@/components/feature/wrapper/main-block";
import Sidebar from "@/components/feature/articles/common/sidebar";
import Tags from "@/components/feature/articles/common/tags";
import { AlignmentMedia } from "@/components/feature/company/alignment-media";
import ArticleRelated from "@/components/feature/articles/blocks/article-related";
import ArticleGallery from "@/components/feature/articles/blocks/article-gallery";
import ArticleCategories from "@/components/feature/articles/blocks/article-categories";
import Content from "@/components/feature/articles/details/content";
import TopDetails from "@/components/feature/articles/details/top-details";
// import noImage from "@public/placeholder/no-image.webp"; // Keeping as reference
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const [articleDetailsResponse] = await Promise.all([
    getArticleById(params.id),
  ]);

  if (!articleDetailsResponse?.data) notFound();
  const { data: articleDetails } = articleDetailsResponse;

  const defaultTitle = "Nishispo - Articles";
  const defaultDescription = "Read the latest articles on Nishispo";

  return {
    title: articleDetails?.title || defaultTitle,
    description: articleDetails?.body || defaultDescription,
    openGraph: {
      title: articleDetails?.title || defaultTitle,
      description: articleDetails?.body || defaultDescription,
      url: `http://3.107.45.104/dev/nishispo/articles/${params.id}`,
      siteName: defaultTitle,
      images: [
        {
          url: "https://picsum.photos/1200/630",
          width: 1200,
          height: 630,
          alt: articleDetails?.title || defaultTitle,
        },
      ],
      // locale: "ja_JP",
      type: "article",
      publishedTime: articleDetails?.published_at || new Date().toISOString(),
      modifiedTime: articleDetails?.updated_at || new Date().toISOString(),
      section: articleDetails?.categories || "General",
      authors: [articleDetails?.user.contributor_name],
      tags: articleDetails?.tags || ["Article"],
    },
    twitter: {
      card: "summary_large_image",
      title: articleDetails?.title || defaultTitle,
      description: articleDetails?.body || defaultDescription,
      author: articleDetails.user.contributor_name,
      images: [
        {
          url: "https://picsum.photos/1200/630",
          width: 1200,
          height: 630,
          alt: `Preview image for ${articleDetails?.title}`,
        },
      ],
    },
    line: {
      title: articleDetails?.title || defaultTitle,
      description: articleDetails?.body || defaultDescription,
      images: {
        url:
          articleDetails?.all_media_url[0]?.original ||
          ArticleNoImagePlaceholder.src,
        width: 1200,
        height: 630,
        alt: `Preview image for ${articleDetails?.title}`,
      },
    },
  };
}

export default async function ArticleDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const [articleDetailsResponse] = await Promise.all([getArticleById(id)]);

  if (!articleDetailsResponse?.data) notFound();

  const { data: articleDetails } = articleDetailsResponse;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        <MainBlock>
          <SectionBreadcrumbs label={articleDetails?.title} slug={id} />
          <TwoColContainer className="sm:pt-5 lg:gap-[5rem]">
            <TwoColContainerItem className="block lg:w-[69%]">
              <ArticleCategories categories={articleDetails.categories} />
              <TopDetails articleDetails={articleDetails} />
              <ArticleGallery gallery={articleDetails?.all_media_url} />
              <Content content={articleDetails?.body} />
              <Tags
                className="pb-5 sm:pb-[3.75rem]"
                tags={articleDetails.tags}
              />
              <AlignmentMedia alignMedia={articleDetails.alignment_medias} />
              <ArticleRelated
                className="pb-10 sm:pb-20"
                relatedByTags={articleDetails.related_article_by_tags}
                relatedByCategories={
                  articleDetails.related_article_by_categories
                }
              />
            </TwoColContainerItem>
            <TwoColContainerItem className="block lg:w-[25.1%] lg:max-w-[20rem]">
              <Sidebar />
            </TwoColContainerItem>
          </TwoColContainer>
        </MainBlock>
      </main>
    </Suspense>
  );
}
