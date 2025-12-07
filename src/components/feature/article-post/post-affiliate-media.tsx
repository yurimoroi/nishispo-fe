import { Checkbox } from "@/components/ui/checkbox";
import { AffiliatedMediaListDataType } from "./lib";


type PostAffiliateMediaProps = {
  affiliatedMediaList: AffiliatedMediaListDataType[];
  selectedAffiliatedMedia: AffiliatedMediaListDataType[];
  formHook: any;
  formInputName: string;
};
export const PostAffiliateMedia = ({
  affiliatedMediaList,
  selectedAffiliatedMedia,
  formHook,
  formInputName,
}: PostAffiliateMediaProps) => {

  return (
    <ul>
      {affiliatedMediaList.map((media) => {
        return (
          <li key={media.id} className="flex items-center gap-2">
            <Checkbox
              checked={selectedAffiliatedMedia.some(
                (org) => org.id === media.id,
              )}
              onCheckedChange={(checked) => {
                const updatedValue = checked
                  ? [...selectedAffiliatedMedia, media]
                  : selectedAffiliatedMedia.filter(
                      (item) => item.id !== media.id,
                    );

                formHook.setValue(formInputName, updatedValue);
                formHook.trigger(formInputName);
              }}
            />

            <p>{media.name}</p>
          </li>
        );
      })}
    </ul>
  );
};
