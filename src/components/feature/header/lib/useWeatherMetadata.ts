"use client";

import { getWeatherMetadata } from "./actions";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { WeatherMetadataDataType } from "@/components/admin/weather";

export const useWeatherMetadata = ({
  weatherInfo,
}: {
  weatherInfo?: WeatherMetadataDataType;
}) => {
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      setIsLoading(true);

      try {
        const weatherMetadata = await getWeatherMetadata({
          prefectureCode: weatherInfo?.area_code || "",
          areaCode: weatherInfo?.sub_area_code || "",
        });

        const parsedDate = parseISO(weatherMetadata.datetime);
        const formattedDate = format(parsedDate, "yyyy.MM.dd EEE");

        setDate(formattedDate);
        setTemp(weatherMetadata.temperatureMax);
      } catch {
        setDate("-");
        setTemp("-");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherForecast();
  }, [weatherInfo?.area_code, weatherInfo?.sub_area_code]);

  return { date, temp, isLoading };
};
