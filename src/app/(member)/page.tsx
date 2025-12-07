import ArticleBlockCategory from "@/components/feature/articles/blocks/article-block-category";
import ArticleFeatured from "@/components/feature/articles/blocks/article-featured";
import ArticleSpread from "@/components/feature/articles/blocks/article-spread";
import ArticleSpreadCategory from "@/components/feature/articles/blocks/article-spread-category";
import Sidebar from "@/components/feature/articles/common/sidebar";
import {
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import CallToAction from "@/components/top/call-to-action";
import { getTopNewsContent } from "@/components/top/lib/actions";
import MainSlider from "@/components/top/main-slider";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Suspense } from "react";
import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { Metadata } from "next";
import { TopNewsResponseType } from "@/components/top/lib/types";
import { auth } from "../auth";
import { TopScroll } from "@/components/feature/top-scroll/top-scroll";

export const metadata: Metadata = {
  title: "ミヤスポ - 西宮のスポーツと健康を応援するニュースサイト｜MIYASPO",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};

export default async function Home() {
  const [topNewsContentResponse]: [TopNewsResponseType] = await Promise.all([
    getTopNewsContent(),
  ]);
  const {
    top_articles = [],
    articles = [],
    category = [],
  } = topNewsContentResponse.data || {};

  const session = await auth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* SECTION BREADCRUMBS HIDDEN TO TRIGGER BREADCRUMB BUILDER */}
      <div className="hidden">
        <SectionBreadcrumbs />
      </div>
      <main className="top-page">
        <MainSlider articles={top_articles} />
        <MainBlock>
          <TwoColContainer className="lg:gap-[5rem]">
            <TwoColContainerItem className="block lg:w-[69%]">
              <ArticleFeatured featuredArticles={articles.slice(0, 3)} />
              <ArticleSpread articles={articles.slice(3)} />
              <ArticleBlockCategory category={category} />
              <ArticleSpreadCategory category={category} />
            </TwoColContainerItem>
            <TwoColContainerItem className="block lg:w-[25.1%] lg:max-w-[20rem] lg:pt-20">
              <Sidebar />
            </TwoColContainerItem>
          </TwoColContainer>
        </MainBlock>
        <CallToAction />
      </main>
      <TopScroll />
    </Suspense>
  );
}
