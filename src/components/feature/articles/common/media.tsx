"use client";

import { cn } from "@/lib/utils";
import imagePlaceHolder880x120 from "@public/placeholder/image-placeholder-880x120.png";
import Image from "next/image";
import Link from "next/link";
import { AlignmentMediaDetails } from "../details/lib/types";
import { MediaType } from "./lib/types";

interface Props {
  mediaItem: MediaType | AlignmentMediaDetails;
  className?: string;
}

export const Media = ({ mediaItem, className }: Props) => {
  if (!mediaItem?.display_flg) return null;

  const renderMedia = () => (
    <div className="pb-10">
      <Link href={`${mediaItem.url}`} target="_blank">
        <div
          className={cn(
            "relative h-[6.25rem] w-full sm:h-[6.625rem]",
            className,
          )}
        >
          <Image
            className="object-cover"
            src={mediaItem.banner || imagePlaceHolder880x120}
            fill
            sizes="100%"
            alt={`${mediaItem?.name} image`}
          />
        </div>
      </Link>
    </div>
  );

  return renderMedia();
};

export default Media;
