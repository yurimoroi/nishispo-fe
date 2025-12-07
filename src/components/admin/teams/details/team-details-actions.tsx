import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
}

export const TeamDetailsActions = ({ id }: Props) => {
  return (
    <div className="justify-center gap-5 pb-10 pt-2 text-center md:flex md:pb-20 md:pt-5">
      <Button
        asChild
        variant="dull"
        className="mb-5 flex w-full text-base shadow-button md:mb-0 md:inline-flex md:w-auto"
      >
        <Link href="/admin/teams"> 戻る</Link>
      </Button>
      <Button
        asChild
        type="submit"
        className="flex w-full text-base md:inline-flex md:w-auto"
      >
        <Link href={`/admin/teams/${id}/edit`}>編集</Link>
      </Button>
    </div>
  );
};
