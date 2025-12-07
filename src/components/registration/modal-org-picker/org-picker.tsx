"use client";

import { Input } from "@/components/ui/input";
import { OrganizationDataType } from "../lib/types";
import React, { PropsWithChildren, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IconCloseCircle from "@public/icon-close-circle.svg";

type CommonProps = PropsWithChildren<{
  className?: string;
}>;

export const OrgBadges = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
  );
};

export const OrgBadgeBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-[1.875rem] border-[1px] border-blue-100 px-2 py-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const OrgBadgeLabel = ({ children, className }: CommonProps) => {
  return <div className={cn("text-blue-100", className)}>{children}</div>;
};

export const OrgBadgeDeleteButton = ({
  children,
  className,
  onClick,
}: CommonProps & {
  onClick?: () => void;
}) => {
  return (
    <Button
      className={cn(
        "h-auto w-auto rounded-none bg-transparent p-0 shadow-none hover:bg-transparent",
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <Image
        src={IconCloseCircle}
        alt="delete org button"
        width={16}
        height={16}
      />
    </Button>
  );
};
type OrgListProps = {
  organizationList: OrganizationDataType[];
  initialSelectedOrganizations: OrganizationDataType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOrganizations: React.Dispatch<
    React.SetStateAction<OrganizationDataType[]>
  >;
};

export const OrgList = ({
  organizationList,
  initialSelectedOrganizations,
  setIsModalOpen,
  setSelectedOrganizations,
}: OrgListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOrganization, setSelectedOrganization] = useState<
    OrganizationDataType[]
  >(initialSelectedOrganizations);

  return (
    <div className="space-y-5">
      <Input onChange={(e) => setSearchTerm(e.target.value)} />

      <ul className="h-[15rem] overflow-y-auto rounded-[8px] border-[1px] border-shade-100">
        {organizationList
          .filter((organization) =>
            searchTerm
              ? organization.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              : true,
          )
          .map((organization) => {
            return (
              <li
                key={organization.id}
                className="flex items-center gap-2 border-b-[1px] border-shade-100 px-3 py-1"
              >
                <Checkbox
                  checked={selectedOrganization.some(
                    (org) => org.id === organization.id,
                  )}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // add
                      setSelectedOrganization([
                        ...selectedOrganization,
                        organization,
                      ]);
                    } else {
                      // remove
                      setSelectedOrganization(
                        selectedOrganization.filter(
                          (org) => org.id !== organization.id,
                        ),
                      );
                    }
                  }}
                />
                <p>{organization.name}</p>
              </li>
            );
          })}
      </ul>

      <div className="flex justify-center gap-5">
        <Button
          type="button"
          onClick={() => {
            setSelectedOrganizations(selectedOrganization);
            setIsModalOpen(false);
          }}
        >
          選択完了
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsModalOpen(false)}
        >
          閉じる
        </Button>
      </div>
    </div>
  );
};
