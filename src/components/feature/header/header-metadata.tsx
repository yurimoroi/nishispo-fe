"use client";
import Image from "next/image";
import IconCloud from "@public/icon-cloud.svg";
import { useWeatherMetadata } from "./lib/useWeatherMetadata";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherMetadataDataType } from "@/components/admin/weather";
import { cn } from "@/lib/utils";

export const HeaderMetadata = ({
  weatherInfo,
  className,
}: {
  weatherInfo?: WeatherMetadataDataType;
  className?: string;
}) => {
  const { date, temp, isLoading } = useWeatherMetadata({ weatherInfo });

  return (
    <div className={cn("flex items-center gap-2 justify-end lg:flex-col", className)}>
      {isLoading ? (
        <Skeleton className="mb-1 h-[.9375rem] w-8 rounded" />
      ) : (
        <p className="lg:leading-[1.375rem text-right font-inter text-sm text-dark-300 lg:text-lg">
          {date}
        </p>
      )}
      {isLoading || temp === "" ? (
        <Skeleton className="h-[.9375rem] w-8 rounded" />
      ) : (
        <div className="flex justify-end gap-2 lg:gap-[.625rem]">
          <>
            <div className="relative h-[0.875rem] w-[0.875rem] lg:h-[1.125rem] lg:w-[1.125rem]">
              <Image src={IconCloud} alt="cloud icon" fill sizes="100%" />
            </div>
            <p className="font-inter text-sm font-bold leading-[.875rem] lg:text-lg lg:leading-[1.375rem]">
              {temp}&deg;C
            </p>
          </>
        </div>
      )}
    </div>
  );
};
