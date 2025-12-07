import React, { Suspense } from "react";
import Image from "next/image";
import tagIcon from "@public/tags.svg";
import { getTags } from "./lib/actions";
import Tags from "./tags";

const MetaTags = async () => {
  const [tagsContentResponse] = await Promise.all([getTags()]);

  const { data: tags } = tagsContentResponse;

  if (typeof tags === "undefined" || (Array.isArray(tags) && tags.length === 0))
    return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="pb-10">
        <h3 className="flex items-center pb-2 text-lg font-bold sm:text-base">
          <div className="relative mr-1 inline-block h-4 w-4 align-middle font-bold">
            <Image className="object-cover" src={tagIcon} fill alt="tag icon" />
          </div>
          <span>注目のニュースワード</span>
        </h3>
        <Tags tags={tags} />
      </div>
    </Suspense>
  );
};

export default MetaTags;
