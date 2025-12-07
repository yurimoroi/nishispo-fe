import { z } from "zod";
import { formTeamSchema } from "./form-schema";

type FormValues = z.infer<typeof formTeamSchema> & {
  leaders: string[];
};

export const transformTeamDataToFormData = (
  formValues: FormValues,
  isEditMode: boolean = false,
) => {
  const formDataMapping = {
    event_images: formValues.image,
    organization_id: formValues.orgName,
    name: formValues.eventName,
    activity_description: formValues.activitiesDetails,
    member_information: formValues.membersInformation,
    group_fee: formValues.membersFee,
    collect_type: formValues.settlementType,
    collect_span: formValues.moneyCollectingSpan,
  };

  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  formValues.leaders.forEach((usersId, index) => {
    formData.append(`event_leaders[${index}]`, usersId);
  });

  if (isEditMode) {
    formData.append("_method", "PUT");
  }

  return formData;
};
