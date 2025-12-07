import { cn } from "@/lib/utils";
import { bg } from "date-fns/locale";
import Link from "next/link";

type PageProps = {
  notLink?: boolean;
  className?: string;
  name?: string;
  id?: string;
  color?: string;
};

export const ArticlesHeaderTitle = ({
  notLink = false,
  className = "",
  ...props
}: PageProps) => {
  const baseClass = "category-name text-white px-2 py-1";
  const titleClass = "articles-category-header-title flex items-center gap-5 mb-5 font-noto font-bold";

  return (
    <div className={cn(titleClass, className)}>
      {notLink ? (
        <>
          <span
            className={cn(baseClass)}
            style={{ backgroundColor: props.color }}
          >
            {props.name}
          </span>
          <span className="text-xl">ニュース一覧</span>
        </>
      ) : (
        <>
          <Link
            href={`/articles/categories/${props?.id}`}
            className={baseClass}
            style={{ backgroundColor: props.color }}
          >
            {props.name}
          </Link>
          <span
            className="text-xl"
          >
            {`${props.name} ニュース一覧`}
          </span>
        </>
      )}
    </div>
  );
};
