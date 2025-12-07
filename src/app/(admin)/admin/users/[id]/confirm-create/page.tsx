import { RegistrationConfirmAdmin } from "@/components/admin/users";
import {
  PageTitle,
} from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ミヤスポ事務局 - アカウント",
};

export default function Page() {
  return (
    <MainBlock>
      <PageTitle>アカウント詳細</PageTitle>
      <RegistrationConfirmAdmin/>
    </MainBlock>
  );
}
