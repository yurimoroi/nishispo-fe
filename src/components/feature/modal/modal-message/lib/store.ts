import { MODAL_MESSAGE } from "@/lib/message-map";
import { create } from "zustand";

export enum ModalMessageVariant {
  Message = "message",
  Confirm = "confirm",
}

export type ModalMessageStore = {
  title: string;
  message: string;
  isOpen: boolean;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalMessageVariant; // if "confirm" then show ok and cancel button
  handler?: () => void;
};

const initialStore: ModalMessageStore = {
  title: MODAL_MESSAGE.DEFAULT_TITLE,
  message: MODAL_MESSAGE.DEFAULT_CONTENT,
  variant: ModalMessageVariant.Message,
  isOpen: false,
};

export const useModalMessageStore = create<ModalMessageStore>()((set, get) => ({
  ...initialStore,
}));

type OpenModalProps = Omit<ModalMessageStore, "isOpen">;

export const openModalMessage = ({
  title = MODAL_MESSAGE.DEFAULT_TITLE,
  message = MODAL_MESSAGE.DEFAULT_CONTENT,
  variant = ModalMessageVariant.Message,
  confirmText = "OK",
  cancelText = "いいえ",
  handler,
}: OpenModalProps) => {
  useModalMessageStore.setState({
    title,
    message,
    isOpen: true,
    confirmText,
    cancelText,
    variant,
    handler,
  });
};

export const closeModalMessage = () => {
  useModalMessageStore.setState({
    ...initialStore,
  });
};
