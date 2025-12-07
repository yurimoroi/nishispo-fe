"use client";

import { useRouter } from "next/navigation";
import {
  PostStatusBlock,
  PostStatusReminder,
  PostStatusTag,
  PostStatusTitle,
  PostReviewBlock,
  PostReviewContent,
  PostReviewTitle,
  PostCategoriesBlock,
  ImagePreviewList,
  PostCategory,
  PostCategoryErrorMessage,
  PostButtonBlock,
  PostTagsBlock,
  PostTagsDropdown,
  PostTagList,
  PostTag,
  PostTagBlock,
  PostTagDeleteButton,
  PostTagErrorMessage,
  PostTagAdd,
  PostTagInputBlock,
  PostTagLabel,
} from "@components/feature/article-post";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { articleFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FieldGenericCheckbox,
  FieldGenericFileImage,
  FieldGenericInput,
  FieldGenericSelect,
  FieldGenericTextArea,
} from "../feature/form";
import { FieldGenericDateTime } from "../feature/form/field-generic-datetime";
import { TwoColContainer, TwoColContainerItem } from "../feature/layout";
import {
  ArticleDetailDataType,
  deleteArticle,
  saveArticle,
  submitArticle,
} from "./lib";
import {
  convertLinkStringsToFile,
  convertLinkToFile,
  generateMediaListWithId,
  getDetailsForArticlePreview,
  getNewlyAddedMediaFile,
  getRemands,
  transformArticleFormToFormData,
  transformSelectedCategoriesWithMetadata,
} from "./lib/utils";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { usePostTags } from "../feature/article-post/lib/usePostTags";
import {
  ArticleCategoryType,
  CacheMediaRefType,
  CommonListType,
} from "../feature/article-post/lib/types";
import { openModalArticlePreview } from "@feature/modal/modal-article-preview";
import { useSession } from "next-auth/react";
import { setArticlePreviewByForm } from "../feature/article-preview";
import { ModalMessageVariant, openModalMessage } from "../feature/modal";
import {
  ModalArticleRequestType,
  openModalArticleRequest,
  useModalArticleRequestStore,
} from "../feature/modal/modal-article-requests";
import { setContributorFormHook } from "./lib/store";
import { PostFakeFile } from "../feature/article-post/post-fake-file";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { LabelWithBadgeTransparent } from "../feature/common";
import {
  ModalArticleTemplateResponse,
  ModalArticleTemplateTrigger,
  openModalArticleTemplate,
} from "@feature/modal/modal-article-template";

type FormArticleProps = {
  organizationList: CommonListType[];
  info?: ArticleDetailDataType;
  tagList: CommonListType[];
  categoriesList: ArticleCategoryType[];
};

