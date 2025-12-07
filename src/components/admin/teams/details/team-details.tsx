import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import Image, { StaticImageData } from "next/image";
import noImage from "@public/placeholder/no-image.webp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TeamDetailsActions } from "./team-details-actions";
import { TeamDetailsType } from "../lib";

interface EventMembers {
  name: string;
  image: StaticImageData;
  isLeader: boolean;
  isNotApprove: boolean;
  isBillingNotSet: boolean;
  approved: boolean;
  billingNotCancelled: boolean;
  buttonForce: boolean;
}

const eventMembers: EventMembers[] = [
  {
    name: "西宮太郎",
    image: noImage,
    isLeader: true,
    isNotApprove: true,
    isBillingNotSet: false,
    approved: false,
    billingNotCancelled: false,
    buttonForce: true,
  },
  {
    name: "のみやん",
    image: noImage,
    isLeader: false,
    isNotApprove: false,
    isBillingNotSet: true,
    approved: false,
    billingNotCancelled: false,
    buttonForce: true,
  },
  {
    name: "みやこママ",
    image: noImage,
    isLeader: false,
    isNotApprove: false,
    isBillingNotSet: false,
    approved: true,
    billingNotCancelled: false,
    buttonForce: true,
  },
  {
    name: "西宮重幸",
    image: noImage,
    isLeader: false,
    isNotApprove: false,
    isBillingNotSet: false,
    approved: false,
    billingNotCancelled: true,
    buttonForce: false,
  },
];

interface Props {
  teamDetails: TeamDetailsType;
}

export const TeamDetails = ({ teamDetails }: Props) => {
  const renderStatusButton = (status: EventMembers) => {
    return (
      <Button
        variant="empty"
        className="rounded-none bg-[#DEE2E6] text-sm md:text-lg"
      >
        {status.isNotApprove
          ? "所属"
          : status.isBillingNotSet
            ? "申請中（課金設定済）"
            : status.approved
              ? "退会申請中（未承認）"
              : "退会申請中（課金未解除）"}
      </Button>
    );
  };

  const renderActionButton = (action: boolean) => {
    return (
      <Button
        variant="destructive"
        className="bg-orange-100 text-[.75rem] md:text-base"
      >
        {action ? "種目から退会させる" : "課金設定を取り消す"}
      </Button>
    );
  };
  return (
    <div>
      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">組織ロゴ画像</LabelBlock>
        <FieldBlock>
          <div className="relative h-[11.5625rem] w-full sm:h-[18.5625rem] md:h-[5.625rem] md:w-[12.5rem]">
            <Image
              className="object-cover"
              src={teamDetails?.event_images || noImage}
              fill
              sizes="100%"
              alt={`image`}
            />
          </div>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">組織名</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.organization?.name}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">種目名</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.name}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">活動概要</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.activity_description}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">会費</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.group_fee}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">会員向け情報</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.member_information}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">決済種別</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.collection_type?.label}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">集金スパン</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.collect_span}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">次回課金金額決定日</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.repetition_started_at}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">利用権失効日時</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.ended_at}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">未入金</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">あり</span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">想定初期人数</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.team?.first_estimated_number}人
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base"></LabelBlock>
        <FieldBlock>
          <Link
            href={`mailto:${teamDetails?.team?.organization?.email}`}
            className="text-blue-100 underline"
          >
            <span className="font-open text-sm md:text-lg">
              組織連絡先にメールを送信する
            </span>
          </Link>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">更新日時</LabelBlock>
        <FieldBlock>
          <span className="font-open text-sm md:text-lg">
            {teamDetails?.repetition_started_at}
          </span>
        </FieldBlock>
      </LabelFieldBlock>

      <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
        <LabelBlock className="text-base">種目会員</LabelBlock>
        <FieldBlock>
          {eventMembers.map((member, index) => (
            <div key={index}>
              <div className="flex flex-wrap items-center gap-[.625rem] pb-[.625rem]">
                <div>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      className="object-cover"
                      src={member.image}
                      fill
                      sizes="100%"
                      alt={member.name}
                    />
                  </div>
                </div>
                <div className="flex-1 md:mr-auto">
                  <p className="text-sm md:text-base">{member.name}</p>
                </div>
                {member.isLeader && (
                  <div className="hidden md:block">
                    <p className="font-open text-sm md:text-lg">種目リーダー</p>
                  </div>
                )}
                <div className="hidden md:block md:min-w-[13.5rem]">
                  {renderStatusButton(member)}
                </div>
                <div className="hidden md:block">
                  {renderActionButton(member.buttonForce)}
                </div>
              </div>
              <div className="flex items-center gap-5 pb-[.625rem] md:hidden md:pb-0">
                {member.isLeader && (
                  <div>
                    <p className="font-open text-sm md:text-lg">種目リーダー</p>
                  </div>
                )}
                <div>{renderStatusButton(member)}</div>
                <div>{renderActionButton(member.buttonForce)}</div>
              </div>
            </div>
          ))}
        </FieldBlock>
      </LabelFieldBlock>
      <TeamDetailsActions id={teamDetails?.id} />
    </div>
  );
};
