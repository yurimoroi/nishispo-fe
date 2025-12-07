"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryStringBuilder } from "@/lib/generic-string-builder";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ResultsHeaderSelectProps = {
  className?: string;
  labelName?: string;
  labelStyles?: string;
};

export const ResultsHeaderSelect = ({
  className,
  labelName,
  labelStyles = "",
}: ResultsHeaderSelectProps) => {
  const selectDropdownValues = useMemo(() => ["25", "50", "100"], []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedValue, setSelectedValue] = useState<string>(
    selectDropdownValues[0],
  );

  useEffect(() => {
    const perPageParam = searchParams.get("per_page");
    if (perPageParam && selectDropdownValues.includes(perPageParam)) {
      setSelectedValue(perPageParam);
    }
  }, [searchParams, selectDropdownValues]);

  const handleSelectChange = (perPage: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", "1"); // Resetting page to 1 if desired

    // Use queryStringBuilder to build the query string
    const builtQueryString = queryStringBuilder({
      queryString: newSearchParams.toString(),
      targetKey: "per_page",
      targetValue: perPage,
    });

    // Update the URL with the new query string
    const newUrl = `${pathname}?${builtQueryString}`;
    router.push(newUrl);
  };

  return (
    <div className={cn("flex items-center font-open", className)}>
      <p className={cn("block whitespace-nowrap pr-4 text-sm", labelStyles)}>
        {labelName ? labelName : "表示件数"}
      </p>
      <div className="results-header-dropdown w-full lg:w-[7.5rem]">
        <Select value={selectedValue} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue
              className="font-normal"
              placeholder={`${selectedValue} 件`}
            />
          </SelectTrigger>
          <SelectContent>
            {selectDropdownValues.map((item) => (
              <SelectItem key={item} value={item} className="font-normal">
                {item} 件
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
