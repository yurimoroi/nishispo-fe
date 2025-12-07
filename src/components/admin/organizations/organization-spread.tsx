import { OrganizationsType } from "@/components/admin/organizations/lib";
import noImage from "@public/placeholder/no-image.webp";
import Image from "next/image";
import { OrganizationSpreadActions } from "./organization-spread-actions";
interface Props {
  data: OrganizationsType;
}

export const OrganizationSpread = ({ data }: Props) => {
  return (
    <div className="mb-5 border border-shade-400 p-5">
      <div className="gap-5 pb-5 md:flex md:pb-0">
        <div className="pb-5 md:pb-[.625rem]">
          <div className="relative h-[9.1875rem] w-full sm:h-[18.5625rem] md:h-[8.875rem] md:w-[19.625rem]">
            <Image
              className="object-cover"
              src={data?.logo || noImage}
              fill
              sizes="100%"
              alt={`image`}
            />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-[.625rem] border-b border-shade-400 pb-[.625rem] text-base font-bold md:text-[1.375rem] md:leading-[1.875rem]">
            {data?.name}
          </h2>
          <div className="flex gap-5">
            <div className="text-sm font-bold md:text-base">代表者</div>
            <div className="space-y-[.625rem] text-sm leading-[1.125rem] md:text-lg md:leading-[1.5rem]">
              <p>{data.representative_name}</p>
              <p>{data?.email}</p>
              <p>{data?.tel_number}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[.625rem] border-shade-400 pb-[.625rem] text-base sm:text-lg md:border-b">
        {data?.activity_description}
      </div>
      <OrganizationSpreadActions orgId={data?.id} orgName={data?.name} />
    </div>
  );
};
