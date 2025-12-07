"use client";

import { useEffect, useState } from "react";
import { OrganizationDataType } from "./types";

type HookProps = {
  organizationList: OrganizationDataType[];
  initialSelectedOrganizations: OrganizationDataType[];
  formHook: any;
  formInputName: string;
};

export const useOrgList = ({
  organizationList,
  initialSelectedOrganizations,
  formHook,
  formInputName,
}: HookProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrganizations, setSelectedOrganizations] = useState<
    OrganizationDataType[]
  >(initialSelectedOrganizations);

  const handleRemoveOrganization = (organization: OrganizationDataType) => {
    setSelectedOrganizations(
      selectedOrganizations.filter((org) => org.id !== organization.id),
    );
  };

  // Handle Form Update
  useEffect(() => {
    formHook.setValue(formInputName, selectedOrganizations);

    formHook.trigger(formInputName);

  }, [selectedOrganizations, formHook, formInputName]);

  return {
    isModalOpen,
    setIsModalOpen,
    selectedOrganizations,
    setSelectedOrganizations,
    handleRemoveOrganization,
  };
};
