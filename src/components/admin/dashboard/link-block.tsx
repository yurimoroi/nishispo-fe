import Link from "next/link";

interface linkItem {
  id: string;
  label: string;
  url: string;
  num: number;
}

interface Props {
  linkItems: linkItem[];
}
export const LinkBlock = ({ linkItems }: Props) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-6 md:gap-[1.56%]">
      {linkItems.map(({ id, label, url, num }) => (
        <li key={id} className="mb-[1.25rem]">
          <Link
            href={url}
            className="flex h-full items-center justify-between gap-5 border-2 border-blue-300 p-5 text-black hover:bg-blue-300 hover:text-white md:block md:p-[.625rem] md:text-center"
          >
            <p className="pb-0 text-xs font-bold lg:pb-5">{label}</p>
            <p className="text-xs font-bold">{num}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LinkBlock;
