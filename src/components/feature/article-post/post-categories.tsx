import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { ArticleCategoryType } from "./lib";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const PostCategory = ({
  children,
  className,
  category,
  handleChange,
  categories,
}: CommonProps & {
  category: { id: string; name: string };
  handleChange?: () => void;
  categories: string[];
}) => {
  const { id, name } = category;

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={String(id)}
        checked={categories.indexOf(id) !== -1}
        onCheckedChange={handleChange}
      />
      <div className="grid gap-1.5 leading-none">
        <label htmlFor={String(id)} className="font-open leading-none">
          {name}
        </label>
      </div>
    </div>
  );
};

type PostCategoryAltProps = {
  categoryList: ArticleCategoryType[];
  selectedCategoryList: string[];
  formHook: any;
  formInputName: string;
};

// A different approach for PostCategory
export const PostCategoryAlt = ({
  categoryList,
  selectedCategoryList,
  formHook,
  formInputName,
}: PostCategoryAltProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2.5">
      {categoryList.map((category) => {
        const { id, name } = category;
        return (
          <li key={id} className="flex items-center gap-2">
            <Checkbox
              checked={selectedCategoryList.some(
                (selectedCategoryId) => selectedCategoryId === id,
              )}
              onCheckedChange={(checked) => {
                const updatedValue = checked
                  ? [...selectedCategoryList, id]
                  : selectedCategoryList.filter(
                      (selectedCategoryId) => selectedCategoryId !== id,
                    );

                formHook.setValue(formInputName, updatedValue);
                formHook.trigger(formInputName);
              }}
            />

            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
};


export const PostCategoryErrorMessage = ({
  message,
}: {
  message: string | undefined;
}) => {
  if (!message) return null;
  return (
    <div>
      <p className="font-open text-sm text-red">{message}</p>
    </div>
  );
};

export const PostCategoriesBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("space-y-2", className)}>{children}</div>;
};
