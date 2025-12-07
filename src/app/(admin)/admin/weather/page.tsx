import { FormWeather, getWeatherInfo } from "@/components/admin/weather";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - アカウント",
};

export default async function Page() {
  const [getWeatherInfoResponse] = await Promise.all([getWeatherInfo()]);
  return (
    <MainBlock>
      <PageTitle>天気表示用設定</PageTitle>
      <FormWeather weatherInfo={getWeatherInfoResponse?.data} />
    </MainBlock>
  );
}
