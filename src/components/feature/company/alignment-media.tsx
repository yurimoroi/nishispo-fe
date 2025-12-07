import { getMedia } from "../articles/common/lib/actions";
import Media from "../articles/common/media";
import { AlignmentMediaDetails } from "../articles/details/lib/types";

interface Props {
  alignMedia?: AlignmentMediaDetails[];
}

export const AlignmentMedia = async ({ alignMedia }: Props) => {
  let mediaList;
  if (!alignMedia || alignMedia.length === 0) {
    const [mediaResponse] = await Promise.all([getMedia()]);
    const { data: mediaData } = mediaResponse;

    mediaList = Array.isArray(mediaData)
      ? mediaData.filter(
          (item) =>
            item?.display_flg === 1 && item?.display_article_list_flg === 1,
        )
      : [];
  } else {
    mediaList = alignMedia;
  }

  return (
    <>
      {mediaList &&
        mediaList.length > 0 &&
        mediaList.map((media, index) => (
          <Media
            key={media.id + index}
            mediaItem={media}
            className="relative my-[1.875rem] mb-5 mt-0 sm:h-[17.8125rem] w-full sm:mb-0"
          />
        ))}
    </>
  );
};
