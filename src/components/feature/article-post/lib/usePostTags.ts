"use client";

import { useEffect, useState } from "react";
import { JP_ERROR_MESSAGE_ALT } from "../../form";
import { addArticleTag } from "./actions";

type TagType = {
  id: string;
  name: string;
};

const isTagAlreadyAdded = (selectedTags: TagType[], id: string) => {
  return selectedTags.some((tag) => tag.id === id);
};

const isTagAlreadyAddedByName = (selectedTags: TagType[], name: string) => {
  return selectedTags.some(
    (tag) => tag.name.toLowerCase().trim() === name.toLowerCase().trim(),
  );
};

export const usePostTags = (
  initialTags: TagType[],
  initialTagDropdownOptions: TagType[],
) => {
  const [tagDropdownValues, setTagDropdownValues] = useState<TagType[]>(
    initialTagDropdownOptions,
  );
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [errorTagMessage, setTagErrorMessage] = useState("");
  const [isTagAddLoading, setIsTagAddLoading] = useState(false);

  const handleTagDropdownChange = (value: string) => {
    const [id, name] = value.split("^_^");

    if (isTagAlreadyAdded(selectedTags, id)) {
      setTagErrorMessage(JP_ERROR_MESSAGE_ALT.ARTICLE_TAG_ALREADY_ADDED);
    } else {
      setSelectedTags((prev) => [...prev, { id, name }]);
      setTagErrorMessage("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setSelectedTags((prev) => prev.filter((_, idx) => idx !== index));
    setTagErrorMessage("");
  };

  const handleAddTag = async (name: string) => {
    if (name.trim().length === 0) {
      return;
    }

    const isInInitialTags = isTagAlreadyAddedByName(initialTags, name);
    const isInSelectedTags = isTagAlreadyAddedByName(selectedTags, name);

    if (isInSelectedTags || isInInitialTags) {
      setTagErrorMessage(JP_ERROR_MESSAGE_ALT.ARTICLE_TAG_ALREADY_ADDED);
      return {
        success: false,
        message: JP_ERROR_MESSAGE_ALT.ARTICLE_TAG_ALREADY_ADDED,
      };
    }

    try {
      setIsTagAddLoading(true);

      const response = await addArticleTag(name);

      if (response?.success) {
        setTagDropdownValues((prev) => [response.data, ...prev]);
        setSelectedTags((prev) => [...prev, response.data]);
      }
      setTagErrorMessage("");
      return response;
    } catch (error) {
      return { success: false, message: String(error) };
    } finally {
      setIsTagAddLoading(false);
    }
  };

  // Populate tags (Usually for Edit Mode)
  useEffect(() => {
    if (initialTags.length > 0) {
      setSelectedTags(initialTags);
    }
  }, [initialTags]);

  return {
    selectedTags,
    handleTagDropdownChange,
    handleRemoveTag,
    errorTagMessage,
    handleAddTag,
    isTagAddLoading,
    tagDropdownValues,
  };
};
