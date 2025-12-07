import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MutableRefObject } from "react";
import { CacheMediaRefType } from "./lib";

type PostFakeFileProps = {
  formHook: any;
  formInputName: string;
  labelText?: string;
  cacheMediaRef: MutableRefObject<CacheMediaRefType>;
};

// This will serve as file upload and the actual file upload will be hidden and just be a container
// You can props to make this component dynamic
export const PostFakeFile = ({
  formHook,
  formInputName,
  labelText,
  cacheMediaRef,
}: PostFakeFileProps) => {
  return (
    <>
      <Label
        htmlFor="fakeFileInput"
        className="flex h-[2.0625rem] max-w-max rounded-sm border-0 bg-blue-100 px-[.75rem] py-1.5 text-xs font-bold text-white lg:h-[2.375rem] lg:text-base"
      >
        {labelText}
      </Label>
      <Input
        id="fakeFileInput"
        type="file"
        placeholder=""
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const currentFiles = formHook.getValues(formInputName);

          formHook.setValue(
            formInputName,
            [...currentFiles, ...Array.from(event.target.files ?? [])],
            { shouldValidate: true },
          );

          // update cache media ref by adding the new files and providing negative id as id value
          if (cacheMediaRef.current) {
            cacheMediaRef.current = [
              ...cacheMediaRef.current,
              ...Array.from(event.target.files ?? []).map((file, index) => ({
                file,
                id: -(Date.now()), // negative ids mean this are new files
              })),
            ];
          }
        }}
      />
    </>
  );
};
