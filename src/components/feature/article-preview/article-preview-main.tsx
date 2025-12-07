"use client";

import {
  ArticleHeaderBottomActions,
  ArticleHeaderImageFeatured,
  ArticleHeaderImageGallery,
  ArticleHeaderImageItem,
  ArticleHeaderImageList,
  ArticlePreview,
  ArticlePreviewBody,
  ArticlePreviewCategory,
  ArticlePreviewCategoryBadge,
  ArticlePreviewHeader,
  ArticlePreviewMetadata,
  ArticlePreviewSocial,
  ArticlePreviewSocialItem,
  ArticlePreviewTagItem,
  ArticlePreviewTags,
  ArticlePreviewTitle,
  ArticlePreviewTopAction,
  useArticlePreviewStore,
} from "@feature/article-preview";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import IconFBAlt from "@public/icon-fb-alt.svg";
import IconTwitterXAlt from "@public/icon-x-twitter-alt.svg";
import IconLineAlt from "@public/icon-line-alt.svg";
import { useState } from "react";
import { closeModalArticlePreview } from "../modal/modal-article-preview";
import Link from "next/link";
import {
  ModalArticleRequestType,
  openModalArticleRequest,
} from "../modal/modal-article-requests";
import { useContributorFormStore } from "@/components/contributor/lib/store";
import { openModalMessage } from "../modal";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { transformDetailToFormData } from "../modal/modal-article-preview/lib/utils";
import { submitArticle } from "@/components/contributor";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { convertSymbolsToHTML } from "../articles/details";
import { useHEICPreview } from "../heic";
import ArticleNoImagePlaceholder from "@public/placeholder/article-no-image-placeholder.jpg";

const ArticleSimpleImageGallery = ({
  imageLinks,
}: {
  imageLinks: string[];
}) => {
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);

  const { previewURL } = useHEICPreview({
    imageURL: imageLinks[featuredImageIndex] || "",
  });

  if (imageLinks.length === 0) {
    return (
      <ArticleHeaderImageFeatured>
        <Image
          src={ArticleNoImagePlaceholder}
          alt="preview image"
          sizes="100%"
          fill
          style={{ objectFit: "cover" }}
        />
      </ArticleHeaderImageFeatured>
    );
  }

  return (
    <>
      <ArticleHeaderImageFeatured>
        {previewURL && (
          <Image
            src={previewURL}
            alt="preview image"
            sizes="100%"
            fill
            style={{ objectFit: "contain" }}
          />
        )}
      </ArticleHeaderImageFeatured>
      <ArticleHeaderImageList>
        {/* As per request, the gallery thumbnails is not displayed when less than 4 images */}
        {imageLinks.length > 3 &&
          imageLinks.map((imageLink, index) => (
            <ArticleHeaderImageItem
              key={`image-${index}`}
              isActive={index === featuredImageIndex}
            >
              <Button
                variant="empty"
                onClick={() => setFeaturedImageIndex(index)}
              >
                <ThumbnailImage imageLink={imageLink} />
              </Button>
            </ArticleHeaderImageItem>
          ))}
      </ArticleHeaderImageList>
    </>
  );
};

