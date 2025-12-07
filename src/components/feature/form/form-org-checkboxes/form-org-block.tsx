import { OrganizationDataType } from "@/components/registration/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

type FormOrgBlockProps = {
  organizations: OrganizationDataType[];
  handleOrganizationSelect: (
    checked: boolean,
    item: OrganizationDataType,
  ) => void;
  selectedOrganizations: {
    id: string;
    label: string;
  }[];
};

export const FormOrgBlock = ({
  organizations,
  handleOrganizationSelect,
  selectedOrganizations,
}: FormOrgBlockProps) => {
  return (
    <div className="inline-flex flex-col flex-wrap gap-x-5 lg:flex-row">
      {organizations.map((item, index) => {
        const { id, name: label } = item;
        const orgId = `org_${id}`;
        const isChecked = selectedOrganizations.some((org) => org.id === id);

        return (
          <div
            className="mb-4 flex items-center gap-2 lg:mb-2.5"
            key={`${index}_${label}`}
          >
            <Checkbox
              id={orgId}
              defaultChecked={isChecked}
              onCheckedChange={(checked: boolean) => {
                handleOrganizationSelect(checked, item);
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor={orgId} className="font-open text-base">
                {label}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};
