"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useCrumbStore } from "@/store/crumb";
import { useUrlStore } from "@/store/urlStore";
import { cn } from "@/lib/utils";

type BreadcrumbDefinitionsType = {
  [key: string]: { label: string; path?: string };
};

type BreadcrumbData = {
  levels?: BreadcrumbLevel[];
  label: string;
  path?: string;
};

type BreadcrumbLevel = {
  label?: (name: string) => string;
  path?: (name: string) => string;
};

// Breadcrumb Definitions
const breadcrumbDefinitions: BreadcrumbDefinitionsType = {
  "/articles/categories": { label: "カテゴリ一覧" },
  "/mypage": { label: "マイページ", path: "/mypage" },
  "/password/edit": { label: "パスワード変更" },
  "/about": {
    label: "サービス紹介",
    path: "/about",
  },
  "/about/company": { label: "運営会社について", path: "/about/company" },
  "/privacy": { label: "プライバシーポリシー", path: "/privacy" },
  "/about_report": { label: "掲載内容について", path: "/about_report" },
  "/ad": {
    label: "広告掲載について",
    path: "/ad",
  },
  "/work/reporter_editor": {
    label: "記者・編集部員募集",
    path: "/work/reporter_editor",
  },
  "/terms": {
    label: "利用規約",
    path: "/terms",
  },
  "/inquiry": {
    label: "お問い合わせ",
    path: "/inquiry",
  },
  "/social": {
    label: "SNS連携",
    path: "/social",
  },
  "/informations": {
    label: "お知らせ",
    path: "/informations",
  },
};

// Dynamic breadcrumb patterns
const dynamicBreadcrumbPatterns: {
  [key: string]: (label: string, url: string) => BreadcrumbData;
} = {
  "/articles/tags": (label, url) => ({
    label: label,
    path: url,
  }),
  "/articles/categories": (label, url) => ({
    label: label,
    path: url,
  }),
  "/articles/search": (label, url) => ({
    label: label || "検索結果",
    path: url,
  }),
};

// Home Page
const mainBreadcrumbs: BreadcrumbData = {
  label: "トップ",
  path: "/",
};

// Product Page Breadcrumbs
const articlesBreadCrumbs = {
  levels: [
    {
      label: (name: string) => name,
      path: (name: string) => name,
    },
  ],
  label: (name: string) => name,
  path: (url: string) => url,
};

const useBreadcrumbBuilder = (label?: string, slug?: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { add, removeAll, crumb } = useCrumbStore();
  const previousUrl = useUrlStore();

  useEffect(() => {
    const search = searchParams.toString();
    const currentPath = `${pathname}${search ? `?${search}` : ""}`;
    previousUrl.addUrl(pathname);

    if (pathname === "/") {
      removeAll();
      add("", currentPath);
    } else {
      const breadcrumbData = breadcrumbDefinitions[pathname];
      if (breadcrumbData) {
        add(breadcrumbData.label, currentPath);
      } else {
        for (const pattern in dynamicBreadcrumbPatterns) {
          if (pathname.startsWith(pattern)) {
            const dynamicLabel = label || "";
            const dynamicBreadcrumb = dynamicBreadcrumbPatterns[pattern](
              dynamicLabel,
              currentPath,
            );
            add(dynamicBreadcrumb.label, dynamicBreadcrumb.path ?? "");
            break;
          }
        }
      }
    }
  }, [pathname, searchParams, add, label, removeAll, previousUrl]);

  // Generate breadcrumbs list
  let breadcrumbs: BreadcrumbData[] = [];

  if (pathname.startsWith("/articles")) {
    if (pathname in breadcrumbDefinitions) {
      breadcrumbs.push(mainBreadcrumbs);
      breadcrumbs.push(breadcrumbDefinitions[pathname]);
    } else {
      breadcrumbs.push(mainBreadcrumbs);
      let found = false;
      for (const pattern in dynamicBreadcrumbPatterns) {
        if (pathname.startsWith(pattern)) {
          const dynamicLabel = label || "";
          breadcrumbs.push(
            dynamicBreadcrumbPatterns[pattern](dynamicLabel, pathname),
          );
          found = true;
          break;
        }
      }
      if (!found) {
        if (slug && crumb) {
          breadcrumbs.push(
            ...articlesBreadCrumbs.levels.map((level) => ({
              label: crumb?.label || "",
              path: crumb?.url || "",
            })),
          );
          breadcrumbs.push({
            label: label || "",
          });
        }
      }
    }
  }

  // BreadCrumbs for other pages
  if (pathname.startsWith("/mypage")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/mypage"]);
  }

  if (pathname.startsWith("/about/company")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/about/company"]);
    return breadcrumbs;
  }

  if (pathname.startsWith("/terms")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/terms"]);
  }

  if (pathname.startsWith("/privacy")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/privacy"]);
  }

  if (pathname.startsWith("/ad")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/ad"]);
    return breadcrumbs;
  }

  if (pathname.startsWith("/work/reporter_editor")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/work/reporter_editor"]);
    return breadcrumbs;
  }

  if (pathname.startsWith("/about_report")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/about_report"]);
    return breadcrumbs;
  }
  if (pathname.startsWith("/about")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/about"]);
    return breadcrumbs;
  }

  if (pathname.startsWith("/inquiry")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/inquiry"]);
  }

  if (pathname.startsWith("/password/edit")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/mypage"]);
    breadcrumbs.push(breadcrumbDefinitions[pathname]);
  }

  if (pathname.startsWith("/social")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/mypage"]);
    breadcrumbs.push(breadcrumbDefinitions["/social"]);
  }

  if (pathname.startsWith("/informations")) {
    breadcrumbs.push(mainBreadcrumbs);
    breadcrumbs.push(breadcrumbDefinitions["/informations"]);

    if (slug) {
      breadcrumbs.push({
        label: label || "",
      });
    }
  }

  return breadcrumbs;
};

export default function SectionBreadcrumbs({
  label = "",
  slug = "",
}: {
  label?: string;
  slug?: string;
}) {
  const breadcrumbs = useBreadcrumbBuilder(label, slug);

  return (
    <ul className="mb-10 mt-[1.875rem] flex flex-wrap gap-[0.625rem] lg:mx-0 lg:pb-2">
      {breadcrumbs.map(({ label, path }, index) => {
        if (!label || (!path && index < breadcrumbs.length - 1)) {
          return null;
        }

        const isLastPath = index === breadcrumbs.length - 1;
        const isLink = !!path; // Determine if the current item is a link

        return (
          <li
            key={`${path || label}${index}`}
            className={cn("text-[1rem]", {
              "text-dark-100": isLastPath,
            })}
          >
            {isLastPath ? (
              <span className={cn("font-open",{
                "font-sans": isLink,
              })}>
                {label}
              </span>
            ) : (
              <div className="flex items-center gap-[0.625rem]">
                <div>
                  {path ? (
                    <Link
                      href={path}
                      className={cn("text-blue-100", "font-noto")}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className="font-open">{label}</span>
                  )}
                </div>
                <ChevronRight className="h-5 w-4 text-dark-100" />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
