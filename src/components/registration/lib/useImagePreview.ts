import { replaceLocalhost } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

type ImagePreviewProps = {
  imagePath?: string;
};

export const useImagePreview = ({ imagePath }: ImagePreviewProps) => {
  const [imagePreviewSource, setImagePreviewSource] = useState("");
  const [imagePreviewFileName, setImagePreviewFileName] = useState("");

  const onChangeFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setImagePreviewSource(URL.createObjectURL(file));
        setImagePreviewFileName(file.name);
      } else {
        setImagePreviewSource("");
        setImagePreviewFileName("");
      }
    },
    [],
  );

  useEffect(() => {
    if (imagePath) {
      // check of imagePath is has localhost on it
      setImagePreviewSource(replaceLocalhost(imagePath));
    }
  }, [imagePath]);

  return {
    imagePreviewSource,
    onChangeFile,
    imagePreviewFileName,
  };
};
