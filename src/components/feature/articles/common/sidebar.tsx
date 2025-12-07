import { Suspense } from "react";
import ArticlePickUpList from "../blocks/article-pickup-lists";
import ArticleRankingList from "../blocks/article-ranking-list";
import { getMedia } from "./lib/actions";
import Media from "./media";
import MetaTags from "./meta-tags";

const Sidebar = async () => {
  const [mediaResponse] = await Promise.all([getMedia()]);
  const { data: mediaData } = mediaResponse;

  const filteredMediaData = (mediaData || []).filter(
    (item) => item?.display_flg === 1 && item?.display_top_flg === 1,
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {filteredMediaData?.[0] && (
          <Media
            key={filteredMediaData[0].id}
            mediaItem={filteredMediaData[0]}
          />
        )}
      </Suspense>

      <ArticlePickUpList />
      <MetaTags />
      <ArticleRankingList />
      <Suspense fallback={<div>Loading...</div>}>
        {filteredMediaData?.[1] && (
          <Media
            key={filteredMediaData[1].id}
            mediaItem={filteredMediaData[1]}
          />
        )}
      </Suspense>
    </>
  );
};

export default Sidebar;