export const FormArticle = ({
  organizationList,
  info,
  tagList,
  categoriesList,
}: FormArticleProps) => {
  const { data: user } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!!info);
  const form = useForm<z.infer<typeof articleFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(articleFormSchema),
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
      termOne: false,
      termTwo: false,
    },
  });
  const {
    selectedTags,
    handleTagDropdownChange,
    handleRemoveTag,
    errorTagMessage,
    handleAddTag,
    tagDropdownValues,
  } = usePostTags(info?.tags || [], tagList);
  const cacheAllMedia = useRef<CacheMediaRefType>(null); // We will use this to extract newly added media

  const remand = getRemands(info);

  const onSubmit = async (
    values: z.infer<typeof articleFormSchema>,
    isSubmitArticle = false,
  ) => {
    setIsLoading(true);
    const finalValues = {
      ...values,
      attachments: getNewlyAddedMediaFile(cacheAllMedia),
    };

    const formDataToSubmit = transformArticleFormToFormData(finalValues);
    try {
      let response;
      if (isSubmitArticle && isEditMode) {
        response = await submitArticle(formDataToSubmit, info!.id);
      } else {
        // There is a scenario when a new article is sent for submission instead of saving it as draft first - then we need to pass flag so that BE knows
        if (isSubmitArticle) {
          formDataToSubmit.append("is_published", "1");
        }
        response = await saveArticle(formDataToSubmit, info?.id);
      }

      if (response?.success) {
        router.push("/contributor");
        router.refresh();
      }

      if (!response?.success) {
        toast({
          title: "Save Article Warning",
          description: formatResponseError(
            response?.errors || response?.message,
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Save Article  Warning",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoriesChange = (id: string) => {
    // Add id when checked
    if (!form.getValues("categories").includes(id)) {
      form.setValue("categories", [...form.getValues("categories"), id]);
      form.trigger("categories");
      return;
    }
    // Remove id when unchecked
    form.setValue(
      "categories",
      form.getValues("categories").filter((storedId) => storedId !== id),
    );
    form.trigger("categories");
  };

  const getPreviewData = () => {
    const organizationName =
      organizationList.find((org) => org.id === form.getValues("organization"))
        ?.name || "-";
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

    const previewsArticleData = getDetailsForArticlePreview(
      data,
      user,
      info?.id,
      selectedCategoriesWithMetadata,
      form.watch("organization"),
      selectedTags,
      info?.btns,
    );

    return previewsArticleData;
  };

  const handleArticleTemplateChange = (
    response: ModalArticleTemplateResponse,
  ) => {
    if (response.data === null) {
      return;
    }

    const { data: template } = response;
    const { title, body } = template;

    form.reset(
      {
        ...form.getValues(),
        title,
        body,
      },
      {
        keepDirty: true,
        keepTouched: true,
      },
    );
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
        className="space-y-[20px] lg:space-y-[40px]"
      >
        <PostStatusBlock className="mt-10 lg:mt-5">
          <PostStatusTitle>記事を投稿する</PostStatusTitle>
          {/* ON create mode there is no status yet so we hide the status tag */}
          {info?.status && <PostStatusTag>{info.status?.label}</PostStatusTag>}
          <PostStatusReminder>
            1日10回まで記事投稿ができます。ただし、所属団体の上限を超えた場合はその日の投稿はできません。
          </PostStatusReminder>
        </PostStatusBlock>

        {/* TITLE */}
        {remand.titleRemand && (
          <PostReviewBlock>
            <PostReviewTitle>差し戻し</PostReviewTitle>
            <PostReviewContent>{remand.titleRemand}</PostReviewContent>
          </PostReviewBlock>
        )}

        <FieldGenericInput
          formHook={form}
          formInputName="title"
          labelText={
            <div className="flex gap-2">
              <LabelWithBadgeTransparent
                label="記事タイトル"
                labelProps={{
                  className: "lg:text-base",
                }}
              />
              <ModalArticleTemplateTrigger
                handleResponse={handleArticleTemplateChange}
              />
            </div>
          }
        />

        {/* IMAGES */}
        {remand.imageRemand && (
          <PostReviewBlock>
            <PostReviewTitle>記事タイトル：差し戻しコメント</PostReviewTitle>
            <PostReviewContent>{remand.imageRemand}</PostReviewContent>
          </PostReviewBlock>
        )}

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

        {/* BODY */}
        {remand.bodyRemand && (
          <PostReviewBlock>
            <PostReviewTitle>本文：差し戻しコメント</PostReviewTitle>
            <PostReviewContent>{remand.bodyRemand}</PostReviewContent>
          </PostReviewBlock>
        )}

        <FieldGenericTextArea
          formHook={form}
          formInputName="body"
          labelText={
            <div className="flex gap-2">
              <LabelWithBadgeTransparent
                label="記事本文"
                labelProps={{
                  className: "lg:text-base",
                }}
              />
              <ModalArticleTemplateTrigger
                handleResponse={handleArticleTemplateChange}
              />
            </div>
          }
          textAreaClassName="h-[15.625rem]"
        />

        {/* ORGANIZATION */}
        {/* TODO as per documentation if user does not belong to any organization, hide this and will set as Others */}
        {remand.otherRemand && (
          <PostReviewBlock>
            <PostReviewTitle>記事タイトル：差し戻しコメント</PostReviewTitle>
            <PostReviewContent>{remand.otherRemand}</PostReviewContent>
          </PostReviewBlock>
        )}

        <FieldGenericSelect
          formHook={form}
          formInputName="organization"
          labelText={
            <LabelWithBadgeTransparent
              label="記事対象組織"
              labelProps={{
                className: "lg:text-base",
              }}
            />
          }
          dropdownValues={organizationList}
        />

        {/* CATEGORIES */}
        <PostCategoriesBlock>
          <div>
            <LabelWithBadgeTransparent
              label=" 記事カテゴリ"
              labelProps={{
                className: "lg:text-base",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-3 lg:gap-5">
            {categoriesList.map((category) => {
              return (
                <PostCategory
                  key={category.id}
                  category={category}
                  handleChange={() => handleCategoriesChange(category.id)}
                  categories={form.watch("categories")}
                />
              );
            })}
          </div>
          <PostCategoryErrorMessage
            message={form.formState.errors.categories?.message}
          />
        </PostCategoriesBlock>

        {/* TAGS */}
        <PostTagsBlock>
          <PostTagLabel className="mb-3 text-sm lg:mb-2 lg:text-base">
            タグ
          </PostTagLabel>
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
                message={form.formState.errors.tags?.message || errorTagMessage}
              />
            </>
          )}
        </PostTagsBlock>

        {/* PUBLISH START and END */}
        <TwoColContainer className="gap-2.5 lg:gap-10">
          <TwoColContainerItem className="w-full">
            <FieldGenericDateTime
              formHook={form}
              formInputName="publishStart"
              labelText={
                <LabelWithBadgeTransparent
                  label="公開開始日時"
                  labelProps={{
                    className: "lg:text-base",
                  }}
                />
              }
            />
          </TwoColContainerItem>
          <TwoColContainerItem className="w-full">
            <FieldGenericDateTime
              formHook={form}
              formInputName="publishEnd"
              labelText="公開終了日時"
            />
          </TwoColContainerItem>
        </TwoColContainer>

        {/* TERMS */}
        <FieldGenericCheckbox
          formHook={form}
          formInputName="termOne"
          labelText="当記事の事実確認は済ませており、間違いのない記事内容になっています"
        />
        <FieldGenericCheckbox
          formHook={form}
          formInputName="termTwo"
          labelText="当記事の掲載対象者（未成年の場合は保護者にも）全員に記事や写真の掲載確認を済ませています"
        />

        <p>
          （関係者より記事削除依頼等があった場合は記事投稿ポイント還元対象外となります。予めご了承ください）
        </p>

        <PostButtonBlock className="pt-10 lg:pt-0">
          {/* Preview Button */}
          <Button
            type="button"
            onClick={() => {
              setContributorFormHook(form);
              // set store details from current form
              setArticlePreviewByForm(getPreviewData());
              // open preview
              openModalArticlePreview();
            }}
          >
            記事プレビュー
          </Button>
          {/* Save Button */}
          <Button type="submit" disabled={isLoading}>
            記事を保存する
          </Button>
          {/* Submit Article Button */}
          {(!isEditMode || info?.btns?.submit) && (
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => {
                openModalMessage({
                  title: MODAL_MESSAGE.DEFAULT_ARTICLE_SUBMIT_TITLE,
                  message: MODAL_MESSAGE.DEFAULT_ARTICLE_SUBMIT_CONTENT,
                  handler: () => {
                    form.handleSubmit(() => onSubmit(form.getValues(), true))();
                  },
                  variant: ModalMessageVariant.Confirm,
                });
              }}
            >
              記事を入稿する
            </Button>
          )}
        </PostButtonBlock>
        {/* Buttons below should not be shown on create mode*/}
        {/* Delete button is not shown when is already published user must request for delete status of 6 means published */}
        {isEditMode && (
          <PostButtonBlock>
            {info?.btns.delete && info?.status.value !== 6 && (
              <Button
                type="button"
                disabled={isLoading}
                className="bg-orange-100 hover:bg-orange-100"
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
                          router.push("/contributor");
                          router.refresh();
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

            {info?.btns.editRequest && (
              <Button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  // Trigger form submission first, if form is invalid do not continue operation
                  const isValid = await form.trigger();
                  if (!isValid) {
                    return;
                  }

                  // set initial request type
                  useModalArticleRequestStore.setState({
                    initialRequestType: ModalArticleRequestType.Edit,
                  });
                  // set store details from current form
                  setArticlePreviewByForm(getPreviewData());
                  // open request preview
                  openModalArticleRequest(
                    info?.id || "",
                    ModalArticleRequestType.Edit,
                  );
                }}
              >
                編集依頼を行う
              </Button>
            )}

            {info?.btns.deleteRequest && (
              <Button
                type="button"
                disabled={isLoading}
                className="bg-orange-100 hover:bg-orange-100"
                onClick={() => {
                  // set initial request type
                  useModalArticleRequestStore.setState({
                    initialRequestType: ModalArticleRequestType.Delete,
                  });

                  // set store details from current form
                  setArticlePreviewByForm(getPreviewData());

                  // open request preview
                  openModalArticleRequest(
                    info?.id || "",
                    ModalArticleRequestType.Delete,
                  );
                }}
              >
                削除依頼を行う
              </Button>
            )}
          </PostButtonBlock>
        )}
      </form>
    </Form>
  );
};
