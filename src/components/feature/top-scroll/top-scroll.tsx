"use client";

import { Button } from "@/components/ui/button";
import IconArrowUpBlack from "@public/icon-arrow-up-black.svg";
import Image from "next/image";

export const TopScroll = () => {
  return (
    <Button
      variant="ghost"
      className="fixed bottom-[2.3125rem] right-[.625rem] z-10 h-7 w-7 rounded-full bg-yellow-100 p-0 hover:bg-yellow-100 lg:hidden"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={IconArrowUpBlack}
          alt="scroll top arrow"
          width={10}
          height={10}
        />
      </div>
    </Button>
  );
};
