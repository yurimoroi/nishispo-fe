import { PropsWithChildren } from "react";
import { useModalUserEventsStore } from "./lib";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ModalEventsList = ({ children, className }: CommonProps & {}) => {
  const events = useModalUserEventsStore.getState().events;

  if (events.length === 0) return "このアカウントは種目に参加していません";

  return <div className={className}>TODO: list and style</div>;
};
