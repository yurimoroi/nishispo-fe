"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getArticlesCategoryTopList } from "../articles/categories";
import { getTopCategories } from "./lib/actions";
import { TopCategoryType } from "./lib/types";

type CategoryType = {
  id: string;
  name: string;
  color?: string;
};

type HeaderCategoryType = {
  currentId?: string;
  catId?: string;
  selectedCatId?: string;
  label: string;
  path: string;
  className?: string;
  backgroundColor?: string;
  innerRef?: React.Ref<HTMLLIElement>;
  dropdownMenu?: TopCategoryType[];
};

const hexToRGBA = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const HeaderCategory = ({
  currentId = "",
  catId,
  selectedCatId,
  label,
  path,
  className = "",
  backgroundColor = "",
  innerRef,
  dropdownMenu = [],
}: HeaderCategoryType) => {
  const pathname = usePathname();

  const renderActiveCat = (pathname: string) => {
    if (catId && catId === selectedCatId) {
      return (
        <div
          className="absolute left-0 right-0 top-[-0.5625rem] h-[.5625rem] w-full"
          style={{ backgroundColor }}
        />
      );
    }

    if (
      label === "トップ" &&
      pathname === "/" &&
      currentId === "top" &&
      !catId
    ) {
      return (
        <div className="absolute left-0 right-0 top-[-0.5625rem] h-[.5625rem] w-full bg-[#FDDB5E]" />
      );
    }

    if (
      label === "もっと見る" &&
      pathname === "/articles/categories" &&
      currentId === "categories"
    ) {
      return (
        <div className="absolute left-0 right-0 top-[-0.5625rem] h-[.5625rem] w-full bg-[#3CAEA3]" />
      );
    }

    return null;
  };

  if (label === "その他" && dropdownMenu.length === 0) {
    return null;
  }

  return (
    <li
      ref={innerRef}
      className={cn(
        "relative flex w-[5.3125rem] shrink-0 items-center justify-center gap-4 break-all px-[.625rem] py-[.375rem] text-base font-bold text-dark-300 xl:h-10 xl:w-[112px] xl:shrink xl:px-1 xl:py-2 xl:text-lg",
        className,
      )}
      style={{ backgroundColor }}
    >
      {renderActiveCat(pathname)}

      {label === "その他" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="block cursor-pointer truncate focus:outline-none">
              {label}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-1 h-[calc(100vh-190px)] w-[100vw] overflow-auto rounded-t-none bg-white p-5 shadow-md md:mr-[-6rem] md:mt-3 md:grid md:h-auto md:w-auto md:min-w-[31.25rem] md:grid-cols-2 md:gap-x-5 md:gap-y-2 md:p-3 xl:mr-[-8.8rem]"
          >
            {dropdownMenu.map((menu) => (
              <DropdownMenuItem
                asChild
                key={menu.id}
                style={
                  {
                    borderColor: menu.color,
                    "--hover-bg": hexToRGBA(menu.color, 0.3),
                    "--text-color": menu.color,
                  } as React.CSSProperties
                }
                className="mb-5 cursor-pointer rounded-none border-l-4 border-gray-400 px-5 py-3 text-base hover:bg-transparent md:mb-0 md:py-[.875rem]"
              >
                <Link
                  href={`/articles/categories/${menu.id}`}
                  className="flex w-full items-center justify-between font-normal transition-colors hover:font-bold [&:hover]:bg-[var(--hover-bg)] [&:hover]:text-[var(--text-color)]"
                >
                  <span>{menu.short_name || menu.name}</span>
                  <span className="ml-auto block h-[.625rem] w-[.625rem] shrink-0 rotate-[-47deg] border-b-2 border-r-2 border-[var(--text-color)] md:hidden"></span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={path} className="block truncate">
          {label}
        </Link>
      )}
    </li>
  );
};

export const HeaderCategories = () => {
  const params = useParams();
  const pathname = usePathname();
  const id =
    pathname === "/articles/categories"
      ? "categories"
      : Array.isArray(params?.id)
        ? params.id[0]
        : params?.id || "top";

  const [data, setData] = useState<TopCategoryType[]>([]);
  const [othercategories, setOtherCategories] = useState<TopCategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getArticlesCategoryTopListResponse =
          await getArticlesCategoryTopList({ id });
        if (getArticlesCategoryTopListResponse.success) {
          setSelectedCategory(
            getArticlesCategoryTopListResponse?.data?.category,
          );
        } else {
          setSelectedCategory(null);
        }

        const response = await getTopCategories();
        if (response.success) {
          setData(response.data.slice(0, 8));
          setOtherCategories(response.data.slice(8));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!scrollContainerRef.current || !selectedCategory) return;

    const selectedElement = categoryRefs.current.get(selectedCategory.id);
    if (selectedElement) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const offsetLeft = selectedElement.offsetLeft;
      const secondElementOffset = containerWidth * 0.22; // Adjust this to position as second element

      requestAnimationFrame(() => {
        container.scrollTo({
          left: offsetLeft - secondElementOffset,
          behavior: "smooth",
        });
      });
    }
  }, [selectedCategory, data]);

  if (isLoading) return null;

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto border-transparent bg-shade-100 pt-[.625rem] lg:border-0 lg:px-6 lg:pl-0 lg:pr-0"
    >
      <div
        className={cn(
          "w-screen min-w-max border-b-[.5625rem] border-transparent xl:w-full",
          pathname === "/articles/categories"
            ? "border-[#3CAEA3]"
            : pathname === "/" && "border-[#FDDB5E]",
        )}
        style={selectedCategory ? { borderColor: selectedCategory.color } : {}}
      >
        <ul
          className={cn(
            "mx-auto flex min-h-full items-center justify-center lg:max-w-[1280px]",
          )}
        >
          <HeaderCategory
            currentId={id}
            label="トップ"
            path="/"
            className="bg-[#FDDB5E] text-black lg:shrink-0"
          />
          {data.map((item) => (
            <HeaderCategory
              key={item.id}
              currentId={id}
              catId={item.id}
              selectedCatId={selectedCategory?.id}
              label={item.short_name || item.name}
              path={`/articles/categories/${item.id}`}
              backgroundColor={item.color}
              className="text-white"
              innerRef={(el) => {
                if (el) categoryRefs.current.set(item.id, el);
              }}
            />
          ))}

          <HeaderCategory
            currentId={id}
            label="その他"
            path="/articles/categories"
            className="bg-[#FF783E] text-white lg:shrink-0 lg:pr-0"
            dropdownMenu={othercategories}
          />

          <HeaderCategory
            currentId={id}
            label="もっと見る"
            path="/articles/categories"
            className="bg-[#3CAEA3] text-white lg:shrink-0 lg:pr-0"
          />
        </ul>
      </div>
    </div>
  );
};
