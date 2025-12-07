"use client";

import { cn } from "@/lib/utils";
import {
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useImagePreviews } from "./lib/useImagePreviews";
import Image from "next/image";
import IconCloseCircle from "@public/icon-close-circle.svg";
import { Button } from "@/components/ui/button";
import { AllMediaDataType } from "@/components/contributor";
import { CacheMediaRefType } from "./lib";
import heic2any from "heic2any";
import { convertHeicToJpeg } from "../heic";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ImageBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "relative h-[3.75rem] w-[6.5rem] bg-shade-100 lg:h-[100px] lg:w-[12.5rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ImagePreview = ({ file }: { file: File }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    let objectUrl = "";

    const handleImage = async () => {
      try {
        const convertedBlob = await convertHeicToJpeg(file);
        objectUrl = URL.createObjectURL(convertedBlob);

        setImageSrc(objectUrl);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    handleImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  if (!imageSrc) {
    return null;
  }

  return (
    <Image
      src={imageSrc}
      alt={file.name}
      fill
      sizes="100%"
      style={{ objectFit: "contain" }}
    />
  );
};

export const ImageDeleteButton = ({
  children,
  className,
  onClick,
}: CommonProps & { onClick: () => void }) => {
  return (
    <Button
      className={cn(
        "absolute right-[-.5rem] top-[-.3125rem] h-auto w-auto rounded-none bg-transparent p-0 shadow-none hover:bg-transparent",
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <Image
        src={IconCloseCircle}
        alt="delete image button"
        width={16}
        height={16}
      />
    </Button>
  );
};

export const ImagePreviewList = ({
  children,
  className,
  filesWithMetadata, // this serves as the "cache" for the image saved previously - the data comes from the detail
  files,
  formHook,
  formInputName,
  articleId,
  cacheMediaRef,
}: CommonProps & {
  filesWithMetadata: AllMediaDataType[] | undefined;
  files: File[];
  formHook: any;
  formInputName: string;
  articleId: string | undefined;
  cacheMediaRef: MutableRefObject<CacheMediaRefType>;
}) => {
  const { fileList, deleteFile } = useImagePreviews(files, cacheMediaRef);

  if (!files || files.length === 0) return null;

  return (
    <div className={cn("lg flex flex-wrap gap-3 lg:gap-2.5", className)}>
      {fileList.map((file, index) => {
        let mediaId = null;

        if (filesWithMetadata) {
          mediaId = filesWithMetadata[index]?.id || null;
        }

        return (
          <ImageBlock key={index}>
            <ImagePreview file={file} />
            <ImageDeleteButton
              onClick={() =>
                deleteFile(
                  file,
                  formHook,
                  formInputName,
                  articleId,
                  mediaId,
                  cacheMediaRef,
                )
              }
            />
          </ImageBlock>
        );
      })}
    </div>
  );
};
