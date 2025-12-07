"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { articleAdminFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  LabelBadge,
  LabelBlock,
  LabelFieldBlockDetailView,
} from "@/components/feature/common";
import { useEffect, useRef, useState } from "react";
import {
  ArticleCategoryType,
  ArticleDetailDataType,
  convertLinkToFile,
  deleteArticle,
  generateMediaListWithId,
  getDetailsForArticleAdminPreview,
  getDetailsForArticlePreview,
  getNewlyAddedMediaFile,
  getRemands,
  saveAdminArticle,
  submitAdminArticle,
  transformArticleAdminFormToFormData,
  transformSelectedCategoriesWithMetadata,
} from "@/components/contributor";
import {
  FieldGenericCheckbox,
  FieldGenericFileImage,
  FieldGenericInput,
  FieldGenericSelect,
  FieldGenericTextArea,
} from "@/components/feature/form";
import {
  AffiliatedMediaListDataType,
  CacheMediaRefType,
  CommonListType,
  ImagePreviewList,
  PostAffiliateMedia,
  PostCategoryAlt,
  PostCategoryErrorMessage,
  PostTag,
  PostTagAdd,
  PostTagBlock,
  PostTagDeleteButton,
  PostTagErrorMessage,
  PostTagInputBlock,
  PostTagLabel,
  PostTagList,
  PostTagsBlock,
  PostTagsDropdown,
  usePostTags,
} from "@/components/feature/article-post";
import { PostFakeFile } from "@/components/feature/article-post/post-fake-file";
import {
  TwoColContainer,
  TwoColContainerItem,
} from "@/components/feature/layout";
import { FieldGenericDateTime } from "@/components/feature/form/field-generic-datetime";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { set } from "date-fns";
import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { setContributorFormHook } from "@/components/contributor/lib/store";
import {
  setArticleAdminPreviewByForm,
  setArticlePreviewByForm,
} from "@/components/feature/article-preview";
import { openModalArticlePreview } from "@/components/feature/modal/modal-article-preview";
import { useSession } from "next-auth/react";
import { deleteApprovedArticle, editApprovedArticle } from "../lib";

type FormAdminArticleProps = {
  organizationList: CommonListType[];
  info?: ArticleDetailDataType;
  tagList: CommonListType[];
  categoriesList: ArticleCategoryType[];
  affiliatedMediaList: AffiliatedMediaListDataType[];
  isEditMode: boolean;
};

