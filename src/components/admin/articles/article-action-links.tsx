import Link from "next/link";

export const ArticleActionLinks = () => {
  const linkStyles =
    "w-full rounded bg-blue-100 text-white px-3 py-[.375rem] lg:w-auto";
  return (
    <div className="mb-5 flex w-full flex-col items-center justify-between lg:flex-row">
      <span className="my-5 block text-left font-noto font-bold lg:my-0 lg:text-sm">
        記事一覧
      </span>
      <div className="flex w-full flex-col gap-5 font-open font-bold lg:w-auto lg:flex-row lg:text-base">
        <Link className={linkStyles} href="/admin/trainings">
          研修一覧
        </Link>
        <Link className={linkStyles} href="/admin/article_csv">
          ポイント配布用CSV出力
        </Link>
        <Link className={linkStyles} href="/admin/articles/new">
          記事を新規作成する
        </Link>
        <Link className={linkStyles} href="/admin/article_categories">
          記事カテゴリ管理
        </Link>
        <Link className={linkStyles} href="/admin/top_articles">
          トップページ記事管理
        </Link>
      </div>
    </div>
  );
};
