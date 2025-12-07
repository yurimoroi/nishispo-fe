"use client";

import { AllMediaURL } from "@/components/top/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";
import noImage from "@public/placeholder/no-image.webp";
import Image from "next/image";
import { useState } from "react";

type Props = {
  gallery: AllMediaURL[];
};

const ArticleGallery = ({ gallery }: Props) => {
  const [selectedImage, setSelectedImage] = useState(
    gallery.length > 0
      ? gallery[0].original.replace("localhost", "127.0.0.1:8000")
      : noImage,
  );
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Dialog onOpenChange={() => setOpenModal(!openModal)}>
        <DialogTrigger className="relative mb-5 block h-[12.5rem] w-full sm:mb-[.625rem] sm:h-[27.5rem]">
          <div className="relative h-[12.5rem] w-full sm:h-[27.5rem]">
            <Image
              className="object-cover"
              src={
                gallery.length === 0 ? ArticleNoImagePlaceholder : selectedImage
              }
              fill
              sizes="100%"
              alt={`article image`}
            />
          </div>
        </DialogTrigger>
        <div
          className={
            openModal
              ? "absolute bottom-0 left-0 right-0 top-0 z-10 block bg-black/80"
              : "absolute bottom-0 left-0 right-0 top-0 z-10 hidden bg-black/80"
          }
        ></div>
        <DialogContent className="border-0 pt-14 lg:min-w-fit">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="relative mx-auto h-auto w-full overflow-hidden pb-[56%] lg:h-[44.5rem] lg:w-[62.5rem] lg:pb-0">
            <Image
              className="object-cover w-full h-auto"
              src={selectedImage}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 100vw"
              alt="article image"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* As per request, the gallery thumbnails is not displayed when less than 4 images */}
      {gallery.length > 3 && (
        <ul className="flex flex-wrap gap-[5.9%] sm:gap-[1.1%]">
          {gallery.map((media, index) => (
            <li
              key={index}
              onClick={() => setSelectedImage(media.original)}
              className="mb-[5.9%] w-[29.36%] sm:mb-[1.1%] sm:w-[11.5%]"
            >
              <div className="relative h-[3.1875rem] w-full sm:h-[3.125rem]">
                <Image
                  className={
                    media.original === selectedImage
                      ? "cursor-pointer border-2 border-black object-cover"
                      : "cursor-pointer object-cover"
                  }
                  src={media["thumbnail-medium"]}
                  fill
                  sizes="100%"
                  alt={`article image`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleGallery;
