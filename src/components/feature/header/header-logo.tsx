import Link from "next/link";
import Image from "next/image";
import MiyaspoLogo from "@public/miyaspo-logo.svg";

export const HeaderLogo = () => {
  return (
    <Link
      href="/"
      className="flex h-full flex-col gap-[.4375rem] lg:gap-2.5"
    >
      <div className="relative h-[2.0625rem] w-[10rem] self-start lg:h-[2.8125rem] lg:w-[13.75rem]">
        <Image
          src={MiyaspoLogo}
          alt="miyaspo logo"
          fill
          sizes="100%"
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="flex flex-col text-[.625rem] font-bold leading-normal lg:flex-row">
        <span>西宮のスポーツと健康を</span>
        <span>応援するニュースサイト</span>
      </span>
    </Link>
  );
};
