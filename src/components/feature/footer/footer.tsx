import Link from "next/link";
import Image from "next/image";
import MiyaspoLogoAlt from "@public/miyaspo-logo-alt.svg";

const links = [
  {
    label: "サービス紹介",
    url: "/about",
  },
  {
    label: "運営会社について",
    url: "/about/company",
  },
  {
    label: "プライバシーポリシー",
    url: "/privacy",
  },
  {
    label: "利用規約",
    url: "/terms",
  },
  {
    label: "掲載内容について",
    url: "/about_report",
  },

  {
    label: "広告掲載について",
    url: "/ad",
  },
  {
    label: "記者・編集部員募集",
    url: "/work/reporter_editor",
  },
  {
    label: "お問い合わせ",
    url: "/inquiry",
  },
];

export const Footer = () => {
  return (
    <footer className="mt-10 bg-blue-100 px-6 py-10 lg:mt-20 lg:pb-20 lg:pt-[3.125rem]">
      <div className="relative mb-5 h-[2.25rem] w-[11.25rem] lg:mx-auto lg:h-[2.8125rem] lg:w-[13.8125rem]">
        <Image src={MiyaspoLogoAlt} alt="miyaspo logo" fill sizes="100%" />
      </div>
      <ul className="mb-10 flex flex-col flex-wrap gap-4 lg:mb-5 lg:flex-row lg:justify-center">
        {links.map((link) => (
          <li
            key={link.label}
            className="text-base font-medium leading-normal text-white lg:gap-2.5 lg:p-2 lg:text-[.75rem] lg:text-sm lg:font-bold"
          >
            <Link href={link.url}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <p className="text-center text-sm font-medium leading-normal text-white lg:text-base lg:font-bold">
        © MIYASPO. All Rights Reserved.
      </p>
    </footer>
  );
};
