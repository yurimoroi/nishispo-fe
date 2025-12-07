"use client";

import { useEffect, useState } from "react";
import { ProvisionalDataType } from "./types";
import { DEFAULT_PROVISIONAL_DATA } from "./utils";
import { getProvisionalLoginData } from "./actions";

export const useGetProvisionalData = (): {
  provisionalLoginData: ProvisionalDataType;
} => {
  const [provisionalLoginData, setProvisionalLoginData] =
    useState<ProvisionalDataType>(DEFAULT_PROVISIONAL_DATA);

  useEffect(() => {
    const getCookie = async () => {
      const cookieData = await getProvisionalLoginData();
      setProvisionalLoginData(cookieData);
    };

    getCookie();
  }, []);

  return {
    provisionalLoginData,
  };
};
