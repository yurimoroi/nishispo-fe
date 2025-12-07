"use client";
import iconFb from "@public/icon-s-facebook.svg";
import iconLine from "@public/icon-s-line.svg";
import iconX from "@public/icon-s-twitter-x.svg";
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
} from "next-share";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  title: string;
}

const ArticleShareButtons = ({ title }: Props) => {
  const [fullUrl, setFullUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  return (
    <ul className="flex gap-[.625rem]">
      <li>
        <LineShareButton
          url={fullUrl}
          title={title}
          className="hover:opacity-75"
        >
          <div className="flex h-[1.125rem] w-[3.75rem] items-center justify-center rounded-sm bg-[#06C755] hover:opacity-75">
            <div className="relative h-[.75rem] w-[.75rem]">
              <Image src={iconLine} fill sizes="100%" alt={`Line icon`} />
            </div>
          </div>
        </LineShareButton>
      </li>
      <li>
        <TwitterShareButton
          url={fullUrl}
          title={title}
          className="hover:opacity-75"
        >
          <div className="flex h-[1.125rem] w-[3.75rem] items-center justify-center rounded-sm bg-black hover:opacity-75">
            <div className="relative h-[.75rem] w-[.75rem]">
              <Image src={iconX} fill sizes="100%" alt={`twitter icon`} />
            </div>
          </div>
        </TwitterShareButton>
      </li>
      <li>
        <FacebookShareButton url={fullUrl} title={title} className="">
          <div className="flex h-[1.125rem] w-[3.75rem] items-center justify-center rounded-sm bg-[#0F6AFB] hover:opacity-75">
            <div className="relative h-[.75rem] w-[.75rem]">
              <Image src={iconFb} fill sizes="100%" alt={`facebook icon`} />
            </div>
          </div>
        </FacebookShareButton>
      </li>
    </ul>
  );
};
export default ArticleShareButtons;
