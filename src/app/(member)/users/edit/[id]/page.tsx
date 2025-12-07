import MainBlock from "@/components/feature/wrapper/main-block";
import { getUserDetail } from "@/components/mypage";
import { FormRegister } from "@/components/registration";
import { getOrganizationList } from "@/components/registration/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "会員情報入力  - ミヤスポ",
  description:
    "ミヤスポは毎日のちょっとした時間が楽しく元気になるように西宮市をメインにした地域限定・地域密着のスポーツ&健康ニュースをお届けしています。",
};
export default async function EditProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [getOrganizationListResponse, userDetailResponse] = await Promise.all([
    getOrganizationList(),
    getUserDetail(),
  ]);

  const organizations = getOrganizationListResponse?.data || [];
  const { data } = userDetailResponse;

  if (!data) {
    return "No User Data Found";
  }

  return (
    <MainBlock className="max-w-[55rem] pt-6 lg:pt-[2.5rem]">
      <h1 className="mt-[.25rem] text-base font-bold lg:mt-2 lg:text-2xl lg:leading-[2.25rem]">
        会員登録
      </h1>
      <p className="mb-5 text-[.625rem] leading-[.9375rem] lg:text-sm">
        *は入力必須項目です。
      </p>

      <FormRegister
        organizations={organizations}
        isEditMode={true}
        info={data}
      />
    </MainBlock>
  );
}
