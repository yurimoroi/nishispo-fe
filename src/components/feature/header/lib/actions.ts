"use server";

import { genericRequest } from "@/lib/generic-action";
import { TopCategoriesResponseType, WeatherMetadataType } from "./types";
import { WeatherResponseType } from "@/components/admin/weather";

const WEATHER_API_URL = "https://www.jma.go.jp/bosai/forecast/data/forecast/";

export const getWeatherMetadata = async ({
  prefectureCode,
  areaCode,
}: {
  prefectureCode: string;
  areaCode: string;
}): Promise<WeatherMetadataType> => {
  const path = `${WEATHER_API_URL}${prefectureCode}.json`;

  const response = await genericRequest({
    path,
    method: "GET",
    overridePath: true,
    options: {
      cache: "no-store",
    },
  });

  const data: WeatherResponseType = await response.json();

  // Find the area that matches the areaCode adn get its max  temp
  const dayForecast = data[1];
  const reportDatetime = data[1].reportDatetime;

  if (!dayForecast?.tempAverage?.areas) {
    return {
      datetime: reportDatetime,
      temperatureMax: "-",
    };
  }

  // Get temp in the areaCode
  const tempMax =
    dayForecast.tempAverage.areas.find((area) => area.area.code === areaCode)
      ?.max ?? "-";

  return {
    datetime: reportDatetime,
    temperatureMax: tempMax,
  };
};


export const getTopCategories = async () => {
  const response = await genericRequest({
    method: "GET",
    path: "/category",
    options: {
      cache: "no-store",
    },
  });

  const data: TopCategoriesResponseType = await response.json();

  return data;
};
