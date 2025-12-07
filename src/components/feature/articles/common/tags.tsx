import { cn } from "@/lib/utils";
import Link from "next/link";

import { TagType } from "./lib/types";
interface Props {
  tags: TagType[] | undefined;
  className?: string;
}

const Tags = ({ tags, className }: Props) => {
  if (
    typeof tags === "undefined" ||
    (Array.isArray(tags) && tags.length === 0)
  ) {
    return null;
  }

  return (
    <ul
      className={cn(
        "flex flex-wrap gap-1 font-open text-sm sm:font-bold",
        className,
      )}
    >
      {tags.map((tag) => (
        <li key={tag.id}>
          <Link
            className="inline-block rounded-2xl bg-blue-100 px-[0.65rem] py-[.375rem] align-middle text-white"
            href={`/articles/tags/${tag.id}`}
          >
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
