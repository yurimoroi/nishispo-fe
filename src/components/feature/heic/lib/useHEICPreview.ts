"use client";

import { useEffect, useState } from "react";
import { getHEICPreviewURL } from "./utils";

export const useHEICPreview = ({ imageURL }: { imageURL: string }) => {
  const [previewURL, setPreviewURL] = useState("");

  // Handle image URL source
  useEffect(() => {
    const handleImageURL = async () => {
      if (!imageURL) {
        return "";
      }

      const parsedURL = await getHEICPreviewURL(imageURL);

      setPreviewURL(parsedURL);
    };

    handleImageURL();
  }, [imageURL]);

  return {
    previewURL,
  };
};
