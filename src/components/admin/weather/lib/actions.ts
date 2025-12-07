"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AreaCodeType,
  WeatherMetadataResponseType,
  WeatherResponseType,
  WeatherSaveResponseType,
} from "./types";

const WEATHER_API_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/";

export const saveWeatherInfo = async (
  formDataToSubmit: FormData,
  weatherId?: string,
) => {
  const path = `/weather/${weatherId ? weatherId : ""}`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: WeatherSaveResponseType = await response.json();

  return data;
};

export const getWeatherInfo = async () => {
  const path = `/weather`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: WeatherMetadataResponseType = await response.json();

  return data;
};

export const getAreaByPrefectureCode = async (prefectureCode: string) => {
  const path = `${WEATHER_API_URL}${prefectureCode}.json`;

  const response = await genericRequest({
    path: path,
    method: "GET",
    overridePath: true,
    options: {
      cache: "no-store",
    },
  });

  const data: WeatherResponseType = await response.json();

  // Extract Area Codes by using the  second index
  // Get the weekly forecast data (second index) if it exists
  const dayForecast = data[1];

  if (!dayForecast?.tempAverage?.areas) {
    return [];
  }

  // Map areas to AreaCodeType with proper type checking
  const areaCodes: AreaCodeType[] = dayForecast.tempAverage.areas.map(
    (area) => ({
      id: area.area.code,
      label: area.area.name,
    }),
  );

  return areaCodes;
};
