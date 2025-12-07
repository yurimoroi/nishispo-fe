"use client";

import { Button } from "@/components/ui/button";
import { useAdminDetailStore } from "./lib";
import {
  approvePublishArticle,
  deleteApprovedArticle,
  editApprovedArticle,
} from "../lib";
import { toast } from "@/hooks/use-toast";
import { openModalMessage } from "@/components/feature/modal";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { useRouter } from "next/navigation";

export const SubmitApproval = () => {
  const router = useRouter();
  const { isLoading, articleId, setIsLoading } = useAdminDetailStore(
    (state) => ({
      isLoading: state.isLoading,
      articleId: state.articleId,
      setIsLoading: state.setIsLoading,
    }),
  );

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await approvePublishArticle(articleId);

      if (!response?.success) {
        toast({
          title: "Article Publish Warning",
          description: response?.message,
        });
      } else {
        openModalMessage({
          title: MODAL_MESSAGE.ARTICLE_PUBLISH_APPROVAL_TITLE,
          message: MODAL_MESSAGE.ARTICLE_PUBLISH_APPROVAL_CONTENT,
          handler: () => {
            router.refresh();
          },
        });
      }
    } catch (error) {
      toast({
        title: "Article Publish Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleClick}>
      承認
    </Button>
  );
};

export const EditApproval = () => {
  const router = useRouter();
  const { isLoading, articleId, setIsLoading } = useAdminDetailStore(
    (state) => ({
      isLoading: state.isLoading,
      articleId: state.articleId,
      setIsLoading: state.setIsLoading,
    }),
  );

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await editApprovedArticle(articleId);

      if (!response?.success) {
        toast({
          title: "Article Edit Approval Warning",
          description: response?.message,
        });
      } else {
        openModalMessage({
          title: MODAL_MESSAGE.ARTICLE_EDIT_APPROVED_TITLE,
          message: MODAL_MESSAGE.ARTICLE_PUBLISH_APPROVAL_CONTENT,
          handler: () => {
            router.refresh();
          },
        });
      }
    } catch (error) {
      toast({
        title: "Article Edit Approval Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleClick} className="w-full">
      編集承認
    </Button>
  );
};

export const DeleteApproval = () => {
  const router = useRouter();
  const { isLoading, articleId, setIsLoading } = useAdminDetailStore(
    (state) => ({
      isLoading: state.isLoading,
      articleId: state.articleId,
      setIsLoading: state.setIsLoading,
    }),
  );

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await deleteApprovedArticle(articleId);

      if (!response?.success) {
        toast({
          title: "Article Delete Approval Warning",
          description: response?.message,
        });
      } else {
        openModalMessage({
          title: MODAL_MESSAGE.ARTICLE_DELETE_APPROVED_TITLE,
          message: MODAL_MESSAGE.ARTICLE_DELETE_APPROVED_CONTENT,
          handler: () => {
            router.push("/admin/articles");
            router.refresh();
          },
        });
      }
    } catch (error) {
      toast({
        title: "Article Edit Approval Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleClick} className="w-full">
      削除承認
    </Button>
  );
};
