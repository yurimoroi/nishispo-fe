"use client";

import { useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import IconChevronUpDown from "@public/icon-chevron-up-down.svg";
import Image from "next/image";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import FieldRequiredIndicator from "./field-required-indicator";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

/**
 * For Sample usages you can check the following files:
 *
 * -FORM
 * src\components\dashboard\property\form-property.tsx
 *
 * -FORM FILTER:
 * src\components\dashboard\datatable\property\main-filter-modal.tsx
 *
 * -FORM WITH OTHER PROPS - like dependency with other combobox
 *  src\components\dashboard\counter-input\form\form-create-redirect.tsx
 */

export const COMBO_BOX = {
  noResult: "No Result",
  loading: "Loading...",
};

const COMBOBOX_VERBIAGE = {
  noResult: COMBO_BOX.noResult,
  loading: COMBO_BOX.loading,
};

const getSelectedInfo = (currentValue: string) => {
  const [label, id] = currentValue.split("^_^");
  return { label, id };
};

const getButtonDisplayLabel = (
  formInputLabel: string,
  currentSelectedLabel: string,
  initialLabel: string | null,
  formHook: any,
) => {
  if (formInputLabel) {
    return formHook.getValues(formInputLabel);
  }

  if (!formHook.formState.isDirty) {
    // This is for edit mode, always use the initial label
    return initialLabel;
  }

  if (currentSelectedLabel === initialLabel) {
    return "";
  }

  return currentSelectedLabel;
};

const inputHookOption = {
  shouldDirty: true,
};

const updateInput = (formHook: any, formInput: string, value: string) => {
  formHook.setValue(formInput, value, inputHookOption);
};

type UpdateInputsProps = {
  formHook: any;
  formInputName: string;
  formInputLabel: string;
  inputValue: string;
  labelValue: string;
};
const updateInputs = ({
  formHook,
  formInputName,
  formInputLabel,
  inputValue,
  labelValue,
}: UpdateInputsProps) => {
  // update
  updateInput(formHook, formInputName, inputValue);
  if (formInputLabel) {
    updateInput(formHook, formInputLabel, labelValue);
  }
  // trigger
  formHook.trigger(formInputName);
  if (formInputLabel) {
    formHook.trigger(formInputLabel);
  }
};

type ComboBoxGenericProps = {
  formHook: any; //the react hook form
  formInputName: string; // the input input for id
  formInputLabel?: any; // the input for label
  initialId?: string | null;
  initialLabel?: string | null;

  getListDataCall: any; //method that returns list of data for the combobox; proper typing?
  getListDataCallDependentId?: any; // The Id that current combobox is dependent on

  placeholderText?: string; //placeholder shown on the input
  placeholderTextSearch?: string; //placeholder shown on the search input
  labelText: string;
  showRequiredIndicator?: boolean;
  buttonClassName?: string;
  showErrorMessage?: boolean;

  handleChange?: () => void;
};
export default function ComboBoxGeneric({
  formHook,
  formInputName,
  getListDataCall,
  getListDataCallDependentId,
  placeholderText = "選択してください",
  placeholderTextSearch = "検索",
  labelText,
  showRequiredIndicator = false,
  buttonClassName = "",
  handleChange,
  showErrorMessage = true,

  initialId = null,
  initialLabel = null,
  formInputLabel = null,
}: ComboBoxGenericProps) {
  const [openCombo, setOpenCombo] = useState(false);
  const currentSelectedLabel = useRef("");
  const currentSelectedId = useRef("");
  const cachedDependentId = useRef(getListDataCallDependentId);
  const currentFormValueId = formHook.getValues(formInputName).toString();

  const [comboSearch, setComboSearch] = useState("");
  const [comboSearchLoading, setComboSearchLoading] = useState(false);
  const [dataList, setDataList] = useState<Record<string, string>[]>([]);

  // handle initial values and update
  useEffect(() => {
    // set local label
    currentSelectedLabel.current = getButtonDisplayLabel(
      formInputLabel,
      currentSelectedLabel.current,
      initialLabel,
      formHook,
    );

    formInputLabel && formHook.trigger(formInputLabel);

    // set local id
    currentSelectedId.current = initialId?.toString() || "";
  }, [initialLabel, initialId, formInputLabel, formHook]);

  //update list when search text changes, also this triggers on initial combobox render with searParam value of empty string
  useEffect(() => {
    const fetchDataLabels = setTimeout(() => {
      async function getFilteredDataList() {
        setComboSearchLoading(true);

        let response = null;

        if (getListDataCallDependentId) {
          // When dependent on another combobox value sample action: getPropertyNameListByCustomerId
          response = await getListDataCall({
            dependencyId: getListDataCallDependentId, // We must pass the id
            searchTerm: comboSearch, // We must pass the search
          });
        } else {
          // Default call only search
          response = await getListDataCall(comboSearch);
        }

        setDataList(response.data);
        setComboSearchLoading(false);
      }

      getFilteredDataList();
    }, 1000);
    return () => clearTimeout(fetchDataLabels);
  }, [comboSearch, getListDataCall, getListDataCallDependentId]);

  // reset combobox label when its dependent id (if provided) changes
  useEffect(() => {
    const currentCachedDependentId = cachedDependentId.current;
    // undefined when combobox does not have dependent id
    if (
      currentCachedDependentId === undefined &&
      getListDataCallDependentId === undefined
    ) {
      return;
    }

    // -1 when combobox have dependent id but is not set or selected yet (e.g., create forms, "fresh" filter modal)
    // If value is not -1 the dependent id was selected or values was already set (e.g., edit forms)
    // "cachedDependentId" is initialized from  the initial value passed "getListDataCallDependentId"
    if (
      String(currentCachedDependentId) !== "-1" &&
      currentCachedDependentId === getListDataCallDependentId
    ) {
      return;
    }

    // Do not reset current combobox if its dependent id is still the same
    if (currentCachedDependentId === getListDataCallDependentId) {
      return;
    }

    // cache the new dependent id first
    cachedDependentId.current = getListDataCallDependentId;
    // clear the combobox label
    currentSelectedLabel.current = "";
    // update form values
    updateInputs({
      formHook,
      formInputName,
      formInputLabel,
      inputValue: "",
      labelValue: "",
    });
  }, [getListDataCallDependentId, formHook, formInputName, formInputLabel]);

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => (
        <FormItem className="relative w-full">
          <FieldRequiredIndicator
            labelText={labelText}
            showIndicator={
              showRequiredIndicator
                ? formHook.getValues(formInputName) === ""
                : false
            }
          />
          <Popover open={openCombo} onOpenChange={setOpenCombo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCombo}
                className={cn(
                  "w-full justify-between border-dark-300 px-5",
                  buttonClassName,
                )}
              >
                {currentSelectedLabel.current ? (
                  currentSelectedLabel.current
                ) : (
                  <span className="font-normal text-dark-200">
                    {placeholderText}
                  </span>
                )}
                <Image
                  src={IconChevronUpDown}
                  width={10}
                  height={18}
                  alt="combobox icon"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput
                  placeholder={placeholderTextSearch}
                  value={comboSearch}
                  onValueChange={setComboSearch}
                  readOnly={comboSearchLoading}
                />

                {comboSearchLoading ? (
                  <p className="text-center text-sm">
                    {COMBOBOX_VERBIAGE.loading}
                  </p>
                ) : (
                  <>
                    <CommandEmpty>{COMBOBOX_VERBIAGE.noResult}</CommandEmpty>
                    <CommandList>
                      {(dataList || []).map((data) => (
                        <CommandItem
                          key={data.id}
                          value={`${data.name}^_^${data.id}`} // trick to highlight only current hover value (where it has other same text)
                          onSelect={(selectedValue) => {
                            const { label: selectedLabel, id: selectedId } =
                              getSelectedInfo(selectedValue);

                            // update id and label values
                            if (currentFormValueId !== selectedId) {
                              updateInputs({
                                formHook,
                                formInputName,
                                formInputLabel,
                                inputValue: selectedId,
                                labelValue: selectedLabel,
                              });
                              currentSelectedLabel.current = selectedLabel;
                            } else {
                              updateInputs({
                                formHook,
                                formInputName,
                                formInputLabel,
                                inputValue: "",
                                labelValue: "",
                              });
                              currentSelectedLabel.current = "";
                            }

                            // Run any custom handler if it is provided
                            handleChange && handleChange();

                            //close combobox
                            setOpenCombo(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              currentFormValueId === data.id.toString()
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {data.label || data.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          {showErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
