"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { weatherFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { LabelFieldBlockDetailView } from "@/components/feature/common";
import { FieldGenericSelect } from "@/components/feature/form";
import { weatherPrefectureCodes } from "@/lib";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAreaByPrefectureCode, saveWeatherInfo } from "./lib/actions";
import { toast } from "@/hooks/use-toast";
import { cn, formatResponseError } from "@/lib/utils";
import { AreaCodeType, WeatherMetadataDataType } from "./lib/types";
import { openModalMessage } from "@/components/feature/modal";
import { MODAL_MESSAGE } from "@/lib/message-map";

export const FormWeather = ({
  weatherInfo,
}: {
  weatherInfo?: WeatherMetadataDataType;
}) => {
  const [isPrefectureCodeLoading, setIsPrefectureCodeLoading] = useState(false);
  const [isAreaCodeLoading, setIsAreaCodeLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [areaCodes, setAreaCodes] = useState<AreaCodeType[]>([]);
  const isEditMode = !!weatherInfo?.id;
  const form = useForm<z.infer<typeof weatherFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(weatherFormSchema),
    defaultValues: {
      prefectureCode: weatherInfo?.area_code || "",
      areaCode: weatherInfo?.sub_area_code || "",
    },
  });

  const prefectureCodeField = form.watch("prefectureCode");

  const onSubmit = async (values: z.infer<typeof weatherFormSchema>) => {
    setIsLoading(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("area_code", values.prefectureCode);
      formDataToSubmit.append("sub_area_code", values.areaCode);
      if (isEditMode) {
        formDataToSubmit.append("_method", "PUT");
      }

      const response = await saveWeatherInfo(formDataToSubmit, weatherInfo?.id);

      if (!response.success) {
        toast({
          title: "Weather Setting Warning",
          description: response?.message,
        });
      } else {
        openModalMessage({
          title: MODAL_MESSAGE.WEATHER_SETUP_TITLE,
          message: MODAL_MESSAGE.WEATHER_SETUP_CONTENT,
        });
      }
    } catch (error) {
      toast({
        title: "Weather Setting Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Prefecture Code change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsAreaCodeLoading(true);

        const data = await getAreaByPrefectureCode(prefectureCodeField);
        setAreaCodes(data);
      } catch (error) {
        toast({
          title: "Area Code Fetch Error",
          description: formatResponseError(error),
        });
      } finally {
        setIsAreaCodeLoading(false);
      }
    };
    if (prefectureCodeField) {
      fetchData();
    }
  }, [prefectureCodeField]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <LabelFieldBlockDetailView
          label="予報区"
          child={
            <div className="space-y-5">
              <div
                className={cn("", {
                  "pointer-events-none opacity-50": isPrefectureCodeLoading,
                })}
              >
                <FieldGenericSelect
                  formHook={form}
                  formInputName="prefectureCode"
                  labelText=""
                  dropdownValues={weatherPrefectureCodes}
                />
              </div>
              <div
                className={cn("", {
                  "pointer-events-none opacity-50": isAreaCodeLoading,
                })}
              >
                <FieldGenericSelect
                  formHook={form}
                  formInputName="areaCode"
                  labelText=""
                  dropdownValues={areaCodes}
                />
              </div>
            </div>
          }
        />
        <div className="flex justify-center">
          <Button disabled={isLoading}>設定する</Button>
        </div>
      </form>
    </Form>
  );
};
