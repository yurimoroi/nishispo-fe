"use client";

import { MutableRefObject, useEffect, useState } from "react";
import { deleteArticleImage } from "./actions";
import { CacheMediaRefType } from "./types";

export const useImagePreviews = (
  files: File[],
  cacheMediaRef: MutableRefObject<CacheMediaRefType>,
) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [fileList, setFileList] = useState(files || []);

  // When the files prop changes, update the fileList
  useEffect(() => {
    setFileList(files || []);
  }, [files]);

  const deleteFile = async (
    file: File,
    formHook: any,
    formInputName: string,
    articleId: string | undefined,
    mediaId: number | null,
    cacheMediaRef: MutableRefObject<CacheMediaRefType>,
  ) => {
    // mediaId < 0 are media that are newly added
    if (!mediaId || !articleId || mediaId < 0) {
      const files = formHook.getValues(formInputName) as File[];
      // Remove the target file
      const updatedFiles = files.filter((currentFile) => {
        if (currentFile !== file) {
          return true;
        }
        // Remove from cacheMediaRef if the file matches
        if (cacheMediaRef.current) {
          const index = cacheMediaRef.current.findIndex(item => item.file === file);
          if (index !== -1) {
            cacheMediaRef.current.splice(index, 1);
          }
        }

        return false;
      });
      formHook.setValue(formInputName, updatedFiles);
      formHook.trigger(formInputName);
    } else {
      try {
        setIsDeleteLoading(true);

        const response = await deleteArticleImage(articleId, mediaId);

        if (!response?.success) {
          console.warn("Failed to delete image", response);
        } else {
          const updatedFiles = fileList.filter(
            (currentFile) => currentFile !== file,
          );
          setFileList(updatedFiles);
          formHook.setValue(formInputName, updatedFiles);
          formHook.trigger(formInputName);
        }
      } catch (error) {
      } finally {
        setIsDeleteLoading(false);
      }
    }
  };

  return {
    fileList,
    setFileList,
    deleteFile,
  };
};
