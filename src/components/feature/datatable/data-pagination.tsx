"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "@/components/ui/pagination";
import { queryStringBuilder } from "@/lib/generic-string-builder";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PaginationLink as GenericPaginationLink } from "@components/feature/articles/search";
import usePageStore from "@/components/admin/article_popup/lib/store";

type PaginationDataProps = {
  current_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  links: GenericPaginationLink[];
};

export function DataPagination({
  paginationData,
  popupMode = false,
  className = "",
}: {
  paginationData: PaginationDataProps;
  popupMode?: boolean;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setStorePageNumber = usePageStore((state) => state.setPageNumber);

  const handlePageChange = async (url: string | null) => {
    if (!url) return;

    const pageNumberMatch = url.match(/[?&]page=(\d+)/);
    const pageNumber = pageNumberMatch ? pageNumberMatch[1] : null;

    if (pageNumber) {
      // In popup mode, update the Zustand store
      if (popupMode) {
        setStorePageNumber(pageNumber);
      } else {
        // Outside popup mode, build the query string and push the new URL
        const builtQueryString = queryStringBuilder({
          queryString: searchParams.toString(),
          targetKey: "page",
          targetValue: pageNumber,
        });

        const newUrl = `${pathname}?${builtQueryString}`;
        router.push(newUrl);
      }
    }
  };

  if (paginationData.last_page <= 1) return null;

  // Helper function to generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const currentPage = paginationData.current_page;
    const totalPages = paginationData.last_page;

    if (totalPages <= 3) {
      // If there are 3 or fewer pages, show them all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show the current page and one page before and after
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);

      if (currentPage < totalPages) pages.push(currentPage + 1);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Safeguard to ensure links is not null or undefined
  const links = paginationData.links ?? []; // Default to empty array if links is null or undefined

  return (
    <div className="data-pagination w-full pb-10 lg:pb-5">
      <Pagination className={cn("justify-center font-open", className)}>
        <PaginationContent>
          {/* First Page Button */}
          {paginationData.current_page > 1 && (
            <PaginationItem className="h-full">
              <PaginationFirst
                className="cursor-pointer text-base font-normal"
                onClick={() => handlePageChange(paginationData.first_page_url)}
                aria-disabled={!paginationData.first_page_url}
              />
            </PaginationItem>
          )}

          {/* Previous Page Button */}
          {paginationData.prev_page_url && paginationData.current_page > 1 && (
            <PaginationItem className="h-full">
              <PaginationPrevious
                className="cursor-pointer text-base font-normal"
                onClick={() => handlePageChange(paginationData.prev_page_url)}
              />
            </PaginationItem>
          )}

          {/* Pagination Links */}
          {pageNumbers.map((pageNumber, index) => {
            const link = links.find((l) => l.label === pageNumber.toString());
            if (!link) return null;

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(link.url)}
                  isActive={link.active}
                  className={cn(
                    "cursor-pointer text-base font-normal",
                    link.active
                      ? "rounded-none border-none bg-blue-100 text-white"
                      : "",
                  )}
                >
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Page Button */}
          {paginationData.next_page_url &&
            paginationData.current_page < paginationData.last_page && (
              <PaginationItem className="h-full">
                <PaginationNext
                  className="cursor-pointer text-base font-normal"
                  onClick={() => handlePageChange(paginationData.next_page_url)}
                />
              </PaginationItem>
            )}

          {/* Last Page Button */}
          {paginationData.last_page_url &&
            paginationData.current_page < paginationData.last_page && (
              <PaginationItem className="h-full">
                <PaginationLast
                  className="cursor-pointer text-base font-normal"
                  onClick={() => handlePageChange(paginationData.last_page_url)}
                  aria-disabled={!paginationData.last_page_url}
                />
              </PaginationItem>
            )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