export const FormAdminArticle = ({
  info,
  organizationList,
  tagList,
  categoriesList,
  affiliatedMediaList,
  isEditMode = false,
}: FormAdminArticleProps) => {
  const { data: user } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof articleAdminFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(articleAdminFormSchema),
    defaultValues: {
      title: info?.title || "",
      body: info?.body || "",
      organization: info?.organization?.id || "",
      tags: (info?.tags || []).map((tag) => tag.id),
      categories: (info?.categories || []).map((category) => category.id),
      attachments: [], // this is set via useEffect
      publishStart: info?.published_at
        ? new Date(info.published_at)
        : undefined,
      publishEnd: info?.publish_ended_at
        ? new Date(info.publish_ended_at)
        : undefined,
      isPublished: info?.status?.value === 1 || false,
      isPR: info?.pr_flg || false,
      affiliatedMedia: info?.alignment_medias || [],
    },
  });
  const cacheAllMedia = useRef<CacheMediaRefType>(null); // We will use this to extract newly added media
  // remands
  const { titleRemand, bodyRemand, imageRemand, otherRemand } =
    getRemands(info);
  // tags control
  const {
    selectedTags,
    handleTagDropdownChange,
    handleRemoveTag,
    errorTagMessage,
    handleAddTag,
    tagDropdownValues,
  } = usePostTags(info?.tags || [], tagList);

  const onSubmit = async (
    values: z.infer<typeof articleAdminFormSchema>,
    isSubmitArticle = false,
  ) => {
    const finalValues = {
      ...values,
      attachments: getNewlyAddedMediaFile(cacheAllMedia),
    };

    const formDataToSubmit = transformArticleAdminFormToFormData(finalValues);

    setIsLoading(true);

    try {
      let response;

      if (isSubmitArticle && isEditMode) {
        response = await submitAdminArticle(formDataToSubmit, info!.id);
      } else {
        // There is a scenario when a new article is sent for submission instead of saving it as draft first - then we need to pass flag so that BE knows
        if (isSubmitArticle) {
          formDataToSubmit.append("is_published", "1");
        }
        response = await saveAdminArticle(formDataToSubmit, info?.id);
      }

      if (!response?.success) {
        toast({
          title: "Save Article Warning",
          description: formatResponseError(
            response?.errors || response?.message,
          ),
        });
      } else {
        const title = isSubmitArticle
          ? MODAL_MESSAGE.ARTICLE_SUBMIT_TITLE
          : MODAL_MESSAGE.ARTICLE_SAVE_TITLE;
        const content = isSubmitArticle
          ? MODAL_MESSAGE.ARTICLE_SUBMIT_CONTENT
          : MODAL_MESSAGE.ARTICLE_SAVE_CONTENT;

        openModalMessage({
          title: title,
          message: content,
          handler: () => {
            router.push("/admin/articles");
            router.refresh();
          },
        });
      }
    } catch (error) {
      toast({
        title: "Save Article Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // On edit mode, when the images arrive, update the input
  useEffect(() => {
    const fetchData = async () => {
      // Sending the images from a server component causes plain object error, so we opt in using useEffect
      const data = await convertLinkToFile(info?.all_media_url);
      form.setValue("attachments", data);
    };

    fetchData();
  }, [info?.all_media_url, form]);

  // Cache all media once, for its initial value
  // BE requested to only send back newly added media to prevent duplication on their end
  useEffect(() => {
    if (cacheAllMedia.current != null) return;
    const fetchData = async () => {
      cacheAllMedia.current = await generateMediaListWithId(
        info?.all_media_url || [],
      );
    };

    fetchData();
  }, [info?.all_media_url]);

  // Update form selected tags
  useEffect(() => {
    const tagIds = selectedTags.map((tag) => tag.id);
    form.setValue("tags", tagIds);

    // Only trigger validation if form is dirty or there are selected tags
    if (form.formState.isDirty || tagIds.length > 0) {
      form.trigger("tags");
    }
  }, [selectedTags, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          onSubmit(form.getValues(), false);
        })}
      >
        {info?.status && (
          <LabelFieldBlockDetailView
            label="記事ステータス"
            value={info?.status?.label || "-"}
          />
        )}
        {/* TITLE */}
        {titleRemand && (
          <LabelFieldBlockDetailView
            label="タイトル差し戻しコメント"
            child={<div className="whitespace-pre-line">{titleRemand}</div>}
          />
        )}
        <LabelFieldBlockDetailView
          label={
            <LabelBlock className="mb-0 p-0 lg:w-auto">
              記事タイトル <LabelBadge />
            </LabelBlock>
          }
          labelClassName="text-white"
          child={
            <FieldGenericInput
              formHook={form}
              formInputName="title"
              labelText=""
            />
          }
        />
        {/* ATTACHMENT */}
        {titleRemand && (
          <LabelFieldBlockDetailView
            label="画像差し戻しコメント"
            child={<div className="whitespace-pre-line">{imageRemand}</div>}
          />
        )}
        <LabelFieldBlockDetailView
          label="記事画像"
          child={
            <div className="space-y-3 lg:space-y-2">
              <ImagePreviewList
                filesWithMetadata={info?.all_media_url}
                files={form.watch("attachments")}
                articleId={info?.id}
                formHook={form}
                formInputName="attachments"
                cacheMediaRef={cacheAllMedia}
              />
              <PostFakeFile
                formHook={form}
                formInputName="attachments"
                labelText="ファイルを選択"
                cacheMediaRef={cacheAllMedia}
              />
              <FieldGenericFileImage
                formHook={form}
                formInputName="attachments"
                inputClassName="h-[2.0625rem] rounded-sm border-0 bg-blue-100 px-[.75rem] py-1.5 text-xs font-bold text-white lg:h-[2.375rem] lg:text-base"
                labelText="ファイルを選択"
                isMultiple={true}
                inputFileLabelClassName="hidden"
                inputFileClassName="hidden"
              />
            </div>
          }
        />
        {/* BODY */}
        {bodyRemand && (
          <LabelFieldBlockDetailView
            label="本文差し戻しコメント"
            child={<div className="whitespace-pre-line">{bodyRemand}</div>}
          />
        )}
        <LabelFieldBlockDetailView
          label={
            <LabelBlock className="mb-0 p-0 lg:w-auto">
              記事本文 <LabelBadge />
            </LabelBlock>
          }
          child={
            <>
              <ul className="mb-3 lg:mb-2.5">
                <li>
                  <span>##大見出し←大見出しとして表示されます。</span>
                </li>
                <li>
                  <span>###中見出し←中見出しとして表示されます。</span>
                </li>
                <li>
                  <span>[太字]←太字として表示されます。</span>
                </li>
                <li>
                  <span>
                    *
                    リスト1←テキストの最初に*を付けて半角スペースを入れるとリストとして表示されます。
                  </span>
                </li>
              </ul>
              <FieldGenericTextArea
                formHook={form}
                formInputName="body"
                labelText=""
                textAreaClassName="h-[15.625rem]"
              />
            </>
          }
        />
        {/* OTHER COMMENTS */}
        {otherRemand && (
          <LabelFieldBlockDetailView
            label="その他差し戻しコメント"
            child={<div className="whitespace-pre-line">{otherRemand}</div>}
          />
        )}
        {/* ORGANIZATION */}
        <LabelFieldBlockDetailView
          // label="対象組織"
          label={
            <LabelBlock className="mb-0 p-0 lg:w-auto">
              対象組織 <LabelBadge />
            </LabelBlock>
          }
          child={
            <FieldGenericSelect
              formHook={form}
              formInputName="organization"
              labelText=""
              dropdownValues={organizationList}
            />
          }
        />

        {/* CATEGORIES */}
        <LabelFieldBlockDetailView
          label={
            <LabelBlock className="mb-0 p-0 lg:w-auto">
              記事カテゴリ <LabelBadge />
            </LabelBlock>
          }
          child={
            <div className="space-y-[.5rem]">
              <PostCategoryAlt
                categoryList={categoriesList}
                selectedCategoryList={form.watch("categories") || []}
                formHook={form}
                formInputName="categories"
              />
              <PostCategoryErrorMessage
                message={form.formState.errors.categories?.message}
              />
            </div>
          }
        />
        {/* TAGS  */}
        <LabelFieldBlockDetailView
          label="記事カテゴリ"
          child={
            <PostTagsBlock>
              <PostTagList>
                {selectedTags.map((tag, index) => (
                  <PostTagBlock key={tag.id}>
                    <PostTag>{tag.name}</PostTag>
                    <PostTagDeleteButton
                      onClick={() => {
                        handleRemoveTag(index);
                      }}
                    />
                  </PostTagBlock>
                ))}
              </PostTagList>
              {!(selectedTags.length >= 3) && (
                <>
                  <TwoColContainer className="gap-5">
                    <TwoColContainerItem className="flex w-full flex-col items-start gap-4 lg:w-full lg:flex-row lg:items-center">
                      <PostTagLabel className="max-w-content shrink-0">
                        追加済みタグ
                      </PostTagLabel>
                      <PostTagsDropdown
                        dropdownValues={tagDropdownValues}
                        handleChange={handleTagDropdownChange}
                        className="flex-1"
                      />
                    </TwoColContainerItem>
                    <TwoColContainerItem className="flex w-full flex-col items-start gap-4 lg:w-full lg:flex-row lg:items-center">
                      <PostTagLabel className="max-w-content shrink-0">
                        新規追加したいタグ
                      </PostTagLabel>
                      <PostTagInputBlock className="w-full flex-1">
                        <PostTagAdd handleTagAdd={handleAddTag} />
                      </PostTagInputBlock>
                    </TwoColContainerItem>
                  </TwoColContainer>

                  <PostTagErrorMessage
                    message={
                      form.formState.errors.tags?.message || errorTagMessage
                    }
                  />
                </>
              )}
            </PostTagsBlock>
          }
        />
        {/* PUBLISH START and END */}
        <LabelFieldBlockDetailView
          label={
            <LabelBlock className="mb-0 p-0 lg:w-auto">
              公開日時 <LabelBadge />
            </LabelBlock>
          }
          child={
            <TwoColContainer className="gap-2.5 lg:gap-10">
              <TwoColContainerItem className="w-full">
                <FieldGenericDateTime
                  formHook={form}
                  formInputName="publishStart"
                  labelText=""
                />
              </TwoColContainerItem>
              <TwoColContainerItem className="w-full">
                <FieldGenericDateTime
                  formHook={form}
                  formInputName="publishEnd"
                  labelText=""
                />
              </TwoColContainerItem>
            </TwoColContainer>
          }
        />
        {/* PUBLISH APPROVE */}
        <LabelFieldBlockDetailView
          label={
            <LabelBlock className="mb-0 p-0 lg:w-auto">
              掲載確認 <LabelBadge />
            </LabelBlock>
          }
          child={
            <FieldGenericCheckbox
              formHook={form}
              formInputName="isPublished"
              labelText="記事対象に掲載確認済みです"
            />
          }
        />
        {/* IS PR */}
        <LabelFieldBlockDetailView
          label="PR記事"
          child={
            <FieldGenericCheckbox
              formHook={form}
              formInputName="isPR"
              labelText="PR記事として表示"
            />
          }
        />

        {/* AFFILIATED MEDIA */}
        <LabelFieldBlockDetailView
          label="連携他メディア"
          child={
            <PostAffiliateMedia
              affiliatedMediaList={affiliatedMediaList}
              selectedAffiliatedMedia={form.watch("affiliatedMedia") || []}
              formHook={form}
              formInputName="affiliatedMedia"
            />
          }
        />

        <div className="mb-10 mt-[1.875rem] flex flex-col justify-between gap-3 lg:mb-20 lg:mt-0 lg:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!info?.id) {
                router.back();
                return;
              }
              router.push(`/admin/articles/${info.id}`);
            }}
          >
            キャンセル
          </Button>
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
            {/* PREVIEW */}
            <Button
              type="button"
              onClick={() => {
                const organizationName =
                  organizationList.find(
                    (org) => org.id === form.getValues("organization"),
                  )?.name || "-";
                const data = {
                  ...form.getValues(),
                  organization: organizationName, // We need to return the organization name, not the id
                  tags: selectedTags.map((tag) => tag.name), // We need to return the tags name, not the ids
                };
                const selectedCategoriesWithMetadata =
                  transformSelectedCategoriesWithMetadata(
                    categoriesList,
                    form.getValues("categories"),
                  );

                const previewsArticleData = getDetailsForArticleAdminPreview(
                  data,
                  user,
                  info?.id,
                  selectedCategoriesWithMetadata,
                  form.watch("organization"),
                  selectedTags,
                );

                // we need to set the form, so we can validated when user clicks submit article on preview modal
                setContributorFormHook(form);
                // set details to render on form
                setArticleAdminPreviewByForm(previewsArticleData);
                // open preview
                openModalArticlePreview();
              }}
            >
              プレビュー
            </Button>
            {/* SAVE */}
            <Button disabled={isLoading}>記事を保存する</Button>
            {/* SUBMIT ARTICLE / APPROVAL */}
            {(!isEditMode || info?.btns?.submit) && (
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  openModalMessage({
                    title: MODAL_MESSAGE.DEFAULT_ARTICLE_SUBMIT_TITLE,
                    message: MODAL_MESSAGE.DEFAULT_ARTICLE_SUBMIT_CONTENT,
                    handler: () => {
                      form.handleSubmit(() =>
                        onSubmit(form.getValues(), true),
                      )();
                    },
                    variant: ModalMessageVariant.Confirm,
                  });
                }}
              >
                記事を入稿する
              </Button>
            )}
            {/* DELETE ARTICLE */}
            {isEditMode && info?.btns?.delete && (
              <Button
                disabled={isLoading}
                type="button"
                onClick={() => {
                  openModalMessage({
                    title: MODAL_MESSAGE.DEFAULT_DELETE_TITLE,
                    message: MODAL_MESSAGE.DEFAULT_DELETE_CONTENT,
                    confirmText: "削除する",
                    handler: async () => {
                      try {
                        const response = await deleteArticle(info!.id);
                        if (!response?.success) {
                          toast({
                            title: "Delete Article Warning",
                            description: response?.message,
                          });
                        } else {
                          router.push("/admin/articles");
                          router.refresh();
                          setTimeout(() => {
                            openModalMessage({
                              title: MODAL_MESSAGE.ARTICLE_DELETED_TITLE,
                              message: MODAL_MESSAGE.ARTICLE_DELETED_CONTENT,
                              handler: () => {},
                            });
                          }, 1000);
                        }
                      } catch (error) {
                        toast({
                          title: "Delete Article Error",
                          description: String(error),
                        });
                      }
                    },
                    variant: ModalMessageVariant.Confirm,
                  });
                }}
              >
                記事を削除する
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
