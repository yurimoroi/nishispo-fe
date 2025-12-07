import { Spinner } from "../common";

type LoadingProps = {
  className?: string;
};

export const Loading = async ({ className = "" }: LoadingProps) => (
  <Spinner className={className} />
);
