import { getContributorTrainings } from "@/components/contributors/trainings/lib/actions";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { CONTRIBUTOR_TRAINING_MESSAGE } from "@/lib/message-map";
import {
  MainTable,
  columns,
} from "@components/contributors/trainings/datatable";
import { ButtonRedirect } from "@components/feature/datatable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事投稿者研修 - ミヤスポ  ",
};

export default async function Page() {
  const [contributorTrainingsDataResponse] = await Promise.all([
    getContributorTrainings(),
  ]);
  const { data: trainingData } = contributorTrainingsDataResponse;

  if (!contributorTrainingsDataResponse?.data) {
    return (
      <MainBlock className="mt-10 min-h-[21.75rem]">
        <p>{CONTRIBUTOR_TRAINING_MESSAGE.NO_DATA}</p>
      </MainBlock>
    );
  }

  return (
    <MainBlock className="min-h-[21.75rem]">
      <div className="pt-6 md:pt-5">
        <PageTitle> 記事投稿者研修一覧</PageTitle>
      </div>
      <div className="pb-5">
        <MainTable columns={columns} data={trainingData} />
      </div>
      <ButtonRedirect variant="dull" label="戻る" redirectPath="/mypage" />
    </MainBlock>
  );
}
