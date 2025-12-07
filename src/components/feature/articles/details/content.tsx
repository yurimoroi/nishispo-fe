import { cn } from "@/lib/utils";
import { convertSymbolsToHTML } from "./lib";

type Props = {
  content: string;
  className?: string;
};
const Content = ({ content, className }: Props) => {
  return (
    <div
      className={cn(
        "sm:leading-[1.6875rem mb-5 whitespace-pre-line border-b border-black pb-5 pt-5 text-base leading-[1.625rem] sm:pb-10 sm:pt-10 sm:text-lg",
        className,
      )}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: convertSymbolsToHTML(content || ""),
        }}
      />
    </div>
  );
};

export default Content;