const ThumbnailImage = ({ imageLink }: { imageLink: string }) => {
  const { previewURL } = useHEICPreview({
    imageURL: imageLink || "",
  });

  if (!previewURL) {
    return null;
  }

  return (
    <div className="mt-2 h-[2.75rem] w-[5.625rem] bg-shade-100 lg:h-10 lg:w-[6.25rem]">
      <Image
        src={previewURL}
        alt="text image"
        sizes="100%"
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export const ArticlePreviewMain = () => {
  const {
    id,
    isPR,
    title,
    publishDate,
    authorName,
    organizationName,
    tags,
    images,
    body,
    categories,
    btns,
  } = useArticlePreviewStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isAdminPath = pathname.includes("/admin");

  return (
    <ArticlePreview>
      {/* This section is only displayed when articles was saved before, for create hide */}
      {id && (
        <ArticlePreviewTopAction>
          {/* There is no Article Preview screen or page for non admin-users */}
          {isAdminPath && (
            <Button asChild>
              <Link
                href={`${isAdminPath && "/admin"}/articles/${id}`}
                onClick={() => {
                  closeModalArticlePreview();
                }}
              >
                元記事
              </Link>
            </Button>
          )}

          <Button asChild>
            <Link
              href={`${isAdminPath ? `/admin/articles/new?id=${id}` : `/contributor/articles/${id}/edit`}`}
              onClick={() => {
                closeModalArticlePreview();
              }}
            >
              編集記事
            </Link>
          </Button>
        </ArticlePreviewTopAction>
      )}
      <ArticlePreviewCategory>
        {isPR && (
          <ArticlePreviewCategoryBadge backgroundColor="#FF6A6A">
            PR
          </ArticlePreviewCategoryBadge>
        )}

        {categories.map((category) => {
          const { id, name, color } = category;
          return (
            <ArticlePreviewCategoryBadge key={id} backgroundColor={color}>
              {name}
            </ArticlePreviewCategoryBadge>
          );
        })}
      </ArticlePreviewCategory>
      <ArticlePreviewHeader>
        <ArticlePreviewTitle>
          <h1>{title}</h1>
        </ArticlePreviewTitle>
        <ArticlePreviewMetadata>
          <div className="flex flex-wrap justify-center gap-2.5 text-sm text-dark-400 lg:justify-normal">
            <p>{publishDate}</p>
            <p>|</p>
            <p>文 : {authorName}</p>
            <p>|</p>
            <p>{organizationName}</p>
          </div>
          <ArticlePreviewSocial>
            <ArticlePreviewSocialItem className="bg-green-100">
              <Image src={IconLineAlt} alt="line" width={12} height={12} />
            </ArticlePreviewSocialItem>
            <ArticlePreviewSocialItem className="bg-black">
              <Image
                src={IconTwitterXAlt}
                alt="twitter x"
                width={12}
                height={12}
              />
            </ArticlePreviewSocialItem>
            <ArticlePreviewSocialItem className="bg-blue-200">
              <Image src={IconFBAlt} alt="facebook" width={12} height={12} />
            </ArticlePreviewSocialItem>
          </ArticlePreviewSocial>
        </ArticlePreviewMetadata>
      </ArticlePreviewHeader>
      <ArticleHeaderImageGallery>
        <ArticleSimpleImageGallery imageLinks={images} />
      </ArticleHeaderImageGallery>
      <ArticlePreviewBody>
        <div dangerouslySetInnerHTML={{ __html: convertSymbolsToHTML(body) }} />
      </ArticlePreviewBody>
      <ArticlePreviewTags>
        {tags.map((tag) => {
          return <ArticlePreviewTagItem key={tag}>{tag}</ArticlePreviewTagItem>;
        })}
      </ArticlePreviewTags>
      <ArticleHeaderBottomActions>
        <div className="flex justify-center gap-2.5">
          {/* Submit Article - shown only on edit mode */}
          {id && btns?.submit && (
            <Button
              type="button"
              disabled={isLoading}
              onClick={async () => {
                const formHook = useContributorFormStore.getState().formHook;

                // Check first if form is valid this is encountered when editing the article (contributor user)
                if (formHook) {
                  const isValid = await formHook.trigger();
                  if (!isValid) {
                    closeModalArticlePreview();

                    openModalMessage({
                      title: MODAL_MESSAGE.ARTICLE_SUBMIT_INVALID_FORM_TITLE,
                      message:
                        MODAL_MESSAGE.ARTICLE_SUBMIT_INVALID_FORM_CONTENT,
                    });
                    return;
                  }
                }

                try {
                  setIsLoading(true);
                  const data = useArticlePreviewStore.getState();
                  const formDataToSubmit =
                    await transformDetailToFormData(data);
                  const response = await submitArticle(formDataToSubmit, id);

                  if (!response?.success) {
                    toast({
                      title: "Submit Article Warning",
                      description: formatResponseError(
                        response?.errors || response?.message,
                      ),
                    });
                  } else {
                    closeModalArticlePreview();
                    router.refresh();
                  }
                } catch (error) {
                  toast({
                    title: "Submit Article Error",
                    description: formatResponseError(error),
                  });
                  return;
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              記事を入稿する
            </Button>
          )}

          {/* Close Modal */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              closeModalArticlePreview();
            }}
          >
            閉じる
          </Button>
        </div>

        {/* Do not show buttons below when on create mode */}
        <div className="flex justify-center gap-2.5">
          {/* Make Editing Request */}
          {btns?.editRequest && (
            <Button
              type="button"
              onClick={() => {
                openModalArticleRequest(id, ModalArticleRequestType.Edit);
              }}
            >
              編集依頼を行う
            </Button>
          )}

          {/* Make Delete Request */}
          {btns?.deleteRequest && (
            <Button
              type="button"
              onClick={() => {
                openModalArticleRequest(id, ModalArticleRequestType.Delete);
              }}
            >
              削除依頼を行う
            </Button>
          )}
        </div>
      </ArticleHeaderBottomActions>
    </ArticlePreview>
  );
};
