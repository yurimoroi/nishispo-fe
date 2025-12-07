"use client";

import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import {
  FieldGenericFileImage,
  FieldGenericInput,
  FieldGenericRadioGroup,
  FieldGenericSelect,
  FieldGenericTextArea,
  FormImagePreviewSingle,
  FormImagePreviewSingleBlock,
} from "@/components/feature/form";
import { useImagePreview } from "@/components/registration/lib/useImagePreview";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@components/ui//button";
import { zodResolver } from "@hookform/resolvers/zod";
import previewImage from "@public/placeholder/ImageSample.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UsersListSelection } from "../../accounts/users/users-list-selection";
import {
  createNewTeam,
  formTeamSchema,
  getAdminOrganizationNameList,
  TeamDetailsType,
  transformTeamDataToFormData,
  updateNewTeam,
} from "../lib";
import ComboBoxGeneric from "@/components/feature/form/field-generic-combobox";
import { getConvertedSingleLinkToFile } from "@/lib/utils";

const collectionSpan = [
  { id: "3", name: "3ヶ月" },
  { id: "6", name: "6ヶ月" },
  { id: "12", name: "12ヶ月" },
];

export const collectType = [
  {
    id: 0,
    label: "個別決済", // : Individual settlement
  },
  {
    id: 1,
    label: "種目決済", // Item settlement
  },
];

interface Props {
  teamDetails?: TeamDetailsType;
}
export const FormCreateEditTeam = ({ teamDetails }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const isEditMode = Boolean(teamDetails);
  const listPageUrl = "/admin/teams";
  const [leaders, setLeaders] = useState<string[]>(
    teamDetails?.team?.leaders?.map((leader) => leader.user_id) || [],
  );
  const [members, setMembers] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formTeamSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formTeamSchema),
    defaultValues: {
      orgName: teamDetails?.team?.organization?.id || "",
      image: new File([], ""),
      eventName: teamDetails?.team?.name || "",
      activitiesDetails: teamDetails?.team?.activity_description || "",
      membersFee: teamDetails?.team?.group_fee || 0,
      membersInformation: teamDetails?.team?.member_information || "",
      settlementType:
        teamDetails?.team?.collection_type?.status.toString() || "0",
      moneyCollectingSpan: collectionSpan[0].id,
    },
  });

  const { imagePreviewSource, onChangeFile, imagePreviewFileName } =
    useImagePreview({
      imagePath: teamDetails?.event_images || previewImage.src,
    });

  useEffect(() => {
    const fetchData = async () => {
      // Check if there's a logo URL
      if (teamDetails?.event_images) {
        try {
          // Convert the logo URL to a File object
          const file = await getConvertedSingleLinkToFile(
            teamDetails?.event_images,
          );

          if (file) {
            // Update the form's "uploadFile" field with the retrieved file
            form.setValue("image", file);
          }
        } catch (error) {
          console.error("Error fetching the logo file:", error);
        }
      }
    };

    fetchData();
  }, [teamDetails?.event_images, form]);

  const handleBackToMenu = () => {
    router.push(listPageUrl);
  };

  const onSubmit = async (values: z.infer<typeof formTeamSchema>) => {
    const combinedData = {
      ...values,
      leaders: leaders,
      uploadFileName: imagePreviewFileName,
      uploadFileURL: imagePreviewSource,
    };

    const transformData = transformTeamDataToFormData(combinedData, isEditMode);
    const pathRedirect = listPageUrl;

    try {
      setClicked(true);
      let response;

      if (isEditMode) {
        response = await updateNewTeam(transformData, teamDetails!.id);
      } else {
        response = await createNewTeam(transformData);
      }

      if (response?.success) {
        router.replace(pathRedirect);
        router.refresh();
      }

      if (response?.errors) {
        toast({
          title: "Error during creating Team",
          description:
            "An error occurred during the process. Please try again later.",
          variant: "destructive",
        });
      }

      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during creating team",
        description: errorMessage,
      });
      setClicked(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative max-h-fit overflow-hidden"
      >
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">組織</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <ComboBoxGeneric
              formHook={form}
              formInputName="orgName"
              initialLabel={teamDetails?.team?.organization?.name}
              getListDataCall={getAdminOrganizationNameList}
              labelText=""
              buttonClassName="!mt-0 shadow-input text-sm sm:text-lg"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>ロゴ画像</LabelBlock>
          <FieldBlock>
            <FormImagePreviewSingleBlock>
              <FormImagePreviewSingle
                className="cover lg:h-[7.875rem] lg:w-[13.75rem]"
                imageSource={imagePreviewSource}
                imageAlt="preview image"
              />
              <FieldGenericFileImage
                formHook={form}
                formInputName="image"
                labelText="ファイルを選択"
                handleFileChange={onChangeFile}
              />
            </FormImagePreviewSingleBlock>
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">種目名</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="eventName"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>種目リーダー</LabelBlock>
          <FieldBlock>
            <UsersListSelection
              currentMembers={teamDetails?.team?.leaders || []}
              members={leaders}
              setMembers={setLeaders}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>活動概要</LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="activitiesDetails"
              labelText=""
              textAreaClassName="h-[4.375rem] !text-sm sm:!text-lg"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">会費</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              fieldType="number"
              formHook={form}
              formInputName="membersFee"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>会員向け情報</LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="membersInformation"
              labelText=""
              textAreaClassName="h-[4.375rem] !text-sm sm:!text-lg"
            />
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>決済種別</LabelBlock>
          <FieldBlock>
            <FieldGenericRadioGroup
              formHook={form}
              formInputName="settlementType"
              labelText=""
              radioValues={collectType}
              isHorizontal={true}
              formLabelClassName="text-sm sm:text-lg"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>集金スパン</LabelBlock>
          <FieldBlock>
            <FieldGenericSelect
              formHook={form}
              formInputName="moneyCollectingSpan"
              labelText=""
              dropdownValues={collectionSpan}
              selectTriggerClassName="text-sm sm:text-lg"
            />
          </FieldBlock>
        </LabelFieldBlock>

        <div className="mt-5r mb-14 mt-5 block justify-center md:mt-0 md:flex md:flex-row md:gap-5 md:pb-10 md:pt-10 lg:mb-0">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBackToMenu}
            className="mb-5 w-full text-base md:mb-0 md:w-auto"
          >
            戻る
          </Button>
          <Button
            disabled={isClicked}
            className="w-full text-base md:w-auto"
            type="submit"
          >
            登録
          </Button>
        </div>
      </form>
    </Form>
  );
};
