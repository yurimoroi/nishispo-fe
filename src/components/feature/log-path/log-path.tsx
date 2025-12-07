"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pushCurrentURL, usePreviousURLStore } from "./lib/store";

export const LogPath = () => {
  const pathname = usePathname();
  useEffect(() => {
    pushCurrentURL(pathname);
  }, [pathname]);
  return <></>;
};
