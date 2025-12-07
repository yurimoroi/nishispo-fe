import { cn } from "@/lib/utils";

type PageProps = {
  searchTerm?: string;
  totalResults?: number | string;
  className?: string;
}

export const ResultsHeaderTotal = ({ searchTerm = '', totalResults = 0, className = '' }: PageProps) => {
  return (
    <div className={cn('result-info flex items-center', className)}>
      <p className="font-bold break-all font-noto">{`”${searchTerm}”の検索結果：${totalResults}件`}</p>
    </div>
  );
};